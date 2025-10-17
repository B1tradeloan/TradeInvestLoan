self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("b1trade-cache").then(cache => {
      return cache.addAll([
        "/TradeInvestLoan/",
        "/TradeInvestLoan/index.html",
        "/TradeInvestLoan/css/styles.css",
        "/TradeInvestLoan/js/app.js"
      ]);
    })
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
