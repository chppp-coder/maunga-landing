// Animaciones de entrada al hacer scroll (fade-in + translateY), una sola vez por elemento.
// Respeta prefers-reduced-motion: si está activo, los elementos se muestran directamente sin animar.
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Una vez terminada la animación de entrada, se quitan las clases para devolver
  // el elemento a su estado normal: así el hover propio de la tarjeta (sombra,
  // -translate-y-1, etc.) vuelve a controlar opacity/transform sin interferencia.
  function settle(el) {
    el.classList.remove('reveal', 'is-visible');
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      settle(el);
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('is-visible');
          el.addEventListener('animationend', function onAnimationEnd() {
            el.removeEventListener('animationend', onAnimationEnd);
            settle(el);
          });
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
