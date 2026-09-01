const fs = require('fs');
const path = require('path');
const { BASE, PHONE, PHONE_HREF, EMAIL, SERVICES, header, footer, headMeta, LOCAL_BUSINESS_LD, breadcrumbLd } = require('./partials.js');

const cities = [
  {name:'Springfield',slug:'springfield-mo',county:'Greene County',note:'Springfield is ESE Seal’s home market, with everything from established brick neighborhoods and commercial masonry to poured-concrete foundations and newer exterior finishes.'},
  {name:'Nixa',slug:'nixa-mo',county:'Christian County',note:'Nixa’s fast residential growth means a mix of newer concrete foundations, brick veneer, stone accents and exterior joints that still face the same Ozarks rain and seasonal movement.'},
  {name:'Ozark',slug:'ozark-mo',county:'Christian County',note:'Ozark’s hills, heavy rain and mixed masonry construction can expose weak mortar joints, cracked concrete and water-entry points faster than flat, sheltered sites.'},
  {name:'Republic',slug:'republic-mo',county:'Greene County',note:'Republic combines newer neighborhoods with established homes and commercial properties, all exposed to southwest Missouri rain, freeze-thaw cycles and normal structural movement.'},
  {name:'Battlefield',slug:'battlefield-mo',county:'Greene County',note:'Battlefield sits in ESE Seal’s close-in southwest Springfield market, making it one of the easiest areas for owner-led estimates and repair scheduling.'},
  {name:'Willard',slug:'willard-mo',county:'Greene County',note:'Willard properties see the same wind-driven rain, temperature swings and moisture exposure that can gradually open mortar joints and foundation cracks.'},
  {name:'Strafford',slug:'strafford-mo',county:'Greene County',note:'Strafford’s location along the I-44 corridor puts it well inside ESE Seal’s regular service route east of Springfield.'},
  {name:'Rogersville',slug:'rogersville-mo',county:'Webster County',note:'Rogersville has a blend of rural properties and newer construction where masonry, foundation and moisture problems often benefit from a repair-first evaluation.'},
  {name:'Clever',slug:'clever-mo',county:'Christian County',note:'Clever is southwest of Nixa and comfortably inside ESE Seal’s Springfield-area service radius for masonry, concrete and waterproofing work.'},
  {name:'Sparta',slug:'sparta-mo',county:'Christian County',note:'Sparta-area homes and buildings can develop open mortar joints and concrete cracks from repeated weather exposure, settling and seasonal movement.'},
  {name:'Billings',slug:'billings-mo',county:'Christian County',note:'Billings is within the regular service radius and is a practical route for masonry, concrete and moisture-related repair projects.'},
  {name:'Highlandville',slug:'highlandville-mo',county:'Christian County',note:'The US-160 corridor around Highlandville combines hilly terrain and heavy rain, two conditions that can make exterior cracks and drainage-related moisture more noticeable.'},
  {name:'Fordland',slug:'fordland-mo',county:'Webster County',note:'East of Springfield, Fordland properties deal with Ozarks humidity, rain and freeze-thaw cycles that can wear on mortar, brick and concrete over time.'},
  {name:'Marshfield',slug:'marshfield-mo',county:'Webster County',note:'Marshfield sits on the I-44 corridor within ESE Seal’s regular eastern service market from Springfield.'},
  {name:'Fair Grove',slug:'fair-grove-mo',county:'Greene County',note:'North of Springfield, Fair Grove is close enough for regular service on masonry, foundation, concrete and waterproofing projects.'},
  {name:'Pleasant Hope',slug:'pleasant-hope-mo',county:'Polk County',note:'Pleasant Hope is in the northern portion of ESE Seal’s Springfield-area market and remains well inside the 60-mile service radius.'},
  {name:'Buffalo',slug:'buffalo-mo',county:'Dallas County',note:'Buffalo is a regular northern route where masonry and concrete are exposed to the same rain, humidity and winter temperature swings found throughout southwest Missouri.'},
  {name:'Bolivar',slug:'bolivar-mo',county:'Polk County',note:'Bolivar is one of the larger communities north of Springfield and falls inside ESE Seal’s 60-mile service radius for residential and commercial repair work.'},
  {name:'Morrisville',slug:'morrisville-mo',county:'Polk County',note:'Morrisville sits between Springfield and Bolivar, making it a straightforward service area for owner-led repair estimates.'},
  {name:'Brighton',slug:'brighton-mo',county:'Polk County',note:'Brighton is a smaller community north of Springfield where ESE Seal can evaluate masonry, concrete and moisture problems without requiring a large-market project size.'},
  {name:'Half Way',slug:'half-way-mo',county:'Polk County',note:'Half Way is within the northern portion of the service radius and is covered for qualifying masonry, foundation and waterproofing work.'},
  {name:'Fair Play',slug:'fair-play-mo',county:'Polk County',note:'Fair Play sits west of Bolivar and remains within the 60-mile Springfield radius for projects that fit ESE Seal’s repair scope.'},
  {name:'Humansville',slug:'humansville-mo',county:'Polk County',note:'Humansville is near the outer northern portion of ESE Seal’s service area, so project scope and route scheduling are considered when planning an estimate.'},
  {name:'Ash Grove',slug:'ash-grove-mo',county:'Greene County',note:'Ash Grove lies west of Springfield and is close enough for regular masonry, concrete and moisture-repair service.'},
  {name:'Walnut Grove',slug:'walnut-grove-mo',county:'Greene County',note:'Walnut Grove is part of ESE Seal’s western Springfield-area market, with older and newer construction exposed to seasonal moisture and temperature changes.'},
  {name:'Everton',slug:'everton-mo',county:'Dade County',note:'Everton is within ESE Seal’s western service radius and is covered for qualifying masonry, foundation and concrete repair projects.'},
  {name:'Greenfield',slug:'greenfield-mo',county:'Dade County',note:'Greenfield is a western service-area community where repair work can range from deteriorated mortar and brick to foundation cracks and exterior water entry.'},
  {name:'Lockwood',slug:'lockwood-mo',county:'Dade County',note:'Lockwood sits near the western side of the 60-mile service radius, so larger or well-defined repair projects are especially practical for route scheduling.'},
  {name:'Miller',slug:'miller-mo',county:'Lawrence County',note:'Miller is part of the western Springfield-area market and is within range for qualifying masonry, foundation and waterproofing projects.'},
  {name:'Mount Vernon',slug:'mount-vernon-mo',county:'Lawrence County',note:'Mount Vernon is one of the larger communities west of Springfield and falls within ESE Seal’s normal 60-mile service radius.'},
  {name:'Aurora',slug:'aurora-mo',county:'Lawrence County',note:'Aurora has a mix of established masonry, commercial buildings and residential concrete that can develop cracking, mortar deterioration and moisture problems over time.'},
  {name:'Marionville',slug:'marionville-mo',county:'Lawrence County',note:'Marionville sits between Springfield and the western edge of the service area and is covered for masonry, concrete and waterproofing repair.'},
  {name:'Verona',slug:'verona-mo',county:'Lawrence County',note:'Verona is within ESE Seal’s western service radius and can be served for qualifying masonry, foundation and moisture-repair projects.'},
  {name:'Pierce City',slug:'pierce-city-mo',county:'Lawrence County',note:'Pierce City is near the outer western portion of the service area, so Eric can confirm route timing and project fit before scheduling an on-site estimate.'},
  {name:'Monett',slug:'monett-mo',county:'Barry County',note:'Monett sits near the outer southwest portion of ESE Seal’s radius but remains a target service community for qualifying repair work.'},
  {name:'Purdy',slug:'purdy-mo',county:'Barry County',note:'Purdy is in the southwest portion of the service area and is covered for masonry, foundation and waterproofing projects that fit the route and scope.'},
  {name:'Crane',slug:'crane-mo',county:'Stone County',note:'Crane is southwest of Springfield and within range for repair work involving masonry, mortar, concrete and common water-entry points.'},
  {name:'Hurley',slug:'hurley-mo',county:'Stone County',note:'Hurley is a smaller southwest Missouri community within the 60-mile radius where ESE Seal can evaluate qualifying repair projects directly with the property owner.'},
  {name:'Reeds Spring',slug:'reeds-spring-mo',county:'Stone County',note:'Reeds Spring’s hilly Ozarks terrain and heavy rainfall can make foundation cracks, exterior joints and weathered masonry especially important to watch.'},
  {name:'Branson West',slug:'branson-west-mo',county:'Stone County',note:'Branson West properties are exposed to heavy rain, terrain changes and exterior masonry conditions common around Table Rock Lake and the surrounding hills.'},
  {name:'Kimberling City',slug:'kimberling-city-mo',county:'Stone County',note:'Kimberling City sits in the Table Rock Lake area, where slopes, rain exposure and exterior masonry can create visible cracks and water-entry concerns.'},
  {name:'Branson',slug:'branson-mo',county:'Taney County',note:'Branson’s hills, commercial construction and heavy rain create a wide range of masonry, concrete and water-management conditions for homes and businesses.'},
  {name:'Hollister',slug:'hollister-mo',county:'Taney County',note:'Hollister is part of the Branson-area market and is within ESE Seal’s service radius for brick, stone, mortar, foundation and waterproofing repair.'},
  {name:'Forsyth',slug:'forsyth-mo',county:'Taney County',note:'Forsyth is east of Branson and remains within the 60-mile Springfield radius for qualifying masonry, concrete and moisture-repair projects.'},
  {name:'Rockaway Beach',slug:'rockaway-beach-mo',county:'Taney County',note:'Rockaway Beach is in the Lake Taneycomo area, where slope, moisture and weather exposure can reveal cracks, failed joints and deteriorated exterior masonry.'},
  {name:'Seymour',slug:'seymour-mo',county:'Webster County',note:'Seymour is east of Springfield and within ESE Seal’s regular service radius for masonry, concrete, foundation and waterproofing work.'},
  {name:'Ava',slug:'ava-mo',county:'Douglas County',note:'Ava sits in the southeastern portion of the 60-mile service radius and is covered for qualifying projects that fit ESE Seal’s repair scope and route.'},
  {name:'Mansfield',slug:'mansfield-mo',county:'Wright County',note:'Mansfield is east of Springfield and falls within ESE Seal’s 60-mile service area for qualifying masonry and moisture-related repair projects.'},
  {name:'Lebanon',slug:'lebanon-mo',county:'Laclede County',note:'Lebanon is near the northeastern edge of the service radius, so project scope and route timing are considered when scheduling estimates.'},
  {name:'Stockton',slug:'stockton-mo',county:'Cedar County',note:'Stockton is near the northwestern edge of the service area; qualifying repair projects can be scheduled when the scope and route make sense.'}
];

