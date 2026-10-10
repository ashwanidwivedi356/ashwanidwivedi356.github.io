# NextGenAI Infotech — Website

A static website for a **full-service web and software studio** serving Indian businesses: business websites, e-commerce, ad landing pages, web apps, mobile apps, SEO, WhatsApp / chatbot / AI automation, and redesign + maintenance. AI is one service among many, not the identity.

Stack: HTML5, CSS3, vanilla JavaScript, Bootstrap 5 (grid + navbar collapse only), Bootstrap Icons, Google Fonts, Three.js (hero only, lazy-loaded). No build step.

## Run it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8080      # then open http://localhost:8080
```

Bootstrap, icons, fonts and Three.js load from CDNs, so you need internet. If Three.js can't load, the hero falls back to a 2D canvas.

## Pages and structure

```
index.html      Home: hero, marquee, offer, services, industries, how it works, work, pricing, trust, FAQ, CTA, contact
services.html   8 services in detail + industries
work.html       Filterable sample portfolio (9 sample projects)
pricing.html    3 packages, one-time / yearly-maintenance toggle, FAQ
about.html      Who we are, technologies, trust points, process
contact.html    Contact details + quote form
privacy.html  terms.html
css/style.css   tokens → base → layout → components → sections → motion → media
js/main.js      CONFIG + all UI behaviour (nav, reveal, filter, FAQ, pricing, form)
js/effects.js   Three.js neural core, 2D fallback, ambient particle canvases
assets/  logo-mark.png, favicon.png, apple-touch-icon.png, og-cover.png
```

`solutions.html` from the earlier AI-focused version was removed; its industry content now lives in the "Industries we build for" section.

## What's on the site

- **Hero:** "Websites, apps & AI that grow Indian & global businesses", WhatsApp + View work CTAs, and a floating laptop + phone mockup group (pure CSS/SVG) over the Three.js scene. Tiers: Three.js (desktop) → 2D canvas (mobile / low-end / no WebGL) → static (reduced motion).
- **Services:** 8 cards, each with "Starting at ₹___".
- **Industries:** 9 tiles (restaurants, clinics, coaching, real estate, D2C, salons/gyms, CA/legal, manufacturers/exporters, startups).
- **How it works:** Free call → Design preview → Build & review → Launch + support. Free consultation / free mockup banner.
- **Work:** filterable grid (All / Websites / E-commerce / Apps / Dashboards) of inline-SVG sample screens, labelled as samples, not real clients.
- **Pricing:** Starter / Business / Custom with Indian number formatting, a one-time vs "with yearly maintenance" toggle, GST invoice, milestone payments (e.g. 40/40/20), UPI / bank transfer.
- **Trust:** Made in India, Hindi + English support, delivery time, post-launch support, transparent pricing. No invented testimonials, logos, ratings or statistics.
- **FAQ:** accordion (cost, timeline, domain/hosting, code ownership, payments, support), with FAQPage schema.
- **Mobile:** sticky bottom bar (Call / WhatsApp / Get Quote, safe-area aware), full-screen menu overlay, 44px+ tap targets. Desktop gets a floating WhatsApp button.
- **Micro-interactions:** magnetic primary buttons, card tilt + spotlight, scroll reveal, text reveal, technology marquee, smooth accordion. All motion is disabled under `prefers-reduced-motion`.

## Premium visual layer (v3)

- **Hero:** rotating "We build…" word, laptop that cycles through a website, store and dashboard screen, floating notification chips (new enquiry, order received, booking confirmed), aurora glow, shimmering accent text. The notification chips are illustrative UI, not real data.
- **Services:** bento grid where every service has its own animated mini-scene (site building itself, UPI checkout, funnel, live chart, phone screens, local ranking, WhatsApp chat, security shield). The same scenes appear on `services.html`.
- **How it works:** sticky intro with a step list that highlights as you scroll and fills a progress line.
- **Details:** scroll-progress bar, custom cursor ring (desktop), second reversed industries marquee, animated glow border on the featured price card and offer banner, film-grain overlay (tablet and up), giant outlined footer wordmark, cross-fade page transitions between pages (Chrome / Edge).
- **Performance:** everything animates with transform and opacity only. Scene animations pause until a card scrolls into view. The grain, cursor ring and chips scale down or switch off on phones. All of it is off under `prefers-reduced-motion`.

### Hero v4 and pinned story

- **Hero:** much bigger headline, cursor "flashlight" that lights up the background grid, a true 3D tilt on the laptop / phone / notification chips (they sit at different depths and follow the mouse), and six tech icons orbiting the mockup.
- **Intro curtain:** a 1.8-second logo wipe on the first visit of a session only (skipped on later pages and under reduced motion).
- **Pinned scroll story ("Every screen your business needs"):** on desktop the section pins to the screen and the laptop switches between website, store, app and dashboard as you scroll. On mobile it becomes a normal list with an auto-cycling screen.

## Design tokens (`:root` in `css/style.css`)

Palette v5 "Navy · Signal cyan · Saffron". Change colours **only** here; CSS tints use the `--rgb-*` channels
(`rgba(var(--rgb-blue), .2)`) and `js/effects.js` reads the same channels for the canvases and the 3D hero.

| Token | Value | Contrast | Used for |
|-------|-------|----------|----------|
| `--bg` / `--bg-2` / `--bg-3` | `#05070f` / `#0a1020` / `#101a30` | | Page, alternate section, raised surfaces |
| `--text` / `--muted` / `--faint` | `#eef3ff` / `#a9b5d1` / `#8592b3` | 18.1 / 9.8 / 6.5 : 1 | Headings / body / captions |
| `--blue-strong` → `--blue-deep` | `#2563eb` → `#1d4ed8` | white text 5.2 : 1 | Primary buttons |
| `--blue` / `--blue-soft` | `#3b82f6` / `#7aa7ff` | 5.5 / 8.4 : 1 | Accents, links |
| `--cyan` | `#22d3ee` | 11.1 : 1 | "AI signal": eyebrows, icons, focus ring |
| `--violet` | `#5b8def` | | Periwinkle (the old purple was retired) |
| `--saffron` / `--amber` | `#ff9933` / `#ffb84d` | 9.4 / 11.7 : 1 | Prices, main CTA, highlights only |
| `--line-control` | `#53679a` | 3.6 : 1 | Borders of inputs, toggles, filter and option buttons (WCAG 1.4.11) |
| `--ok` / `--err` / `--wa` | `#4ade80` / `#ff8fa0` / `#25d366` | | Status, WhatsApp |

