'use strict';

const CACHE_NAME = 'static-cache-v1';

const FILES_TO_CACHE = [  
  '/',
  '/index.html',  
  '/js/app.js',  
  '/css/style.css',
  '/images/icons/icon-32x32.png'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  self.clients.claim();
});


self.addEventListener('fetch', (event) => {  
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request)
        .then((response) => {
          return response;
        });
    })
  );
});