const { describe, it, expect, beforeEach, afterEach, jest } = require('@jest/globals');
const fs = require('fs');
const path = require('path');

// Load animations script content
const animationsScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/animations.js'), 
  'utf8'
);

describe('Scroll Animations', () => {
  let mockObserver;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock IntersectionObserver
    mockObserver = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    };
    
    global.IntersectionObserver = jest.fn((callback) => {
      mockObserver.callback = callback;
      return mockObserver;
    });
    
    // Execute animations script
    const script = document.createElement('script');
    script.textContent = animationsScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete global.IntersectionObserver;
  });

  describe('Observer Setup', () => {
    it('should create IntersectionObserver with correct options', () => {
      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
    });

    it('should expose global re-init function', () => {
      expect(typeof window.__acces_observer_init).toBe('function');
    });
  });

  describe('Element Observation', () => {
    it('should observe target elements', () => {
      // Create test elements
      const programCard = createDOMElement('div', { className: 'program-card' });
      const locationCard = createDOMElement('div', { className: 'location-card' });
      const faqItem = createDOMElement('div', { className: 'faq-item' });
      
      document.body.appendChild(programCard);
      document.body.appendChild(locationCard);
      document.body.appendChild(faqItem);
      
      // Re-initialize to observe new elements
      window.__acces_observer_init();
      
      expect(mockObserver.observe).toHaveBeenCalledTimes(3);
      expect(mockObserver.observe).toHaveBeenCalledWith(programCard);
      expect(mockObserver.observe).toHaveBeenCalledWith(locationCard);
      expect(mockObserver.observe).toHaveBeenCalledWith(faqItem);
    });

    it('should skip already animated elements', () => {
      const element = createDOMElement('div', { className: 'program-card' });
      element.style.opacity = '1'; // Already animated
      document.body.appendChild(element);
      
      window.__acces_observer_init();
      
      expect(mockObserver.observe).not.toHaveBeenCalledWith(element);
    });

    it('should set initial styles before observing', () => {
      const element = createDOMElement('div', { className: 'program-card' });
      document.body.appendChild(element);
      
      window.__acces_observer_init();
      
      expect(element.style.opacity).toBe('0');
      expect(element.style.transform).toBe('translateY(20px)');
      expect(element.style.transition).toBe('opacity 0.6s ease, transform 0.6s ease');
    });
  });

  describe('Animation Trigger', () => {
    it('should animate elements when they intersect', () => {
      const element = createDOMElement('div', { className: 'program-card' });
      document.body.appendChild(element);
      
      window.__acces_observer_init();
      
      // Simulate intersection
      mockObserver.callback([{
        target: element,
        isIntersecting: true
      }]);
      
      expect(element.style.opacity).toBe('1');
      expect(element.style.transform).toBe('translateY(0)');
      expect(mockObserver.unobserve).toHaveBeenCalledWith(element);
    });

    it('should not animate elements that are not intersecting', () => {
      const element = createDOMElement('div', { className: 'program-card' });
      document.body.appendChild(element);
      
      window.__acces_observer_init();
      
      // Simulate non-intersecting
      mockObserver.callback([{
        target: element,
        isIntersecting: false
      }]);
      
      expect(element.style.opacity).toBe('0'); // Still hidden
      expect(mockObserver.unobserve).not.toHaveBeenCalled();
    });
  });
});
