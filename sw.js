// Offline support for the installed (Home Screen) version of Orbit.
// The page itself is fetched network-first so updates land as soon as
// there's a connection; everything else (icons, fonts) is served from
// cache and refreshed in the background.
//
// AUDIO RULE: songs are cached forever by their exact URL, and every song
// URL in index.html carries ?v=<first 8 hex of the file's SHA-256>. Replace
// a song's audio and its ?v must change (tests/check_assets.py enforces
// this), so installed copies download the new file instead of keeping the
// old one; the superseded copy is then removed from the cache.
const CACHE = 'orbit-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('orbit-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          // only a real copy of the game becomes the offline copy -- never a
          // 404 or error page from a mistyped or stale link
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./', copy));
          }
          return res;
        })
        .catch(() => caches.match('./'))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      // songs are big and never change under the same versioned URL: once
      // cached, don't download them again in the background
      const song = /\.mp3(\?|$)/.test(req.url);
      if (hit && song) return hit;
      const net = fetch(req)
        .then((res) => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => {
              c.put(req, copy);
              // a new version of a song: drop the copies it replaces
              if (song) {
                const path = req.url.split('?')[0];
                c.keys().then((keys) => keys.forEach((k) => {
                  if (k.url !== req.url && k.url.split('?')[0] === path) c.delete(k);
                }));
              }
            });
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
