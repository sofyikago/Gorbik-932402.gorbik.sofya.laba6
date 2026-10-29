const CACHE_NAME = "portfolio-v1";

const FILES = [
    "/",
    "/about",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/image/photo.jpg",
    "/image/portfolio-1.jpg",
    "/image/portfolio-2.jpg",
    "/image/calc-1.jpg",
    "/image/calc-2.jpg",
    "/image/bot-1.jpg",
    "/image/bot-2.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cached) {
            return cached || fetch(event.request);
        })
    );
});
