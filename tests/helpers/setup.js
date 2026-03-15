// Jest setup file
import '@jest/globals';

// Mock DOM APIs that Jest doesn't provide
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: {
    hash: '',
    pathname: '/',
    search: '',
    href: 'http://localhost:8000',
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };

beforeEach(() => {
  jest.clearAllMocks();
  
  // Restore console methods for each test
  Object.assign(console, originalConsole);
});

// Helper function to create DOM elements for testing
global.createDOMElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'textContent') {
      element.textContent = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
};

// Helper to wait for async operations
global.waitFor = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
