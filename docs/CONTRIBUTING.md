# Contributing to Accès Badminton Website

Guide for contributing to the Accès Badminton website project, whether you're a club member, developer, or community volunteer.

## 🎯 Project Mission

**Accès Badminton** is a non-profit organization dedicated to developing and promoting badminton in Greater Montreal. This website serves as our digital hub for member information, community updates, and recruitment.

## 🤝 How to Contribute

### For Club Members & Community

#### **Content Updates**
- **Training Schedule** - Update `data/programs.json`
- **Location Information** - Modify `data/locations.json`
- **FAQ Updates** - Edit `data/faq.json`
- **Membership Fees** - Update `data/membership.json`

#### **Feedback & Suggestions**
- Report usability issues
- Suggest new features
- Test mobile functionality

### For Developers & Designers

#### **Code Contributions**
- Bug fixes and improvements
- New feature development
- Performance optimization
- Accessibility enhancements

#### **Design Contributions**
- UI/UX improvements
- Mobile responsiveness
- Visual design updates

## 🚀 Getting Started

### Quick Setup for Content Contributors
```bash
git clone <repository-url>
cd acces-badminton-site

# Edit content files in data/ directory
# Open index.html in browser to verify

git add data/updated-file.json
git commit -m "Update FAQ with new training info"
git push origin main
```

### Developer Setup
```bash
git clone <repository-url>
cd acces-badminton-site/tests
npm install
npm run serve
npm run test:watch
```

## 📝 Content Contribution Guidelines

### Editing JSON Data Files

#### **FAQ Updates (`data/faq.json`)**
```json
[
  {
    "question": "Question in French",
    "answer": "Answer with <strong>HTML</strong> formatting allowed"
  }
]
```

#### **Program Updates (`data/programs.json`)**
```json
[
  {
    "title": "Program Name",
    "badge": "Beginner",
    "price": "20",
    "currency": "$",
    "tag": "Sundays 10:30-13:30",
    "details": [
      {
        "type": "date",
        "text": "Schedule information"
      }
    ]
  }
]
```

### Content Standards
- **Language**: French (Quebec French preferred)
- **Tone**: Welcoming, informative, professional
- **Formatting**: Use proper French punctuation
- **Accuracy**: Verify information before submitting

## 💻 Code Contribution Guidelines

### Development Principles
- **AI-Assisted Development** - Human oversight required
- **Code Standards** - ES6+ JavaScript, semantic HTML5
- **Mobile-First CSS** - Responsive design approach
- **Progressive Enhancement** - Works without JavaScript

### Making Changes

#### **Bug Fixes**
1. Identify and reproduce issue
2. Write failing test case
3. Implement minimal fix
4. Ensure all tests pass
5. Submit pull request

#### **New Features**
1. Define requirements and scope
2. Follow existing patterns
3. Add comprehensive tests
4. Test on multiple devices
5. Submit pull request

### Testing Requirements
```bash
cd tests

# All tests
npm test

# Specific tests
npm run test:unit
npm run test:integration
npm run test:coverage
```

## 🎨 Design Contribution Guidelines

### Design Principles
- **Colors**: Blue and white theme (badminton court colors)
- **Typography**: Clean, readable fonts
- **Layout**: Clean, organized, information-focused
- **User Experience**: Mobile-first, accessible

### Design Changes
- Edit `assets/css/styles.css`
- Follow existing naming conventions
- Test on multiple screen sizes
- Ensure accessibility

## 🔒 Security Guidelines

### Content Security
- **XSS Protection**: All user content sanitized
- **Safe HTML**: Limited allowed tags in dynamic content
- **Input Validation**: Form inputs properly validated

### Development Security
- **No Secrets**: Never commit API keys or passwords
- **Dependencies**: Keep dependencies updated
- **Code Review**: All changes reviewed before merge

## 📋 Pull Request Process

### Before Submitting
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Manual testing completed
- [ ] Documentation updated

### PR Template
```markdown
## Description
Brief description of changes and purpose.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Tested on mobile
```

## 🎓 Learning and Development

### For New Contributors
1. **Start Small** - Fix a typo or update content
2. **Learn the Codebase** - Understand structure and patterns
3. **Ask Questions** - Use GitHub issues for clarification
4. **Get Feedback** - Submit early for review

### Resources
- [Project README](../README.md)
- [Technical Architecture](ARCHITECTURE.md)
- [AI Development Guide](AI-DEVELOPMENT.md)
- [Setup Guide](SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

## 🏆 Recognition

### Contributor Recognition
- **Contributors Section** - Recognition in README
- **Commit History** - Permanent record of contributions
- **Community Impact** - Direct impact on badminton community
- **Skill Development** - Portfolio and experience building

## 🤝 Community Guidelines

### Code of Conduct
- **Inclusive** - Welcome to all skill levels and backgrounds
- **Supportive** - Help others learn and contribute
- **Respectful** - Consider different perspectives and experiences
- **Collaborative** - Work together toward common goals

### Getting Help
- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and ideas
- **Email** - For private matters
- **Club Meetings** - For in-person discussions

## 📞 Contact Information

### Project Leadership
- **Maintainer**: [Contact Information]
- **Club President**: [Contact Information]
- **Web Coordinator**: [Contact Information]

### Communication Channels
- **GitHub**: For technical contributions
- **Email**: For private matters
- **Club Meetings**: For in-person discussions

---

Thank you for contributing to Accès Badminton! Your involvement helps us promote badminton throughout Greater Montreal and provides valuable opportunities for community members to learn and grow together.

*Built with ❤️ by the badminton community, for the badminton community.*
