import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Load test data
const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../fixtures/testData.json'), 'utf8')
);

// Load the render script content
const renderScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/render.js'), 
  'utf8'
);

describe('Dynamic Content Integration', () => {
  let mockFetch;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock fetch
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    
    // Mock console
    global.console = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    };
    
    // Set up basic HTML structure
    document.body.innerHTML = `
      <div id="faqList"></div>
      <div id="programsGrid"></div>
      <div id="locationsGrid"></div>
      <div id="membershipPrice"></div>
      <div id="membershipPeriod"></div>
      <div id="siteSession"></div>
      <div id="footerEmail"></div>
      <div id="footerAddressStreet"></div>
      <div id="footerAddressCity"></div>
      <div id="footerAddressCountry"></div>
      <div id="documentsList"></div>
      <div id="headerNav"></div>
      <div id="mobileNav"></div>
      <div id="headerSocial"></div>
      <div id="mobileSocial"></div>
      <div id="footerNav"></div>
      <div id="footerSocial"></div>
      <div id="footerBottomLinks"></div>
      <div id="siteLogoImg"></div>
      <div class="header-logo-text"></div>
      <div class="footer-brand"><h3></h3></div>
      <h1 class="section-title">Accès Badminton</h1>
      <div class="footer-bottom"><span></span></div>
    `;
    
    // Execute the render script
    const script = document.createElement('script');
    script.textContent = renderScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  });

  afterEach(() => {
    // Clean up
    delete window.__siteConfig;
    delete window.__includesReady;
  });

  describe('FAQ Rendering Integration', () => {
    it('should render FAQ items from data', async () => {
      // Mock successful fetch responses
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.faqData)
        });

      // Wait for async operations
      await waitFor(100);

      const faqItems = document.querySelectorAll('.faq-item');
      expect(faqItems).toHaveLength(testData.faqData.length);
      
      const firstQuestion = document.querySelector('.faq-question');
      expect(firstQuestion.textContent).toContain(testData.faqData[0].question);
    });

    it('should handle FAQ fetch error gracefully', async () => {
      // Mock failed FAQ fetch
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockRejectedValueOnce(new Error('Network error'));

      await waitFor(100);

      expect(global.console.warn).toHaveBeenCalledWith(
        'FAQ data not available, will use HTML fallback:',
        expect.any(Error)
      );
    });

    it('should dispatch faqRendered event after rendering', async () => {
      const eventSpy = jest.fn();
      document.addEventListener('faqRendered', eventSpy);

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.faqData)
        });

      await waitFor(100);

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('Site Configuration Integration', () => {
    it('should update site name across multiple elements', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      // Check various elements were updated
      expect(document.title).toContain(testData.siteConfig.siteName);
      expect(document.querySelector('.header-logo-text').textContent).toBe(testData.siteConfig.siteName);
      expect(document.querySelector('.footer-brand h3').textContent).toBe(testData.siteConfig.siteName);
    });

    it('should update session placeholders', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      const sessionElements = document.querySelectorAll('[data-site-session]');
      sessionElements.forEach(element => {
        expect(element.textContent).toBe(testData.siteConfig.session);
      });
    });

    it('should store site config globally', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      expect(window.__siteConfig).toEqual(testData.siteConfig);
    });
  });

  describe('Navigation Integration', () => {
    it('should render navigation links', async () => {
      const siteWithNav = {
        ...testData.siteConfig,
        navigation: [
          { label: 'Home', anchor: '#home' },
          { label: 'About', anchor: '#about' }
        ]
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(siteWithNav)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      const headerNavLinks = document.querySelectorAll('#headerNav a');
      expect(headerNavLinks).toHaveLength(2);
      expect(headerNavLinks[0].textContent).toBe('Home');
      expect(headerNavLinks[0].href).toContain('#home');
    });

    it('should render social links', async () => {
      const siteWithSocial = {
        ...testData.siteConfig,
        social: [
          { name: 'facebook', url: 'https://facebook.com/test', label: 'Facebook' },
          { name: 'instagram', url: 'https://instagram.com/test', label: 'Instagram' }
        ]
      };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(siteWithSocial)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      const socialLinks = document.querySelectorAll('#headerSocial a');
      expect(socialLinks).toHaveLength(2);
      expect(socialLinks[0].href).toBe('https://facebook.com/test');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await waitFor(100);

      expect(global.console.error).toHaveBeenCalledWith(
        'Error initializing dynamic content:',
        expect.any(Error)
      );
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404
      });

      await waitFor(100);

      expect(global.console.error).toHaveBeenCalled();
    });
  });

  describe('Form Links Integration', () => {
    it('should replace hardcoded form URLs', async () => {
      // Add hardcoded form link to DOM
      const formLink = createDOMElement('a', { 
        href: 'https://forms.gle/old-url',
        textContent: 'Register'
      });
      document.body.appendChild(formLink);

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(testData.siteConfig)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({})
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        });

      await waitFor(100);

      expect(formLink.href).toBe(testData.siteConfig.forms.registration);
    });
  });
});