Fonts: **Space Grotesk** (headings) + **Inter** (body), now **self-hosted** in `assets/fonts/` (SIL Open Font
License, latin + latin-ext for ₹) and preloaded, with metric-matched Arial fallbacks. No Google Fonts request.

## Before you deploy: details only you can supply

The site is deploy-ready as is. Anything that needs your details is **hidden until you fill it in**, so nothing looks unfinished. Edit `js/main.js` → `CONFIG`:

| Key | Effect once filled |
|-----|--------------------|
| `whatsappNumber` | **Do this first.** Digits with country code, e.g. `919876543210`. Until set, WhatsApp buttons go to the contact page. |
| `phone` | Shows all Call buttons (mobile bar, menu, hero, footer, contact page). |
| `email`, `address` | Show in the footer and on the contact page. |
| `social` | LinkedIn / Instagram / GitHub icons appear only for URLs you set. |
| `pricing` | Package prices. **Current numbers are sample values**; set your real ones. |
| `startingAt` | "Starting at ₹X" appears on a service card only when you set it. |
| `delivery`, `whatsappMessage` | Delivery time text and the default WhatsApp message. |
| `formEmail` | Inbox that receives form enquiries (sent through FormSubmit, not shown on the page). **First submission after deploy:** FormSubmit emails an activation link to this address; click it once. To switch to Formspree / EmailJS / your own API, edit `submitInquiry()` in `js/main.js`. |

