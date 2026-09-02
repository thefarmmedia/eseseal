const fs = require('fs');
const path = require('path');
const { BASE, PHONE, PHONE_HREF, EMAIL, SERVICES, header, footer, headMeta, LOCAL_BUSINESS_LD, breadcrumbLd } = require('./partials.js');

const IMAGES = {
  'masonry-repair': ['/481914950_613783888306306_7111319059891283835_n.jpg', 'ESE Seal masonry repair project', 848, 1131],
  'tuckpointing': ['/482216480_613784264972935_4126754725449229963_n.jpg', 'ESE Seal tuckpointing and mortar joint restoration', 848, 1131],
  'chimney-repair': ['/482023629_613783978306297_3630653371334576630_n.jpg', 'ESE Seal chimney brick and mortar repair', 848, 1131],
  'foundation-crack-repair': ['/482004418_613783908306304_2257967501595663405_n.jpg', 'ESE Seal foundation crack repair project', 509, 1131],
  'waterproofing': ['/482018606_611525078532187_7135276563332088236_n.jpg', 'ESE Seal waterproofing project', 946, 2048],
  'concrete-repair': ['/481992165_613782888306406_4620180045942805370_n.jpg', 'ESE Seal concrete repair project', 640, 1422]
};

const DATA = [
  {
    slug: 'masonry-repair', name: 'Masonry Repair',
    metaTitle: 'Masonry Repair Springfield, MO | Brick & Stone Repair | ESE Seal',
    metaDescription: 'ESE Seal repairs cracked, loose and deteriorated brick, stone and block masonry near Springfield, MO. Free estimates: (417) 350-8848.',
    h1: 'Masonry Repair in Springfield, MO',
    intro: "Brick, stone and block masonry take a beating from Missouri weather. ESE Seal repairs damaged masonry on homes and commercial buildings throughout the Springfield area, preserving what can be preserved instead of pushing an unnecessary rebuild.",
    problems: [
      ['Cracked or Spalling Brick', 'Freeze-thaw cycles and trapped moisture can crack brick faces or cause spalling, where the surface flakes away and exposes the brick to further damage.'],
      ['Loose or Shifting Units', 'Brick, block or stone that has come loose from the wall is both a safety concern and an open door for water.'],
      ['Separation & Settling Cracks', 'Stair-step cracking or gaps where masonry meets a different material often point to settling or moisture damage worth evaluating.'],
      ['Deteriorated Stone & Veneer', 'Natural stone and stone veneer can loosen, crack or stain as the mortar and flashing behind it fail.']
    ],
    benefits: ['Preserves the original character and value of the structure', 'Stops water from reaching framing, insulation and interior finishes', 'Addresses safety hazards from loose material before they get worse', 'Often costs far less than full masonry replacement'],
    process: [
      ['On-Site Evaluation', 'Eric inspects the masonry, the surrounding wall and the likely cause of failure.'],
      ['Material Matching', 'Brick, stone or mortar is selected to match the existing construction as closely as possible.'],
      ['Removal & Repair', 'Damaged units are removed and repaired without disturbing sound surrounding masonry.'],
      ['Clean, Finished Result', 'Joints are tooled and the area is cleaned so the repair blends with the rest of the wall.']
    ],
    whyPro: "Masonry repair is not just patching a crack. Using the wrong mortar mix, mismatched brick or improper technique can trap moisture behind the repair and cause more damage than the original problem. Getting the material, bond pattern and joint profile right is what makes a repair last — and look like it belongs there.",
    faq: [
      ['Can cracked brick always be repaired instead of replaced?', 'In many cases, yes. Eric evaluates the extent of the damage and the condition of the surrounding masonry to determine whether a focused repair is enough or a larger area needs attention.'],
      ['Do you match the existing brick and mortar color?', 'ESE Seal works to match brick, stone and mortar color as closely as possible so repairs blend with the existing structure.'],
      ['Is masonry repair only for older homes?', 'No. Masonry on newer homes and commercial buildings can develop the same issues from moisture, settling and freeze-thaw cycles.'],
      ['Do you offer free estimates for masonry repair?', 'Yes. Call (417) 350-8848 or request an estimate online.']
    ],
    related: ['tuckpointing', 'chimney-repair', 'waterproofing']
  },
  {
    slug: 'tuckpointing', name: 'Tuckpointing',
    metaTitle: 'Tuckpointing Springfield, MO | Mortar Joint Repair | ESE Seal',
    metaDescription: "ESE Seal removes failed mortar and restores tuckpointed joints on brick and stone walls throughout the Springfield, MO area. Free estimates: (417) 350-8848.",
    h1: 'Tuckpointing in Springfield, MO',
    intro: "Open, cracked or powdering mortar joints are one of the most common ways water finds its way into a masonry wall. Tuckpointing removes the failed mortar and replaces it with new mortar that's properly packed, tooled and matched to the wall.",
    problems: [
      ['Missing or Recessed Mortar', 'Gaps in mortar joints let wind-driven rain travel deeper into the wall with every storm.'],
      ['Powdering or Crumbling Joints', 'Mortar that has lost its bond breaks down further with every freeze-thaw cycle.'],
      ['Stair-Step Cracking', 'Cracks that follow the mortar joints instead of running through the brick often signal joint failure worth addressing.'],
      ['Loose Brick From Failed Joints', 'Once enough mortar is gone, the brick units it was holding can shift or work loose.']
    ],
    benefits: ['Restores the structural bond between masonry units', "Closes off the paths water uses to get behind the wall", 'Improves curb appeal on brick and stone facades', 'A proactive, less expensive alternative to waiting for bigger masonry repairs'],
    process: [
      ['Inspect Joint Condition', 'Eric identifies which joints have failed and how deep the repair needs to go.'],
      ['Grind Out Old Mortar', 'Failed mortar is carefully removed without damaging the surrounding brick or stone.'],
      ['Pack New Mortar', 'Joints are packed with the proper mix and depth for a lasting bond.'],
      ['Tool & Match the Finish', 'Joints are tooled to match the existing profile so the repair blends in.']
    ],
    whyPro: "Tuckpointing looks simple but is easy to get wrong. Mortar that's harder than the surrounding brick can trap moisture and accelerate brick damage instead of preventing it. Matching the joint profile and mortar mix to the original construction is what separates a repair that lasts from one that fails again in a few years.",
    faq: [
      ['How do I know if I need tuckpointing?', "Look for mortar joints that are recessed, crumbling, missing, or noticeably lighter or darker than the rest of the wall. If you can scrape mortar out with a key, it's time for an evaluation."],
      ['Will tuckpointing stop a leak?', 'If the leak is coming from failed mortar joints, tuckpointing addresses the source. Eric evaluates the wall to confirm mortar is the actual cause before recommending it.'],
      ['How long does tuckpointing take?', 'It depends on the size of the area and how much mortar needs to be replaced. Eric can give you a realistic timeline during the estimate.'],
      ['Do you tuckpoint chimneys too?', 'Yes — chimney mortar joints are one of the most common tuckpointing needs. See the chimney repair page for more.']
    ],
    related: ['masonry-repair', 'chimney-repair', 'waterproofing']
  },
  {
    slug: 'chimney-repair', name: 'Chimney Repair',
    metaTitle: 'Chimney Repair Springfield, MO | Brick & Mortar | ESE Seal',
    metaDescription: 'ESE Seal repairs weather-damaged chimney brick and mortar for homes throughout the Springfield, MO area. Free estimates: (417) 350-8848.',
    h1: 'Chimney Repair in Springfield, MO',
    intro: "A chimney is exposed to rain, sun, wind and freeze-thaw cycles on every side, which makes it one of the hardest-working — and most vulnerable — parts of a home's exterior. ESE Seal repairs damaged chimney brick and mortar and helps you understand when a focused repair makes sense.",
    problems: [
      ['Deteriorated Crown or Cap', 'A cracked chimney crown lets water straight into the chimney structure.'],
      ['Cracked or Spalling Brick', 'Chimneys take more direct weather exposure than most walls, which accelerates brick damage.'],
      ['Failed Mortar Joints', 'Open joints on a chimney can allow water into the flue and surrounding framing.'],
      ['Water Stains Inside the Home', 'Staining near a fireplace or on an interior chimney chase often traces back to exterior masonry failure.']
    ],
    benefits: ['Protects the roof and interior framing around the chimney from water damage', 'Preserves the masonry instead of requiring a full rebuild', "Addresses a highly visible part of the home's exterior", 'Reduces the risk of bigger structural repairs later'],
    process: [
      ['Exterior Evaluation', 'Eric inspects the crown, brick, mortar and flashing where the chimney meets the roofline.'],
      ['Identify the Water Path', "Chimney leaks often start somewhere other than where the stain shows up inside."],
      ['Repair Brick & Mortar', "Damaged masonry is repaired or tuckpointed to restore the chimney's ability to shed water."],
      ['Confirm the Fix', 'The finished repair is checked against the original problem area.']
    ],
    whyPro: "Chimneys fail from the top down, and the visible crack is rarely the whole story. A repair that only addresses the symptom — without evaluating the crown, flashing and full mortar condition — often has to be redone. ESE Seal looks at the chimney as a system, not just the spot you can see from the ground.",
    faq: [
      ['Do you repair chimney crowns?', 'Yes, chimney crown and cap condition is part of every chimney evaluation since it is a common source of water entry.'],
      ['Can a leaning or heavily damaged chimney be repaired?', "It depends on the extent of the damage. Eric evaluates the structure in person and will tell you honestly if the project is outside ESE Seal's repair scope."],
      ['Do you work on fireplace masonry inside the home?', "ESE Seal's chimney work is focused on exterior brick, mortar and water-entry issues. Ask during your estimate about your specific situation."],
      ['Are chimney estimates free?', 'Yes. Call (417) 350-8848 or request an estimate online.']
    ],
    related: ['masonry-repair', 'tuckpointing', 'waterproofing']
  },
  {
    slug: 'foundation-crack-repair', name: 'Foundation Crack Repair',
    metaTitle: 'Foundation Crack Repair Springfield, MO | ESE Seal',
    metaDescription: 'ESE Seal evaluates and repairs accessible foundation and poured concrete wall cracks for homes and businesses near Springfield, MO. Free estimates: (417) 350-8848.',
    h1: 'Foundation Crack Repair in Springfield, MO',
    intro: "Not every foundation crack means a major structural problem, but every foundation crack is worth a look. ESE Seal evaluates accessible cracks in poured concrete and masonry foundation walls and repairs what fits the company's repair scope.",
    problems: [
      ['Vertical Cracks', "Often related to normal concrete curing and shrinkage, but worth confirming they aren't widening."],
      ['Cracks With Active Leaking', 'Water coming through a crack after rain is a clear sign it needs attention.'],
      ['Horizontal or Stair-Step Cracks', 'Can indicate pressure against the wall and may need a broader evaluation.'],
      ['Cracks Near Windows or Utility Penetrations', 'Common weak points where water finds a path in.']
    ],
    benefits: ['Identifies whether a crack is cosmetic or a sign of a bigger issue', 'Stops active water entry at the source', 'Protects a basement or crawlspace from ongoing moisture damage', 'Gives you a clear next step instead of guessing'],
    process: [
      ['On-Site Inspection', 'Eric examines the crack, the surrounding wall and any signs of moisture or movement.'],
      ['Determine Repair Scope', "Some cracks are a straightforward repair; others need a different specialist, and Eric will tell you which is which."],
      ['Seal & Repair', "Accessible cracks that fit ESE Seal's repair scope are sealed and repaired to stop water intrusion."],
      ['Follow-Up Guidance', 'You get clear next steps, including when to simply monitor a crack over time.']
    ],
    whyPro: "Foundation crack repair done wrong — the wrong material, poor prep, or sealing over a crack that's still moving — doesn't hold up. Evaluating the whole wall, not just the crack itself, is what determines whether a repair will actually last.",
    faq: [
      ['Is every foundation crack a serious problem?', 'No. Many cracks are cosmetic, but the only way to know for sure is to have them evaluated in person.'],
      ['Can you repair a crack that is actively leaking?', 'Yes, that is one of the most common reasons customers call. Eric evaluates the crack and surrounding wall before recommending a repair method.'],
      ['What if my foundation problem is bigger than a crack repair?', "Eric will let you know if your project needs a structural engineer or a different specialist rather than proceeding with work that isn't the right fix."],
      ['Are foundation crack estimates free?', 'Yes. Call (417) 350-8848 or request an estimate online.']
    ],
    related: ['waterproofing', 'masonry-repair', 'concrete-repair']
  },
  {
    slug: 'waterproofing', name: 'Waterproofing',
    metaTitle: 'Waterproofing & Water-Entry Repair Springfield, MO | ESE Seal',
    metaDescription: 'ESE Seal repairs basement and foundation water-entry points and exterior transitions near Springfield, MO. Free estimates: (417) 350-8848.',
    h1: 'Waterproofing & Water-Entry Repair in Springfield, MO',
    intro: "Basement and foundation water problems almost always start at a specific point — a crack, a failed joint, porous masonry or an exterior transition that's no longer doing its job. ESE Seal evaluates the visible failure points and applies repair and sealing methods suited to the condition of your property.",
    problems: [
      ['Damp or Musty Basement', 'Persistent moisture, even without visible water, can point to a slow entry point.'],
      ['Water After Heavy Rain', 'Leaks that show up specifically during storms usually trace to an exterior source.'],
      ['Efflorescence (White Mineral Staining)', 'A sign that water is moving through masonry or concrete.'],
      ['Failed Exterior Sealant or Caulking', 'Gaps where materials meet — window wells, utility penetrations, wall transitions — are common water-entry points.']
    ],
    benefits: ['Targets the actual source instead of just treating symptoms inside the home', 'Protects framing, insulation, flooring and stored belongings from ongoing moisture damage', 'Can help prevent mold and mildew conditions before they start', 'Preserves the long-term value and usability of basement and lower-level space'],
    process: [
      ['Trace the Water', 'Eric evaluates where and when water is entering, which is often different from where it shows up inside.'],
      ['Inspect Failure Points', 'Cracks, joints, grade and exterior masonry condition are all part of the evaluation.'],
      ['Repair & Seal', 'The identified entry points are repaired and sealed using methods suited to the specific condition.'],
      ['Confirm the Fix', "You'll know exactly what was addressed and what to watch going forward."]
    ],
    whyPro: "Water problems are notorious for showing up in one place and originating somewhere else entirely. Sealing the wrong spot, or using a generic product without understanding why water is getting in, wastes money and leaves the real problem unresolved.",
    faq: [
      ['Do you install interior drainage systems or sump pumps?', "ESE Seal's waterproofing work focuses on exterior repair and sealing at the source of water entry. Ask during your estimate about your specific situation."],
      ['How do I know where water is coming from?', 'That is exactly what the on-site evaluation is for. Eric looks at grading, cracks, joints and masonry condition to trace the likely path.'],
      ['Can waterproofing be combined with masonry or foundation crack repair?', 'Yes, these issues are often connected, and Eric evaluates all of them together during your estimate.'],
      ['Are waterproofing estimates free?', 'Yes. Call (417) 350-8848 or request an estimate online.']
    ],
    related: ['foundation-crack-repair', 'masonry-repair', 'concrete-repair']
  },
  {
    slug: 'concrete-repair', name: 'Concrete Repair',
    metaTitle: 'Concrete Repair Springfield, MO | Flatwork & Steps | ESE Seal',
    metaDescription: 'ESE Seal repairs damaged concrete flatwork, steps, porches and localized surfaces for Springfield, MO area homes and businesses. Free estimates: (417) 350-8848.',
    h1: 'Concrete Repair in Springfield, MO',
    intro: 'Concrete steps, porches, walkways and flatwork take on constant weather exposure, and freeze-thaw cycles can turn small cracks into real deterioration. ESE Seal evaluates damaged concrete and repairs what fits the condition of the surface.',
    problems: [
      ['Cracked or Uneven Flatwork', 'Settling and freeze-thaw movement can crack or shift slabs over time.'],
      ['Spalled or Pitted Surfaces', 'Flaking, pitted concrete is both a cosmetic issue and a sign of surface deterioration.'],
      ['Crumbling Steps or Porches', 'Heavily trafficked concrete can wear and crack faster than flatwork.'],
      ['Cracks Allowing Water Underneath', "Cracked concrete near a foundation can direct water where you don't want it."]
    ],
    benefits: ['Improves safety on steps, porches and walkways', 'Addresses curb appeal and property value', 'Can prevent a small crack from becoming a full replacement project', 'Localized repair is often more practical than tearing out and repouring'],
    process: [
      ['Evaluate the Damage', 'Eric inspects the crack pattern, surface condition and surrounding grade.'],
      ['Determine Repair vs. Replacement', 'Not every damaged slab needs to be replaced; Eric will tell you which applies.'],
      ['Repair the Surface', 'Damaged areas are repaired using methods suited to the type and extent of the deterioration.'],
      ['Finish & Clean Up', 'The repaired area is finished to blend with the surrounding concrete where possible.']
    ],
    whyPro: "Concrete repair that skips proper surface prep or uses the wrong patching material often fails within a season or two — you'll see it separate or crack again in the same spot. Doing it right the first time is what makes the repair worth doing at all.",
    faq: [
      ['Can cracked concrete steps be repaired instead of replaced?', 'In many cases, yes, depending on the extent of the cracking and the condition of the base beneath it.'],
      ['Do you repair concrete driveways?', 'ESE Seal focuses on steps, porches, walkways and localized flatwork repair. Ask during your estimate whether your project fits.'],
      ['Will a concrete repair match the surrounding surface?', 'Eric works to finish repairs so they blend with the surrounding concrete as closely as possible, though some texture or color variation is normal with patch repairs.'],
      ['Are concrete repair estimates free?', 'Yes. Call (417) 350-8848 or request an estimate online.']
    ],
    related: ['masonry-repair', 'foundation-crack-repair', 'waterproofing']
  }
];

