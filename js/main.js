/* ==========================================================================
   NextGenAI Infotech — main.js
   UI behaviour: config → page, navbar + mobile menu, scroll reveal, text split,
   card tilt, magnetic buttons, hero scroll transition, portfolio filter,
   FAQ accordion, pricing toggle, contact form.
   Heavy visuals (Three.js / canvas) live in effects.js.
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     SITE CONFIG — fill these in. Everything on the site reads from here.
     Leave a value empty and the matching row / button is simply hidden
     (WhatsApp buttons fall back to the contact page).
     ====================================================================== */
  var CONFIG = {
    whatsappNumber: '919200968689',                // digits only with country code, e.g. '919876543210'
    whatsappMessage: 'Hi, I want a website for my business',                         
    email: 'nextgenaiinfotech01@gmail.com',       // public contact email shown on the site
    // How the contact form delivers: 'mailto' = opens the visitor's email app with the enquiry ready to send (default),
    // 'service' = sends silently through FormSubmit, 'both' = does both.
    submitMethod: 'mailto',
    formEmail: 'nextgenaiinfotech01@gmail.com',   // inbox that receives form enquiries (via FormSubmit). Not shown on the page.                         
    city: '',                            // e.g. 'Pune'
    address: 'Remote, India',                       // full office address
    delivery: '1 month 15 days',               // typical delivery time
    social: { linkedin: '', instagram: '', github: '' },

    // Package prices in ₹ (numbers). Sample values: replace with your real prices.
    pricing: {
      starter:  { once: 14999,  yearly: 4999 },
      business: { once: 39999,  yearly: 7999 },
      custom:   { from: 149999 }
    },
    // "Starting at ₹___" on service cards. Leave '' to keep the ₹___ placeholder.
    startingAt: { websites: '', ecommerce: '', landing: '', webapps: '', mobile: '', seo: '', whatsapp: '', maintenance: '' }
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Indian number formatting: 149999 -> "1,49,999" ---------------------- */
  function formatINR(n) {
    var s = String(Math.round(n)), last3 = s.slice(-3), rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return '₹' + (rest ? rest + ',' + last3 : last3);
  }

  /* ---- Config → page ----------------------------------------------------- */
  function waLink(msg) {
    return 'https://wa.me/' + (CONFIG.whatsappNumber || '') + '?text=' + encodeURIComponent(msg || CONFIG.whatsappMessage);
  }

  function applyConfig() {
    // WhatsApp links (optional per-link message in data-wa-msg)
    $$('[data-whatsapp]').forEach(function (a) {
      if (!CONFIG.whatsappNumber) return;                 // keep default href (contact page)
      a.href = waLink(a.getAttribute('data-wa-msg'));
      a.target = '_blank'; a.rel = 'noopener';
    });
    // Call links
    $$('[data-call]').forEach(function (a) {
      var digits = CONFIG.phone.replace(/[^\d+]/g, '');
      if (digits) a.href = 'tel:' + digits;
      else if (!a.hasAttribute('data-cfg')) a.hidden = true;     // no phone yet: hide Call buttons
    });
    $$('[data-needs-phone]').forEach(function (el) { if (!CONFIG.phone) el.hidden = true; });
    // Social icons
    $$('[data-social]').forEach(function (a) {
      var url = CONFIG.social[a.getAttribute('data-social')];
      if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; } else a.hidden = true;
    });
    $$('.social').forEach(function (box) {              // no social links set: hide the whole block
      if (!$$('a:not([hidden])', box).length) { box.hidden = true; var h = box.previousElementSibling; if (h && h.tagName === 'H2') h.hidden = true; }
    });
    // Text values: data-cfg="city" (falls back to the element's data-ph placeholder)
    $$('[data-cfg]').forEach(function (el) {
      var v = CONFIG[el.getAttribute('data-cfg')];
      if (v) { el.textContent = v; el.classList.remove('ph'); if (el.tagName === 'A' && el.getAttribute('data-cfg') === 'email') el.href = 'mailto:' + v; }
      else { var row = el.closest('li'); (row || el).hidden = true; }   // empty value: hide the whole row
    });
    // "Starting at" prices on service cards
    $$('[data-start]').forEach(function (el) {
      var v = CONFIG.startingAt[el.getAttribute('data-start')];
      if (v) el.textContent = formatINR(v); else { var box = el.closest('.start-price'); (box || el).hidden = true; }   // hide until a price is set
    });
    // Package prices: data-price="starter.once"
    $$('[data-price]').forEach(function (el) {
      var p = el.getAttribute('data-price').split('.'), v = CONFIG.pricing[p[0]] && CONFIG.pricing[p[0]][p[1]];
      el.textContent = v ? formatINR(v) : '₹__,___';
    });
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  /* ---- Navbar + full-screen mobile menu ------------------------------------ */
  function initNav() {
    var nav = $('.nx-nav'); if (!nav) return;
    var menu = $('#navMenu'), toggler = $('.nx-toggler');
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    if (!(menu && toggler && window.bootstrap)) return;

    var col = new bootstrap.Collapse(menu, { toggle: false });
    toggler.addEventListener('click', function () { col.toggle(); });
    menu.addEventListener('show.bs.collapse', function () { nav.classList.add('menu-open'); document.body.classList.add('menu-locked'); toggler.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('hide.bs.collapse', function () { nav.classList.remove('menu-open'); document.body.classList.remove('menu-locked'); toggler.setAttribute('aria-expanded', 'false'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { if (menu.classList.contains('show')) col.hide(); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('show')) { col.hide(); toggler.focus(); } });
    // if the viewport grows past the mobile breakpoint, make sure the lock is released
    window.matchMedia('(min-width: 992px)').addEventListener('change', function (m) { if (m.matches) { document.body.classList.remove('menu-locked'); nav.classList.remove('menu-open'); } });
  }

  /* ---- Scroll reveal ------------------------------------------------------ */
  function initReveal() {
    var targets = $$('.reveal, .timeline, [data-split]');
    if (!('IntersectionObserver' in window) || reduceMotion) { targets.forEach(function (t) { t.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  // Wraps each word of [data-split] in a masked span for a line-rise reveal.
  function initSplitText() {
    $$('[data-split]').forEach(function (el) {
      var w = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
              var o = document.createElement('span'), i = document.createElement('span');
              o.className = 'split-word'; o.style.setProperty('--w', w++); i.textContent = part; o.appendChild(i); frag.appendChild(o);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1) walk(n);
        });
      })(el);
      el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
      $$('.split-word', el).forEach(function (s) { s.setAttribute('aria-hidden', 'true'); });
    });
    var intro = $('.intro'), wait = (intro && !document.documentElement.classList.contains('no-intro') && !reduceMotion) ? 1300 : 0;
    setTimeout(function () { $$('[data-split].hero-split').forEach(function (h) { h.classList.add('split-ready'); }); }, wait);
  }

  /* ---- Card tilt + cursor spotlight (fine pointers only) ------------------- */
  function initCards() {
    if (!canHover) return;
    $$('.card-nx').forEach(function (card) {
      var raf = 0;
      card.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
          card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
          if (reduceMotion || card.hasAttribute('data-no-tilt')) return;
          var rx = ((y / r.height) - .5) * -6, ry = ((x / r.width) - .5) * 6;   // max ~3deg: subtle
          card.classList.add('is-tilting');
          card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
        });
      });
      card.addEventListener('pointerleave', function () { card.classList.remove('is-tilting'); card.style.transform = ''; });
    });
  }

  /* ---- Magnetic primary buttons -------------------------------------------- */
  function initMagnetic() {
    if (!canHover || reduceMotion) return;
    $$('.btn-nx--primary, .btn-nx--saffron').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.setProperty('--bx', (((e.clientX - r.left) / r.width - .5) * 10).toFixed(1) + 'px');
        btn.style.setProperty('--by', (((e.clientY - r.top) / r.height - .5) * 8).toFixed(1) + 'px');
      });
      btn.addEventListener('pointerleave', function () { btn.style.setProperty('--bx', '0px'); btn.style.setProperty('--by', '0px'); });
    });
  }

  /* ---- Cursor glow --------------------------------------------------------- */
  function initCursorGlow() {
    if (!canHover || reduceMotion) return;
    var g = document.createElement('div'); g.className = 'cursor-glow'; g.setAttribute('aria-hidden', 'true'); document.body.appendChild(g);
    var x = 0, y = 0, raf = 0;
    window.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY; g.classList.add('on');
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; g.style.transform = 'translate(' + x + 'px,' + y + 'px)'; });
    }, { passive: true });
    document.addEventListener('pointerleave', function () { g.classList.remove('on'); });
  }

  /* ---- Hero: mockup parallax + scroll-out transition ------------------------
     Mockups follow the pointer a few pixels. On scroll the visual drifts back
     (scale / translate / fade) while a cyan light bridge brightens at the hero's
     lower edge. One rAF-throttled listener, active only while the hero is visible. */
  function initHero() {
    var hero = $('.hero'); if (!hero || reduceMotion) return;
    var visual = $('.hero-visual', hero), text = $('.hero-text', hero), bridge = $('.light-bridge', hero), mock = $('.mockups', hero);
    if (mock && canHover) {
      window.addEventListener('pointermove', function (e) {
        mock.style.setProperty('--px', ((e.clientX / window.innerWidth - .5) * 2).toFixed(3));
        mock.style.setProperty('--py', ((e.clientY / window.innerHeight - .5) * 2).toFixed(3));
      }, { passive: true });
    }
    if (canHover) {                                   // cursor "flashlight": the grid lights up around the pointer
      var lit = 0;
      hero.addEventListener('pointermove', function (e) {
        if (lit) return;
        lit = requestAnimationFrame(function () {
          lit = 0; var r = hero.getBoundingClientRect();
          hero.style.setProperty('--hx', (e.clientX - r.left) + 'px'); hero.style.setProperty('--hy', (e.clientY - r.top) + 'px'); hero.classList.add('is-lit');
        });
      });
      hero.addEventListener('pointerleave', function () { hero.classList.remove('is-lit'); });
    }
    var ticking = false, inView = true, big = window.matchMedia('(min-width: 992px)');
    function update() {
      ticking = false;
      var p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.75)));
      if (visual) {
        visual.style.transform = (big.matches ? 'translateY(calc(-50% + ' + (p * 70) + 'px)) ' : 'translateY(' + (p * 40) + 'px) ') + 'scale(' + (1 - p * 0.22).toFixed(3) + ')';
        visual.style.opacity = (1 - p * 1.05).toFixed(3);
      }
      if (text) { text.style.transform = 'translateY(' + (p * -26).toFixed(1) + 'px)'; text.style.opacity = (1 - p * 0.9).toFixed(3); }
      if (bridge) bridge.style.setProperty('--p', p.toFixed(3));
    }
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(hero);
    window.addEventListener('scroll', function () { if (inView && !ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---- Portfolio filter ---------------------------------------------------- */
  function initFilters() {
    var bar = $('.filters'); if (!bar) return;
    var btns = $$('.filter-btn', bar), items = $$('.work-item');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        items.forEach(function (it) { it.classList.add('is-fading'); });
        setTimeout(function () {
          items.forEach(function (it) { it.classList.toggle('is-hidden', f !== 'all' && it.getAttribute('data-cat') !== f); });
          requestAnimationFrame(function () { items.forEach(function (it) { it.classList.remove('is-fading'); }); });
        }, reduceMotion ? 0 : 220);
      });
    });
  }

  /* ---- FAQ accordion ------------------------------------------------------- */
  function initFaq() {
    var qs = $$('.faq-q');
    qs.forEach(function (q) {
      q.addEventListener('click', function () {
        var open = q.getAttribute('aria-expanded') === 'true';
        qs.forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.closest('.faq-item').classList.remove('is-open'); });
        q.setAttribute('aria-expanded', open ? 'false' : 'true');
        q.closest('.faq-item').classList.toggle('is-open', !open);
      });
    });
    if (qs[0]) { qs[0].setAttribute('aria-expanded', 'true'); qs[0].closest('.faq-item').classList.add('is-open'); }   // first answer open by default
  }

  /* ---- Pricing toggle: one-time vs with yearly maintenance ------------------ */
  function initPricing() {
    var sw = $('#maintToggle'); if (!sw) return;
    var once = $('#lblOnce'), yearly = $('#lblYearly');
    function render() {
      var on = sw.getAttribute('aria-checked') === 'true';
      once.classList.toggle('on', !on); yearly.classList.toggle('on', on);
      $$('.price-sub[data-plan]').forEach(function (el) {
        var plan = CONFIG.pricing[el.getAttribute('data-plan')];
        if (!on) el.textContent = el.getAttribute('data-once');
        else el.textContent = plan && plan.yearly ? '+ ' + formatINR(plan.yearly) + ' / year · hosting, SSL, updates & support' : 'Maintenance plan quoted per project';
      });
    }
    sw.addEventListener('click', function () { sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); render(); });
    render();
  }

  /* ---- Contact form -------------------------------------------------------- */
  var VALIDATORS = {
    name: function (v) { return v.trim().length >= 2 || 'Please enter your name.'; },
    phone: function (v) { return /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a valid 10-digit mobile number.'; },
    businessType: function (v) { return !!v || 'Please choose your business type.'; },
    message: function (v) { return v.trim().length >= 10 || 'Tell us a little more (at least 10 characters).'; }
  };

  /* Delivers the enquiry to CONFIG.formEmail using FormSubmit (https://formsubmit.co).
     First ever submission: FormSubmit emails that inbox an activation link; click it once.
     To use another service (Formspree, EmailJS, your own API), replace the body of this function. */
  function submitInquiry(data) {
    if (data._honey) return Promise.resolve({ ok: true });            // spam bot filled the hidden field: pretend success
    if (!CONFIG.formEmail) return Promise.reject(new Error('No formEmail configured'));
    return fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONFIG.formEmail), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'New website enquiry from ' + data.name,
        _template: 'table', _captcha: 'false',
        Name: data.name, Phone: data.phone, 'Business type': data.businessType, Budget: data.budget || '-', Message: data.message, Page: location.href
      })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!(j && (j.success === true || j.success === 'true'))) throw new Error((j && j.message) || 'Send failed');
      return j;
    });
  }

  /* Opens the visitor's email app with the enquiry pre-filled and addressed to us.
     Also shows fallbacks (Gmail in the browser, WhatsApp) in case no email app is set up. */
  function openEmailApp(data, status, form) {
    var to = CONFIG.formEmail || CONFIG.email;
    var subject = 'New website enquiry from ' + data.name;
    var lines = ['Name: ' + data.name, 'Phone / WhatsApp: ' + data.phone, 'Business type: ' + data.businessType, 'Budget: ' + (data.budget || '-'), '', 'Message:', data.message, '', 'Sent from: ' + location.href];
    var mailto = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\r\n'));
    var gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\r\n'));
    var wa = waLink('Hi, I am ' + data.name + '. Business: ' + data.businessType + (data.budget ? '. Budget: ' + data.budget : '') + '. ' + data.message);
    status.className = 'form-status show ok';
    status.innerHTML = '<strong>Almost done!</strong> Your email app should open with your enquiry ready. Just press <strong>Send</strong>.<br>If nothing opened, use one of these:<br>' +
      '<span class="status-actions"><a class="btn-nx btn-nx--primary btn-nx--sm" href="' + mailto + '"><i class="bi bi-envelope" aria-hidden="true"></i> Open email app</a> ' +
      '<a class="btn-nx btn-nx--ghost btn-nx--sm" href="' + gmail + '" target="_blank" rel="noopener"><i class="bi bi-google" aria-hidden="true"></i> Open in Gmail</a> ' +
      '<a class="btn-nx btn-nx--ghost btn-nx--sm" href="' + wa + '" target="_blank" rel="noopener"><i class="bi bi-whatsapp" aria-hidden="true"></i> Send on WhatsApp</a></span>';
    status.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    window.location.href = mailto;                    // hands over to the device's email app
  }

  function initForm() {
    var form = $('#inquiryForm'); if (!form) return;
    var status = $('#formStatus'), btn = $('button[type="submit"]', form);

    // Prefill message from ?service=… (links from service cards / pricing)
    var svc = new URLSearchParams(location.search).get('service');
    if (svc && form.elements.message && !form.elements.message.value) form.elements.message.value = 'I am interested in: ' + svc + '. ';

    function check(field) {
      var fn = VALIDATORS[field.name]; if (!fn) return true;
      var res = fn(field.value), ok = res === true, err = $('#' + field.id + '-error');
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) { err.classList.toggle('show', !ok); if (!ok) err.querySelector('span').textContent = res; }
      return ok;
    }
    $$('.input-nx', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (VALIDATORS[f.name]) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status'; status.textContent = '';
      var firstBad = null;
      $$('.input-nx', form).forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }

      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.phone = '+91' + data.phone.replace(/[\s-]/g, '');
      var method = CONFIG.submitMethod || 'mailto';
      if (method !== 'service') { openEmailApp(data, status, form); if (method === 'both') submitInquiry(data).catch(function () {}); return; }
      btn.disabled = true; var label = btn.innerHTML; btn.innerHTML = 'Sending…';
      submitInquiry(data).then(function () {
        var msg = 'Hi, I am ' + data.name + '. Business: ' + data.businessType + (data.budget ? '. Budget: ' + data.budget : '') + '. ' + data.message;
        status.className = 'form-status show ok';
        status.innerHTML = '<strong>Thank you!</strong> We have received your enquiry and will contact you shortly.<br>';
        var a = document.createElement('a');
        a.className = 'btn-nx btn-nx--primary btn-nx--sm'; a.href = waLink(msg); a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = '<i class="bi bi-whatsapp" aria-hidden="true"></i> Continue on WhatsApp';
        status.appendChild(a); a.focus({ preventScroll: true });
        form.reset();
      }).catch(function (err) {
        if (window.console) console.warn('Enquiry email failed:', err && err.message);   // owner hint, e.g. 'needs Activation'
        var m = 'Hi, I am ' + data.name + '. Business: ' + data.businessType + '. ' + data.message;
        status.className = 'form-status show err';
        status.innerHTML = 'Sorry, we could not send that just now. Please send it on WhatsApp instead:<br>';
        var w = document.createElement('a'); w.className = 'btn-nx btn-nx--primary btn-nx--sm'; w.href = waLink(m); w.target = '_blank'; w.rel = 'noopener';
        w.innerHTML = '<i class="bi bi-whatsapp" aria-hidden="true"></i> Send on WhatsApp'; status.appendChild(w);
      }).then(function () { btn.disabled = false; btn.innerHTML = label; });
    });
  }

  /* ---- Scroll progress bar (top of page) ----------------------------------- */
  function initProgress() {
    var bar = $('.scroll-progress'); if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--sp', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update); update();
  }

  /* ---- "How it works": highlight the step at mid-screen, fill the progress line --- */
  function initSteps() {
    var list = $('.steps'); if (!list) return;
    var steps = $$('.step', list), ticking = false;
    function update() {
      ticking = false;
      var mid = window.innerHeight * 0.5, active = -1;
      steps.forEach(function (st, i) { if (st.getBoundingClientRect().top < mid + 40) active = i; });
      steps.forEach(function (st, i) { st.classList.toggle('is-active', i === active); st.classList.toggle('is-done', i < active); });
      var r = list.getBoundingClientRect();
      list.style.setProperty('--prog', Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update); update();
  }

  /* ---- Cursor ring: eased follower that grows over links and buttons --------- */
  function initCursorRing() {
    if (!canHover || reduceMotion) return;
    var ring = document.createElement('div'); ring.className = 'cursor-ring'; ring.setAttribute('aria-hidden', 'true'); document.body.appendChild(ring);
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      ring.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px)';
      raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.4) ? requestAnimationFrame(loop) : 0;   // stop when settled
    }
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY; ring.classList.add('on');
      ring.classList.toggle('grow', !!e.target.closest('a, button, select, input, textarea, label, [role="switch"]'));
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { ring.classList.remove('on'); });
  }

  /* ---- Pinned scroll story: scroll position picks the laptop screen ---------- */
  function initShowcase() {
    var sec = $('.showcase'); if (!sec) return;
    var track = $('.showcase-track', sec), items = $$('.sc-item', sec), screens = $$('.sc-screens > svg', sec), bar = $('.sc-bar i', sec);
    var desktop = window.matchMedia('(min-width: 992px)'), ticking = false, cur = -1;
    function set(i) {
      if (i === cur) return; cur = i;
      items.forEach(function (it, k) { it.classList.toggle('on', k === i); });
      screens.forEach(function (sv, k) { sv.classList.toggle('on', k === i); });
      if (bar) bar.style.setProperty('--scp', ((i + 1) / items.length).toFixed(2));
    }
    function update() {
      ticking = false;
      if (!desktop.matches) { items.forEach(function (it) { it.classList.add('on'); }); cur = -1; return; }   // mobile: list + auto-cycling screens
      var r = track.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(0.999, Math.max(0, -r.top / total)) : 0;
      set(Math.floor(p * items.length));
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update); update();
  }

  /* ---- Effects bootstrap (below-fold canvases start only when near viewport) -- */
  function initEffects() {
    var FX = window.NextGenFX; if (!FX) return;
    var hero = $('#heroVisual'); if (hero) FX.initHero(hero);
    $$('canvas.bg-canvas').forEach(function (c) {
      if (!('IntersectionObserver' in window)) { FX.ambient(c); return; }
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); FX.ambient(c); } }, { rootMargin: '300px' });
      io.observe(c);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyConfig(); initNav(); initSplitText(); initReveal(); initCards(); initMagnetic(); initCursorGlow();
    initHero(); initFilters(); initFaq(); initPricing(); initForm(); initProgress(); initSteps(); initShowcase(); initCursorRing(); initEffects();
  });
})();
