/* ============================================================
   MANIKCHAND PAN MASALA - RENDER ENGINE
   Reads window.SITE_DATA and builds the whole page.
   ============================================================ */

(function () {
  "use strict";

  var D = window.SITE_DATA || {};

  /* ---------- helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function waLink(text) {
    var num = (D.contact && D.contact.whatsappRaw) || "";
    var base = "https://wa.me/" + num;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  /* icon set (inline svg) */
  var ICONS = {
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-10 0 9-3 17-9 17z"/><path d="M9 17c1-4 4-7 8-9"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.4H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 6.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 4.6V4a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20l1-4.1a8.4 8.4 0 0 1-1-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.3-7-11A7 7 0 0 1 19 10c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  function brandMarkup() {
    var b = D.brand || {};
    return '<span class="brand__mark">' + (b.logoText || "M") + '</span>' +
      '<span class="brand__text">' +
        '<span class="brand__name">' + b.name + '<sup>' + (b.tm || "") + '</sup></span>' +
        '<span class="brand__sub">Pan Masala</span>' +
      '</span>';
  }

  /* ---------- Warning strip ---------- */
  function renderWarnStrip() {
    var w = D.warnings || {};
    el("warnStrip").innerHTML = '<b>Statutory Warning:</b> ' + w.panMasalaHealth +
      ' Tobacco is injurious to health. ' + w.minors;
  }

  /* ---------- Header / Nav ---------- */
  function renderHeader() {
    el("brandLogo").innerHTML = brandMarkup();

    var nav = el("primaryNav");
    nav.innerHTML = (D.nav || []).map(function (n) {
      return '<a href="' + n.href + '">' + n.label + '</a>';
    }).join("");

    var wa = el("navWhatsapp");
    wa.href = waLink("Hello Manikchand, I would like to enquire about your products.");
    wa.textContent = "WhatsApp";

    el("fabWhatsapp").href = waLink("Hello Manikchand, I would like to enquire about your products.");
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var h = D.hero || {}, t = D.taglines || {}, w = D.warnings || {}, b = D.brand || {};
    var secondary = h.ctaSecondary || {};
    var secHref = secondary.href === "wa" ? waLink("Hello Manikchand, I would like to enquire about your products.") : secondary.href;
    var secTarget = secondary.href === "wa" ? ' target="_blank" rel="noopener"' : '';

    el("home").innerHTML =
      '<div class="hero__bg"><img src="' + h.image + '" alt="' + b.name + ' Pan Masala" /></div>' +
      '<div class="container"><div class="hero__inner">' +
        '<span class="hero__kicker reveal in">' + (h.kicker || "") + '</span>' +
        '<h1 class="hero__name reveal in" data-delay="1">' + b.name + '<sup>' + (b.tm || "") + '</sup></h1>' +
        '<div class="hero__title-hi reveal in" data-delay="1">' + (t.primaryHi || "") + '</div>' +
        '<div class="hero__sub-hi reveal in" data-delay="2">' + (t.secondaryHi || "") + '</div>' +
        '<p class="hero__en reveal in" data-delay="2">' + (t.english || "") + '</p>' +
        '<div class="hero__badge reveal in" data-delay="2"><span class="dot"></span>' + (w.panMasalaBadge || "") + '</div>' +
        '<div class="hero__cta reveal in" data-delay="3">' +
          '<a class="btn btn--gold" href="' + ((h.ctaPrimary && h.ctaPrimary.href) || "#products") + '">' + ((h.ctaPrimary && h.ctaPrimary.label) || "Explore") + '</a>' +
          '<a class="btn btn--ghost" href="' + secHref + '"' + secTarget + '>' + (secondary.label || "Enquire") + '</a>' +
        '</div>' +
      '</div></div>' +
      '<div class="hero__scroll"><div class="mouse"></div>Scroll</div>';
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var a = D.about || {};
    var paras = (a.paragraphs || []).map(function (p) { return '<p>' + p + '</p>'; }).join("");
    var stats = (a.stats || []).map(function (s, i) {
      return '<div class="stat reveal" data-delay="' + (i % 4) + '"><div class="stat__value">' + s.value + '</div><div class="stat__label">' + s.label + '</div></div>';
    }).join("");

    el("about").className = "section section--alt about";
    el("about").innerHTML =
      '<div class="container">' +
        '<div class="about__grid">' +
          '<div class="about__copy reveal">' +
            '<span class="eyebrow">About Us</span>' +
            '<h2 class="about__heading">' + a.heading + '</h2>' +
            '<div class="gold-rule gold-rule--left"></div>' +
            '<p class="about__lead">' + a.lead + '</p>' +
            '<div class="about__text">' + paras + '</div>' +
          '</div>' +
          '<div class="about__media reveal" data-delay="1"><img src="assets/img/box-sachet.jpg" alt="Manikchand product" loading="lazy" /></div>' +
        '</div>' +
        '<div class="stats">' + stats + '</div>' +
      '</div>';
  }

  /* ---------- Products ---------- */
  function productCard(p) {
    var w = D.warnings || {};
    var media;
    if (p.image) {
      media = '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" />';
    } else {
      media = '<div class="card__placeholder"><span>' + (D.brand.logoText || "M") + '</span><small>' + p.name + '</small></div>';
    }
    var ribbon = "";
    if (p.badge) {
      var cls = /coming/i.test(p.badge) ? "card__ribbon card__ribbon--gold" : "card__ribbon";
      ribbon = '<span class="' + cls + '">' + p.badge + '</span>';
    }
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("");
    var meta = "";
    if (p.price || p.weight) {
      meta = '<div class="card__meta">' +
        (p.price ? '<span class="card__price">' + p.price + '</span>' : '<span></span>') +
        (p.weight ? '<span class="card__weight">' + p.weight + '</span>' : '') +
        '</div>';
    }
    var warnText = p.warningType === "tobacco" ? w.tobaccoHealth : w.panMasalaHealth;
    var warnCls = p.warningType === "tobacco" ? "card__warn card__warn--tobacco" : "card__warn";

    return '<article class="card reveal">' +
      '<div class="card__media">' + media + ribbon + '</div>' +
      '<div class="card__body">' +
        '<div class="card__tags">' + tags + '</div>' +
        '<h3 class="card__name">' + p.name + '</h3>' +
        '<p class="card__desc">' + p.desc + '</p>' +
        meta +
        '<div class="' + warnCls + '">' + warnText + '</div>' +
      '</div>' +
    '</article>';
  }

  function renderProducts() {
    var cards = (D.products || []).map(productCard).join("");
    el("products").innerHTML =
      '<div class="container">' +
        '<div class="section__head reveal">' +
          '<span class="eyebrow">Our Range</span>' +
          '<h2 class="section__title">Crafted for the Connoisseur</h2>' +
          '<div class="gold-rule"></div>' +
          '<p class="section__lead">From premium flavoured pan masala to mouth fresheners and export-quality blends, every product carries the Manikchand promise of purity and taste.</p>' +
        '</div>' +
        '<div class="product-grid">' + cards + '</div>' +
      '</div>';
  }

  /* ---------- Quality ---------- */
  function renderQuality() {
    var pillars = (D.quality || []).map(function (q, i) {
      return '<div class="pillar reveal" data-delay="' + i + '">' +
        '<div class="pillar__icon">' + (ICONS[q.icon] || ICONS.shield) + '</div>' +
        '<h3>' + q.title + '</h3><p>' + q.desc + '</p></div>';
    }).join("");

    el("quality").innerHTML =
      '<div class="container">' +
        '<div class="section__head reveal">' +
          '<span class="eyebrow">Quality & Craftsmanship</span>' +
          '<h2 class="section__title">Quality Is Our Identity</h2>' +
          '<div class="gold-rule"></div>' +
          '<p class="section__lead">At Manikchand, quality is not an act, it is our identity. Every step is governed by global standards.</p>' +
        '</div>' +
        '<div class="pillars">' + pillars + '</div>' +
      '</div>';
  }

  /* ---------- Gallery + Videos ---------- */
  function renderGallery() {
    var imgs = (D.gallery || []).map(function (g, i) {
      return '<div class="masonry__item reveal" data-index="' + i + '"><img src="' + g.src + '" alt="' + g.alt + '" loading="lazy" /></div>';
    }).join("");

    var vids = (D.videos || []).map(function (v) {
      return '<div class="video-card reveal"><video controls preload="metadata" poster="' + (v.poster || "") + '"><source src="' + v.src + '" type="video/mp4" /></video></div>';
    }).join("");

    el("gallery").className = "section section--alt gallery";
    el("gallery").innerHTML =
      '<div class="container">' +
        '<div class="section__head reveal">' +
          '<span class="eyebrow">Gallery & Media</span>' +
          '<h2 class="section__title">The Manikchand World</h2>' +
          '<div class="gold-rule"></div>' +
        '</div>' +
        '<div class="masonry">' + imgs + '</div>' +
        (vids ? '<h3 class="videos__title">Watch Our Story</h3><div class="videos">' + vids + '</div>' : '') +
      '</div>';
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var c = D.contact || {}, bank = D.bank || {};
    var items =
      contactItem(ICONS.phone, "Toll Free", c.tollFree, "tel:" + (c.tollFreeRaw || "")) +
      contactItem(ICONS.chat, "WhatsApp", c.whatsapp, waLink("Hello Manikchand, I would like to enquire about your products.")) +
      contactItem(ICONS.mail, "Email", c.email, "mailto:" + c.email) +
      contactItem(ICONS.pin, "Address", c.address, "");

    var bankRows = "";
    if (bank.show) {
      bankRows =
        '<div class="bank">' +
          '<h4>Company Bank Details</h4>' +
          bankRow("Bank", bank.name) +
          bankRow("A/C Name", bank.accountName) +
          bankRow("A/C Number", bank.accountNumber) +
          bankRow("IFSC", bank.ifsc) +
        '</div>';
    }

    el("contact").innerHTML =
      '<div class="container">' +
        '<div class="section__head reveal">' +
          '<span class="eyebrow">Get In Touch</span>' +
          '<h2 class="section__title">Contact & Enquiry</h2>' +
          '<div class="gold-rule"></div>' +
        '</div>' +
        '<div class="contact__grid">' +
          '<div class="contact__cards reveal">' + items + '</div>' +
          '<div class="enquiry reveal" data-delay="1">' +
            '<h3>For Dealership & Bulk Orders</h3>' +
            '<p>' + (c.enquiryNote || "") + '</p>' +
            '<a class="btn btn--whatsapp" target="_blank" rel="noopener" href="' + waLink("Hello Manikchand, I am interested in dealership / bulk orders. My details: ") + '">Send Enquiry on WhatsApp</a>' +
            bankRows +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function contactItem(icon, label, value, href) {
    var inner =
      '<div class="contact-item__icon">' + icon + '</div>' +
      '<div><div class="contact-item__label">' + label + '</div>' +
      (href ? '<a class="contact-item__value" href="' + href + '"' + (/^https/.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + value + '</a>'
            : '<div class="contact-item__value">' + value + '</div>') +
      '</div>';
    return '<div class="contact-item">' + inner + '</div>';
  }
  function bankRow(k, v) {
    return '<div class="bank__row"><span>' + k + '</span><span>' + v + '</span></div>';
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var f = D.footer || {}, c = D.contact || {}, w = D.warnings || {};
    var navLinks = (D.nav || []).map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join("");

    el("footer").innerHTML =
      '<div class="container">' +
        '<div class="footer__top">' +
          '<div class="footer__brand">' +
            '<a href="#home" class="brand">' + brandMarkup() + '</a>' +
            '<div class="footer__tagline">' + (f.tagline || "") + '</div>' +
            '<p class="footer__desc">Manufactured by ' + (D.brand.parent || "") + ', ' + (D.brand.location || "") + '</p>' +
          '</div>' +
          '<div class="footer__col"><h4>Explore</h4>' + navLinks + '</div>' +
          '<div class="footer__col"><h4>Contact</h4>' +
            '<a href="tel:' + (c.tollFreeRaw || "") + '">Toll Free: ' + c.tollFree + '</a>' +
            '<a href="' + waLink("") + '" target="_blank" rel="noopener">WhatsApp: ' + c.whatsapp + '</a>' +
            '<a href="mailto:' + c.email + '">' + c.email + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer__warn"><b>Statutory Warning:</b> ' + w.panMasalaHealth + ' Tobacco is injurious to health. ' + w.minors + ' This website is intended for adults only.</div>' +
      '<div class="footer__bar">&copy; ' + new Date().getFullYear() + ' ' + (f.copyright || "") + '</div>';
  }

  /* ---------- Interactions ---------- */
  function initInteractions() {
    var header = el("header");
    var toTop = el("toTop");
    var toggle = el("navToggle");
    var nav = el("primaryNav");

    // mobile nav backdrop
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function closeNav() {
      nav.classList.remove("open");
      backdrop.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      backdrop.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    backdrop.addEventListener("click", closeNav);
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeNav(); });

    // scroll effects
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 20);
      toTop.classList.toggle("show", y > 600);

      var cur = "";
      sections.forEach(function (s) {
        if (y >= s.offsetTop - 120) cur = s.id;
      });
      navLinks.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // reveal on scroll
    var revealEls = document.querySelectorAll(".reveal:not(.in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (n) { io.observe(n); });
    } else {
      revealEls.forEach(function (n) { n.classList.add("in"); });
    }

    initLightbox();
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var box = el("lightbox"), img = el("lightboxImg");
    var items = Array.prototype.slice.call(document.querySelectorAll(".masonry__item"));
    var gallery = D.gallery || [];
    var idx = 0;

    function open(i) {
      idx = i;
      img.src = gallery[i].src;
      img.alt = gallery[i].alt || "";
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
    }
    function close() { box.classList.remove("open"); box.setAttribute("aria-hidden", "true"); }
    function move(d) { idx = (idx + d + gallery.length) % gallery.length; open(idx); }

    items.forEach(function (it, i) { it.addEventListener("click", function () { open(i); }); });
    el("lightboxClose").addEventListener("click", close);
    el("lightboxPrev").addEventListener("click", function () { move(-1); });
    el("lightboxNext").addEventListener("click", function () { move(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    if (!window.SITE_DATA) { console.error("SITE_DATA not found. Check js/data.js"); return; }
    renderWarnStrip();
    renderHeader();
    renderHero();
    renderAbout();
    renderProducts();
    renderQuality();
    renderGallery();
    renderContact();
    renderFooter();
    initInteractions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
