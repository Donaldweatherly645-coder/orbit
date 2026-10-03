# Orbit release checks

Two parts, no installs, no build step.

## 1. `python3 tests/check.py` (from the repo root)

Static checks, plus the service-worker scenarios:

- **Song versions.** Every song in `music/` must be referenced in `index.html` as `music/<name>.mp3?v=<8 hex>`, where the 8 hex are the start of the file's SHA-256. If you replace a song's audio, run `python3 tests/check.py --fix` to update its version.
- No stray songs, no missing files in the service worker's precache list or the manifest icons.
- Relative paths only, so the game works from the GitHub Pages subpath (`/orbit/`).
- **`tests/sw_test.js`** runs the real `sw.js` in a simulated browser (fake cache, fake network, an offline switch). It uses macOS's built-in JavaScriptCore shell, so nothing to install. It covers:
  - offline start from `/orbit/` and `/orbit/index.html?...`
  - updates reaching installed copies
  - a 404 never replacing the offline copy
  - replaced songs being downloaded and their old copies removed
  - unchanged songs not being re-downloaded

Exits non-zero on any failure.

### The audio rule (why the `?v=` matters)

The service worker caches songs forever by their exact URL, so installed copies don't re-download several MB every launch. That means **a song's URL must change whenever its audio changes**. Otherwise installed copies keep the old recording indefinitely. The `?v=` content hash does that automatically, and `check.py` fails if a file and its `?v=` disagree.

## 2. `tests/regression.html` (in a browser)

Serve the folder **above** the repo so the game sits at `/orbit/`, like on GitHub Pages:

```bash
cd ..   # the folder containing orbit/
python3 -m http.server 8000
```

Open `http://localhost:8000/orbit/tests/regression.html` and press **Run all checks**. Press Ctrl+C in the terminal when done.

It also runs from the live site, which is the easy way to check a real phone:
`https://donaldweatherly645-coder.github.io/orbit/tests/regression.html`

What it covers, all against the real game in a phone-sized frame:

| Area | Checks |
|---|---|
| Runs | start → crash → results on all 4 difficulties; Mothership fight → victory on all 4 |
| Collisions | rock, fast rock at 30fps, flying into a UFO, UFO shots at 260/s and 520/s at 30fps; each shield absorbs exactly one hit (cap shields vs cap and cap+1 rocks); a shield breaks on a shot and the next hit kills — all 4 difficulties |
| Shield caps | Easy 2, Normal 2, Hard 3, Extreme 4 via Hull Patch upgrades and via pickups |
| Run state | planets step up one at a time; a new run after victory starts clean (no boss, landing, slow-mo, shields); crashing in slow-mo; a normal run saves a new best and earns achievements; a dev run records no best, achievements or all-time buffs; god mode works and turns off with dev mode |
| Audio | menu song plays; menu → game song hand-off with no overlap; mute and unmute; a real slow-mo pickup slows the song and releases it; tab/app interruption suspends and recovers; the sound button's label/state match the real audio; pause freezes the run and silences audio, resume keeps the mute setting; after a crash the run song keeps playing; relaunch carries on the same song (no restart, no copy); BACK TO MAIN MENU (from game over and from pause) fades the run song out before the menu song starts |
| Install/offline | manifest and icons load from relative paths; the service worker is active with the offline copy cached (skipped in browsers that won't run service workers — `check.py` covers `sw.js` regardless) |

The test page drives the game through a hook that only exists when the game is opened with `?test`. Normal players never get it.

## Still needs a real device

These can't be checked from a desktop browser or the simulated service worker:

- **iPhone:** music actually audible after the first tap (iPhone Safari is stricter than the desktop browser used here); sound with the silent switch on (iOS 17+); sound coming back after a phone call; **Add to Home Screen → open with Airplane Mode on** starts the game.
- **Android:** the PLAY OFFLINE button shows Chrome's real install prompt; the installed app opens offline.
- **Both:** a real Home Screen copy picks up a new version of the game, and of a replaced song, after an update.

Running `tests/regression.html` from the live site on the phone covers a lot of this automatically. Its install/offline section uses that phone's real service worker.
