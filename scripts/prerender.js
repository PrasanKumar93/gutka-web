/*
 * ============================================================
 *  PRERENDER BUILD STEP
 * ============================================================
 *  Generates static, crawler-friendly HTML from js/data.js.
 *
 *  How it works:
 *    1. Loads index.html into a headless DOM (jsdom).
 *    2. Runs js/data.js then js/main.js inside it - exactly the
 *       same code the browser runs - so every section gets filled.
 *    3. Writes the fully-rendered markup back into index.html.
 *
 *  This keeps js/data.js as the single source of truth: edit data,
 *  run `npm run build`, commit, push.
 *
 *  Safe to re-run: main.js sets innerHTML (overwrites), so the
 *  build is idempotent.
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const dataPath = path.join(root, "js", "data.js");
const mainPath = path.join(root, "js", "main.js");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function build() {
  const html = read(indexPath);
  const dataJs = read(dataPath);
  const mainJs = read(mainPath);

  // Surface page errors in the build output instead of swallowing them.
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("error", (msg) => console.error("[page error]", msg));

  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: "https://premiummanikchand.com/",
    virtualConsole,
  });

  const { window } = dom;

  // Force a full render during build (overrides the runtime hydration
  // shortcut in main.js) so that data.js changes always take effect.
  window.__PRERENDER__ = true;

  // jsdom has no IntersectionObserver. Without it, main.js falls back to
  // marking every .reveal as visible (.in), which would bake away the
  // scroll-reveal animations. A no-op stub keeps the intended markup
  // (hero stays visible; other sections animate in during hydration).
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };

  // Run the site's own scripts in order (data first, then renderer).
  window.eval(dataJs);
  window.eval(mainJs);

  // In jsdom the document stays in "loading" state, so main.js parks its
  // init() on DOMContentLoaded. Fire it manually to trigger rendering.
  window.document.dispatchEvent(
    new window.Event("DOMContentLoaded", { bubbles: true, cancelable: false })
  );

  // Remove build-only DOM artifacts the browser will recreate at runtime
  // (main.js appends the mobile-nav backdrop on init).
  window.document
    .querySelectorAll(".nav-backdrop")
    .forEach((node) => node.remove());

  const doctype = "<!DOCTYPE html>";
  const rendered = window.document.documentElement.outerHTML;
  // Collapse runs of blank lines to a single one so re-serialization
  // (parse -> serialize) reaches a stable fixed point and the build is
  // fully idempotent / diff-clean.
  const output = (doctype + "\n" + rendered + "\n").replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(indexPath, output, "utf8");

  // Quick sanity report.
  const text = window.document.body.textContent.replace(/\s+/g, " ").trim();
  console.log("Prerender complete -> index.html");
  console.log("Rendered visible text length:", text.length, "chars");

  dom.window.close();
}

build();
