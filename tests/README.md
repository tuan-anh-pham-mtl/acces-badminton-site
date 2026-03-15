# Test Suite for Accès Badminton Website

This directory contains automated tests to prevent code breaking when updating the website.

## 📁 Project Structure

```
acces-badminton-site/
├── assets/js/              # Production JavaScript files
├── index.html             # Main application
├── data/                  # JSON data files
└── tests/                 # 🧪 Testing directory (this folder)
    ├── package.json        # Test dependencies and scripts
    ├── unit/              # Unit tests for individual functions
    ├── integration/       # Integration tests for component interactions
    ├── fixtures/          # Test data and mock data
    ├── helpers/           # Test utilities and setup
    ├── test-faq.html      # Manual FAQ testing
    └── README.md         # This file
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd tests
npm install
```

### 2. Run Tests
```bash
# From tests directory
npm test                    # Run all tests
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report
npm run test:ci           # CI/CD pipeline

# Run specific test suites
npm run test:faq           # FAQ functionality only
npm run test:utils         # Utility functions only
npm run test:integration   # Integration tests only
```

### 3. Development Server
```bash
# Start development server
npm run serve              # Serves the main site
npm run serve:faq          # Serves and opens FAQ section
npm run dev                # Runs server + tests simultaneously
```

## 🧪 Test Coverage Areas

### FAQ System (`unit/faq.test.js`)
- ✅ FAQ item rendering and accessibility
- ✅ Click to expand/collapse functionality
- ✅ Keyboard navigation (Enter/Space)
- ✅ Form link updates with site config
- ✅ Event handling and initialization logic

### Header & Navigation (`unit/header.test.js`)
- ✅ Mobile menu toggle functionality
- ✅ ESC key and link click to close menu
- ✅ Scroll-to-top button behavior
- ✅ Header scroll effects and visibility
- ✅ Throttled scroll performance

### Scroll Animations (`unit/animations.test.js`)
- ✅ IntersectionObserver setup and options
- ✅ Element observation for animations
- ✅ Animation trigger on viewport entry
- ✅ Skip already animated elements
- ✅ Global re-initialization hook

### Client-side Includes (`unit/includes.test.js`)
- ✅ HTML include loading and rendering
- ✅ Error handling for failed requests
- ✅ Multiple includes processing
- ✅ Header script loading management
- ✅ Event dispatching for dependencies

### Utility Functions (`unit/utils.test.js`)
- ✅ HTML sanitization and XSS protection
- ✅ Safe HTML rendering with allowed tags
- ✅ Loading states management
- ✅ Performance utilities (debounce/throttle)
- ✅ DOM helpers and error handling

### Dynamic Content (`integration/dynamic-content.test.js`)
- ✅ FAQ data loading and rendering
- ✅ Site configuration updates
- ✅ Navigation and social links rendering
- ✅ Form link replacement
- ✅ Error handling and network failures

## 📊 Coverage Reports

After running tests, coverage reports are generated in:
- `tests/coverage/` - HTML report
- Terminal output - Summary
- `lcov.info` - For CI/CD integration

## 🔧 Development Workflow

### Testing Changes to FAQ
1. Make changes to `assets/js/faq.js`
2. Run `npm run test:faq` to test FAQ functionality
3. Use `npm run serve:faq` to test manually in browser
4. Check `tests/test-faq.html` for isolated testing

### Testing Utility Functions
1. Modify `assets/js/utils.js`
2. Run `npm run test:utils`
3. Review coverage for affected functions

### Testing Dynamic Content
1. Update `assets/js/render.js` or data files
2. Run `npm run test:integration`
3. Test with `npm run dev` for live testing

## 🛠️ Writing New Tests

### File Organization
- **Unit tests**: `tests/unit/[feature].test.js`
- **Integration tests**: `tests/integration/[feature].test.js`
- **Test data**: `tests/fixtures/[data].json`
- **Helpers**: `tests/helpers/[utility].js`

### Test Template
```javascript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

## 🐛 Debugging

### Manual Testing
- Open `tests/test-faq.html` in browser for isolated FAQ testing
- Use `npm run serve` for full site testing

### Console Debugging
- Tests preserve console output
- Use `console.log()` in test files for debugging
- Check Jest output for detailed error messages

### DOM Inspection
```javascript
// In tests, use:
console.log(document.body.innerHTML);
```

## 🔄 Continuous Integration

For CI/CD pipelines:
```bash
cd tests
npm ci
npm run test:ci
```

This generates coverage reports and exits with proper status codes.

## 📝 Best Practices

1. **Test user interactions**, not implementation details
2. **Mock external dependencies** (fetch, APIs)
3. **Use fixtures** for test data
4. **Keep tests isolated** - cleanup in `afterEach`
5. **Test edge cases** and error conditions
6. **Maintain >80% coverage** on critical paths

## 🚨 Troubleshooting

### Common Issues
- **Module not found**: Run `npm install` in `tests/` directory
- **Path issues**: All paths are relative to `tests/` directory
- **DOM not ready**: Use `waitFor()` helper for async operations
- **Test timeouts**: Check async operations and mock setup

### Getting Help
- Check Jest documentation: https://jestjs.io/docs/getting-started
- Review test files for examples
- Use `npm run test:watch -- --verbose` for detailed output

## 🎯 Future Improvements

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression testing
- [ ] Add performance testing
- [ ] Add accessibility testing (axe-core)
- [ ] Add component testing with Storybook