function byslug(slug) { return DATA.find(d => d.slug === slug); }

function servicePage(svc) {
  const canonical = `${BASE}/services/${svc.slug}.html`;
  const [img, imgAlt, imgW, imgH] = IMAGES[svc.slug];
  const serviceLd = {
    '@context': 'https://schema.org', '@type': 'Service', serviceType: svc.name, name: svc.h1, url: canonical,
    provider: { '@type': 'HomeAndConstructionBusiness', name: 'ESE Seal', telephone: '+1-417-350-8848', url: `${BASE}/` },
    areaServed: { '@type': 'Place', name: '60-mile radius around Springfield, Missouri' },
    description: svc.metaDescription
  };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: svc.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const crumbLd = breadcrumbLd([
    { name: 'Home', url: `${BASE}/` },
    { name: 'Services', url: `${BASE}/services.html` },
    { name: svc.name, url: canonical }
  ]);

  const problemsHtml = svc.problems.map(([t, d]) => `<div><strong>${t}</strong><span>${d}</span></div>`).join('');
  const benefitsHtml = svc.benefits.map(b => `<div class="check">${b}</div>`).join('');
  const processHtml = svc.process.map(([t, d], i) => `<div class="step"><div class="step-num">0${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`).join('');
  const faqHtml = svc.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
  const relatedHtml = svc.related.map(slug => { const r = byslug(slug); return `<a href="/services/${r.slug}.html">${r.name}</a>`; }).join('') + '<a href="/services.html">All Services</a>';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${svc.metaTitle}</title><meta name="description" content="${svc.metaDescription}"><link rel="canonical" href="${canonical}">
<link rel="icon" href="/icon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="stylesheet" href="/styles.css">
${headMeta({ title: svc.metaTitle, description: svc.metaDescription, canonical, ogImage: `${BASE}${img}` })}
<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS_LD)}</script>
<script type="application/ld+json">${JSON.stringify(serviceLd)}</script>
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
<script type="application/ld+json">${JSON.stringify(crumbLd)}</script>
</head><body>
${header()}
<main id="main">
<section class="city-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/services.html">Services</a> / ${svc.name}</div><span class="eyebrow" style="color:#69ceff">ESE Seal Service</span><h1>${svc.h1}</h1><p>${svc.intro}</p><div class="btn-row"><a class="btn btn-primary" href="/contact.html?service=${encodeURIComponent(svc.name)}">Get a Free Estimate →</a><a class="btn btn-outline" href="tel:${PHONE_HREF}">Call ${PHONE}</a></div></div></section>

