// Header behavior: mobile menu toggle, header scroll class, scroll-top handling
(function(){
  function initHeader() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const scrollTop = document.getElementById('scrollTop');

    // Use requestAnimationFrame for perfectly synced mobile scrolling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset;
          if (header) header.classList.toggle('scrolled', y > 20);
          if (scrollTop) scrollTop.classList.toggle('visible', y > 400);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Scroll to top
    if (scrollTop) {
      scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Helper function to close mobile menu
    function closeMobileMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburger) hamburger.focus();
    }

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
      const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = !hamburger.classList.contains('active');
        
        if (isActive) {
          hamburger.classList.add('active');
          mobileMenu.classList.add('active');
          if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        if (isActive && mobileMenuClose) {
          setTimeout(() => mobileMenuClose.focus(), 100);
        }
      };
      
      // A single click listener is all you need. 
      // The CSS 'touch-action: manipulation' already ensures it fires instantly on mobile.
      hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(e);
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
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close menu on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      }, 150);
    });
  }

  // Initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
