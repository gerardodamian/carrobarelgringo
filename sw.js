// Service worker mínimo — su única función es cumplir el requisito de
// Chrome/Android para poder "instalar" el sitio como app (ícono propio
// en la pantalla de inicio). No cachea nada de forma agresiva, así que
// el sitio siempre pide la versión más nueva cuando hay conexión.
const CACHE_NAME = 'el-gringo-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