<section class="section"><div class="container city-copy-grid"><div>

<h2>Problems ${svc.name} Solves</h2>
<p class="muted">Here's what typically brings a property owner to ESE Seal for ${svc.name.toLowerCase()}:</p>
<div class="service-feature">${problemsHtml}</div>

<img src="${img}" alt="${imgAlt}" width="${imgW}" height="${imgH}" style="width:100%;max-height:460px;object-fit:cover;border-radius:20px;margin:8px 0 44px" loading="lazy">

<h2>Benefits of Addressing It Now</h2>
<div class="check-list">${benefitsHtml}</div>

<h2>How the Process Works</h2>
<div class="process">${processHtml}</div>

<h2>Why Professional Application Matters</h2>
<p class="muted">${svc.whyPro}</p>

<h2>Why Choose ESE Seal</h2>
<p class="muted">Eric Enlow brings decades of hands-on masonry, concrete and weatherproofing experience to every project, and you work directly with him from estimate to completion — not a rotating crew or a call center. ESE Seal explains what's actually wrong before recommending a repair, and free estimates mean there's no cost to find out where you stand.</p>

<h2>Frequently Asked Questions</h2>
<div class="faq-list">${faqHtml}</div>

<h3 style="margin-top:34px">Related Services</h3>
<div class="service-links">${relatedHtml}</div>