**Domain:** replace `https://www.example.com` with your real domain in every page's `canonical` / `og:` tags / JSON-LD, plus `robots.txt` and `sitemap.xml` (a find-and-replace across the folder does it).

**Also check:** the FAQ answers and delivery claims match how you actually work, and have `privacy.html` / `terms.html` (templates) reviewed. Portfolio items are labelled as samples; swap in real projects when you have them. There are intentionally **no** testimonials, client logos or ratings. Add real ones only with permission.

## SEO

`lang="en-IN"`, unique titles and descriptions, Open Graph + Twitter tags, canonical placeholders, `ProfessionalService` (LocalBusiness-style) JSON-LD, `FAQPage` JSON-LD, one H1 per page, semantic landmarks, skip link, ARIA labels.

## Performance notes

Mobile and low-end devices skip Three.js and use the lite 2D canvas. Below-the-fold canvases start only near the viewport. Animation loops pause when off-screen or the tab is hidden. Fonts use `display=swap` and CDNs are preconnected. There are no raster images (all visuals are SVG/CSS), so there is no layout shift from images.

## Notes

- The flag in "Made in India 🇮🇳" is an emoji; Windows shows "IN" instead of a flag. Phones, macOS and Linux show the flag.
- I verified the layout in headless Chrome at desktop and phone widths. A Lighthouse run on your real deployment is still worth doing.

## V5 premium pass (what changed)

- **Palette + contrast:** new tokens above; every hard-coded colour in CSS, inline SVG and `effects.js` mapped to them. Primary button text went from 3.9:1 to 5.2:1; control borders from ~1.8:1 to 3.6:1. Saffron is now reserved for prices, the main CTA and highlights.
- **Hero:** "Indian & global businesses", AI-first badge, rotating "We build…" list covering all development types, and an affordability line built from `CONFIG` (Websites from ₹X, AI automation from ₹Y; change the numbers in `CONFIG.pricing` / `CONFIG.estimator`).
- **3D hero (desktop):** "AI network": neurons that fire (shader points) and synapses carrying travelling signal pulses (shader lines), colours from the tokens, additive glow without postprocessing. Three.js now loads when the browser is idle. Phones / low-end keep the 2D canvas (now with firing nodes and pulses); reduced motion keeps the static frame.
- **Accessibility:** automation tabs and the integration hub are proper ARIA tabs (arrow keys, Home/End, one tab stop); the hub's auto-tour pauses on hover/focus and has a Pause button; quieter live regions (ROI announces once after a slider settles, the flow log announces only runs you start); `color-scheme: dark`; no more `transition: all`; focus isn't hidden behind the mobile bar; Work page heading order fixed.
- **Motion:** the automation demo is the one orchestrated moment (node ping, data packets crossing connectors, typed log with caret); estimator result gives a 180 ms change cue. CSS / WAAPI only, no GSAP (it would add ~70 KB for no visible gain). Decorative loops pause when their section is off-screen.
- **Responsive:** no horizontal overflow at 360–1440 px (the `g-5` gutters overhung phone screens); SLA table has sticky row labels and a swipe hint on phones; hub labels fit on small phones; estimator options use a 2-column grid on phones; fixed estimator text sizes that `.card-nx p` was overriding.
- **Edge cases:** ROI no longer shows ₹0 for tiny values; very long contact messages are shortened in the email link (links over ~2,000 characters fail silently in some email apps); name and message have `maxlength`.
- **Performance:** CLS measured at 0.00 on every page (was up to 0.22, caused by font swap re-wrapping headings); hero price line is in the HTML so it doesn't shift the page.
- **Photography:** 51 CC0 photos from StockSnap (via Openverse) plus 9 small marquee chips, graded to the navy palette, WebP, under 1 MB in total (each page loads only its own; below-the-fold ones are lazy-loaded). Home: dark city photo behind the hero, photo chips in the industries marquee, photo in the free-consultation banner, thumbnails in "Every screen", a photo layer under each of the 8 service scenes, photos on the capability cards, industry tiles and section heads. Every other page: page-hero photo, section photos and a background photo in the closing call-to-action. Larger photos carry a "Stock photo (CC0)" caption; none show your team, office or clients.

