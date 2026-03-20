async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path} (HTTP ${res.status})`);
    const data = await res.json();
    return data;
  } catch (error) {
    AccesUtils.handleError(error, `Loading ${path}`);
    throw error;
  }
}

function createIconSVG(type) {
  // return an appropriate SVG icon for the given detail type
  switch (type) {
    case 'date':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    case 'time':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    case 'location':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    case 'capacity':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function renderPrograms(programs) {
  const container = document.getElementById('programsGrid');
  if (!container) return;
  
  AccesUtils.setLoading(container, true);
  
  try {
    container.innerHTML = programs.map(p => `
      <div class="program-card">
        <div class="program-card-header">
          <span class="program-card-badge ${AccesUtils.sanitizeHTML(p.badgeClass)}">${AccesUtils.sanitizeHTML(p.badge)}</span>
          <div class="program-card-price">${AccesUtils.sanitizeHTML(p.price)} <span>${AccesUtils.sanitizeHTML(p.currency)}</span></div>
        </div>
        <div class="program-card-body">
          <h3 class="program-card-title">${AccesUtils.sanitizeHTML(p.title)}</h3>
          <ul class="program-card-details">
            ${p.details.map(d => `<li>${createIconSVG(d.type)}${AccesUtils.sanitizeHTML(d.text)}</li>`).join('')}
          </ul>
          <span class="program-card-tag ${AccesUtils.sanitizeHTML(p.tagClass)}">${AccesUtils.sanitizeHTML(p.tag)}</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    AccesUtils.handleError(error, 'Rendering programs');
  } finally {
    AccesUtils.setLoading(container, false);
  }
}

function renderLocations(locations) {
  const container = document.getElementById('locationsGrid');
  if (!container) return;
  
  AccesUtils.setLoading(container, true);
  
  try {
    container.innerHTML = locations.map(l => `
      <div class="location-card">
        <div class="location-card-icon">${AccesUtils.sanitizeHTML(l.icon)}</div>
        <h3>${AccesUtils.sanitizeHTML(l.name)}</h3>
        <p>${AccesUtils.sanitizeHTML(l.address)}</p>
        <p style="font-size:0.85rem; color:var(--gray-500);">${AccesUtils.sanitizeHTML(l.note)}</p>
        <span class="transit-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
          ${AccesUtils.sanitizeHTML(l.transit)}
        </span>
        ${l.instruction ? `
          <div class="location-instructions">
            <div class="instruction-header">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>Instructions pour s'y rendre</span>
            </div>
            <p class="instruction-text">${AccesUtils.sanitizeHTML(l.instruction)}</p>
          </div>
        ` : ''}
      </div>
    `).join('');
  } catch (error) {
    AccesUtils.handleError(error, 'Rendering locations');
  } finally {
    AccesUtils.setLoading(container, false);
  }
}

function renderMembership(membership, site) {
  const price = document.getElementById('membershipPrice');
  const period = document.getElementById('membershipPeriod');
  if (price) price.textContent = membership.price;
  if (period) period.textContent = membership.period + ' (' + site.session + ')';
}

function renderSiteInfo(site) {
  const session = document.getElementById('siteSession');
  const nextLabel = document.getElementById('nextSessionLabel');
  const nextDates = document.getElementById('nextSessionDates');
  const programsNotice = document.getElementById('programsNotice');
  if (session) session.textContent = site.session;
  if (nextLabel) nextLabel.textContent = site.nextSessionLabel;
  if (nextDates) nextDates.textContent = site.nextSessionDates;
  if (programsNotice) programsNotice.innerHTML = AccesUtils.safeHTML(site.programsNotice, ['strong']);
}

