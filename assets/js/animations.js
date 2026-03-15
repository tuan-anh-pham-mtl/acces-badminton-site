// Smooth reveal animations on scroll
(function() {
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToObserve = '.program-card, .location-card, .faq-item, .about-feature, .membership-card';
    
    function observeElements() {
      document.querySelectorAll(elementsToObserve).forEach(el => {
        // Skip if already animated
        if (el.style.opacity === '1') return;
        
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    }

    // Initial observation
    observeElements();

    // Expose re-init hook for dynamic rendering
    window.__acces_observer_init = observeElements;
  }

  // Initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