| File (`assets/images/photos/`) | Source (CC0) |
|---|---|
| `ind-restaurant.webp` | [Restaurant Kitchen](https://stocksnap.io/photo/restaurant-kitchen-0HCMIT272C) |
| `ind-clinic.webp` | [Doctor Mask](https://stocksnap.io/photo/doctor-mask-GWE6UQDBTN) |
| `ind-coaching.webp` | [Student School](https://stocksnap.io/photo/student-school-1KOT8HDPAX) |
| `ind-realestate.webp` | [Woodpaneling House](https://stocksnap.io/photo/woodpaneling-house-582053B25E) |
| `ind-d2c.webp` | [Ecommerce Shopping](https://stocksnap.io/photo/ecommerce-shopping-RZWM4T2UAD) |
| `ind-fitness.webp` | [Weights Dumbbells](https://stocksnap.io/photo/weights-dumbbells-QP7WI19WFG) |
| `ind-legal.webp` | [Business Document](https://stocksnap.io/photo/business-document-AB4F938C85) |
| `ind-manufacturing.webp` | [Factory Automotive](https://stocksnap.io/photo/factory-automotive-2PJ81W5Q7X) |
| `ind-startup.webp` | [Macbook Laptop](https://stocksnap.io/photo/macbook-laptop-LEJ7HJ5BEA) |
| `about-workspace.webp` | [Code Coding](https://stocksnap.io/photo/code-coding-FSPLFPQBCZ) |
| `enterprise-planning.webp` | [Team Meeting](https://stocksnap.io/photo/team-meeting-VQXYE2ZEHC) |
| `ai-network.webp` | [Technology Network](https://stocksnap.io/photo/technology-network-PN7RVGLUUD) |
| `integrations-devices.webp` | [Phone Hand](https://stocksnap.io/photo/phone-hand-OMHRCBTI8N) |
| `services-workspace.webp` | [Laptop Desk](https://stocksnap.io/photo/laptop-desk-JCXQS3IVWD) |
| `work-wireframes.webp` | [Office Work](https://stocksnap.io/photo/office-work-42H3JH8QI5) |
| `pricing-calculator.webp` | [Calculator Numbers](https://stocksnap.io/photo/calculator-numbers-VVXW9WBTB8) |
| `contact-phone.webp` | [Mobile Smartphone](https://stocksnap.io/photo/mobile-smartphone-DLITZEAVJJ) |
| `cap-ai.webp` | [Robot Technology](https://stocksnap.io/photo/robot-technology-WUBMLJRYEK) |
| `cap-integrations.webp` | [Ethernet Cables](https://stocksnap.io/photo/ethernet-cables-B4I4XD7WY4) |
| `cap-platform.webp` | [Code Technology](https://stocksnap.io/photo/code-technology-9OQTUSUS0M) |
| `cap-cloud.webp` | [Servers Woman](https://stocksnap.io/photo/servers-woman-ZYGIOUX4QU) |
| `how-wireframe.webp` | [Design Wireframe](https://stocksnap.io/photo/design-wireframe-20VFXOOUWG) |
| `about-code.webp` | [Coding Programming](https://stocksnap.io/photo/coding-programming-PBTF1NEBCG) |
| `about-plan.webp` | [Whiteboard Post-Itnotes](https://stocksnap.io/photo/whiteboard-post-itnotes-YR89OQFMT1) |
| `ai-messaging.webp` | [Man Browsing](https://stocksnap.io/photo/man-browsing-U039DBUOV1) |
| `ai-paperwork.webp` | [Filefolders Business](https://stocksnap.io/photo/filefolders-business-6RHKEELJ8F) |
| `ai-keys.webp` | [Key Lock](https://stocksnap.io/photo/key-lock-SZE0NDYC0F) |
| `ai-start.webp` | [Lifestyle Office](https://stocksnap.io/photo/lifestyle-office-BHPWRL9YQ7) |
| `int-dashboard.webp` | [Business Working](https://stocksnap.io/photo/business-working-PHE63L27S6) |
| `int-hardware.webp` | [Computer Ram](https://stocksnap.io/photo/computer-ram-52KJ8KZGWY) |
| `int-analytics.webp` | [Macbook Laptop](https://stocksnap.io/photo/macbook-laptop-DUAHA1V312) |
| `ent-discussion.webp` | [Business People](https://stocksnap.io/photo/business-people-DUXISHKTT3) |
| `ent-proposal.webp` | [Office Work](https://stocksnap.io/photo/office-work-UP9J4EZYNJ) |
| `ent-meeting.webp` | [Business Team](https://stocksnap.io/photo/business-team-V8NHXQVQ70) |
| `ent-security.webp` | [Padlock Gate](https://stocksnap.io/photo/padlock-gate-2CIM1SFTOK) |
| `ent-planning.webp` | [Woman Business](https://stocksnap.io/photo/woman-business-NJP1LFA6EW) |
| `hero-city.webp` | [Cityscape Skyline](https://stocksnap.io/photo/cityscape-skyline-KDOIQSH4ZW) |
| `offer-phone.webp` | [Iphone Smartphone](https://stocksnap.io/photo/iphone-smartphone-ODN23L0AC9) |
| `sc-web.webp` | [Macbook Computer](https://stocksnap.io/photo/macbook-computer-6UHHE19YG7) |
| `sc-store.webp` | [Woman Mobile](https://stocksnap.io/photo/woman-mobile-Q93BUD2Z3Z) |
| `sc-app.webp` | [Apps Smartphone](https://stocksnap.io/photo/apps-smartphone-XLCKX6HJKD) |
| `sc-dash.webp` | [Seo Ppc](https://stocksnap.io/photo/seo-ppc-9699Y6WKLD) |
| `svc-web.webp` | [Macbook Laptop](https://stocksnap.io/photo/macbook-laptop-F7OLW2SG0C) |
| `svc-store.webp` | [People Girl](https://stocksnap.io/photo/people-girl-R33KBON2SV) |
| `svc-ads.webp` | [Market Graph](https://stocksnap.io/photo/market-graph-5T50IEAQHE) |
| `svc-apps.webp` | [Macbook Laptop](https://stocksnap.io/photo/macbook-laptop-UNB7V2H5L4) |
| `svc-mobile.webp` | [Writing Paper](https://stocksnap.io/photo/writing-paper-J6YJ4W3B48) |
| `svc-seo.webp` | [Travel Map](https://stocksnap.io/photo/travel-map-0JXPKD87MQ) |
| `svc-whatsapp.webp` | [News Newspaper](https://stocksnap.io/photo/news-newspaper-OJXHDWMWV9) |
| `svc-maint.webp` | [Macbook Laptop](https://stocksnap.io/photo/macbook-laptop-R66E2T133W) |
| `cta-handshake.webp` | [Work Business](https://stocksnap.io/photo/work-business-J5LXKNDREC) |

`chip-*.webp` are 48 px crops of the `ind-*.webp` photos.

**Still yours to fill (proof for enterprise bids):** real case studies with outcomes, named team members with experience, client references, and any certifications you actually hold. The site has clearly marked slots for these and makes no invented claims.

**Not verified:** real devices (only headless Chrome with a software GPU), Safari/iOS rendering of the WebGL shaders, and a Lighthouse run on the live domain.
