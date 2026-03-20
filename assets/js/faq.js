// FAQ Accordion functionality
(function() {
  let isInitialized = false;
  
  function initFAQ() {
    // 1. First, check if we've already set things up. If yes, stop here.
    if (isInitialized) {
      return;
    }
    
    // 2. Make sure there are actually FAQs on the page before doing work
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length === 0) {
      return;
    }
    
    // 3. Use event delegation to handle clicks
    document.addEventListener('click', function clickHandler(e) {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      
      e.preventDefault();
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const questionBtn = i.querySelector('.faq-question');
        const answerEl = i.querySelector('.faq-answer');
        if (questionBtn) questionBtn.setAttribute('aria-expanded', 'false');
        if (answerEl) answerEl.style.maxHeight = null;
      });

      // Open clicked item if it was closed
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });

    // 4. Keyboard support: Space and Enter to toggle
    document.addEventListener('keydown', function keydownHandler(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        const question = e.target.closest('.faq-question');
        if (!question) return;
        e.preventDefault();
        question.click();
      }
    });

    // 5. Update form link to use site config
    const formLinks = document.querySelectorAll('.faq-form-link');
    if (window.__siteConfig && window.__siteConfig.forms && formLinks.length) {
      formLinks.forEach(link => {
        link.href = window.__siteConfig.forms.registration;
      });
    }
    
    // 6. Recalculate heights on device rotation or resize (SAFELY PLACED HERE)
    window.addEventListener('resize', window.AccesUtils.debounce(() => {
      document.querySelectorAll('.faq-item.active .faq-answer').forEach(answer => {
        // Temporarily remove max-height to get the new natural height
        answer.style.maxHeight = 'none'; 
        const newHeight = answer.scrollHeight;
        answer.style.maxHeight = newHeight + 'px';
      });
    }, 200));
    
    // 7. Lock the initialization so none of the above runs twice
    isInitialized = true;
  }

  // Try multiple initialization strategies
  function tryInit() {
    initFAQ();
  }

  // Initialize when FAQ is rendered (after dynamic data loads)
  document.addEventListener('faqRendered', tryInit);
  
  // Also initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
  
  // Keep trying for a few seconds in case of delays
  let attempts = 0;
  const maxAttempts = 10;
  const retryInterval = setInterval(() => {
    attempts++;
    initFAQ();
    
    if (attempts >= maxAttempts || isInitialized) {
      clearInterval(retryInterval);
    }
  }, 500);
})();