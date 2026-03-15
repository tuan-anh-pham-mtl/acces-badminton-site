// FAQ Accordion functionality
(function() {
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Open clicked item if it was closed
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });

      // Keyboard support: Space and Enter to toggle
      btn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Update form link to use site config
    const formLinks = document.querySelectorAll('.faq-form-link');
    if (window.__siteConfig && window.__siteConfig.forms && formLinks.length) {
      formLinks.forEach(link => {
        link.href = window.__siteConfig.forms.registration;
      });
    }
  }

  // Initialize after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }

  // Re-initialize when FAQ content is rendered (after dynamic data loads)
  document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for dynamic content to load and re-initialize
    setTimeout(initFAQ, 100);
  });

  // Also listen for a custom event when FAQ is rendered
  document.addEventListener('faqRendered', initFAQ);
})();

