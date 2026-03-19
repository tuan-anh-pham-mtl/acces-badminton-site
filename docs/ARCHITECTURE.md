# Technical Architecture

Clean, modular architecture built with AI assistance for maintainability and performance.

## 🏗️ Core Architecture

### Technology Stack
```
Frontend (100% Static)
├── HTML5               # Semantic markup
├── CSS3                # Modern styling with custom properties
├── Vanilla JavaScript  # No framework dependencies
└── JSON                # Configuration and content data
```

### File Structure
```
📁 Production Files
├── index.html              # Main application
├── assets/
│   ├── css/styles.css     # Complete styling system
│   ├── js/                # Modular JavaScript
│   │   ├── utils.js       # Security & utilities (production only)
│   │   ├── render.js      # Dynamic content
│   │   ├── faq.js         # FAQ accordion
│   │   ├── header.js      # Navigation
│   │   ├── animations.js  # Scroll animations
│   │   └── includes.js    # Client-side includes
│   └── img/               # Optimized images
└── data/                  # Content configuration
    ├── site.json          # Global settings
    ├── faq.json           # FAQ content
    ├── programs.json      # Training programs
    ├── locations.json     # Venue information
    └── membership.json    # Membership details
```

## 🔒 Security Architecture

### Multi-Layer Protection
1. **Input Sanitization** - Strip dangerous HTML and scripts
2. **Safe Content Rendering** - Allow only specified safe tags
3. **XSS Prevention** - Remove event handlers and dangerous attributes
4. **Secure Links** - Form links managed through configuration

### Security Implementation
```javascript
// XSS protection
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Safe rendering with allowed tags
function safeHTML(str, allowedTags = ['strong', 'br', 'em']) {
  // Remove dangerous tags and attributes
  // Allow only specified safe tags
}
```

## ⚡ Performance Architecture

### Optimization Strategies
- **Resource Hints**: Preconnect, preload, prefetch
- **Script Loading**: Non-blocking with defer attribute
- **Image Optimization**: WebP format with fallbacks
- **Event Throttling**: Scroll events at 60fps
- **Intersection Observer**: Efficient scroll animations

### Performance Features
```javascript
// Throttled scroll handler (60fps)
const handleScroll = AccesUtils.throttle(() => {
  // Scroll-based UI updates
}, 16);
```

## 🧪 Testing Architecture

### Test Organization
```
tests/
├── helpers/                    # Test utilities and setup
│   ├── test-utils.js          # Test-only utility functions
│   └── setup.js               # Jest configuration
├── unit/                      # Component isolation tests
│   ├── faq.test.js           # FAQ functionality
│   ├── utils.test.js         # Production utility functions
│   ├── test-utils.test.js    # Test utility functions
│   ├── header.test.js        # Navigation system
│   ├── animations.test.js    # Scroll animations
│   └── includes.test.js      # Client-side includes
├── integration/               # Component interaction tests
│   └── dynamic-content.test.js
└── fixtures/                  # Test data and mocks
```

### Testing Strategy
- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction testing
- **Mock Services**: External dependency simulation
- **Coverage Reports**: Code coverage tracking

### Test Helper Architecture
- **Separation**: Test utilities isolated from production code
- **CommonJS**: Jest-compatible module system
- **Reusable Functions**: formatDate, isInViewport, scrollToElement for testing
- **Mock Creation**: createMockElement, mockFetch utilities
- **Clean Production**: Only essential utilities in production bundle

## 📱 Mobile Architecture

### Responsive Design
- **Mobile-First**: All pages designed for mobile first
- **Progressive Enhancement**: Enhanced experience for larger screens
- **Consistent UX**: Same mobile experience across all pages

### Mobile Menu System
- **Slide-Out Panel**: Replaces full-screen overlay
- **Backdrop Overlay**: Improves focus and accessibility
- **Touch Support**: Touch-friendly close interactions
- **Keyboard Navigation**: Full accessibility support

### Content Layout
- **Responsive Containers**: `clamp()` functions for fluid padding
- **Mobile Padding**: Content-body adjustments for small screens
- **Flexible Typography**: Scalable font sizes

