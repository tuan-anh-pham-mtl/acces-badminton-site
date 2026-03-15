// Utility functions for Accès Badminton website
// Security, DOM manipulation, and common helpers

(function() {
  'use strict';

  // XSS protection - sanitize HTML content
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Safe HTML rendering using DOMPurify
  function safeHTML(str, allowedTags = ['strong', 'br', 'a', 'span']) {
    if (!str) return '';
    
    // DOMPurify configuration
    const config = {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: ['href', 'target', 'rel', 'data-site-session'],
      ALLOW_DATA_ATTR: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false
    };
    
    return DOMPurify.sanitize(str, config);
  }

  // Error handling utility
  function handleError(error, context = 'Unknown') {
    console.error(`[${context}] Error:`, error);
    
    // Show user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.cssText = `
      background-color: #fee;
      border: 1px solid #f88;
      color: #c00;
      padding: 1rem;
      margin: 1rem;
      border-radius: 4px;
      text-align: center;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
    
    document.body.appendChild(errorMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorMessage.parentNode) {
        errorMessage.parentNode.removeChild(errorMessage);
      }
    }, 5000);
  }

  // Loading state management
  function setLoading(element, loading = true) {
    if (!element) return;
    
    if (loading) {
      element.setAttribute('data-loading', 'true');
      element.style.opacity = '0.6';
      element.style.pointerEvents = 'none';
    } else {
      element.removeAttribute('data-loading');
      element.style.opacity = '';
      element.style.pointerEvents = '';
    }
  }

  // Debounce utility for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle utility for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Smooth scroll to element
  function scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Format date
  function formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('fr-CA', { ...defaultOptions, ...options }).format(date);
  }

  // Expose utilities to global scope
  window.AccesUtils = {
    sanitizeHTML,
    safeHTML,
    handleError,
    setLoading,
    debounce,
    throttle,
    isInViewport,
    scrollToElement,
    formatDate
  };

})();
