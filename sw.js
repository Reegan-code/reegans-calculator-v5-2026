const CACHE_NAME = 'reegancalc-v52-DARK-8CONV-v999';
const ASSETS = ['./', './index.html?v=52', './manifest.json?v=52', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if(k!==CACHE_NAME) return caches.delete(k);})))) ; self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).then(f => { return caches.open(CACHE_NAME).then(c => { c.put(e.request, f.clone()); return f; }); }).catch(() => caches.match('./index.html')))); });
