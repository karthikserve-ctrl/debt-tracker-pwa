// Simple service worker for offline caching (cache-first)
const CACHE_NAME = 'debt-tracker-cache-v1';
const ASSETS = ['.','/index.html','/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).then(r=>{ return caches.open(CACHE_NAME).then(c=>{ c.put(event.request, r.clone()); return r; }) })));
});