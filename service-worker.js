const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/',
    'styles.css',
    'app.js'
];

// Call install event
self.addEventListener('install', e => {
    console.log('[Service Worker Installed]');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('[Service worker is Caching...]');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('[Service Worker Activated!]');
});