### Page Structure
All pages follow consistent patterns:
```html
<header data-include="assets/includes/header.html"></header>
<main>
  <section class="hero section">
    <div class="container hero-inner">...</div>
  </section>
  <section class="section">
    <div class="container">
      <article class="content-body">...</article>
    </div>
  </section>
</main>
<footer data-include="assets/includes/footer.html"></footer>
```

### Script Loading
- **Consistent Order**: Same script loading across all pages
- **No Conflicts**: Prevents duplicate script loading
- **Progressive Loading**: Essential scripts first, enhancements deferred

## 🎨 Component Architecture

### Reusable Patterns
```css
.program-card, .location-card, .faq-item {
  /* Shared card styling */
  /* Responsive behavior */
  /* Interactive states */
}
```

#### **Navigation System**
- Mobile menu toggle functionality
- Scroll-based header effects
- Keyboard navigation support
- Accessibility features

#### **Animation System**
- Intersection Observer setup
- Element animation triggers
- Performance optimization
- Accessibility respect

## 🔄 Data Flow Architecture

### Content Loading Pipeline
```
1. Page Load
   ↓
2. HTML Parsing (with includes)
   ↓
3. JavaScript Initialization
   ↓
4. Data Fetching (JSON files)
   ↓
5. Dynamic Rendering
   ↓
6. Event Listeners & Interactions
```

### Data Sources
- **site.json** - Global configuration and settings
- **faq.json** - FAQ questions and answers
- **programs.json** - Training program information
- **locations.json** - Venue and location details
- **membership.json** - Membership pricing and details

## 🛠️ Development Architecture

### Build Process
**Static Site Generation** (no build step required):
1. **Development**: Live server with hot reload
2. **Testing**: Automated test suite execution
3. **Optimization**: Manual optimization during development
4. **Deployment**: Direct file deployment to hosting

### Code Organization Principles
1. **Separation of Concerns**
   - HTML: Structure and semantics
   - CSS: Presentation and styling
   - JavaScript: Behavior and interaction
   - JSON: Data and configuration

## 🚀 Deployment Architecture

### Static Site Deployment
**Hosting Requirements:**
- Static file serving
- HTTPS support
- Custom domain (optional)
- CDN distribution (recommended)

**Deployment Process:**
1. **Testing**: Automated test suite execution
2. **Optimization**: File size and performance checks
3. **Upload**: Direct file deployment to hosting
4. **Validation**: Post-deployment functionality testing

### Scalability Considerations
- **CDN Ready**: Static assets optimized for CDN distribution
- **Browser Caching**: Appropriate cache headers
- **Compression**: Gzip/Brotli compression support
- **Performance Monitoring**: Architecture supports analytics integration

## 🔧 Key Design Decisions

### Why This Architecture?

#### **Static Site Benefits**
- **Performance**: Fast loading, no server processing
- **Security**: No server-side vulnerabilities
- **Cost**: Minimal hosting expenses
- **Reliability**: Simple, fewer failure points

#### **Modular JavaScript**
- **Maintainability**: Easy to understand and modify
- **Testing**: Each module can be tested independently
- **Performance**: Load only what's needed
- **Accessibility**: Progressive enhancement support

#### **JSON Configuration**
- **Content Management**: Easy updates without code changes
- **Multi-language**: Foundation for future translations
- **Version Control**: Track content changes
- **Non-technical Updates**: Club members can edit content

#### **AI-Generated Code**
- **Modern Standards**: Current best practices applied
- **Consistency**: Uniform coding style
- **Security**: Built-in protection measures
- **Performance**: Optimized implementations

## 🔄 Future Architecture Evolution

### Potential Enhancements
1. **Headless CMS Integration** - Content management without code changes
2. **Progressive Web App** - Service worker and offline functionality
3. **Advanced Interactions** - Real-time notifications and authentication
4. **Multi-language Support** - French/English content management

### Migration Path
Current architecture supports gradual enhancement:
- **Phase 1**: Current static implementation 
- **Phase 2**: Headless CMS integration
- **Phase 3**: Advanced features and PWA

This architecture ensures the website remains maintainable, performant, and ready for future enhancements while serving the current needs of the Accès Badminton community.

---

*Designed for simplicity, built for performance, ready for the future.*
