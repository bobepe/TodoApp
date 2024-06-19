var cacheName = 'hello-pwa';
var filesToCache = [
  './',
  './index.html',
  './src/style.css',
  './src/index.js'
];

/* Spusteni service workera a kesovani veskereho obsahu */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Zobrazeni kesovaneho obsahu v offline modu */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});