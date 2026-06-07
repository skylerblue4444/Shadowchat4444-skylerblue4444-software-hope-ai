// SKY444 Service Worker — v3.0
// Network-first strategy for API, cache-first for static assets

const CACHE = 'sky444-v3';
const CORE_ASSETS = ['/', '/manifest.webmanifest', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache API calls or WebSocket upgrades
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/ws/')) {
    return; // let the network handle it
  }

  // Cache-first for static assets, fallback to network
  event.respondWith(
    caches.match(request).then((cached) =>
      cached ||
      fetch(request)
        .then((res) => {
          if (res && res.status === 200 && request.method === 'GET') {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match('/'))
    )
  );
});
