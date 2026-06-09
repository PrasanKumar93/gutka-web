# Manikchand Pan Masala - Website

A premium, responsive, single-page static website for **Manikchand Pan Masala** by
**Global Manikchand Corporation of India**. Built with plain HTML + CSS + vanilla
JavaScript - no build step, no framework, hostable anywhere.

---

## How to preview

Just open `index.html` in any browser (double-click it). No server needed.

Optionally, to run a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## How to edit content (IMPORTANT)

**All text, prices, phone numbers, products, gallery images, and warnings live in one
file: [`js/data.js`](../js/data.js).** You never need to touch the HTML.

The file defines a single object, `window.SITE_DATA`, and `js/main.js` renders the
whole page from it. Common edits:

| I want to change...        | Edit in `js/data.js`                          |
| -------------------------- | --------------------------------------------- |
| Phone / WhatsApp / email   | `contact`                                     |
| Taglines                   | `taglines`                                    |
| A product (name/price/img) | `products` array                              |
| Add / remove a product     | add / remove an item in `products`            |
| Add a gallery photo        | drop file in `assets/img/`, add to `gallery`  |
| Quality pillars            | `quality`                                     |
| Bank details               | `bank`                                        |
| Statutory warnings         | `warnings`                                    |

### Adding a product

```js
{
  id: "new-product",
  name: "Product Name",
  image: "assets/img/your-image.jpg", // or "" for a styled placeholder
  price: "\u20b9 10",                  // optional
  weight: "2.5g",                      // optional
  desc: "Short description.",
  tags: ["Flavoured"],
  badge: "Coming Soon",                // optional ribbon
  warningType: "panmasala"             // or "tobacco"
}
```

> Note: we use a `.js` data file (not `.json`) so the site works when you open
> `index.html` directly from disk. Browsers block `fetch()` of local `.json` files.

---

## File structure

```
gutka-web/
├── index.html              # Section shells only (no hardcoded content)
├── css/
│   └── styles.css          # Design system + layout + responsive
├── js/
│   ├── data.js             # <-- SINGLE SOURCE OF TRUTH (edit this)
│   └── main.js             # Renders the page from SITE_DATA
├── assets/
│   ├── img/                # Web-optimized product & gallery images
│   └── video/              # Promo videos (promo-1.mp4, promo-2.mp4)
├── images/                 # Original source images (untouched)
├── videos/                 # Original source videos (untouched)
└── docs/
    ├── company-details.md
    └── website-plan.md     # This file
```

---

## Sections

1. **Statutory strip** - persistent legal warning bar at the very top.
2. **Header / Nav** - sticky, with logo, anchor links, WhatsApp button, mobile hamburger.
3. **Hero** - brand name, Hindi taglines, "No Tobacco / No Nicotine" badge, CTAs.
4. **About** - legacy story + key stats.
5. **Products** - responsive cards (pan masala, MC OO, gutkha, supari, mukhwas, khaini,
   lights). "Coming Soon" / "Export Only" ribbons. Per-card statutory warning.
6. **Quality** - three craftsmanship pillars on a dark navy band.
7. **Gallery & Media** - masonry image grid with lightbox + embedded promo videos.
8. **Contact** - toll-free, WhatsApp click-to-chat, email, address, dealership enquiry,
   and company bank details.
9. **Footer** - links, statutory warning, copyright.

Plus: floating WhatsApp button and a back-to-top button.

---

## Design

- **Palette:** deep navy `#0a1a3f`, royal gold `#c9a24a`, signature red `#c0162c`, ivory.
- **Fonts:** Cinzel (display serif), Marcellus (Hindi/accents), Poppins (body).
- **Motion:** scroll-reveal via `IntersectionObserver`, hover lifts, subtle pulses.
  Respects `prefers-reduced-motion`.
- **Responsive:** mobile-first; off-canvas nav under 760px; grids collapse gracefully.
- **Performance:** lazy-loaded images, no external JS dependencies.
- **SEO:** title, meta description, Open Graph tags, theme color.

---

## Legal / compliance

Per project decision, there is **no age-gate popup**. Compliance is handled through
clearly displayed statutory warnings:

- Top strip + footer warning bar on every screen.
- Hero "No Tobacco - No Nicotine" badge (pan masala).
- Per-product warning line (pan masala vs tobacco wording).
- "Not for sale to minors." in the footer.

Graphic medical-warning imagery and the busy distributor newspaper ad were intentionally
left out of the public gallery to keep the brand presentation premium.

---

## Assets mapping

| Product / use            | File                               |
| ------------------------ | ---------------------------------- |
| Hero background          | `assets/img/hero-banner.jpg`       |
| Premium Pan Masala (Rs10)| `assets/img/premium-pan-masala.jpg`|
| Global Manikchand (Rs5)  | `assets/img/global-manikchand.jpg` |
| MC OO Chewing Tobacco    | `assets/img/mc-oo.jpg`             |
| Gutkha (export)          | `assets/img/gutkha.jpg`            |
| Khaini (coming soon)     | `assets/img/khaini.jpg`            |
| Lights (coming soon)     | `assets/img/lights.jpg`            |
| Gallery                  | box-sachet, boxes-table, jute-bags, label, global-pack-city |
| Videos                   | `assets/video/promo-1.mp4`, `promo-2.mp4` |

Sweet Supari and Mukhwas have no source photo yet and render as elegant branded
placeholders until images are added.
