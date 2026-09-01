(() => {
  if (!document.querySelector('link[href$="enhancements.css"]')) {
    const extra = document.createElement('link');
    extra.rel = 'stylesheet';
    extra.href = '/enhancements.css';
    document.head.appendChild(extra);
  }

  // Keep the same approved ESE Seal & Restoration logo everywhere on the site.
  document.querySelectorAll('.brand img, img.footer-logo').forEach(img => {
    img.src = '/ESESealLogo.png';
    img.alt = 'ESE Seal & Restoration';
    img.removeAttribute('srcset');
  });

  document.querySelectorAll('.topbar .container > span').forEach(el => {
    el.textContent = 'Serving a 60-Mile Radius Around Springfield, MO';
  });
  document.querySelectorAll('.topbar a[href^="mailto:"]').forEach(link => {
    link.href = 'tel:+14173508848';
    link.textContent = 'Talk to Eric →';
    link.setAttribute('aria-label', 'Call Eric Enlow at 417-350-8848');
  });

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');

  const buildDropdown = (link, type) => {
    if (!link || link.closest('.nav-dropdown')) return;
    const wrap = document.createElement('div');
    wrap.className = 'nav-dropdown';
    const trigger = link.cloneNode(true);
    trigger.classList.add('nav-drop-trigger');
    trigger.removeAttribute('aria-current');
    const label = type === 'services' ? 'Services' : 'Service Areas';
    trigger.innerHTML = `${label} <span class="nav-arrow" aria-hidden="true">⌄</span>`;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = `nav-drop-menu ${type === 'areas' ? 'nav-area-menu' : ''}`;

    if (type === 'services') {
      menu.innerHTML = `
        <a href="/services.html#masonry"><strong>Masonry Repair</strong><small>Brick, stone & block repair</small></a>
        <a href="/services.html#tuckpointing"><strong>Tuckpointing</strong><small>Mortar joint restoration</small></a>
        <a href="/services.html#chimney"><strong>Chimney Repair</strong><small>Brick & mortar restoration</small></a>
        <a href="/services.html#foundation"><strong>Foundation Cracks</strong><small>Concrete & masonry wall repair</small></a>
        <a href="/services.html#waterproofing"><strong>Waterproofing</strong><small>Basement & water-entry repair</small></a>
        <a href="/services.html#concrete"><strong>Concrete Repair</strong><small>Flatwork, steps & surfaces</small></a>
        <a class="drop-all" href="/services.html">View All Services →</a>`;
    } else {
      menu.innerHTML = `
        <div class="area-menu-grid">
          <a href="/service-areas/springfield-mo.html">Springfield</a><a href="/service-areas/nixa-mo.html">Nixa</a>
          <a href="/service-areas/ozark-mo.html">Ozark</a><a href="/service-areas/republic-mo.html">Republic</a>
          <a href="/service-areas/battlefield-mo.html">Battlefield</a><a href="/service-areas/willard-mo.html">Willard</a>
          <a href="/service-areas/strafford-mo.html">Strafford</a><a href="/service-areas/rogersville-mo.html">Rogersville</a>
          <a href="/service-areas/bolivar-mo.html">Bolivar</a><a href="/service-areas/aurora-mo.html">Aurora</a>
          <a href="/service-areas/branson-mo.html">Branson</a><a href="/service-areas/hollister-mo.html">Hollister</a>
          <a href="/service-areas/marshfield-mo.html">Marshfield</a><a href="/service-areas/seymour-mo.html">Seymour</a>
        </div>
        <a class="drop-all" href="/service-areas.html">View All 50 Service Areas →</a>`;
    }

    link.replaceWith(wrap);
    wrap.append(trigger, menu);
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        const open = wrap.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
      }
    });
  };

  if (nav) {
    buildDropdown(nav.querySelector('a[href$="services.html"], a[href="/services.html"]'), 'services');
    buildDropdown(nav.querySelector('a[href$="service-areas.html"], a[href="/service-areas.html"]'), 'areas');
  }

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

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  const heroContainer = document.querySelector('.hero > .container');
  if (heroContainer && !heroContainer.querySelector('.hero-quote-card')) {
    heroContainer.classList.add('hero-grid');
    const copy = document.createElement('div');
    copy.className = 'hero-copy';
    while (heroContainer.firstChild) copy.appendChild(heroContainer.firstChild);
    heroContainer.appendChild(copy);

    const card = document.createElement('div');
    card.className = 'hero-quote-card';
    card.innerHTML = `
      <span class="eyebrow">Free Project Estimate</span>
      <h2>Tell Eric what needs repaired.</h2>
      <p class="quote-sub">No obligation. Fast response from a local owner-operated company.</p>
      <form name="estimate" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">
        <input type="hidden" name="form-name" value="estimate">
        <p hidden><label>Don't fill this out: <input name="bot-field"></label></p>
        <div class="form-grid">
          <div class="field full"><label>Name</label><input name="name" autocomplete="name" required placeholder="Your name"></div>
          <div class="field"><label>Phone Number</label><input name="phone" type="tel" autocomplete="tel" required placeholder="417-555-0000"></div>
          <div class="field"><label>Email Address</label><input name="email" type="email" autocomplete="email" placeholder="you@email.com"></div>
          <div class="field full"><label>Service Needed</label><select name="service" required><option value="">Choose a service</option><option>Masonry Repair</option><option>Tuckpointing</option><option>Chimney / Fireplace Masonry</option><option>Foundation Crack Repair</option><option>Basement Waterproofing</option><option>Concrete Repair</option><option>Exterior Caulking / Sealing</option><option>Other</option></select></div>
          <div class="field full"><label>Your City / ZIP</label><input name="city" autocomplete="address-level2" required placeholder="Springfield, MO or 65804"></div>
          <div class="field full"><label>Tell Us About Your Project</label><textarea name="message" required placeholder="What is cracked, leaking, loose or damaged?"></textarea></div>
          <div class="field full"><button class="btn btn-primary" type="submit">Submit Free Estimate Request →</button></div>
        </div>
      </form>
      <p class="hero-form-trust">🔒 Private & secure. No spam.</p>
      <p class="hero-call-note">Prefer to talk? <a href="tel:+14173508848">Call (417) 350-8848</a></p>`;
    heroContainer.appendChild(card);
  }

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const close = () => lightbox.classList.remove('open');
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        image.src = item.dataset.lightbox;
        image.alt = item.dataset.alt || 'ESE Seal project photo';
        lightbox.classList.add('open');
      });
    });
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  document.querySelectorAll('form[data-netlify]').forEach(form => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('service')) {
      const select = form.querySelector('select[name="service"]');
      if (select) select.value = params.get('service');
    }
    if (params.get('city')) {
      const city = form.querySelector('input[name="city"], input[name="location"]');
      if (city) city.value = params.get('city');
    }
  });
})();