function serviceCards() {
  return `<div class="city-service-grid">${SERVICES.map(s=>`<article class="city-service-card"><h3>${s.name}</h3><p>${s.short}.</p><a href="/services/${s.slug}.html">Learn about ${s.name.toLowerCase()} →</a></article>`).join('')}</div>`;
}

function cityPage(c, index) {
  const links = [1,2,3,4].map(step => cities[(index + step) % cities.length]);
  const canonical = `${BASE}/service-areas/${c.slug}.html`;
  const title = `Masonry Repair & Waterproofing ${c.name}, MO | ESE Seal`;
  const desc = `ESE Seal provides masonry repair, tuckpointing, foundation crack repair, concrete repair and waterproofing in ${c.name}, MO. Free estimates. Call 417-350-8848.`;
  const jsonLd = {
    '@context':'https://schema.org','@type':'Service',name:`Masonry Repair & Waterproofing in ${c.name}, MO`,url:canonical,
    provider:{'@type':'HomeAndConstructionBusiness',name:'ESE Seal',url:BASE,telephone:'+1-417-350-8848'},
    areaServed:{'@type':'City',name:c.name,address:{'@type':'PostalAddress',addressRegion:'MO',addressCountry:'US'}},
    serviceType: SERVICES.map(s=>s.name)
  };
  const faqLd = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:[
    {'@type':'Question',name:`Does ESE Seal serve ${c.name}, Missouri?`,acceptedAnswer:{'@type':'Answer',text:`Yes. ${c.name} is included in ESE Seal’s 60-mile Springfield-area service market for qualifying repair projects.`}},
    {'@type':'Question',name:`What services are available in ${c.name}?`,acceptedAnswer:{'@type':'Answer',text:'ESE Seal offers masonry repair, tuckpointing, chimney masonry repair, foundation crack repair, waterproofing and concrete repair depending on the condition of the property.'}},
    {'@type':'Question',name:`How do I request an estimate in ${c.name}?`,acceptedAnswer:{'@type':'Answer',text:`Call Eric Enlow at ${PHONE} or submit the free estimate form on eseseal.com.`}}
  ]};
  const crumbLd = breadcrumbLd([
    {name:'Home',url:`${BASE}/`},
    {name:'Service Areas',url:`${BASE}/service-areas.html`},
    {name:c.name,url:canonical}
  ]);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${canonical}"><link rel="icon" href="/icon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="stylesheet" href="/styles.css">${headMeta({title,description:desc,canonical})}<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS_LD)}</script><script type="application/ld+json">${JSON.stringify(jsonLd)}</script><script type="application/ld+json">${JSON.stringify(faqLd)}</script><script type="application/ld+json">${JSON.stringify(crumbLd)}</script></head><body>${header(c.name)}<main id="main">
