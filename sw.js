// This is the service worker with the Cache-first network

importScripts('cache_version.js');

const CACHE = "covid19cubadata-precache:" + cache_version;


const precacheFiles = [
    'manifest.json',
    'index.html',
    'css/fontawesome-5.8.2/css/all.css',
    'css/fontawesome-5.8.2/webfonts/fa-solid-900.woff2',
    'css/bootstrap.min.css',
    'css/c3.css',
    'css/custom.css',
    'css/leaflet.css',
    'data/covid19-cuba.json',
    'data/municipios.geojson',
    'data/paises-info-dias.json',
    'data/provincias.geojson',
    'images/apk-apklis.png',
    'images/apk-github.png',
    'images/bot-telegram.png',
    'images/icons/icon-128x128.png',
    'images/icons/icon-144x144.png',
    'images/icons/icon-152x152.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-384x384.png',
    'images/icons/icon-512x512.png',
    'images/icons/icon-72x72.png',
    'images/icons/icon-96x96.png',
    'images/logo-cusobu.png',
    'images/logo-fr.png',
    'images/logo-jt.jpeg',
    'images/logo-matcom.png',
    'images/logo-pd.png',
    'images/logo-swlx.png',
    'images/logo.jpg',
    'js/bootstrap.min.js',
    'js/c3.js',
    'js/custom.js',
    'js/d3.min.js',
    'js/jquery.min.js',
    'js/leaflet.js',
    'favico.jpeg',
];

// This is the service worker with the Cache-first network

self.addEventListener("install", function (event) {
    console.log("[PWA Builder] Install Event processing");

    console.log("[PWA Builder] Skip waiting on install");
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("[PWA Builder] Caching pages during install");
            return cache.addAll(precacheFiles).then(() => {
                // Send message to client on update
                const channel = new BroadcastChannel('sw-update-messages');
                channel.postMessage({updated: true});
            });
        })
    );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
    console.log("[PWA Builder] Claiming clients for current page");
    // event.waitUntil(self.clients.claim());
    event.waitUntil(
        clearCaches().then(() => {
            return self.clients.claim();
        })
    );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fromCache(event.request).then(
            function (response) {
                // The response was found in the cache so we respond with it and update the entry
                return response;
            },
            function () {
                // The response was not found in the cache so we look for it on the server
                return fetch(event.request)
                    .then(function (response) {
                        // If request was success, add or update it in the cache
                        event.waitUntil(updateCache(event.request, response.clone()));

                        return response;
                    })
                    .catch(function (error) {
                        console.log("[PWA Builder] Network request failed and no cache." + error);
                    });
            }
        )
    );
});

function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }

            return matching;
        });
    });
}

function updateCache(request, response) {
    return caches.open(CACHE).then(function (cache) {
        return cache.put(request, response);
    });
}

function clearCaches() {
    return caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (key) {
            return key.indexOf(CACHE) !== 0;
        }).map(function (key) {
            return caches.delete(key);
        }));
    });
}
