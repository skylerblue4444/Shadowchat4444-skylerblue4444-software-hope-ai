// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
const CACHE_NAME = 'shadowchat-enterprise-v21';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/static/css/style.css',
                '/static/js/app.js',
                '/templates/index.html',
                '/templates/wallet.html',
                '/templates/live.html',
                '/templates/casino.html',
                '/templates/staking.html',
                '/templates/exchange.html',
                '/templates/governance.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});