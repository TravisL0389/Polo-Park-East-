const CACHE_NAME = 'ppe-platform-v1';
const APP_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/ppe-logo.png',
  '/images/ppe-sign-hero.jpeg',
  '/images/ppe-lake-sunrise.jpg',
  '/images/ppe-neighborhood.jpg',
  '/images/ppe-pool.jpg',
  '/images/ppe-clubhouse.jpg',
  '/images/ppe-course-lake.jpg',
  '/images/golf-hero.jpg',
  '/images/golf-sign.jpg',
  '/images/golf-tile-1.png',
  '/images/golf-tile-2.png',
  '/images/golf-tile-3.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('/index.html'));
    }),
  );
});
