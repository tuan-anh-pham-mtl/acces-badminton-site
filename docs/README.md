# Accès Badminton Website

A modern website built by a badminton enthusiast using AI to help our non-profit organization promote badminton in Montreal.

## 🏸 Why I Built This

**Personal Mission:** As a badminton club member, I wanted to help our non-profit organization have a better online presence to attract more players and serve our community.

**Learning Goal:** I'm not a developer - this was my opportunity to learn:
- How to use AI for coding (Windsurf, GitHub Copilot)
- Modern web development practices
- Setting up GitHub and deployment
- Finding affordable hosting for non-profits

## 🤖 AI-Driven Development

This entire project was built using AI assistants:

### **Phase 1: Windsurf (Paid)**
- Analyzed existing `accesbadminton.ca` website
- Created complete redesign in 1 hour (vs days manually)
- Generated modern HTML, CSS, and JavaScript

### **Phase 2: GitHub Copilot (Free Tier Maxed)**
- Massive refactoring from single file to modular architecture
- Split into organized file structure
- Created reusable components and utilities

### **Phase 3: Windsurf (Free)**
- Applied best practices for production
- Fixed critical bugs (FAQ expansion, footer rendering)
- Added security features (XSS protection)
- Built comprehensive test suite

## 🎯 Key Achievements

**As a Non-Developer:**
- Built production-ready website using only AI
- Learned modern web development through AI guidance
- Created maintainable codebase with proper testing
- Solved complex bugs that stumped AI initially

**For the Organization:**
- Professional online presence
- Mobile-responsive design
- Easy content updates through JSON files
- Low-cost hosting solution

## 🏗️ Technical Overview

```
📁 Production Files
├── index.html              # Main application
├── assets/
│   ├── css/styles.css     # Complete styling
│   └── js/                # Modular JavaScript
│       ├── utils.js       # Security & helpers
│       ├── render.js      # Dynamic content
│       ├── faq.js         # FAQ system
│       ├── header.js      # Navigation
│       └── animations.js  # Scroll effects
└── data/                  # Content configuration
    ├── site.json          # Global settings
    ├── faq.json           # FAQ content
    └── programs.json      # Training info
```

**Key Features:**
- **Mobile-First Design** - Works on all devices
- **Secure** - XSS protection and safe content rendering
- **Fast** - Optimized loading and smooth interactions
- **Maintainable** - Modular code with comprehensive tests
- **Easy Updates** - Content managed through JSON files

## 🧪 Testing

Comprehensive test suite to prevent regressions:
```bash
cd tests
npm test                    # All tests
npm run test:faq           # FAQ functionality
npm run test:header        # Mobile menu
npm run test:coverage      # Coverage report
```

**What's Tested:**
- FAQ expand/collapse functionality
- Mobile navigation and menu
- Scroll animations
- Security functions
- Dynamic content loading

## 🚀 Quick Start

**For Development:**
```bash
cd tests
npm install
npm run serve              # Start development server
npm run test:watch         # Run tests automatically
```

**For Content Updates:**
- Edit files in `data/` directory
- No coding required
- Changes appear immediately

## 💡 AI Development Insights

**What Worked:**
- AI accelerated development dramatically
- Generated professional-quality code
- Applied modern best practices
- Created maintainable architecture

**Challenges:**
- Required human oversight for business logic
- Complex bugs needed manual debugging
- Multiple AI passes improved quality
- Testing essential to catch AI errors

**Key Lesson:** AI is a powerful development partner, but human guidance and quality assurance are essential.

## 🌟 Impact

**For the Club:**
- Professional website that builds credibility
- Better information for potential members
- Platform for announcements and updates
- Minimal ongoing maintenance costs

**For Me:**
- Learned modern web development skills
- Understanding of AI-assisted workflows
- Tangible contribution to community
- Portfolio of real-world project

---

*Built by a badminton enthusiast, powered entirely by AI, for the love of the sport and our community.*
