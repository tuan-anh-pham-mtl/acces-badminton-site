// FAQ Accordion functionality
(function() {
  let isInitialized = false;
  
  function initFAQ() {
    if (isInitialized) {
      console.log('FAQ already initialized, skipping');
      return;
    }
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
      console.log('No FAQ questions found, will retry...');
      return;
    }
    
    console.log('Initializing FAQ with', faqQuestions.length, 'questions');
    
    // Use event delegation to handle clicks
    document.addEventListener('click', function clickHandler(e) {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      
      console.log('FAQ question clicked');
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

    // Keyboard support: Space and Enter to toggle
    document.addEventListener('keydown', function keydownHandler(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        const question = e.target.closest('.faq-question');
        if (!question) return;
        e.preventDefault();
        question.click();
      }
    });

    // Update form link to use site config
    const formLinks = document.querySelectorAll('.faq-form-link');
    if (window.__siteConfig && window.__siteConfig.forms && formLinks.length) {
      formLinks.forEach(link => {
        link.href = window.__siteConfig.forms.registration;
      });
    }
    
    isInitialized = true;
    console.log('FAQ initialization completed');
  }

  // Try multiple initialization strategies
  function tryInit() {
    console.log('Attempting FAQ initialization...');
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
    console.log(`FAQ retry attempt ${attempts}/${maxAttempts}`);
    initFAQ();
    
    if (attempts >= maxAttempts || isInitialized) {
      clearInterval(retryInterval);
    }
  }, 500);
})();
