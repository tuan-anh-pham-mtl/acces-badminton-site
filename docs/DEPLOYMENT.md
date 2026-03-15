# Deployment Guide

Quick guide for deploying the Accès Badminton website to various hosting platforms.

## 🚀 Quick Deployment

### Static Site Deployment
The Accès Badminton website is a **100% static site** - no server-side processing required. Simply upload the root directory files to any static hosting service.

### Files to Deploy
```
📁 Root Directory (deploy these files)
├── 📄 index.html
├── 📁 assets/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── includes/
└── 📁 data/
```

### Files to Exclude
```
📁 Do NOT deploy
├── 📁 tests/          # Development testing
├── 📁 docs/           # Documentation
├── 📄 .git/           # Version control
├── 📄 README.md       # Project docs
└── 📄 package.json    # Development dependencies
```

## 🌐 Hosting Options

### 1. Free Hosting Options

#### **GitHub Pages**
```bash
# Create gh-pages branch
git checkout --orphan gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

**Settings:**
- Repository Settings → Pages
- Source: Deploy from branch
- Branch: gh-pages
- Folder: /root

#### **Netlify (Free Tier)**
```bash
# Deploy via drag-and-drop
1. Compress root files (excluding tests/, docs/)
2. Drag to netlify.com
3. Get instant URL: https://random-name.netlify.app
```

**Custom Domain:**
```bash
# Add CNAME file to root
echo "your-domain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
```

#### **Vercel (Free Tier)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel --prod

# Follow prompts for project setup
```

#### **Firebase Hosting**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize project
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### 2. Low-Cost Hosting Options

#### **Cloudflare Pages ($0/month)**
```bash
# Via Git integration
1. Connect GitHub repository
2. Build settings: No build needed
3. Root directory: /
4. Deploy automatically on push
```

#### **Surge.sh (Free)**
```bash
# Install Surge
npm install -g surge

# Deploy
surge --domain acces-badminton.surge.sh

# Custom domain
surge --domain accesbadminton.ca
```

#### **GitHub Sponsors (Free for open-source)**
- Apply for GitHub Sponsors
- Get free hosting through GitHub Partners
- Custom domain support included

### 3. Canadian Hosting Options

#### **Canhost Web Hosting**
- Canadian data centers
- $5-10/month for static hosting
- Free SSL certificate
- Canadian domain registration

#### **ElasticHost**
- Montreal-based servers
- Pay-as-you-go pricing
- Good performance for Canadian users

#### **HostPapa**
- Canadian company
- Affordable shared hosting
- Free domain registration

## 📋 Pre-Deployment Checklist

### Testing Before Deploy
```bash
# Run complete test suite
cd tests
npm run test:ci

# Check coverage
npm run test:coverage

# Manual testing checklist
□ All pages load correctly
□ Mobile responsive design
□ FAQ functionality works
□ Navigation works on mobile
□ Form links work
□ Images load properly
□ No console errors
□ Accessibility with keyboard
□ Performance acceptable (<3s load)
```

### File Verification
```bash
# Check file sizes
du -sh assets/css/styles.css  # Should be <50KB
du -sh assets/js/*.js         # Each <10KB
du -sh data/*.json            # Each <5KB

# Validate HTML
npx html-validator index.html

# Validate JSON
for file in data/*.json; do
  jq empty "$file" || echo "Invalid JSON: $file"
done
```

### Performance Optimization
```bash
# Image optimization
npx imagemin assets/img/* --out-dir=assets/img/optimized

# CSS minification (optional)
npx clean-css-cli -o assets/css/styles.min.css assets/css/styles.css

# JavaScript minification (optional)
npx terser assets/js/*.js --compress --output-dir=assets/js/minified
```

## 🔧 Platform-Specific Setup

### GitHub Pages Setup

#### **Repository Structure**
```
your-username/
└── acces-badminton-site/
    ├── index.html
    ├── assets/
    ├── data/
    └── .github/
        └── workflows/
            └── deploy.yml
```

