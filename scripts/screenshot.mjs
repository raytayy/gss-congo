/**
 * Local-only diagnostic: capture a screenshot of the dev-served homepage.
 * Usage:  node scripts/screenshot.mjs
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = process.env.URL ?? 'http://localhost:4321/fr/';
const OUT_DIR = 'screenshots';

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
});
page.on('pageerror', (err) => {
  pageErrors.push(`[pageerror] ${err.message}`);
});
page.on('requestfailed', (req) => {
  console.log(`[req-failed] ${req.url()} :: ${req.failure()?.errorText ?? 'unknown'}`);
});

console.log(`navigating to ${URL}...`);
const response = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
console.log(`HTTP ${response?.status()} · ${response?.statusText() ?? ''}`);

await page.waitForTimeout(2500);

await page.screenshot({ path: `${OUT_DIR}/fr-home.png`, fullPage: false });
await page.screenshot({ path: `${OUT_DIR}/fr-home-fullpage.png`, fullPage: true });

console.log(`viewport screenshot: ${OUT_DIR}/fr-home.png`);
console.log(`full-page screenshot: ${OUT_DIR}/fr-home-fullpage.png`);

if (consoleErrors.length) {
  console.log('--- console errors ---');
  consoleErrors.forEach((e) => console.log(e));
}
if (pageErrors.length) {
  console.log('--- page errors ---');
  pageErrors.forEach((e) => console.log(e));
}
if (!consoleErrors.length && !pageErrors.length) {
  console.log('--- no JS console / page errors ---');
}

const sections = await page.evaluate(() => {
  const result = {};
  const queries = ['.hero', '.pillars', '.stats-band', '.industries', '.method', '.careers', '.contact-cta'];
  for (const q of queries) {
    const el = document.querySelector(q);
    if (!el) {
      result[q] = 'NOT FOUND';
      continue;
    }
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    result[q] = {
      bg: cs.backgroundColor,
      h: Math.round(r.height),
      visibility: cs.visibility,
      display: cs.display,
      opacity: cs.opacity,
    };
  }
  return result;
});
console.log('--- section diagnostics ---');
console.log(JSON.stringify(sections, null, 2));

await browser.close();
