// Shared header/footer/meta building blocks used by generate-services.js and generate-service-areas.js
// Keeping these in one place avoids the nav/footer drifting apart page to page.

const BASE = 'https://eseseal.com';
const PHONE = '(417) 350-8848';
const PHONE_HREF = '+14173508848';
const EMAIL = 'esenlow@esesealweatherproofing.com';

const SERVICES = [
  { slug: 'masonry-repair', name: 'Masonry Repair', short: 'Brick, stone & block repair' },
  { slug: 'tuckpointing', name: 'Tuckpointing', short: 'Mortar joint restoration' },
  { slug: 'chimney-repair', name: 'Chimney Repair', short: 'Brick & mortar restoration' },
  { slug: 'foundation-crack-repair', name: 'Foundation Crack Repair', short: 'Concrete & masonry wall cracks' },
  { slug: 'waterproofing', name: 'Waterproofing', short: 'Basement & water-entry repair' },
  { slug: 'concrete-repair', name: 'Concrete Repair', short: 'Flatwork, steps & surfaces' }
];

const FEATURED_AREAS = [
  ['springfield-mo', 'Springfield'], ['nixa-mo', 'Nixa'], ['ozark-mo', 'Ozark'], ['republic-mo', 'Republic'],
  ['battlefield-mo', 'Battlefield'], ['willard-mo', 'Willard'], ['strafford-mo', 'Strafford'], ['rogersville-mo', 'Rogersville'],
  ['bolivar-mo', 'Bolivar'], ['branson-mo', 'Branson'], ['hollister-mo', 'Hollister'], ['marshfield-mo', 'Marshfield']
];

function esc(s) { return String(s == null ? '' : s); }

function headMeta({ title, description, canonical, ogImage }) {
  const img = ogImage || `${BASE}/481661352_611525098532185_1988382068030445524_n.jpg`;
  return `<meta property="og:type" content="website"><meta property="og:site_name" content="ESE Seal"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${img}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${img}">`;
}

function header(cityQuery) {
  const query = cityQuery ? `?city=${encodeURIComponent(cityQuery)}` : '';
  const serviceMenu = SERVICES.map(s => `<a href="/services/${s.slug}.html"><strong>${s.name}</strong><small>${s.short}</small></a>`).join('');
  const areaMenu = FEATURED_AREAS.map(([slug, name]) => `<a href="/service-areas/${slug}.html">${name}</a>`).join('');
  return `<div class="topbar"><div class="container"><span>Serving a 60-Mile Radius Around Springfield, MO</span><div class="topbar-links"><a href="tel:${PHONE_HREF}">Call ${PHONE}</a><a href="mailto:${EMAIL}">Email ESE Seal</a></div></div></div>
<header class="header"><div class="container nav"><a class="brand" href="/" aria-label="ESE Seal home"><img src="/ese-seal-logo.webp" alt="ESE Seal logo" width="260" height="104"></a><button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Primary navigation">
  <a href="/">Home</a>
  <div class="nav-dropdown"><a href="/services.html" class="nav-drop-trigger" aria-haspopup="true" aria-expanded="false">Services <span class="nav-arrow" aria-hidden="true">▼</span></a><div class="nav-drop-menu">${serviceMenu}<a class="drop-all" href="/services.html">View All Services →</a></div></div>
  <a href="/about.html">About</a>
  <div class="nav-dropdown"><a href="/service-areas.html" class="nav-drop-trigger" aria-haspopup="true" aria-expanded="false">Service Areas <span class="nav-arrow" aria-hidden="true">▼</span></a><div class="nav-drop-menu nav-area-menu"><div class="area-menu-grid">${areaMenu}</div><a class="drop-all" href="/service-areas.html">View All 50 Service Areas →</a></div></div>
  <a href="/gallery.html">Projects</a>
  <a href="/contact.html${query}" class="btn btn-dark">Get a Free Estimate</a>
</nav></div></header>`;
}

function footer() {
  const serviceLinks = SERVICES.map(s => `<a href="/services/${s.slug}.html">${s.name}</a>`).join('');
  return `<footer class="footer"><div class="container"><div class="footer-grid">
  <div><img class="footer-logo" src="/ese-seal-logo.webp" alt="ESE Seal logo" width="190" height="76"><p>Owner-led masonry repair, concrete repair and water-entry protection for homes and businesses within a 60-mile radius of Springfield, Missouri.</p></div>
  <div><h4>Services</h4><div class="footer-links">${serviceLinks}</div></div>
  <div><h4>Company</h4><div class="footer-links"><a href="/about.html">About Eric</a><a href="/gallery.html">Projects</a><a href="/service-areas.html">Service Areas</a><a href="/contact.html">Free Estimate</a></div></div>
  <div><h4>Contact</h4><div class="footer-links"><a href="tel:${PHONE_HREF}">${PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a><span>Springfield, Missouri</span></div></div>
</div><div class="footer-bottom"><span>© <span data-year></span> ESE Seal. All rights reserved.</span><span><a href="/privacy.html">Privacy Policy</a></span><span>Site built by The Farm Media</span></div></div></footer>
<div class="mobile-cta"><a class="mc-call" href="tel:${PHONE_HREF}">📞 Call</a><a class="mc-quote" href="/contact.html">Get a Quote</a></div>
<script src="/script.js" defer></script>`;
}

const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${BASE}/#business`,
  name: 'ESE Seal',
  url: `${BASE}/`,
  telephone: '+1-417-350-8848',
  email: EMAIL,
  image: `${BASE}/481661352_611525098532185_1988382068030445524_n.jpg`,
  logo: `${BASE}/ese-seal-logo.webp`,
  founder: { '@type': 'Person', name: 'Eric Enlow' },
  address: { '@type': 'PostalAddress', addressLocality: 'Springfield', addressRegion: 'MO', addressCountry: 'US' },
  areaServed: { '@type': 'Place', name: '60-mile radius around Springfield, Missouri' }
};

function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url }))
  };
}

module.exports = { BASE, PHONE, PHONE_HREF, EMAIL, SERVICES, FEATURED_AREAS, header, footer, headMeta, LOCAL_BUSINESS_LD, breadcrumbLd, esc };