#### **GitHub Actions Deployment**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### Netlify Setup

#### **netlify.toml Configuration**
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 404
```

#### **Environment Variables**
- `NODE_ENV=production`
- `API_URL=https://api.accesbadminton.ca`

### Vercel Setup

#### **vercel.json Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🔒 Security Configuration

### HTTPS Setup
All modern hosting providers provide free SSL certificates:

#### **Let's Encrypt (Manual)**
```bash
# Install Certbot
sudo apt-get install certbot

# Generate certificate
certbot certonly --standalone -d accesbadminton.ca

# Configure web server for HTTPS
```

#### **Cloudflare SSL**
1. Sign up for Cloudflare account
2. Add your domain
3. Enable "Flexible SSL" (free)
4. Update nameservers to Cloudflare

### Security Headers
```javascript
// Add to assets/js/utils.js or configure at hosting level
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
};
```

### Content Security Policy
```html
<!-- Add to index.html head -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
">
```

## 📊 Performance Optimization

### Caching Strategy
```javascript
// Service Worker for PWA (optional)
// sw.js
const CACHE_NAME = 'acces-badminton-v1';
const urlsToCache = [
  '/',
  '/assets/css/styles.css',
  '/assets/js/utils.js',
  '/assets/js/render.js',
  '/data/site.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### CDN Configuration
```html
<!-- Preconnect for external resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">

<!-- DNS prefetch for potential external resources -->
<link rel="dns-prefetch" href="//fonts.gstatic.com">
```

### Image Optimization
```bash
# Convert to WebP with fallback
cwebp -q 80 assets/img/photo.jpg -o assets/img/photo.webp

# Responsive images with srcset
<picture>
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Description" loading="lazy">
</picture>
```

## 🔄 Continuous Deployment

### Automated Testing Pipeline
```yaml
# .github/workflows/deploy.yml
name: Test and Deploy
on:
  push:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install dependencies
      run: cd tests && npm install
    - name: Run tests
      run: cd tests && npm run test:ci
    - name: Upload coverage
      uses: codecov/codecov-action@v1
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to production
      run: echo "Deployment steps here"
```

### Environment Management
```bash
# Production environment
NODE_ENV=production

# Development environment
NODE_ENV=development

# Staging environment
NODE_ENV=staging
```

## 📈 Monitoring and Analytics

### Google Analytics Setup
```html
<!-- Add to index.html before closing </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
```javascript
// Add to assets/js/utils.js
function reportWebVitals() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Performance metric:', entry.name, entry.value);
      }
    });
    observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift'] });
  }
}

// Initialize
reportWebVitals();
```

## 🆘 Troubleshooting

### Common Deployment Issues

#### **404 Errors**
- Check file paths in HTML includes
- Verify case sensitivity (Linux servers)
- Ensure all files are uploaded

#### **CORS Issues**
- Check if external resources are blocked
- Verify API endpoints are accessible
- Consider using same-origin resources

#### **Performance Issues**
- Check image sizes and formats
- Minify CSS and JavaScript
- Enable browser caching

#### **SSL Certificate Issues**
- Wait for certificate propagation
- Check domain DNS settings
- Verify certificate validity

### Debugging Tools
```bash
# Check HTTP headers
curl -I https://accesbadminton.ca

# Test page load time
curl -w "@curl-format.txt" -o /dev/null -s https://accesbadminton.ca

# Validate HTML
npx html-validator https://accesbadminton.ca
```

## 📋 Post-Deployment Checklist

### Immediate Checks
- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Mobile responsive working
- [ ] FAQ functionality works
- [ ] Form links functional
- [ ] Images loading properly
- [ ] No console errors
- [ ] HTTPS working
- [ ] Performance acceptable

### Ongoing Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Monitor page load times
- [ ] Check SSL certificate expiry
- [ ] Review analytics data
- [ ] Backup configuration

This deployment guide ensures the Accès Badminton website can be reliably deployed to any hosting platform while maintaining security, performance, and accessibility standards.
