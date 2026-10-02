#!/usr/bin/env python3
"""Orbit release checks. Run from the repo root:

    python3 tests/check.py          # check; exit 1 on any problem
    python3 tests/check.py --fix    # also rewrite song ?v= versions to match the files

Static checks (no browser needed):
  * every song in music/ is referenced in index.html as music/<name>.mp3?v=<8 hex>,
    where the 8 hex are the start of the file's SHA-256 -- the cache-busting rule
    that lets installed copies receive replaced audio (see sw.js)
  * no stray songs in music/ that the game doesn't reference
  * the service worker's precache list and the manifest's icons all exist
  * the manifest's start_url/scope and the game's asset paths are relative, so the
    game works from the GitHub Pages subpath (/orbit/), not just a domain root
Then runs tests/sw_test.js (service-worker scenarios) on macOS's built-in
JavaScriptCore shell, if present.

Gameplay/audio checks run in a browser: open tests/regression.html (see tests/README.md).
"""
import hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
problems, notes = [], []

def sha8(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]

page = open('index.html', encoding='utf-8').read()
fix = '--fix' in sys.argv

# --- songs: versioned by content -------------------------------------------
songs = sorted(f for f in os.listdir('music') if f.endswith('.mp3'))
for f in songs:
    want = sha8(os.path.join('music', f))
    refs = re.findall(r"music/" + re.escape(f) + r"(\?v=[0-9a-f]*)?(?=['\"])", page)
    if not refs:
        problems.append(f"music/{f} is not used by index.html (remove it, or reference it)")
        continue
    for v in refs:
        if v != '?v=' + want:
            if fix:
                page = re.sub(r"music/" + re.escape(f) + r"(\?v=[0-9a-f]*)?(?=['\"])", f"music/{f}?v={want}", page)
                notes.append(f"fixed: music/{f} -> ?v={want}")
            else:
                problems.append(f"music/{f} is referenced as '{v or '(no version)'}' but its content is ?v={want} "
                                f"-- installed copies would keep stale audio. Run: python3 tests/check.py --fix")
            break
for ref in set(re.findall(r"music/([\w.-]+\.mp3)", page)):
    if ref not in songs:
        problems.append(f"index.html references music/{ref}, which doesn't exist")
if fix:
    open('index.html', 'w', encoding='utf-8').write(page)

# --- service worker precache + manifest ------------------------------------
sw = open('sw.js', encoding='utf-8').read()
core = re.search(r"const CORE = \[(.*?)\];", sw, re.S)
for p in re.findall(r"'([^']+)'", core.group(1) if core else ''):
    if p != './' and not os.path.exists(p):
        problems.append(f"sw.js precaches '{p}', which doesn't exist")
m = json.load(open('manifest.webmanifest', encoding='utf-8'))
for icon in m.get('icons', []):
    if not os.path.exists(icon['src']):
        problems.append(f"manifest icon '{icon['src']}' doesn't exist")
for k in ('start_url', 'scope', 'id'):
    if str(m.get(k, './')).startswith('/'):
        problems.append(f"manifest {k} '{m[k]}' is root-absolute -- breaks on the /orbit/ subpath")

# --- subpath safety: no root-absolute asset paths --------------------------
for pat in (r'''(?:src|href)=["']/(?!/)''', r'''(?:fetch|register)\(\s*['"]/(?!/)''', r"""url:\s*'/(?!/)"""):
    for hit in re.finditer(pat, page + sw):
        problems.append(f"root-absolute path near: {hit.group(0)!r} -- breaks on the /orbit/ subpath")

# --- report static ----------------------------------------------------------
for n in notes: print(n)
print(f"static checks: {len(songs)} songs, sw precache, manifest, subpath paths -- "
      + ("OK" if not problems else f"{len(problems)} problem(s)"))
for p in problems: print("  FAIL " + p)

# --- service-worker scenarios ----------------------------------------------
JSC = '/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc'
sw_failed = False
if os.path.exists(JSC):
    out = subprocess.run([JSC, 'tests/sw_test.js'], capture_output=True, text=True)
    print(out.stdout.strip())
    sw_failed = 'FAIL' in out.stdout or out.returncode != 0 or ' passed' not in out.stdout
else:
    print("service-worker scenarios: SKIPPED (needs macOS JavaScriptCore at " + JSC + ")")

sys.exit(1 if problems or sw_failed else 0)
