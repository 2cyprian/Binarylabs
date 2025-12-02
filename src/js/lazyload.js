// Enhanced Lazy-load and reveal animations using IntersectionObserver
(function () {
  const SELECTORS = [
    '.hero',
    '.about-us',
    '.services',
    '.service-card',
    '.success-card',
    '.testimonial',
    '.lined-heading',
    '.about-container',
    '.about-image',
    '.services-container',
    'img'
  ];

  function setImageLazy(img){
    if (!img) return;
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    // Add blur effect to images during lazy load
    if (!img.classList.contains('lazy-img')) img.classList.add('lazy-img');
    // support deferred src via data-src for blur-up technique
    if (img.dataset && img.dataset.src) {
      // leave src alone until in view
    } else {
      // if already has src, consider it loaded
      img.classList.add('loaded');
    }
    // Add data attributes for image optimization if not present
    if (!img.hasAttribute('data-loaded')) {
      img.setAttribute('decoding', 'async');
    }
  }

  function init() {
    // set loading=lazy on all images
    document.querySelectorAll('img').forEach(setImageLazy);

    // collect elements to reveal
    const elems = Array.from(new Set(document.querySelectorAll(SELECTORS.join(','))));
    elems.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // reveal everything immediately for reduced-motion users
      elems.forEach(el => el.classList.add('in-view'));
      document.querySelectorAll('img.lazy-img').forEach(img => img.classList.add('loaded'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in-view');

        // handle images specially with optimized loading
        if (el.tagName === 'IMG') {
          const img = el;
          if (img.dataset && img.dataset.src) {
            // Use requestIdleCallback for better performance if available
            const loadImg = () => {
              img.src = img.dataset.src;
              img.addEventListener('load', () => {
                img.classList.add('loaded');
                img.removeAttribute('data-src');
              }, { once: true });
              img.addEventListener('error', () => {
                img.classList.add('loaded');
              }, { once: true });
            };
            
            if ('requestIdleCallback' in window) {
              requestIdleCallback(loadImg, { timeout: 2000 });
            } else {
              loadImg();
            }
          } else {
            img.classList.add('loaded');
          }
        }

        obs.unobserve(el);
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.06
    });

    elems.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
