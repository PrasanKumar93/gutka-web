# Manikchand Pan Masala — Website

- **Live site:** https://premiummanikchand.com
- **Hosting:** GitHub Pages (served from the `main` branch, repo root)
- **Stack:** plain HTML + CSS + vanilla JavaScript, with a small Node prerender step

---

## TL;DR — how to update the site

```bash
# 1. Edit content (text, products, prices, contacts, etc.)
#    -> everything lives in js/data.js

# 2. Regenerate the static HTML from that data
npm run build

# 3. Commit & push -> GitHub Pages auto-deploys in ~1-2 min
git add -A
git commit -m "Update content"
git push origin main
```

---

## Why there is a build step

Content lives in **one file, [`js/data.js`](js/data.js)** (the single source of truth),
and `js/main.js` renders the page from it in the browser.

The problem: search engines (Google) saw an almost-empty `index.html` because the
content was injected by JavaScript.

---
