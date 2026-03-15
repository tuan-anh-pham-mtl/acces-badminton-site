import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Load includes script content
const includesScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/includes.js'), 
  'utf8'
);

describe('Client-side Includes', () => {
  let mockFetch;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock fetch
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    
    // Execute includes script
    const script = document.createElement('script');
    script.textContent = includesScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete global.fetch;
    delete window.__acces_includes_loaded;
  });

  describe('Include Loading', () => {
    it('should load includes when data-include attribute is present', async () => {
      // Create include element
      const includeEl = createDOMElement('div', { 
        'data-include': 'test-include.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      // Mock successful fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<p>Included content</p>')
      });
      
      // Wait for async operations
      await waitFor(100);
      
      expect(mockFetch).toHaveBeenCalledWith('test-include.html');
      expect(includeEl.innerHTML).toBe('<p>Included content</p>');
    });

    it('should handle fetch errors gracefully', async () => {
      const includeEl = createDOMElement('div', { 
        'data-include': 'missing.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      // Mock failed fetch
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      
      await waitFor(100);
      
      expect(includeEl.textContent).toBe('Loading...'); // Should remain unchanged
    });

    it('should skip non-OK responses', async () => {
      const includeEl = createDOMElement('div', { 
        'data-include': '404.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      // Mock 404 response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      await waitFor(100);
      
      expect(includeEl.textContent).toBe('Loading...'); // Should remain unchanged
    });

    it('should handle multiple includes', async () => {
      const include1 = createDOMElement('div', { 
        'data-include': 'header.html',
        textContent: 'Loading header...'
      });
      const include2 = createDOMElement('div', { 
        'data-include': 'footer.html',
        textContent: 'Loading footer...'
      });
      
      document.body.appendChild(include1);
      document.body.appendChild(include2);
      
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve('<header>Header</header>')
        })
        .mockResolvedValueOnce({
          ok: true,
          text: () => Promise.resolve('<footer>Footer</footer>')
        });
      
      await waitFor(100);
      
      expect(include1.innerHTML).toBe('<header>Header</header>');
      expect(include2.innerHTML).toBe('<footer>Footer</footer>');
    });
  });

  describe('Header Script Loading', () => {
    it('should load header script after includes', async () => {
      const includeEl = createDOMElement('div', { 
        'data-include': 'test.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<p>Content</p>')
      });
      
      await waitFor(100);
      
      // Check if script tag was added
      const headerScript = document.querySelector('script[src="assets/js/header.js"]');
      expect(headerScript).toBeTruthy();
      expect(headerScript.defer).toBe(true);
      expect(window.__acces_includes_loaded).toBe(true);
    });

    it('should not load header script twice', async () => {
      // Set flag as already loaded
      window.__acces_includes_loaded = true;
      
      const includeEl = createDOMElement('div', { 
        'data-include': 'test.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<p>Content</p>')
      });
      
      await waitFor(100);
      
      // Should not add another script
      const headerScripts = document.querySelectorAll('script[src="assets/js/header.js"]');
      expect(headerScripts).toHaveLength(0);
    });
  });

  describe('Event Dispatching', () => {
    it('should dispatch includesLoaded event', async () => {
      const eventSpy = jest.fn();
      document.addEventListener('includesLoaded', eventSpy);
      
      const includeEl = createDOMElement('div', { 
        'data-include': 'test.html',
        textContent: 'Loading...'
      });
      document.body.appendChild(includeEl);
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<p>Content</p>')
      });
      
      await waitFor(100);
      
      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('No Includes Handling', () => {
    it('should exit early when no includes found', async () => {
      // Add non-include elements
      const regularDiv = createDOMElement('div', { textContent: 'Regular content' });
      document.body.appendChild(regularDiv);
      
      await waitFor(100);
      
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });
});
