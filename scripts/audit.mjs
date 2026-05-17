/**
 * Local-only diagnostic audit of the dev-served homepage.
 * Captures screenshots at 3 breakpoints, runs axe-core, gathers perf metrics.
 */

import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const URL = process.env.URL ?? 'http://localhost:4321/fr/';
const OUT = 'screenshots';
await mkdir(OUT, { recursive: true });

const breakpoints = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'mobile', w: 375, h: 812 },
];

const browser = await chromium.launch({ headless: true });
const audit = { url: URL, breakpoints: {}, axe: null, perf: null, layout: null, errors: [] };

for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();

  page.on('pageerror', (e) => audit.errors.push(`[${bp.name}/pageerror] ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') audit.errors.push(`[${bp.name}/console] ${m.text()}`);
  });

  console.log(`▸ ${bp.name} ${bp.w}x${bp.h}`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: `${OUT}/audit-${bp.name}-viewport.png`, fullPage: false });
  await page.screenshot({ path: `${OUT}/audit-${bp.name}-fullpage.png`, fullPage: true });

  audit.breakpoints[bp.name] = {
    viewport: `${OUT}/audit-${bp.name}-viewport.png`,
    full: `${OUT}/audit-${bp.name}-fullpage.png`,
  };

  if (bp.name === 'desktop') {
    try {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      audit.axe = {
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
          help: v.help,
          targets: v.nodes.map((n) => ({ target: n.target, html: n.html.slice(0, 200) })),
        })),
        passes: results.passes.length,
        incomplete: results.incomplete.length,
      };
    } catch (e) {
      audit.errors.push(`[axe] ${e.message}`);
    }

    audit.perf = await page.evaluate(async () => {
      const nav = performance.getEntriesByType('navigation')[0];
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
      const lcp = await new Promise((resolve) => {
        let last = null;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) last = entry;
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(last ? Math.round(last.startTime) : null);
        }, 800);
      });
      return {
        domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
        loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
        fcp: fcpEntry ? Math.round(fcpEntry.startTime) : null,
        lcp,
        transferSize: nav?.transferSize ?? null,
        encodedBodySize: nav?.encodedBodySize ?? null,
      };
    });

    audit.layout = await page.evaluate(() => {
      const queries = ['.hero', '.pillars', '.stats-band', '.industries', '.method', '.careers', '.contact-cta', '.site-footer'];
      const out = {};
      for (const q of queries) {
        const el = document.querySelector(q);
        if (!el) { out[q] = 'NOT FOUND'; continue; }
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        out[q] = { h: Math.round(r.height), bg: cs.backgroundColor };
      }
      return out;
    });
  }

  await ctx.close();
}

await browser.close();
await writeFile('audit-results.json', JSON.stringify(audit, null, 2));

console.log('---');
console.log(`errors: ${audit.errors.length}`);
audit.errors.slice(0, 5).forEach((e) => console.log(' ', e));
console.log(`axe violations: ${audit.axe?.violations.length ?? 'n/a'}`);
audit.axe?.violations.forEach((v) =>
  console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes} nodes)`)
);
console.log('perf:', audit.perf);
console.log('layout:', audit.layout);
console.log('written: audit-results.json');
