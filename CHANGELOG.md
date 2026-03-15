# Changelog

All notable changes to the Accès Badminton website will be documented in this file.

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
