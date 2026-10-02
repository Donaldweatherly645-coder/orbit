// Service-worker checks for Orbit, run against the real sw.js with a
// simulated browser around it (cache, network, offline switch). No
// dependencies: runs on the JavaScriptCore shell that ships with macOS.
//
//   /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc tests/sw_test.js
//
// (run from the repo root). Prints PASS/FAIL per scenario; exits non-zero
// on any failure.

const SCOPE = 'https://example.github.io/orbit/';
// (the JavaScriptCore shell has no URL class; scope-relative paths are all we need)
const abs = (u) => /^https?:/.test(u) ? u : SCOPE + u.replace(/^\.\//, '');

// ---- a tiny fake network --------------------------------------------------
let online = true;
const server = new Map();          // url -> { status, body }
const serve = (u, body, status) => server.set(abs(u), { status: status || 200, body });
function Response(body, status) {
  this.body = body; this.status = status; this.ok = status >= 200 && status < 300; this.type = 'basic';
}
Response.prototype.clone = function () { return new Response(this.body, this.status); };
function fetch(req) {
  const url = typeof req === 'string' ? abs(req) : req.url;
  if (!online) return Promise.reject(new TypeError('offline'));
  const hit = server.get(url) || server.get(url.split('?')[0]);   // static hosts ignore ?query
  return Promise.resolve(hit ? new Response(hit.body, hit.status) : new Response('404 page', 404));
}
const request = (u, mode) => ({ url: abs(u), method: 'GET', mode: mode || 'cors' });

// ---- a tiny fake Cache Storage -------------------------------------------
const stores = new Map();
const keyOf = (r) => (typeof r === 'string' ? abs(r) : r.url);
function Cache() { this.m = new Map(); }
Cache.prototype.put = function (r, res) { this.m.set(keyOf(r), res); return Promise.resolve(); };
Cache.prototype.match = function (r) { const v = this.m.get(keyOf(r)); return Promise.resolve(v ? v.clone() : undefined); };
Cache.prototype.addAll = function (list) {
  return Promise.all(list.map((u) => fetch(u).then((res) => { if (!res.ok) throw new Error('addAll ' + u); return this.put(u, res); })));
};
Cache.prototype.keys = function () { return Promise.resolve([...this.m.keys()].map((url) => ({ url }))); };
Cache.prototype.delete = function (r) { return Promise.resolve(this.m.delete(keyOf(r))); };
const caches = {
  open: (n) => { if (!stores.has(n)) stores.set(n, new Cache()); return Promise.resolve(stores.get(n)); },
  keys: () => Promise.resolve([...stores.keys()]),
  delete: (n) => Promise.resolve(stores.delete(n)),
  match: async (r) => { for (const c of stores.values()) { const v = await c.match(r); if (v) return v; } return undefined; },
};

// ---- the service worker global --------------------------------------------
const handlers = {};
const self = {
  addEventListener: (t, f) => { handlers[t] = f; },
  skipWaiting: () => Promise.resolve(), clients: { claim: () => Promise.resolve() },
  location: { href: SCOPE + 'sw.js' },
};
globalThis.self = self; globalThis.caches = caches; globalThis.fetch = fetch;
load('sw.js');

const settle = async () => { for (let i = 0; i < 20; i++) await null; };   // let queued cache writes finish
async function lifecycle(type) {
  let p = Promise.resolve();
  handlers[type]({ waitUntil: (x) => { p = x; } });
  await p; await settle();
}
async function get(u, mode) {
  let p = null;
  handlers.fetch({ request: request(u, mode), respondWith: (x) => { p = x; } });
  if (!p) return fetch(u);           // not handled by the worker
  const res = await p; await settle();
  return res;
}
// how the game names its audio (read from index.html, so the test follows the real file)
const page = readFile('index.html');
const songUrl = (name) => { const m = page.match(new RegExp("'(music/" + name + "\\.mp3[^']*)'")); return m ? m[1] : null; };

// ---- scenarios --------------------------------------------------------------
let pass = 0, fail = 0;
function check(name, ok, detail) { print((ok ? 'PASS ' : 'FAIL ') + name + (detail ? '  -- ' + detail : '')); ok ? pass++ : fail++; }
async function freshInstall() {
  stores.clear(); online = true; server.clear();
  serve('./', '<game v1>'); serve('index.html', '<game v1>'); serve('manifest.webmanifest', '{}');
  for (const i of ['icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png']) serve(i, 'png');
  await lifecycle('install'); await lifecycle('activate');
}

(async () => {
  // 1. offline startup from the GitHub Pages subpath
  await freshInstall();
  online = false;
  let r = await get('./', 'navigate');
  check('offline: opening /orbit/ starts the game', r && r.body === '<game v1>', r && r.body);
  r = await get('index.html?test', 'navigate');
  check('offline: opening /orbit/index.html?... starts the game', r && r.body === '<game v1>', r && r.body);
  r = await get('icons/icon-192.png');
  check('offline: home-screen icon available', r && r.ok);

  // 2. a page update reaches an installed copy
  await freshInstall();
  await get('./', 'navigate');
  serve('./', '<game v2>');
  r = await get('./', 'navigate');
  check('online: an updated page is served, not the cached one', r.body === '<game v2>', r.body);
  online = false; r = await get('./', 'navigate'); online = true;
  check('...and the updated page is what works offline afterwards', r.body === '<game v2>', r.body);

  // 3. a bad navigation must not replace the offline copy
  await freshInstall();
  await get('./', 'navigate');
  await get('does-not-exist', 'navigate');           // e.g. a mistyped or stale link -> 404
  online = false; r = await get('./', 'navigate');
  check('a 404 page never replaces the offline copy of the game', r && r.body === '<game v1>', r && r.body);

  // 4. replacing a soundtrack reaches an installed copy
  await freshInstall();
  const url = songUrl('ready-for-launch');
  check('song URLs carry a version', !!url && /\?v=[0-9a-f]{8}$/.test(url), url);
  serve('music/ready-for-launch.mp3', 'OLD AUDIO');
  await get(url);                                    // played once: cached
  // a new recording is shipped -- the rule is: new content => new ?v=
  serve('music/ready-for-launch.mp3', 'NEW AUDIO');
  const newUrl = url.replace(/\?v=[0-9a-f]+$/, '?v=00000001');
  r = await get(newUrl);
  check('a replaced song (new ?v=) is downloaded, not served stale', r.body === 'NEW AUDIO', r.body);
  online = false; r = await get(newUrl); online = true;
  check('...and the new version then plays offline', r && r.body === 'NEW AUDIO', r && r.body);
  let mp3s = 0;
  for (const c of stores.values()) for (const k of await c.keys()) if (k.url.includes('ready-for-launch')) mp3s++;
  check('...and the old version is removed from the cache', mp3s === 1, mp3s + ' cached copies');

  // 5. the unchanged songs stay cached (no re-download every launch)
  await freshInstall();
  serve('music/last-save-point.mp3', 'SONG');
  const u2 = songUrl('last-save-point');
  await get(u2);
  let fetched = false; const real = globalThis.fetch;
  globalThis.fetch = (q) => { fetched = true; return real(q); };
  r = await get(u2);
  globalThis.fetch = real;
  check('an unchanged song is served from cache without re-downloading', r.body === 'SONG' && !fetched);

  print('\n' + pass + ' passed, ' + fail + ' failed');
  if (fail) throw new Error(fail + ' service-worker check(s) failed');
})().catch((e) => { print(String(e)); quit(1); });
