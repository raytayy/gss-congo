import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots/tour', { recursive: true });

const breakpoints = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'mobile', w: 375, h: 812 },
];

const pages = [
  { path: '/fr/', slug: 'home' },
  { path: '/fr/services/', slug: 'services' },
  { path: '/fr/services/gardiennage-intervention/', slug: 'svc-detail' },
  { path: '/fr/contact/', slug: 'contact' },
];

const browser = await chromium.launch({ headless: true });

for (const bp of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: bp.w, height: bp.h },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  });
  for (const { path, slug } of pages) {
    const p = await ctx.newPage();
    try {
      await p.goto('http://localhost:4321' + path, { waitUntil: 'networkidle', timeout: 20000 });
      await p.waitForTimeout(800);
      await p.screenshot({
        path: `screenshots/tour/${bp.name}-${slug}.png`,
        fullPage: true,
      });
      console.log('OK', bp.name, slug);
    } catch (e) {
      console.log('FAIL', bp.name, slug, e.message);
    }
    await p.close();
  }
  await ctx.close();
}

await browser.close();