<section class="city-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/service-areas.html">Service Areas</a> / ${c.name}</div><span class="eyebrow" style="color:#69ceff">${c.name}, Missouri · ${c.county}</span><h1>Masonry Repair & Waterproofing in ${c.name}, MO</h1><p>ESE Seal serves ${c.name} property owners with masonry restoration, tuckpointing, chimney repair, foundation crack repair, concrete repair and waterproofing. Owner Eric Enlow provides free project estimates throughout the Springfield-area service radius.</p><div class="btn-row"><a class="btn btn-primary" href="/contact.html?city=${encodeURIComponent(c.name)}">Request a ${c.name} Estimate →</a><a class="btn btn-outline" href="tel:${PHONE_HREF}">Call ${PHONE}</a></div></div></section>
<section class="section"><div class="container city-copy-grid"><div><span class="eyebrow">Repair services in ${c.name}</span><h2>Repair the failure point before weather and moisture make it worse.</h2><p class="muted">${c.note}</p><p class="muted">ESE Seal is intentionally broader than a one-service waterproofing company. Cracked masonry, deteriorated mortar, concrete damage and water intrusion can be connected, so Eric looks at the surrounding condition before recommending a repair. The goal is to preserve sound material, correct the area that has failed and leave the finished work clean and intentional.</p>${serviceCards()}
<h2>What ESE Seal looks for during a ${c.name} estimate</h2><p class="muted">The first step is understanding what changed. Eric looks at the location and direction of cracks, the condition of nearby mortar joints, signs of previous repairs, visible moisture, loose masonry and the way the surrounding surface drains. That helps separate a cosmetic issue from a repair that needs to address water or movement.</p><div class="service-feature"><div><strong>Cracks & separation</strong><span>Where the crack starts, how it runs and whether the surrounding material is still solid.</span></div><div><strong>Mortar condition</strong><span>Open, recessed, powdering or missing joints that can allow deeper moisture exposure.</span></div><div><strong>Water entry</strong><span>Leaks after rain, damp basement areas and exterior transitions where sealant or masonry has failed.</span></div><div><strong>Repairability</strong><span>Whether a focused repair can preserve the existing structure instead of replacing more material than necessary.</span></div></div>
<h2>Frequently asked questions</h2><div class="faq-list"><details><summary>Does ESE Seal serve ${c.name}, Missouri?</summary><p>Yes. ${c.name} is included in the company’s 60-mile Springfield-area service market for qualifying repair projects. At the outer portions of the radius, route timing can depend on project scope.</p></details><details><summary>What services can I ask about?</summary><p>Masonry repair, tuckpointing, chimney masonry, foundation cracks, concrete repair, exterior sealing and waterproofing are all good places to start.</p></details><details><summary>Are estimates free?</summary><p>Yes. Call Eric directly at ${PHONE} or use the online form and include ${c.name} in the city field.</p></details><details><summary>Can I send photos first?</summary><p>Yes. A close photo of the damaged area plus a wider photo showing the surrounding wall, foundation, chimney or concrete can help Eric understand the project before the site visit.</p></details></div>
<h3 style="margin-top:34px">More ESE Seal service areas</h3><div class="nearby-links">${links.map(x=>`<a href="/service-areas/${x.slug}.html">${x.name}</a>`).join('')}<a href="/service-areas.html">View all 50 areas</a></div></div><aside class="city-cta"><span class="eyebrow">Free estimate</span><h3>Have a project in ${c.name}?</h3><p class="muted">Tell Eric what is cracked, leaking, loose or deteriorated. You will talk with the owner—not a call center.</p><a class="btn btn-primary" href="/contact.html?city=${encodeURIComponent(c.name)}">Request an Estimate</a><a class="btn btn-dark" href="tel:${PHONE_HREF}">Call ${PHONE}</a><p class="muted" style="font-size:.82rem;margin-top:14px">Serving a 60-mile radius around Springfield, Missouri.</p></aside></div></section>
<section class="section-sm" style="background:var(--stone)"><div class="container cta-band"><div><h2>Not sure what kind of repair you need?</h2><p>Describe what you see. Eric can help identify the right next step.</p></div><a href="tel:${PHONE_HREF}" class="btn btn-white">Call ${PHONE}</a></div></section></main>${footer()}</body></html>`;
}

function serviceAreaIndex() {
  const canonical = `${BASE}/service-areas.html`;
  const title = 'Service Areas | ESE Seal — 60 Miles Around Springfield, MO';
  const description = 'ESE Seal serves 50 communities within roughly 60 miles of Springfield, Missouri for masonry repair, tuckpointing, foundation crack repair, concrete repair and waterproofing.';
  const crumbLd = breadcrumbLd([{name:'Home',url:`${BASE}/`},{name:'Service Areas',url:canonical}]);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><link rel="icon" href="/icon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="stylesheet" href="/styles.css">${headMeta({title,description,canonical})}<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS_LD)}</script><script type="application/ld+json">${JSON.stringify(crumbLd)}</script></head><body>${header('')}<main id="main"><section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / Service Areas</div><h1>50 service areas within 60 miles of Springfield</h1><p>ESE Seal serves homeowners and businesses across southwest Missouri with masonry restoration, tuckpointing, chimney repair, foundation crack repair, concrete repair and waterproofing.</p></div></section><section class="section"><div class="container"><div class="service-area-intro"><div><span class="eyebrow">Springfield-centered coverage</span><h2>Local repair service without limiting the company to one town.</h2><p class="muted">The 60-mile service radius gives ESE Seal room to serve the Springfield metro plus communities north toward Bolivar and Buffalo, east toward Marshfield and Mansfield, south through the Branson area and west toward Mount Vernon, Aurora and Monett.</p><p class="muted">If you are near the edge of the radius, call Eric at <a href="tel:${PHONE_HREF}" style="font-weight:800;color:var(--blue)">${PHONE}</a>. Project size, scope and route timing can determine whether a specific job makes sense.</p></div><div class="radius-card"><strong>60</strong><span>Mile Springfield Service Radius</span><p>50 dedicated city pages built around the same core repair services, with Springfield as the center of the market.</p></div></div><div class="area-section"><span class="eyebrow">All service areas</span><h2>Choose your community</h2><div class="area-grid area-grid-5">${cities.map(c=>`<a class="area-pill" href="/service-areas/${c.slug}.html">${c.name}</a>`).join('')}</div></div></div></section><section class="section-sm"><div class="container cta-band"><div><h2>Don't see your exact location?</h2><p>If you are close to the 60-mile radius, call Eric and ask. The project may still fit the route.</p></div><a href="tel:${PHONE_HREF}" class="btn btn-white">Call ${PHONE}</a></div></section></main>${footer()}</body></html>`;
}

function sitemap() {
  const basePages = [
    ['', '1.0'], ['services.html', '0.9'], ['gallery.html', '0.8'], ['service-areas.html', '0.9'],
    ['about.html', '0.7'], ['contact.html', '0.8'], ['privacy.html', '0.3']
  ];
  const urls = [
    ...basePages.map(([p, priority]) => ({ loc: `${BASE}/${p}`, priority })),
    ...SERVICES.map(s => ({ loc: `${BASE}/services/${s.slug}.html`, priority: '0.85' })),
    ...cities.map(c => ({ loc: `${BASE}/service-areas/${c.slug}.html`, priority: '0.75' }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`;
}

const areaDir = path.join(process.cwd(),'service-areas');
fs.mkdirSync(areaDir,{recursive:true});
cities.forEach((c,i)=>fs.writeFileSync(path.join(areaDir,`${c.slug}.html`),cityPage(c,i)));
fs.writeFileSync(path.join(process.cwd(),'service-areas.html'),serviceAreaIndex());
fs.writeFileSync(path.join(process.cwd(),'sitemap.xml'),sitemap());
console.log(`Generated ${cities.length} ESE Seal service-area pages + sitemap.xml.`);
