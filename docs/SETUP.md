# Development Setup Guide

Quick setup for contributing to the Accès Badminton website project.

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Text editor (VSCode recommended)
- Node.js (for testing)
- Git (for version control)

### One-Command Setup
```bash
# Clone and setup
git clone <repository-url>
cd acces-badminton-site/tests
npm install
npm run serve
```

## 📋 Detailed Setup

### 1. Repository Setup
```bash
git clone <repository-url>
cd acces-badminton-site
```

### 2. Development Environment

#### **VSCode + Windsurf IDE**
1. Install VSCode
2. Install Windsurf extension
3. Open project folder

#### **Alternative Setup**
Any text editor works. Key features:
- Live preview/reload
- Syntax highlighting
- Code formatting

### 3. Testing Environment
```bash
cd tests
npm install
npm test -- --passWithNoTests
```

### 4. Development Server

#### **Option 1: npm scripts**
```bash
cd tests
npm run serve
```

#### **Option 2: VSCode Live Server**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

#### **Option 3: Python Server**
```bash
python -m http.server 8000
```

## 🛠️ Development Workflow

### Daily Development
```bash
cd tests

# Start server
npm run serve

# Run tests in watch mode
npm run test:watch

# Make changes in root directory
# Browser auto-reloads
# Tests run automatically
```

### File Organization
```
Working Directory:
├── 📄 index.html              # Main file - edit this
├── 📁 assets/js/              # JavaScript modules
├── 📁 assets/css/             # Styles (single file)
├── 📁 data/                   # Content configuration
└── 📁 tests/                  # Testing (don't edit for production)
```

## 🧪 Testing Guide

### Running Tests
```bash
cd tests

# All tests
npm test

# Specific tests
npm run test:unit          # All unit tests
npm run test:faq          # FAQ functionality
npm run test:header       # Header navigation
npm run test:coverage     # Coverage report
```

### Writing Tests
```javascript
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('Feature Name', () => {
  it('should work as expected', () => {
    expect(result).toBe(expected);
  });
});
```

## 🐛 Common Issues

### Setup Problems
```bash
# Check Node.js version
node --version  # Should be 14+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Issues
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill

# Or use different port
npm run serve -- --port 3000
```

### Testing Issues
```bash
# Update Jest configuration
npm test -- --updateSnapshot

# Clear Jest cache
npm test -- --clearCache
```

## 🔧 Advanced Setup

### VSCode Extensions
- Live Server
- Windsurf
- Prettier
- ESLint

### Git Hooks
```bash
# Install husky for pre-commit hooks
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run test:unit"
```

## 📚 Learning Resources

### For AI-Assisted Development
- [Windsurf Documentation](https://windsurf.ai/docs)
- [GitHub Copilot Guide](https://docs.github.com/en/copilot)

### For Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### For Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🆘 Getting Help

### Troubleshooting Steps
1. Check console for errors
2. Run test suite
3. Verify file permissions
4. Check network requests
5. Review documentation

### Support Channels
- GitHub Issues
- Project documentation
- Community discussions

---

This setup ensures a smooth development experience while maintaining code quality and project standards.
