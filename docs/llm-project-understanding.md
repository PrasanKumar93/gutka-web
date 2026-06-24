# Project Understanding (for an AI assistant)

> Purpose: paste/feed this file to an AI assistant so it instantly understands the
> whole project — architecture, conventions, deployment, and gotchas — without
> re-reading every file. Keep it updated when the architecture changes.

---

## 1. What this is

A premium **single-page marketing website** for **Manikchand Pan Masala**, a brand of
**Global Manikchand Corporation of India** (based in Surat, Gujarat). The site showcases
products (pan masala, mouth fresheners, and some tobacco products), brand story, quality,
a media gallery, and contact/dealership info.

- **Live:** https://premiummanikchand.com
- **Repo:** `PrasanKumar93/gutka-web` (GitHub)
- **Audience:** B2B (dealers/distributors) and brand presence; primary CTA is WhatsApp.

It is a **static site** — no backend, no database, no API.

---

## 2. Tech stack

- **HTML + CSS + vanilla JavaScript** (no frameworks, no bundler for the runtime).
- **Node.js** is used only for a **build/prerender step** (`jsdom`), not at runtime.
- Fonts via Google Fonts (Cinzel, Marcellus, Poppins).
- No external runtime JS dependencies.

---

## 3. Core architecture — data-driven rendering

The single most important concept:

- **`js/data.js` is the single source of truth.** It defines one global object,
  `window.SITE_DATA`, containing ALL site content: brand, taglines, contact, warnings,
  nav, hero, about, products, quality pillars, gallery, videos, bank details, footer.
- **`js/main.js` is the render engine.** It reads `window.SITE_DATA` and builds every
  section's HTML (via `innerHTML`), then wires up interactions (sticky header,
  mobile nav, scroll-reveal, lightbox, back-to-top, image-save deterrents).
- **`index.html`** is the shell: `<head>` (meta/SEO) + empty `<section>` containers with
  IDs (`#home`, `#about`, `#products`, `#quality`, `#gallery`, `#contact`, plus
  `#header`, `#footer`, `#warnStrip`) that `main.js` fills.

A data file (`.js`) is used instead of `.json` so the site works when `index.html` is
opened directly from disk (browsers block `fetch()` of local `.json`).

---

## 4. The build / prerender step (important)

### Why it exists
Originally the raw `index.html` was nearly empty (≈14 words) because content was injected
by JavaScript at runtime. Search engines therefore saw a blank page → bad SEO.

### What it does
`npm run build` runs [`scripts/prerender.js`](../scripts/prerender.js):

1. Loads `index.html` into **jsdom** (a headless DOM).
2. Sets `window.__PRERENDER__ = true` and stubs `IntersectionObserver` (no-op).
3. `eval`s `js/data.js` then `js/main.js` in that DOM.
4. Dispatches `DOMContentLoaded` (jsdom stays in "loading" state, so `main.js`'s
   `init()` is parked on that event and must be triggered manually).
5. Removes build-only artifacts (the appended `.nav-backdrop`).
6. Writes the fully-rendered HTML back into `index.html` (normalizing blank-line runs so
   the output is a stable fixed point).

Result: `index.html` ships with complete, crawlable content (~668 words).

### Hydration (no duplicated logic, no flash)
`js/main.js` `init()` has a branch:

- If `window.__PRERENDER__` is set (build) → **always full render** (so `data.js` changes
  apply).
- Else, in the browser, if the page is already populated
  (`#products` has children) → **skip re-rendering** and only attach interactivity
  ("hydrate"). This avoids a flash where prerendered content would otherwise be wiped and
  re-animated.

The same `main.js` powers both build and runtime, so they can't drift apart.

### Reveal animations
- `.reveal { opacity: 0 }`, `.reveal.in { opacity: 1 }` (scroll-reveal via
  `IntersectionObserver`).
- The hero's reveals are authored with `reveal in` (visible immediately, above the fold).
- During build the `IntersectionObserver` stub is a no-op, so non-hero reveals keep
  `class="... reveal"` (no `.in`) and animate in normally during hydration.

### Idempotency
The build is idempotent — running it repeatedly yields identical output (verified).

---

