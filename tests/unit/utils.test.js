import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Load the utils script content
const utilsScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/utils.js'), 
  'utf8'
);

describe('Utility Functions', () => {
  let mockConsole;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock console for testing
    mockConsole = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    };
    global.console = mockConsole;
    
    // Execute the utils script
    const script = document.createElement('script');
    script.textContent = utilsScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
  });

  describe('sanitizeHTML', () => {
    it('should escape HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = window.AccesUtils.sanitizeHTML(input);
      
      expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    });

    it('should handle empty strings', () => {
      const result = window.AccesUtils.sanitizeHTML('');
      expect(result).toBe('');
    });

    it('should handle null/undefined', () => {
      expect(window.AccesUtils.sanitizeHTML(null)).toBe('');
      expect(window.AccesUtils.sanitizeHTML(undefined)).toBe('');
    });

    it('should preserve normal text', () => {
      const input = 'Normal text with punctuation!';
      const result = window.AccesUtils.sanitizeHTML(input);
      
      expect(result).toBe(input);
    });
  });

  describe('safeHTML', () => {
    it('should allow specified tags', () => {
      const input = 'Text with <strong>bold</strong> and <em>italic</em>';
      const result = window.AccesUtils.safeHTML(input, ['strong', 'em']);
      
      expect(result).toBe(input);
    });

    it('should remove disallowed tags', () => {
      const input = 'Text with <script>alert("xss")</script> and <strong>bold</strong>';
      const result = window.AccesUtils.safeHTML(input, ['strong']);
      
      expect(result).toBe('Text with  and <strong>bold</strong>');
    });

    it('should remove dangerous attributes', () => {
      const input = '<div onclick="alert(\'xss\')" class="safe">Content</div>';
      const result = window.AccesUtils.safeHTML(input, ['div']);
      
      expect(result).toBe('<div class="safe">Content</div>');
    });

    it('should remove javascript: URLs', () => {
      const input = '<a href="javascript:alert(\'xss\')">Link</a>';
      const result = window.AccesUtils.safeHTML(input, ['a']);
      
      expect(result).toBe('<a href="">Link</a>');
    });

    it('should handle empty strings', () => {
      expect(window.AccesUtils.safeHTML('')).toBe('');
    });

    it('should use default allowed tags', () => {
      const input = 'Text with <strong>bold</strong> and <em>italic</em>';
      const result = window.AccesUtils.safeHTML(input);
      
      expect(result).toBe(input);
    });
  });

  describe('setLoading', () => {
    it('should set loading state on element', () => {
      const element = createDOMElement('div');
      
      window.AccesUtils.setLoading(element, true);
      
      expect(element.style.opacity).toBe('0.6');
      expect(element.style.pointerEvents).toBe('none');
      expect(element.getAttribute('data-loading')).toBe('true');
    });

    it('should remove loading state from element', () => {
      const element = createDOMElement('div');
      
      // Set loading first
      window.AccesUtils.setLoading(element, true);
      
      // Remove loading
      window.AccesUtils.setLoading(element, false);
      
      expect(element.style.opacity).toBe('');
      expect(element.style.pointerEvents).toBe('');
      expect(element.getAttribute('data-loading')).toBeNull();
    });

    it('should handle null element', () => {
      expect(() => {
        window.AccesUtils.setLoading(null, true);
      }).not.toThrow();
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = window.AccesUtils.debounce(mockFn, 100);
      
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = window.AccesUtils.debounce(mockFn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should limit function execution frequency', () => {
      const mockFn = jest.fn();
      const throttledFn = window.AccesUtils.throttle(mockFn, 100);
      
      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      jest.advanceTimersByTime(100);
      throttledFn();
      
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('isInViewport', () => {
    beforeEach(() => {
      // Mock getBoundingClientRect
      Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
        value: jest.fn(() => ({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200,
          width: 100,
          height: 100
        })),
        writable: true
      });
      
      // Mock window dimensions
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
    });

    it('should return true when element is in viewport', () => {
      const element = createDOMElement('div');
      
      expect(window.AccesUtils.isInViewport(element)).toBe(true);
    });

    it('should return false when element is outside viewport', () => {
      const element = createDOMElement('div');
      element.getBoundingClientRect.mockReturnValue({
        top: -100,
        left: 100,
        bottom: 0,
        right: 200
      });
      
      expect(window.AccesUtils.isInViewport(element)).toBe(false);
    });
  });

  describe('scrollToElement', () => {
    beforeEach(() => {
      // Mock window.scrollTo
      window.scrollTo = jest.fn();
      
      // Mock getBoundingClientRect
      Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
        value: jest.fn(() => ({
          top: 100,
          left: 0
        })),
        writable: true
      });
      
      // Mock pageYOffset
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    });

    it('should scroll to element', () => {
      const element = createDOMElement('div');
      
      window.AccesUtils.scrollToElement(element);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: 'smooth'
      });
    });

    it('should apply offset', () => {
      const element = createDOMElement('div');
      
      window.AccesUtils.scrollToElement(element, 50);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 50,
        behavior: 'smooth'
      });
    });

    it('should handle null element', () => {
      expect(() => {
        window.AccesUtils.scrollToElement(null);
      }).not.toThrow();
      
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('formatDate', () => {
    it('should format date with default options', () => {
      const date = new Date('2024-03-14');
      const result = window.AccesUtils.formatDate(date);
      
      expect(result).toMatch(/2024/);
      expect(result).toMatch(/mars/);
    });

    it('should format date with custom options', () => {
      const date = new Date('2024-03-14');
      const result = window.AccesUtils.formatDate(date, { 
        year: '2-digit',
        month: 'short' 
      });
      
      expect(result).toMatch(/24/);
    });
  });

  describe('handleError', () => {
    beforeEach(() => {
      // Mock setTimeout
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should display error message', () => {
      const error = new Error('Test error');
      
      window.AccesUtils.handleError(error, 'TestContext');
      
      expect(mockConsole.error).toHaveBeenCalledWith(
        '[TestContext] Error:',
        error
      );
      
      const errorElement = document.querySelector('.error-message');
      expect(errorElement).toBeTruthy();
      expect(errorElement.textContent).toBe('Une erreur est survenue. Veuillez réessayer.');
    });

    it('should auto-remove error message after 5 seconds', () => {
      window.AccesUtils.handleError(new Error('Test'));
      
      const errorElement = document.querySelector('.error-message');
      expect(errorElement).toBeTruthy();
      
      jest.advanceTimersByTime(5000);
      
      expect(document.querySelector('.error-message')).toBeNull();
    });
  });
});
