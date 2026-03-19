// Header behavior: mobile menu toggle, header scroll class, scroll-top handling
(function(){
  function initHeader() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const scrollTop = document.getElementById('scrollTop');

    // Scroll effect - use throttled listener for better performance
    const handleScroll = AccesUtils.throttle(() => {
      const y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('scrolled', y > 20);
      if (scrollTop) scrollTop.classList.toggle('visible', y > 400);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top
    if (scrollTop) {
      scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Helper function to close mobile menu
    function closeMobileMenu() {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('active');
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      // Return focus to hamburger button for accessibility
      if (hamburger) hamburger.focus();
    }

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active', isActive);
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // When opening menu, focus on close button for accessibility
        if (isActive && mobileMenuClose) {
          setTimeout(() => mobileMenuClose.focus(), 300);
        }
      });

      // Close mobile menu on close button click
      if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
      }

      // Close mobile menu on backdrop click
      if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
      }

      // Close mobile menu on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      });

      // Close mobile menu when clicking on a link
      mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.classList.contains('mobile-nav-link')) {
          closeMobileMenu();
        }
      });
    }

    // Expose closeMobile to global scope for onclick handlers (backward compatibility)
    window.closeMobile = closeMobileMenu;
  }

  // Initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
