self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('DeliverMe').then(cache => {
      return cache.addAll([
        '/',
        '/?utm_source=homescreen',
        '/index.html'
      ])
        .then(() => self.skipWaiting())
    })
  )
})
