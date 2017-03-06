// mise en cache du site pour le voir en offline
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwafl').then(cache => {
      return cache.addAll([
        '/',
        '/service-worker.js',
        '/index.html',
        '/styles/main.css',
        '/images/touch/apple-touch-icon.png',
        '/images/touch/chrome-touch-icon-192x192.png',
        '/images/touch/icon-128x128.png',
        '/images/touch/ms-touch-icon-144x144-precomposed.png',
        '/manifest.json',
        '/favicon.ico',
        '/images/photo_ludivine.jpg',
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});