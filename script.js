// ESE Seal — shared site behavior: mobile nav, dropdown menus, lightbox, lead-form helpers.
(() => {
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link || link.classList.contains('nav-drop-trigger')) return;
      nav.classList.remove('open');
      nav.querySelectorAll('.nav-dropdown.open').forEach(item => item.classList.remove('open'));
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  }

  document.querySelectorAll('.nav-drop-trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        const wrap = trigger.closest('.nav-dropdown');
        const open = wrap.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
      }
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Lightbox for project gallery photos
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const close = () => { lightbox.classList.remove('open'); lastFocused?.focus(); };
    let lastFocused = null;
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        lastFocused = item;
        image.src = item.dataset.lightbox;
        image.alt = item.dataset.alt || 'ESE Seal project photo';
        lightbox.classList.add('open');
      });
    });
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) close(); });
  }

  // Pre-fill lead forms from query params (?service=...&city=...) and tag the source page/URL
  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    if (params.get('service')) {
      const select = form.querySelector('select[name="service"]');
      if (select && [...select.options].some(o => o.value === params.get('service'))) select.value = params.get('service');
    }
    if (params.get('city')) {
      const city = form.querySelector('input[name="city"]');
      if (city) city.value = params.get('city');
    }
    const source = form.querySelector('input[name="source_page"]');
    if (source) source.value = window.location.pathname;
  });
})();
