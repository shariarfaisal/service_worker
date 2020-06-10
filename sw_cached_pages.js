const cacheName = 'v1'

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/app.js'
]


// Call Install Event
self.addEventListener('install',(e) => {
  // console.log('Service Worker: Installed')

  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files!');
      cache.addAll(cacheAssets)
    })
    .then(() => self.skipWaiting())

  )
})


// Call Activate Event
self.addEventListener('activate',(e) => {
  // console.log('Service Worker: Activated')

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache =>{
          if(cache !== cacheName){
            console.log('Service worker: Clearing old cache');
            return caches.delete(cache)
          }
        })
      )
    })
  )
})


// Call Fetch Event

self.addEventListener('fetch',e => {
  console.log('Service worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
