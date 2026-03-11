self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('Clearing cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    if (client.url && 'navigate' in client) {
                        client.navigate(client.url);
                    }
                });
            });
        }).then(() => {
            if (self.registration) {
                return self.registration.unregister();
            }
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Pass through everything
});

// Push notifications
self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2'
            }
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});