</div><aside class="city-cta"><span class="eyebrow">Free estimate</span><h3>Have a ${svc.name.toLowerCase()} project?</h3><p class="muted">Tell Eric what's cracked, leaking, loose or deteriorated. You'll talk with the owner — not a call center.</p><a class="btn btn-primary" href="/contact.html?service=${encodeURIComponent(svc.name)}">Request an Estimate</a><a class="btn btn-dark" href="tel:${PHONE_HREF}">Call ${PHONE}</a><p class="muted" style="font-size:.82rem;margin-top:14px">Serving a 60-mile radius around Springfield, Missouri. See the <a href="/service-areas.html" style="color:var(--blue);font-weight:800">full service area list</a>.</p></aside></div></section>

<section class="section-sm" style="background:var(--stone)"><div class="container cta-band"><div><h2>Not sure this is the right service?</h2><p>Describe the problem and Eric will point you in the right direction.</p></div><a href="tel:${PHONE_HREF}" class="btn btn-white">Call ${PHONE}</a></div></section>
</main>
${footer()}
</body></html>`;
}

function servicesHub() {
  const canonical = `${BASE}/services.html`;
  const title = 'Masonry, Concrete & Waterproofing Services | ESE Seal';
  const description = 'Explore ESE Seal’s masonry repair, tuckpointing, chimney repair, foundation crack repair, waterproofing and concrete repair services in Springfield, MO.';
  const crumbLd = breadcrumbLd([{ name: 'Home', url: `${BASE}/` }, { name: 'Services', url: canonical }]);
  const cards = DATA.map(svc => `<article class="quick-service"><h3>${svc.name}</h3><p>${svc.intro.split('. ')[0]}.</p><a href="/services/${svc.slug}.html">Learn more →</a></article>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}">
