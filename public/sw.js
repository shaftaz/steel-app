/* SteelMath service worker — offline plant-floor use.
   Cache-first for static assets & fonts, network-first with cache
   fallback for pages (so calculators keep working offline). */
const CACHE = "steelmath-v1";
const PRECACHE = ["/", "/calculator", "/calculators", "/cbam", "/cbam/calculator"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Static assets & fonts: cache-first
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".svg")
  ) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
            return res;
          })
      )
    );
    return;
  }

  // Documents: network-first, cache fallback
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/calculator")))
    );
  }
});