function renderSiteName(site) {
  // Update page titles and headers
  document.title = `${site.siteName} — Développer le badminton dans le Grand Montréal`;
  
  // Update meta descriptions
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = `${site.siteName} est un organisme à but non lucratif (OBNL) ayant pour mission de développer et de promouvoir le badminton dans le Grand Montréal.`;
  }
  
  // Update OG meta tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogTitle) ogTitle.content = site.siteName;
  if (ogDescription) {
    ogDescription.content = `${site.siteName} est un organisme à but non lucratif (OBNL) ayant pour mission de développer et de promouvoir le badminton dans le Grand Montréal.`;
  }
  
  // Update header logo text
  const logoText = document.querySelector('.header-logo-text');
  if (logoText) logoText.textContent = site.siteName;
  
  // Update footer brand
  const footerBrand = document.querySelector('.footer-brand h3');
  if (footerBrand) footerBrand.textContent = site.siteName;
  
  // Update main titles
  const mainTitle = document.querySelector('.section-title');
  if (mainTitle && mainTitle.textContent.includes('Accès Badminton')) {
    mainTitle.textContent = site.siteName;
  }
}

function renderCopyright(site) {
  const copyright = document.querySelector('.footer-bottom span');
  if (copyright) {
    copyright.textContent = `© ${site.currentYear} ${site.siteName}. Tous droits réservés.`;
  }
}

function renderLogo(site) {
  if (!site || !site.logo) return;
  const img = document.getElementById('siteLogoImg');
  // Always set the <img> src to the configured logo path (supports JPG/PNG/SVG)
  if (img) img.src = site.logo;
}

// fill any elements using data-site-session attribute
function fillSiteSession(site) {
  document.querySelectorAll('[data-site-session]').forEach(el => el.textContent = site.session);
}

function renderAddress(site) {
  if (site.email) {
    const email = document.getElementById('footerEmail');
    if (email) {
      email.textContent = site.email;
      email.href = `mailto:${site.email}`;
    }
  }
  
  if (site.address) {
    const street = document.getElementById('footerAddressStreet');
    const city = document.getElementById('footerAddressCity');
    const country = document.getElementById('footerAddressCountry');
    
    if (street) street.textContent = site.address.street;
    if (city) city.textContent = site.address.city;
    if (country) country.textContent = site.address.country;
  }
}

function renderDocuments(docs) {
  const container = document.getElementById('documentsList');
  if (!container) return;
  container.innerHTML = docs.map(d => `<a href="${d.url}" target="_blank" rel="noopener noreferrer">${d.title}</a>`).join('');
}

function renderFooterBottom(site) {
  const footerLinks = document.getElementById('footerBottomLinks');
  if (!footerLinks || !site.documents) return;
  const find = (title) => site.documents.find(d => d.title.toLowerCase().includes(title.toLowerCase()));
  const privacy = find('confidentialit') || find('politique');
  const rules = find('règlements') || find('règlement');
  footerLinks.innerHTML = `
    ${privacy ? `<a href="${privacy.url}" target="_blank" rel="noopener noreferrer">Confidentialité</a>` : ''}
    ${rules ? `<a href="${rules.url}" target="_blank" rel="noopener noreferrer">Règlements</a>` : ''}
  `;
}

// Render navigation links in header (desktop)
function renderHeaderNav(site) {
  const container = document.getElementById('headerNav');
  if (!container || !site.navigation) return;
  container.innerHTML = site.navigation.map(link => 
    `<a href="index.html${link.anchor}">${link.label}</a>`
  ).join('');
}

// Render navigation links in mobile menu
function renderMobileNav(site) {
  const container = document.getElementById('mobileNav');
  if (!container || !site.navigation) return;
  container.innerHTML = site.navigation.map(link => 
    `<li class="mobile-nav-item">
      <a href="index.html${link.anchor}" class="mobile-nav-link">${link.label}</a>
    </li>`
  ).join('');
}

// Render social links - Universal SVG support for all devices (Android, iOS, Desktop)
function createSocialSVG(name) {
  if (name === 'facebook') {
    return `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>`;
} else if (name === 'instagram') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>`;
  }
  return ''; // Fallback for unknown networks
}

// Render header social links
function renderHeaderSocial(site) {
  const container = document.getElementById('headerSocial');
  if (!container || !site.social) return;
  container.innerHTML = site.social.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">${createSocialSVG(link.name)}</a>`
  ).join('');
}

// Render mobile social links
function renderMobileSocial(site) {
  const container = document.getElementById('mobileSocial');
  if (!container || !site.social) return;
  container.innerHTML = site.social.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}" class="mobile-social-link">${createSocialSVG(link.name)}</a>`
  ).join('');
}

