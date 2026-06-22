# gss-congo — Launch Checklist

**Status as of 2026-06-22**: code is ~95% there. Launch gated on client + external items below.
**Production target**: GoDaddy static hosting (Apache + cPanel).
**Domain**: gss-congo.com (already on GoDaddy, DNS still points to legacy Solidep).

This file inventories everything OUTSIDE my reach (needs Bechir, accounts, external services, real assets) or pending decisions. Items I can do autonomously are shipped in the same commit — see commit log for what landed.

---

## 🔴 Blockers — site cannot launch until resolved

### 1. DNS cutover (gss-congo.com → GoDaddy hosting)
- **Current**: `gss-congo.com` resolves to `37.187.195.232` (legacy Caddy on Solidep). HTTPS is broken — every visitor today hits a browser warning.
- **Action**:
  1. In GoDaddy DNS console, lower TTL to 300s 24h ahead of cutover
  2. Export the current Solidep zone (MX, SPF, DKIM, TXT) into `docs/dns-pre-cutover-<date>.txt` for rollback
  3. Build the Astro site (`pnpm build`), upload `dist/` contents to GoDaddy's `public_html` via FTP/SFTP/cPanel File Manager
  4. Confirm SSL provisioning on GoDaddy (Let's Encrypt or paid cert)
  5. Verify trailing-slash behaviour with `.htaccess` (already in repo)
- **Owner**: Bechir (DNS access) + you (FTP upload)

### 2. Forms backend — `PUBLIC_WEB3FORMS_KEY`
- **Current**: All 6 form pages (FR + EN × contact, carrieres, espace-candidat) show "Formulaire en attente de configuration". Primary conversion funnel broken for real visitors.
- **Action**:
  1. Sign up at https://web3forms.com (free, no credit card) using the destination inbox
  2. Copy the access key
  3. Since GoDaddy is static, environment variables aren't supported at runtime. The key needs to be **inlined into `.env` at build time** (Astro replaces `import.meta.env.PUBLIC_*` at build, baking them into the JS). Add to `.env`:
     ```
     PUBLIC_WEB3FORMS_KEY=<paste-here>
     ```
  4. Rebuild (`pnpm build`) and re-upload `dist/`
  5. Smoke-test each of the 6 form pages by submitting once
- **Owner**: Bechir (Web3Forms signup with GSS email) + you (env + rebuild)

### 3. Primary contact email — `contact@gss-congo.com`
- **Current**: `src/lib/contact.ts:69` ships `contact@gss-congo.com` with a `// verify with Bechir` warning. Surfaces in Footer, mailto links, JSON-LD LocalBusiness, security.txt.
- Plus `src/components/CandidatePortal.tsx` hardcodes a divergent `formation@gss-congo.com` in 4 places. If either inbox doesn't exist, every lead bounces.
- **Action**:
  1. Confirm with Bechir which inboxes exist or need to be created (probably create both via GoDaddy email hosting or Google Workspace)
  2. Once confirmed, remove the `// verify with Bechir` JSDoc line in `contact.ts`
  3. Centralise `formation@` reference via `@lib/contact` (remove the hardcoded duplicates in CandidatePortal.tsx)
- **Owner**: Bechir (decision on inboxes) + me (code cleanup after)

### 4. Supabase provisioning — candidate-space
- **Current**: `src/lib/candidate.ts:17-20` falls through to "L'espace candidat est en cours de configuration. Revenez bientôt." CDC §6.7 includes candidate status-lookup as a contracted feature.
- **Action**:
  1. Provision Supabase project per `docs/SUPABASE_SETUP.md` (schema, RLS policies, `get_candidate(ref, email)` RPC)
  2. Add to `.env` at build time:
     ```
     PUBLIC_SUPABASE_URL=https://<project>.supabase.co
     PUBLIC_SUPABASE_ANON_KEY=<anon-key>
     ```
  3. Rebuild + redeploy
- **Owner**: Bechir (Supabase account / cohort data) + you (provisioning + env)
- **Alternative**: drop status-lookup from scope, ship the simpler Web3Forms inscription form only. Decide with Bechir.

---

## 🟠 High priority — should resolve before / soon after launch

### 5. Training centre NAP (CDC §13 #4-5)
- **Current**: `src/lib/contact.ts:10` JSDoc still says "Remaining placeholders: training centre phone + address." Values shipped (5151 Av. Kasavubu, two phones) were filled speculatively after verbal confirmation 2026-05-17. Misdirects candidates physically if wrong.
- **Action**: reconcile with CDC §13 #4-5 with Bechir; strike the placeholder JSDoc line.
- **Owner**: Bechir

### 6. Alt phone numbers — retirement decision
- **Current**: `src/lib/contact.ts:21-27` lists 3 legacy alt numbers (+243 972 125 400, +243 900 049 360, +243 99 666 6699). Some likely dead.
- **Action**: Bechir confirms which to keep / which to remove.
- **Owner**: Bechir

### 7. GA4 ownership transfer
- **Current**: GA4 property `G-DH8VQJSQPZ` lives on your account (telic studio). If launched today, GSS would be locked out of their own analytics.
- **Action**: in GA4 admin, add Bechir's Google account as **Administrator** of the property. Once confirmed, downgrade your role to Viewer.
- **Owner**: you (initial), Bechir (accept)

### 8. Google Business Profile — verification status
- **Current**: Registered by Bechir 2026-05-17. 36 days elapsed — postcard usually arrives 2–3 weeks. If never arrived, request video verification via GBP support.
- **Action**: confirm with Bechir.
- **Owner**: Bechir

### 9. Meta API tokens (Instagram + Facebook live feed)
- **Current**: `SocialFeedLive` renders pending state on `/actualites/` + `/news/` because `fetchInstagramPosts()` + `fetchFacebookPosts()` return `[]` without tokens.
- **Action**: two options:
  - **A. Wire the API**: complete Meta app setup (Instagram Graph API + Facebook Graph API), add `INSTAGRAM_ACCESS_TOKEN` + `FACEBOOK_ACCESS_TOKEN` to `.env`. Note 60-day token rotation requirement.
  - **B. Ship empty state**: accept the "pending" UI as the permanent state, document with Bechir. The page won't crash.
- **Owner**: Bechir + you

### 10. Real photography / videography
- **Current**: hero video is the cropped, polished 3-clip cut from TikTok footage (1024×576 upscaled). Several other images are placeholder/atmospheric.
- **Action**: Bechir ideally provides camera-original files from whoever shot the existing content. Drop into `public/videos/` and `public/images/` as drop-in replacements (same paths).
- **Owner**: Bechir / videographer

### 11. Cookie consent banner
- **Current**: GA4 + Meta tags load with consent denied by default (Consent Mode v2 already wired). But there's no visible banner to grant opt-in. The `gss:consent-change` event is already listened for — just need the UI.
- **Action**: build a small FR/EN banner (~1 hour of dev work). Tell me to do it.
- **Owner**: me (on confirmation)

---

## 🟡 Medium — polish, can ship post-launch

### 12. Favicon raster set
- **Current**: `public/favicon.svg` exists, BaseLayout only links it. Some browsers (older Safari, Android Chrome PWA) want raster fallbacks: `favicon.ico`, `apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png`.
- **Action**: install ImageMagick (`winget install -e ImageMagick.ImageMagick`) and tell me to generate. Or generate manually via https://realfavicongenerator.net.
- **Owner**: you (1 minute) + me

### 13. OG image variants (per-surface cards)
- **Current**: one `/og-default.jpg` covers the whole site (1920×1080 from banner1.jpg). Spec target is 1200×630.
- **Action**: design 4–6 per-surface cards (home, services, formation, careers, contact, news). Drop into `public/og/` and pass via existing `ogImage` prop. Until then, current single card works.
- **Owner**: design — Bechir or you with a tool

### 14. Primary blue hex (CDC §13 #13)
- **Current**: brand uses an unconfirmed approximation of GSS shield blue.
- **Action**: eyedropper from highest-res GSS logo Bechir has. Present 2–3 calibrated options for confirmation.
- **Owner**: Bechir

### 15. CDC §13 — remaining client items (~12 of 15 open)
- Items: slogan, official social URLs (FB/IG/LinkedIn), logo source-file authorization, primary blue hex, Google account ownership, blog phase decision, training cursus calendar, etc.
- **Action**: compile a checklist for Bechir, send via your preferred channel.
- **Owner**: Bechir

### 16. Production launch slippage
- **Current**: original target was 2026-06-03 (per project memory). Today is 2026-06-22, 19 days overdue. May affect the 30/40/30 payment milestones.
- **Action**: reconcile new target date with Bechir; update memory + invoice schedule.
- **Owner**: you

---

## 🟢 Low / post-launch — nice-to-have

- **Sector sub-pages** (`/fr/secteurs/{slug}/`): ambassade, BTP, hôtellerie — Phase 2 expansion for sector-intent queries.
- **3 inaugural blog briefs**: scaffolded in `gss-congo-seo/03-page-briefs.md`. Stub routes when copy lands.
- **Bing Webmaster Tools**: 1-click import from GSC after GSC is set up.
- **Uptime monitoring**: free UptimeRobot or BetterStack 5-min check → alerts to you + Bechir.
- **Local-pack SERP audit**: incognito Kinshasa search on 8 primary keywords after 30 days indexed.
- **`Review` / `AggregateRating` schema**: only when real signed testimonials arrive.
- **`JobPosting` schema**: only when `/carrieres/` has real openings vs. cohort-based recruiting.
- **Rich Results Test + Lighthouse + WAVE + axe + NVDA sweep**: post-DNS cutover.
- **Two GBP profiles** (HQ + training centre): client/owner action; dev's job is NAP consistency in code.
- **DEV-only `.env` parity check**: `cp .env.example .env`, do not commit.
- **PWA install support**: `site.webmanifest` is included in this commit but raster icons missing (see #12).

---

## ✅ Shipped autonomously (no action needed)

This file is committed alongside the code that fixes everything in scope without external input. See the commit message for the full list. Highlights:

- Hreflang self-reference on every page (was missing — likely blocking FR↔EN cluster indexing)
- Keyword-led titles + 130–160 char meta descriptions on all 9 service detail pages, about, careers, contact, gallery, news
- Empty alt text fixes across home + components + page assets (WCAG 2.2 AA + Google Image opportunity)
- BreadcrumbList schema on all 7 previously-missing pages
- WebSite / CollectionPage / Course / AboutPage / ContactPage / ImageGallery schemas
- FAQPage schemas with matching visible FAQ blocks on top-3 services + training
- Article schema completeness (dateModified, publisher.logo, mainEntityOfPage, inLanguage, articleSection)
- Internal link anchors rewritten from generic ("en savoir plus") to keyword phrases
- `og:site_name` + `twitter:title/description/image` + `og:image:width/height` filled in
- Hero/LCP image hygiene verified
- `astro.config.mjs` — explicit `trailingSlash` + `site` URL
- `public/.htaccess` for Apache (security headers, gzip, browser caching, www→apex 301, trailing-slash policy)
- `public/site.webmanifest` for PWA install
- Astro generator meta removed (no leaked framework version)
- `[À valider M. Tayachi]` + "Onze ans" / "Trois cents" sweep
- `hero-placeholder.mp4` reference renamed in gallery
- JSDoc cleanup (no more "placeholder" / TODO wording in shipped code)
