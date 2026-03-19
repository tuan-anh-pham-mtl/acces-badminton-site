# Changelog

All notable changes to the Accès Badminton website will be documented in this file.

## [1.2.0] - 2025-03-19

### 🚀 Features
- **feat**: Mobile menu redesign with slide-out panel and backdrop overlay
- **feat**: Mobile-responsive privacy policy page with proper content padding
- **feat**: Dedicated test helpers module architecture

### 🛠️ Fixes  
- **fix**: Mobile hamburger menu display and interaction issues
- **fix**: Duplicate header.js loading causing script conflicts
- **fix**: Jest ES6 import compatibility issues

### 🧹 Chore
- **chore**: Removed unused utility functions from production bundle
- **chore**: Separated test utilities from production code
- **chore**: Standardized script loading order across all pages

### ⚠️ Breaking Changes
- **BREAKING**: Removed unused utility functions from production:
  - `formatDate()`, `isInViewport()`, `scrollToElement()` - moved to test helpers
- **BREAKING**: Test files now use CommonJS require() instead of ES6 imports

### 📋 Migration Notes
- Mobile menu uses slide-out panel instead of full-screen overlay
- Privacy policy has same mobile experience as main site
- Test utilities moved to `tests/helpers/test-utils.js`
- Bundle size reduced by removing unused production functions

---

## [1.1.0] - 2025-03-15

### 🚀 Features
- **feat**: Implement DOMPurify for industry-standard XSS protection
- **feat**: Enhanced FAQ link visibility with `<strong>` tags and underscores

### 🛠️ Fixes  
- **fix**: Resolved critical variable reference bug in includes.js (undefined `path` variable)
- **fix**: Fixed script loading order in index.html
- **fix**: Replaced fragile custom safeHTML regex with DOMPurify

### 🧹 Chore
- **chore**: Added `node_modules/` to .gitignore
- **chore**: Cleaned up temporary test files
- **chore**: Updated project documentation

### ⚠️ Breaking Changes
- **BREAKING**: Replaced custom `safeHTML` function with DOMPurify implementation
  - Custom regex patterns removed
  - DOMPurify configuration now used for XSS protection
  - All HTML sanitization now uses industry standard

### 📋 Migration Notes
- If you were using custom `safeHTML` function parameters, they remain the same
- DOMPurify provides better security and maintainability
- All existing functionality preserved

---

## [1.0.0] - Previous Release

### 🚀 Features
- Initial website implementation
- FAQ system with expand/collapse
- Dynamic content loading from JSON
- Mobile-responsive design
- Header navigation and footer includes
- Scroll animations
- Testing framework setup

---

## Versioning Convention

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)  
- **PATCH**: Bug fixes (backward compatible)

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code refactoring
- `test`: Adding/changing tests
- `chore`: Maintenance tasks, dependency updates

**Scopes:**
- `faq`: FAQ system changes
- `security`: XSS protection, sanitization
- `includes`: Header/footer include system
- `docs`: Documentation updates
- `test`: Testing framework
