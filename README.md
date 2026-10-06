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

- **Hero:** "Websites & apps that grow Indian businesses", WhatsApp + View work CTAs, and a floating laptop + phone mockup group (pure CSS/SVG) over the Three.js scene. Tiers: Three.js (desktop) → 2D canvas (mobile / low-end / no WebGL) → static (reduced motion).
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

| Token | Value | Used for |
|-------|-------|----------|
| `--bg` / `--bg-2` / `--bg-3` | `#04060d` / `#080d1b` / `#0c1428` | Page, alternate section, raised surfaces |
| `--surface` | `rgba(14,22,42,.62)` | Glass cards |
| `--line` / `--line-strong` | `rgba(124,164,255,.14 / .32)` | Borders, dividers |
| `--blue` / `--blue-soft` | `#2f7bff` / `#6aa4ff` | Primary buttons, links |
| `--cyan` | `#22d3ee` | Eyebrows, icons, focus ring |
| `--violet` | `#8b6cf6` | Subtle highlights |
| **`--saffron`** | **`#ff9933`** | **Prices, hero accent, offer, active nav underline** |
| **`--amber`** | **`#ffb84d`** | **Hindi accent lines, gradient end, placeholders** |
| `--saffron-grad` | `#ff9933 → #ffb84d` | Hero accent text, saffron buttons, "most chosen" badge |
| `--saffron-line` | `rgba(255,153,51,.38)` | Saffron borders (offer banner, placeholder slots) |
| `--text` / `--muted` / `--faint` | `#eef3ff` / `#a3b0cf` / `#7d8bad` | Headings / body / captions |
| `--wa` | `#25d366` | WhatsApp floating button and mobile bar only |

Fonts: **Space Grotesk** (headings, prices) and **Inter** (body), both with `font-display: swap`. Radius 6px (buttons, inputs) and 10px (cards). Saffron is used sparingly so the dark blue base stays premium.

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
