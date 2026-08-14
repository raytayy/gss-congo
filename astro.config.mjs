// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Production URL — update at launch (Phase 7) once DNS is migrated.
// Used for sitemap absolute URLs, og:image, canonical tags.
const SITE = 'https://gss-congo.com';

export default defineConfig({
  site: SITE,

  // Apache on GoDaddy resolves /path/ → /path/index.html cleanly when every
  // internal link ends with a slash. Forcing trailing slashes also keeps the
  // sitemap, hreflang, and canonical URLs aligned with the actual served URLs.
  trailingSlash: 'always',

  // i18n: French is the default locale, English is a mirror at /en/
  // Locked decision D2 in docs/decisions/01-decisions-log.md
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      // Root `/` is handled by src/pages/index.astro (redirects to /fr/)
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    react(),
    sitemap({
      // '/' 308-redirects to /fr/ and utility pages shouldn't compete for
      // crawl budget — keep them out of the sitemap (audit 2026-08-09).
      filter: (page) =>
        !page.endsWith('gss-congo.com/') &&
        !page.includes('/merci/') &&
        !page.includes('/thank-you/'),
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-CD',
          en: 'en-CD',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow Cloudflare Tunnel previews to reach the dev server.
      // `.trycloudflare.com` matches any quick-tunnel subdomain (host changes per session).
      allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', '.loca.lt'],
    },
  },

  // Quality posture: prerender everything by default (B1 decision: ~0 KB JS).
  // Server output reserved for any future Cloudflare Worker endpoint (e.g. CV upload proxy).
  output: 'static',

  build: {
    // Inline critical CSS per page for the LCP < 1.8s target (F1).
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },

  // Astro View Transitions enabled at the layout level (BaseLayout.astro)
  // so we don't need a global config flag here.

  experimental: {},
});
