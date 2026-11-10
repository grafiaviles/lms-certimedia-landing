// Reveal-on-scroll discreto para elementos con clase .reveal.
// Respeta prefers-reduced-motion (manejado también en CSS) y degrada con gracia sin JS.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const targets = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window) || targets.length === 0) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
