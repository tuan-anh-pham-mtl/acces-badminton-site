const { describe, it, expect, beforeEach, jest } = require('@jest/globals');
const { formatDate, isInViewport, scrollToElement, createMockElement, mockFetch } = require('../helpers/test-utils.js');

describe('Test Utilities', () => {
  describe('formatDate', () => {
    it('should format date with default options', () => {
      const date = new Date('2024-03-14');
      const result = formatDate(date);
      
      expect(result).toMatch(/2024/);
      expect(result).toMatch(/mars/);
    });

    it('should format date with custom options', () => {
      const date = new Date('2024-03-14');
      const result = formatDate(date, { 
        year: '2-digit',
        month: 'short' 
      });
      
      expect(result).toMatch(/24/);
    });

    it('should handle invalid dates gracefully', () => {
      expect(() => {
        formatDate(new Date('invalid'));
      }).not.toThrow();
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
      const element = createMockElement('div');
      
      expect(isInViewport(element)).toBe(true);
    });

    it('should return false when element is outside viewport', () => {
      const element = createMockElement('div');
      element.getBoundingClientRect.mockReturnValue({
        top: -100,
        left: 100,
        bottom: 0,
        right: 200
      });
      
      expect(isInViewport(element)).toBe(false);
    });

    it('should handle null element', () => {
      expect(() => {
        isInViewport(null);
      }).not.toThrow();
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
      const element = createMockElement('div');
      
      scrollToElement(element);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 100,
        behavior: 'smooth'
      });
    });

    it('should apply offset', () => {
      const element = createMockElement('div');
      
      scrollToElement(element, 50);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 50,
        behavior: 'smooth'
      });
    });

    it('should handle null element', () => {
      expect(() => {
        scrollToElement(null);
      }).not.toThrow();
      
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('createMockElement', () => {
    it('should create element with tag name', () => {
      const element = createMockElement('div');
      
      expect(element.tagName).toBe('DIV');
    });

    it('should set attributes', () => {
      const element = createMockElement('div', { 
        id: 'test', 
        class: 'mock-class' 
      });
      
      expect(element.id).toBe('test');
      expect(element.className).toBe('mock-class');
    });

    it('should set inner HTML', () => {
      const element = createMockElement('div', {}, '<span>Test</span>');
      
      expect(element.innerHTML).toBe('<span>Test</span>');
    });
  });

  describe('mockFetch', () => {
    it('should return mock response with data', async () => {
      const testData = { id: 1, name: 'test' };
      const response = await mockFetch(testData);
      
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(testData);
    });

    it('should accept custom options', async () => {
      const testData = { error: 'Not found' };
      const response = await mockFetch(testData, { 
        status: 404, 
        statusText: 'Not Found' 
      });
      
      expect(response.status).toBe(404);
      expect(response.statusText).toBe('Not Found');
      expect(response.ok).toBe(false);
    });

    it('should return text response', async () => {
      const testData = { message: 'test' };
      const response = await mockFetch(testData);
      
      expect(await response.text()).toBe(JSON.stringify(testData));
    });
  });
});
