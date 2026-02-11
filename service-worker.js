 const CACHE_NAME = 'samservice-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/produits.html',
  '/contact.html',
  '/css/style.css',
  '/css/components.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/auth.js',
  '/js/cart.js',
  '/js/products.js',
  '/js/contact.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'images/logo.png'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});