## 5. Conventions & gotchas

- **Never hand-edit content inside `index.html`** — it's generated. Edit `js/data.js` and
  run `npm run build`. (Structural/`<head>` edits to `index.html` are preserved by the
  build, since only the section containers are re-rendered.)
- **Always `npm run build` before committing** content changes, or the live site won't
  reflect them.
- **Run `npm install` once** on a fresh clone (installs `jsdom`).
- `temp/` and `node_modules/` are git-ignored. `temp/` may hold private notes/credentials
  — never commit it.
- Statutory/legal compliance is intentional: persistent warning strip, per-product
  warnings, footer warning, "Not for sale to minors". No age-gate popup (by decision).
- Some products are **tobacco** (gutkha, MC OO, khaini) vs **pan masala/no-tobacco**
  (premium pan masala, supari, mukhwas). `warningType` ("tobacco" | "panmasala") controls
  the per-card warning text. This product category is legally restricted in India (COTPA),
  which is an organic-ranking and advertising headwind.

---

## 6. SEO setup (current state)

- `robots.txt` — allows all crawlers, points to the sitemap.
- `sitemap.xml` — lists the homepage.
- `index.html` `<head>` — title, meta description, canonical URL, Open Graph + Twitter
  cards, theme color, and **JSON-LD `Organization` structured data** (name, logo, Surat
  address, toll-free contact).
- Prerendered content (the big win) — see section 4.

### Still to do (not code — owner actions)
1. **Google Search Console**: verify `premiummanikchand.com` (TXT record in GoDaddy),
   submit `sitemap.xml`, "Request indexing".
2. **Google Business Profile**: for local "pan masala Surat" searches.
3. Backlinks / business directories (JustDial, IndiaMART, etc.) over time.
4. New domains take ~1–4 weeks to index; patience is part of it.

---

## 7. Deployment & infrastructure

| Concern   | Setup                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| Domain    | `premiummanikchand.com`, registered at **GoDaddy**                             |
| Web DNS   | Four `A` records `@` → `185.199.108–111.153` (GitHub Pages); `www` CNAME → `prasankumar93.github.io` |
| Hosting   | **GitHub Pages**, repo `PrasanKumar93/gutka-web`, branch `main`, root folder   |
| Custom domain | `CNAME` file in repo root contains `premiummanikchand.com`; `.nojekyll` disables Jekyll |
| HTTPS     | GitHub Pages-managed certificate; "Enforce HTTPS" enabled                      |
| `www`     | GitHub auto-redirects `www` → apex (canonical = non-www)                       |
| Email     | **Zoho Mail** custom-domain mailboxes; `MX` + SPF/DKIM `TXT` records in GoDaddy DNS |

Deploy = push to `main`; GitHub Pages serves the static files (no server-side build).
Email DNS (`MX`/`TXT`) is independent of website DNS (`A`/CNAME).

---

## 8. File map

```
index.html                 # GENERATED prerendered page (head is hand-maintained)
css/styles.css             # design system, layout, responsive, animations
js/data.js                 # SINGLE SOURCE OF TRUTH (all content)
js/main.js                 # render engine + hydration + interactions
scripts/prerender.js       # build: renders data.js+main.js -> static index.html
package.json               # `npm run build`, devDependency: jsdom
robots.txt, sitemap.xml    # SEO
CNAME, .nojekyll           # GitHub Pages config
assets/img, assets/video   # media
docs/website-plan.md       # original design/build plan (note: predates the build step)
docs/llm-project-understanding.md  # this file
```

---

## 9. Common tasks cheat-sheet

| Task                         | How                                                            |
| ---------------------------- | ------------------------------------------------------------- |
| Change any text/price/contact| Edit `js/data.js` → `npm run build` → commit → push           |
| Add a product                | Add object to `products` in `js/data.js` (see README) → build |
| Add a gallery image          | Drop file in `assets/img/`, add to `gallery` array → build    |
| Change layout/design         | Edit `css/styles.css` (and `main.js` markup if needed) → build|
| Change `<head>`/meta/SEO     | Edit `index.html` head directly (preserved by build) → build  |
| Deploy                       | `git push origin main` (GitHub Pages auto-deploys)            |
