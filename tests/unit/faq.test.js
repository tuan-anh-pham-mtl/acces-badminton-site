import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Load test data
const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../fixtures/testData.json'), 'utf8')
);

// Load the FAQ script content
const faqScriptContent = fs.readFileSync(
  path.join(__dirname, '../../assets/js/faq.js'), 
  'utf8'
);

describe('FAQ Functionality', () => {
  let container;
  let mockConsole;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Create FAQ container
    container = createDOMElement('div', { id: 'faqList' });
    document.body.appendChild(container);
    
    // Mock console for testing
    mockConsole = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    };
    global.console = mockConsole;
    
    // Reset window.__siteConfig
    window.__siteConfig = testData.siteConfig;
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
    
    // Clean up any global variables
    delete window.__siteConfig;
  });

  function createFAQItems(items) {
    const html = items.map((item, index) => `
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
          ${item.question}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer" id="faq-answer-${index}">
          <div class="faq-answer-inner">
            ${item.answer}
          </div>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
  }

  function initializeFAQ() {
    // Execute the FAQ script
    const script = document.createElement('script');
    script.textContent = faqScriptContent;
    document.head.appendChild(script);
    document.head.removeChild(script);
  }

  describe('FAQ Rendering', () => {
    it('should render FAQ items correctly', () => {
      createFAQItems(testData.faqData);
      
      const questions = document.querySelectorAll('.faq-question');
      const answers = document.querySelectorAll('.faq-answer');
      
      expect(questions).toHaveLength(testData.faqData.length);
      expect(answers).toHaveLength(testData.faqData.length);
      
      questions.forEach((question, index) => {
        expect(question.textContent).toContain(testData.faqData[index].question);
        expect(question.getAttribute('aria-expanded')).toBe('false');
      });
    });

    it('should have proper accessibility attributes', () => {
      createFAQItems(testData.faqData);
      
      const questions = document.querySelectorAll('.faq-question');
      
      questions.forEach((question, index) => {
        expect(question.getAttribute('aria-expanded')).toBe('false');
        expect(question.getAttribute('aria-controls')).toBe(`faq-answer-${index}`);
      });
    });
  });

  describe('FAQ Click Functionality', () => {
    beforeEach(() => {
      createFAQItems(testData.faqData);
      initializeFAQ();
    });

    it('should expand FAQ item when clicked', () => {
      const firstQuestion = document.querySelector('.faq-question');
      const firstAnswer = document.querySelector('.faq-answer');
      
      // Initially closed
      expect(firstAnswer.style.maxHeight).toBe('');
      
      // Click to expand
      firstQuestion.click();
      
      // Should be expanded
      expect(firstAnswer.style.maxHeight).toBe(firstAnswer.scrollHeight + 'px');
      expect(firstQuestion.getAttribute('aria-expanded')).toBe('true');
      expect(firstQuestion.closest('.faq-item')).toHaveClass('active');
    });

    it('should collapse other items when expanding one', () => {
      const questions = document.querySelectorAll('.faq-question');
      const answers = document.querySelectorAll('.faq-answer');
      
      // Expand first item
      questions[0].click();
      
      // Expand second item
      questions[1].click();
      
      // First should be closed, second should be open
      expect(answers[0].style.maxHeight).toBeNull();
      expect(answers[1].style.maxHeight).toBe(answers[1].scrollHeight + 'px');
      expect(questions[0].getAttribute('aria-expanded')).toBe('false');
      expect(questions[1].getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle item when clicked twice', () => {
      const firstQuestion = document.querySelector('.faq-question');
      const firstAnswer = document.querySelector('.faq-answer');
      
      // Click to expand
      firstQuestion.click();
      expect(firstAnswer.style.maxHeight).toBe(firstAnswer.scrollHeight + 'px');
      
      // Click to collapse
      firstQuestion.click();
      expect(firstAnswer.style.maxHeight).toBeNull();
    });
  });

  describe('FAQ Keyboard Navigation', () => {
    beforeEach(() => {
      createFAQItems(testData.faqData);
      initializeFAQ();
    });

    it('should expand item with Enter key', () => {
      const firstQuestion = document.querySelector('.faq-question');
      const firstAnswer = document.querySelector('.faq-answer');
      
      firstQuestion.focus();
      firstQuestion.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      expect(firstAnswer.style.maxHeight).toBe(firstAnswer.scrollHeight + 'px');
      expect(firstQuestion.getAttribute('aria-expanded')).toBe('true');
    });

    it('should expand item with Space key', () => {
      const firstQuestion = document.querySelector('.faq-question');
      const firstAnswer = document.querySelector('.faq-answer');
      
      firstQuestion.focus();
      firstQuestion.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      
      expect(firstAnswer.style.maxHeight).toBe(firstAnswer.scrollHeight + 'px');
      expect(firstQuestion.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('FAQ Form Links', () => {
    beforeEach(() => {
      const faqDataWithFormLink = [
        {
          question: "Test with form link",
          answer: 'Answer with <a href="#" class="faq-form-link">form link</a>'
        }
      ];
      createFAQItems(faqDataWithFormLink);
      initializeFAQ();
    });

    it('should update form links with site config', () => {
      const formLink = document.querySelector('.faq-form-link');
      
      expect(formLink.href).toBe(testData.siteConfig.forms.registration);
    });
  });

  describe('FAQ Initialization', () => {
    it('should not initialize if no FAQ questions found', () => {
      // Don't create FAQ items
      initializeFAQ();
      
      expect(mockConsole.log).toHaveBeenCalledWith('No FAQ questions found, will retry...');
    });

    it('should not initialize twice', () => {
      createFAQItems(testData.faqData);
      initializeFAQ();
      
      // Try to initialize again
      initializeFAQ();
      
      expect(mockConsole.log).toHaveBeenCalledWith('FAQ already initialized, skipping');
    });
  });

  describe('FAQ Event Handling', () => {
    beforeEach(() => {
      createFAQItems(testData.faqData);
      initializeFAQ();
    });

    it('should handle clicks on SVG elements within questions', () => {
      const svg = document.querySelector('.faq-question svg');
      const firstAnswer = document.querySelector('.faq-answer');
      
      svg.click();
      
      expect(firstAnswer.style.maxHeight).toBe(firstAnswer.scrollHeight + 'px');
    });

    it('should ignore clicks outside FAQ questions', () => {
      const firstAnswer = document.querySelector('.faq-answer');
      const nonFAQElement = createDOMElement('div', { textContent: 'Not FAQ' });
      document.body.appendChild(nonFAQElement);
      
      nonFAQElement.click();
      
      expect(firstAnswer.style.maxHeight).toBe('');
    });
  });
});