// Replace hardcoded form URLs with dynamic ones from site.json
function replaceMembershipLinks(site) {
  document.querySelectorAll('a[href*="forms.gle"]').forEach(link => {
    link.href = site.forms.registration;
  });
}

// Render FAQ items from data
function renderFAQ(faqData) {
  const container = document.getElementById('faqList');
  if (!container) {
    console.warn('FAQ container not found');
    return;
  }
  
  if (!Array.isArray(faqData)) {
    console.warn('FAQ data is not an array:', faqData);
    return;
  }
  
  AccesUtils.setLoading(container, true);
  
  try {
    container.innerHTML = faqData.map((item, index) => `
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
          ${AccesUtils.sanitizeHTML(item.question)}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer" id="faq-answer-${index}">
          <div class="faq-answer-inner">
            ${AccesUtils.safeHTML(item.answer, ['strong', 'br', 'a', 'span'])}
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    AccesUtils.handleError(error, 'Rendering FAQ');
  } finally {
    AccesUtils.setLoading(container, false);
  }
}

// Render footer navigation
function renderFooterNav(site) {
  const container = document.getElementById('footerNav');
  if (!container || !site.navigation) return;
  container.innerHTML = site.navigation
    .slice(0, 6) // Only show first 6 items in footer
    .map(link => `<a href="index.html${link.anchor}">${link.label}</a>`)
    .join('');
}

// Render footer social links
function renderFooterSocial(site) {
  const container = document.getElementById('footerSocial');
  if (!container || !site.social) return;
  container.innerHTML = site.social.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">${createSocialSVG(link.name)}</a>`
  ).join('');
}

async function initDynamic() {
  try {
    // Fetch all required data
    const [site, programs, locations, membership, faqData] = await Promise.all([
      fetchJSON('data/site.json'),
      fetchJSON('data/programs.json'),
      fetchJSON('data/locations.json'),
      fetchJSON('data/membership.json'),
      fetchJSON('data/faq.json').catch(err => {
        console.warn('FAQ data not available, will use HTML fallback:', err);
        return [];
      })
    ]);

    // Store site config globally for other scripts
    window.__siteConfig = site;
    
    // Wait for includes to be fully loaded before rendering footer
    if (!window.__includesReady) {
      await new Promise(resolve => document.addEventListener('includesLoaded', resolve, { once: true }));
    }

    // Render navigation and social
    renderHeaderNav(site);
    renderMobileNav(site);
    renderHeaderSocial(site);
    renderMobileSocial(site);
    renderFooterNav(site);
    renderFooterSocial(site);
    
    // Update all form links from centralized config
    replaceMembershipLinks(site);

    // Render FAQ if available
    if (faqData && Array.isArray(faqData) && faqData.length > 0) {
      renderFAQ(faqData);
      // Dispatch event to let FAQ script know content is ready
      document.dispatchEvent(new CustomEvent('faqRendered'));
    }

    renderSiteInfo(site);
    renderLogo(site);
    renderSiteName(site);
    renderCopyright(site);
    fillSiteSession(site);
    renderAddress(site);
    renderPrograms(programs);
    renderLocations(locations);
    renderMembership(membership, site);
    // documents are now centralized in site.json
    if (site.documents) renderDocuments(site.documents);
    renderFooterBottom(site);

    // re-init intersection observer animations for new elements
    if (window.__acces_observer_init) window.__acces_observer_init();

    // Handle anchor scrolling if URL has hash
    handleAnchorScroll();
  } catch (err) {
    console.error('Error initializing dynamic content:', err);
    // Show user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = 'background-color: #fee; border: 1px solid #f88; color: #c00; padding: 1rem; margin: 1rem; border-radius: 4px; text-align: center;';
    errorMessage.textContent = 'Erreur lors du chargement du contenu. Veuillez rafraîchir la page.';
    document.body.insertBefore(errorMessage, document.body.firstChild);
  }
}

// Mark when includes are done loading
document.addEventListener('includesLoaded', () => {
  window.__includesReady = true;
});

// Handle anchor scrolling when page loads with hash
function handleAnchorScroll() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Wait a bit for everything to be rendered and settled
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
}

// Run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDynamic);
} else {
  initDynamic();
}
