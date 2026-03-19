const { describe, it, expect, beforeEach, afterEach, jest } = require('@jest/globals');
const fs = require('fs');
const path = require('path');

// Load header script content
const headerScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/header.js'), 
  'utf8'
);

describe('Header Functionality', () => {
  let header, hamburger, mobileMenu, scrollTop;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Create header elements
    header = createDOMElement('header', { id: 'header' });
    hamburger = createDOMElement('button', { id: 'hamburger' });
    mobileMenu = createDOMElement('nav', { id: 'mobileMenu' });
    scrollTop = createDOMElement('button', { id: 'scrollTop' });
    
    document.body.appendChild(header);
    document.body.appendChild(hamburger);
    document.body.appendChild(mobileMenu);
    document.body.appendChild(scrollTop);
    
    // Mock AccesUtils.throttle
    window.AccesUtils = {
      throttle: jest.fn((fn) => fn)
    };
    
    // Execute header script
    const script = document.createElement('script');
    script.textContent = headerScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.AccesUtils;
    delete window.closeMobile;
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu when hamburger is clicked', () => {
      hamburger.click();
      
      expect(hamburger).toHaveClass('active');
      expect(mobileMenu).toHaveClass('active');
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close mobile menu when clicking twice', () => {
      hamburger.click(); // Open
      hamburger.click(); // Close
      
      expect(hamburger).not.toHaveClass('active');
      expect(mobileMenu).not.toHaveClass('active');
      expect(document.body.style.overflow).toBe('');
    });

    it('should close mobile menu on ESC key', () => {
      hamburger.click(); // Open menu
      
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      
      expect(hamburger).not.toHaveClass('active');
      expect(mobileMenu).not.toHaveClass('active');
    });

    it('should close mobile menu when clicking on links', () => {
      hamburger.click(); // Open menu
      
      const link = createDOMElement('a', { href: '#test', textContent: 'Test Link' });
      mobileMenu.appendChild(link);
      
      link.click();
      
      expect(hamburger).not.toHaveClass('active');
      expect(mobileMenu).not.toHaveClass('active');
    });
  });

  describe('Scroll to Top', () => {
    beforeEach(() => {
      // Mock window.scrollTo
      window.scrollTo = jest.fn();
    });

    it('should scroll to top when scroll-top button is clicked', () => {
      scrollTop.click();
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  describe('Scroll Effects', () => {
    beforeEach(() => {
      // Mock pageYOffset
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    });

    it('should add scrolled class when scrolling past threshold', () => {
      window.pageYOffset = 50;
      window.scrollY = 50;
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(header).toHaveClass('scrolled');
    });

    it('should show scroll-top button when scrolling past threshold', () => {
      window.pageYOffset = 500;
      window.scrollY = 500;
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(scrollTop).toHaveClass('visible');
    });

    it('should use throttled scroll handler', () => {
      window.dispatchEvent(new Event('scroll'));
      
      expect(window.AccesUtils.throttle).toHaveBeenCalled();
    });
  });

  describe('Global Function', () => {
    it('should expose closeMobile function globally', () => {
      expect(typeof window.closeMobile).toBe('function');
    });

    it('should close mobile menu via global function', () => {
      hamburger.click(); // Open menu
      
      window.closeMobile();
      
      expect(hamburger).not.toHaveClass('active');
      expect(mobileMenu).not.toHaveClass('active');
    });
  });
});
