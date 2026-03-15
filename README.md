# Accès Badminton Website

A modern, responsive website for Accès Badminton - a non-profit organization dedicated to developing and promoting badminton in the Greater Montreal area.

## 🏸 About This Project

This project represents a unique collaboration between human passion and artificial intelligence, created by a badminton enthusiast and club member to support the organization's mission of making badminton accessible to everyone in Montreal.

### 🎯 Project Intent
- **Contribute to non-profit** - Help our club's digital presence
- **Promote badminton** - Make the sport accessible in Montreal
- **Learn AI development** - Explore AI-assisted coding workflows
- **Build community** - Create a platform for members and potential players

### 🤖 AI Development Story
Built through human-AI collaboration across three phases:
1. **Windsurf (Paid)** - Initial redesign from existing site
2. **GitHub Copilot (Free)** - Massive refactoring to modular architecture  
3. **Windsurf (Free)** - Production-ready with best practices and testing

## 📚 Comprehensive Documentation

This project includes detailed documentation designed for future MkDocs integration:

```
� docs/
├── README.md              # Project overview and story
├── AI-DEVELOPMENT.md     # AI-assisted development methodology
├── ARCHITECTURE.md        # Technical architecture and design
├── SETUP.md              # Development environment setup
├── DEPLOYMENT.md         # Hosting and deployment guide
└── CONTRIBUTING.md       # Contribution guidelines and community
```

## �🚀 Quick Start

### For Development
```bash
# Navigate to tests directory (contains all dev tools)
cd tests

# Install dependencies
npm install

# Start development server
npm run serve

# Run tests in watch mode
npm run test:watch

# Or do both simultaneously
npm run dev
```

### For Production
The root directory contains only production files:
- `index.html` - Main application
- `assets/` - CSS, JS, images
- `data/` - JSON data files

### For Documentation
```bash
# Read the full story and technical details
open docs/README.md
```

## 📁 Project Structure

```
acces-badminton-site/
├── 📁 Production Files
│   ├── index.html
│   ├── assets/
│   └── data/
├── 📁 docs/               # 📖 Comprehensive documentation
│   ├── README.md          # Project story and overview
│   ├── AI-DEVELOPMENT.md  # AI development methodology
│   ├── ARCHITECTURE.md    # Technical architecture
│   ├── SETUP.md          # Development setup guide
│   ├── DEPLOYMENT.md     # Deployment instructions
│   └── CONTRIBUTING.md   # Contribution guidelines
└── 📁 tests/             # 🧪 All development tools and tests
    ├── package.json       # Dependencies and scripts
    ├── unit/             # Unit tests
    ├── integration/      # Integration tests
    ├── fixtures/         # Test data
    └── README.md         # Testing documentation
```

## 🧪 Testing

All testing is handled from the `tests/` directory:

```bash
cd tests
npm test              # Run all tests
npm run test:unit      # All unit tests
npm run test:faq      # FAQ functionality only
npm run test:header   # Header/mobile menu only
npm run test:animations # Scroll animations only
npm run test:includes  # Client-side includes only
npm run test:coverage # Coverage report
```

### 🎯 Test Coverage

**Essential Functionality Tested:**
- ✅ **FAQ System**: Expand/collapse, keyboard navigation, form links
- ✅ **Header**: Mobile menu, scroll effects, navigation
- ✅ **Animations**: Scroll-triggered reveals, intersection observer
- ✅ **Includes**: Client-side HTML includes, error handling
- ✅ **Utilities**: HTML sanitization, error handling, helpers
- ✅ **Integration**: Dynamic content loading, site configuration

**Testing Philosophy:**
- 🎯 **Essential coverage** - Focus on user-facing features
- 🚫 **No overkill** - Skip implementation details, test behavior
- 🔄 **Prevent regressions** - Catch breaking changes early
- ⚡ **Fast feedback** - Quick test runs for development

## 🛠️ Development Workflow

1. **Make changes** to files in root directory
2. **Test changes** using commands from `tests/` directory
3. **Deploy** only root directory files

This separation keeps your production directory clean while providing comprehensive testing tools.

## 🌟 Key Features

- **📱 Mobile-First Design** - Works perfectly on all devices
- **♿ Accessibility** - WCAG compliant, keyboard navigable
- **🔒 Secure** - XSS protection and safe content rendering
- **⚡ Fast** - Optimized loading and smooth interactions
- **🧪 Tested** - Comprehensive automated test suite
- **📚 Documented** - Complete technical and project documentation

## 📞 Community & Support

### For Club Members
- **Content Updates**: Edit JSON files in `data/` directory
- **Feedback**: Report issues or suggest improvements
- **Questions**: Check documentation or create GitHub issue

### For Developers
- **Contributing**: See `docs/CONTRIBUTING.md` for guidelines
- **Technical Details**: See `docs/ARCHITECTURE.md` for architecture
- **AI Development**: See `docs/AI-DEVELOPMENT.md` for methodology

### For Everyone
- **Full Story**: Read `docs/README.md` for complete project narrative
- **Setup Guide**: See `docs/SETUP.md` for development environment
- **Deployment**: See `docs/DEPLOYMENT.md` for hosting options

---

*Built with ❤️ by a badminton enthusiast, powered by AI, for the Montreal badminton community.*

**Read the full story in `docs/README.md`**
