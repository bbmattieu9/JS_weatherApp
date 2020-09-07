const cacheName = 'v2';

// Call install event
self.addEventListener('install', e => {
    console.log('[Service Worker Installed]');

  
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('[Service Worker Activated!]');
    // Lets clean up the old cache(s)
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) { 
                        console.log('[Service worker: Clearing old cache]');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )

});


// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('[Service worker: Fetching Cache');
    e.respondWith(fetch(e.request)
    .then(response => {
        // make clone of response we get from the server
        const responseClone = response.clone();
        // Open the cache
        caches.open(cacheName)
        .then(cache => {
            // Add response to the cache
            cache.put(e.request, responseClone);
        });
        return response;
    }).catch(err => caches.match(e.request).then(res => res))
    )
})