<link rel="icon" href="/icon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="stylesheet" href="/styles.css">
${headMeta({ title, description, canonical })}
<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS_LD)}</script>
<script type="application/ld+json">${JSON.stringify(crumbLd)}</script>
</head><body>
${header()}
<main id="main">
<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a> / Services</div><h1>Masonry, concrete &amp; waterproofing services</h1><p>ESE Seal repairs the actual failure point &mdash; cracked masonry, deteriorated mortar, concrete damage or a path where water is entering the structure. Every service below can be requested on its own or evaluated together during a single free estimate.</p></div></section>
<section class="section"><div class="container">
<div class="quick-services">${cards}</div>
<div class="section" style="padding-bottom:0"><span class="eyebrow">Additional Exterior Services</span><h2>Sealing, caulking &amp; exterior cleaning</h2><p class="muted" style="max-width:760px">ESE Seal's public service listings also include exterior caulking and power washing. These can be useful as part of repair preparation, maintenance or restoration depending on the project &mdash; ask about it when you request an estimate. As ESE Seal adds new exterior protection services, they'll be listed here first.</p></div>
</div></section>
<section class="section-sm" style="background:var(--stone)"><div class="container cta-band"><div><h2>Not sure which service fits?</h2><p>That's exactly what the estimate is for. Let Eric look at the condition and recommend the practical repair.</p></div><a href="/contact.html" class="btn btn-white">Start Here</a></div></section>
</main>
${footer()}
</body></html>`;
}

const outDir = path.join(process.cwd(), 'services');
fs.mkdirSync(outDir, { recursive: true });
DATA.forEach(svc => fs.writeFileSync(path.join(outDir, `${svc.slug}.html`), servicePage(svc)));
fs.writeFileSync(path.join(process.cwd(), 'services.html'), servicesHub());
console.log(`Generated ${DATA.length} ESE Seal service pages + services.html hub.`);

module.exports = { DATA };
