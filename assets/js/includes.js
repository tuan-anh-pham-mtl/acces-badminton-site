// Simple client-side include loader.
(async function(){
  const includes = document.querySelectorAll('[data-include]');
  if (!includes.length) return;

  // Load each include
  for (const el of includes) {
    try {
      const includePath = el.dataset.include;
      const res = await fetch(includePath);
      if (!res.ok) continue;
      const html = await res.text();
      el.innerHTML = html;
    } catch (e) {
      console.error('Include load failed', e);
    }
  }

  // After including content, load header behavior once
  if (!window.__acces_includes_loaded) {
    const s = document.createElement('script');
    s.src = 'assets/js/header.js';
    document.body.appendChild(s);
    window.__acces_includes_loaded = true;
  }
  
  // Set flag BEFORE dispatching event to prevent race condition
  window.__includesReady = true;
  
  // Signal that all includes have loaded
  document.dispatchEvent(new Event('includesLoaded'));
})();
