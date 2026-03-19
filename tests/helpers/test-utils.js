// Test utilities for Accès Badminton website
// These functions are used only in testing and should not be included in production

/**
 * Format date with French locale and custom options
 * @param {Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('fr-CA', { ...defaultOptions, ...options }).format(date);
}

/**
 * Check if element is visible in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element with offset
 * @param {Element} element - DOM element to scroll to
 * @param {number} offset - Offset from top in pixels
 */
function scrollToElement(element, offset = 0) {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Mock DOM elements for testing
 * @param {string} tagName - Tag name of element
 * @param {Object} attributes - Element attributes
 * @param {string} innerHTML - Inner HTML content
 * @returns {Element} Mock DOM element
 */
function createMockElement(tagName, attributes = {}, innerHTML = '') {
  const element = document.createElement(tagName);
  
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  return element;
}

/**
 * Mock fetch response for testing
 * @param {*} data - Data to return
 * @param {Object} options - Response options
 * @returns {Promise} Mock fetch response
 */
function mockFetch(data, options = {}) {
  const defaultOptions = {
    ok: true,
    status: 200,
    statusText: 'OK'
  };
  
  return Promise.resolve({
    ...defaultOptions,
    ...options,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data))
  });
}

module.exports = {
  formatDate,
  isInViewport,
  scrollToElement,
  createMockElement,
  mockFetch
};
