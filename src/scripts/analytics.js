// Delega clics en cualquier [data-track] hacia window.trackEvent (definido en Layout.astro).
// No carga ningún script de terceros: solo deja el evento listo en window.dataLayer.
document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-track]');
  if (!target) return;
  window.trackEvent?.(target.dataset.track, { href: target.getAttribute('href') || undefined });
});
