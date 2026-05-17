# Redirect Map — Migration `gss-congo.com` → New Site

> **Purpose:** every URL on the existing site that has accumulated SEO equity, inbound links, or is referenced from other channels (Google, social, email signatures) must redirect to its closest match on the new site.
> **Risk if skipped:** SEO ranking loss, broken external links, lost trust from clients clicking old bookmarks.
> **Format:** `[old path] [new path] [HTTP status]`
> **Output:** this map will be compiled into a Cloudflare Pages `_redirects` file at launch.
> **Last updated:** 2026-05-02 (initial template — needs a live site audit to fill in).

---

## ⚠️ Pending action

**This file is a template until you complete the live audit.**

To-do (Phase 1, before 2026-05-04):

1. **Visit `https://www.gss-congo.com/`** and crawl every accessible page.
   - Tool option A: a free crawler like `screamingfrog` (free up to 500 URLs — sufficient).
   - Tool option B: a `wget --spider --recursive --no-parent --level=3` pass + manual review.
   - Tool option C: open the site, click every link in the menu, save URLs to a list.
2. **For each old URL, identify the closest new URL** (see new sitemap in `EXECUTION_PLAN.md` §2.1).
3. **Fill in §3 below.**
4. **Cross-check** with Google Search Console (if accessible) — pull the top 100 pages by impressions over the last 90 days. **Any indexed page must be in the redirect map**, even if it's not in the menu.
5. **Pull external backlinks** to gss-congo.com via a free tool (Ahrefs free Backlink Checker / SEMrush free / Bing Webmaster). Each linked page must redirect somewhere meaningful.

---

## 1. Old site — known structure (from cahier des charges, before live audit)

The cahier des charges describes the existing site as:
- **Stack:** HTML statique, Bootstrap 5, jQuery
- **Hosting:** Solidep Group
- **Issues:** SSL expired, dated design, no CMS, weak SEO

**Likely old URLs (to verify on live audit):**
- `/` — homepage
- `/index.html`
- `/services.html` or `/services/`
- `/about.html` or `/a-propos/`
- `/contact.html` or `/contact/`
- `/formation.html`
- ... (TBD)

---

## 2. New site URL structure (target)

From `docs/EXECUTION_PLAN.md` §2.1. Default language path is `/fr/...` (French is the primary locale; root `/` redirects to `/fr/` for users with no language preference).

```
/fr/
/fr/services/
/fr/services/gardiennage-intervention/
/fr/services/securite-residentielle/
/fr/services/securite-industrielle/
/fr/services/securite-elite/
/fr/services/escorte-facilitation/
/fr/services/securite-parking/
/fr/services/desinsectisation-fumigation/
/fr/services/video-surveillance/
/fr/services/installation-cameras/
/fr/a-propos/
/fr/centre-de-formation/
/fr/centre-de-formation/inscription/
/fr/galerie/
/fr/temoignages/
/fr/carrieres/
/fr/carrieres/postuler/
/fr/actualites/
/fr/contact/
/fr/mentions-legales/
/fr/politique-confidentialite/
/fr/politique-cookies/
```

(English mirror under `/en/...`.)

---

## 3. Redirect table (TO FILL during live audit)

> Format: `Old URL` | `New URL` | `Status` | `Reason / Notes`
> Default status: **301 Moved Permanently** (preserves SEO equity).
> Use **302** only for truly temporary redirects (rare here).
> Use **410 Gone** for pages that should not redirect (e.g., obsolete promotional content).

| Old URL | New URL | Status | Reason / Notes |
|---|---|---|---|
| `/` | `/fr/` | 301 | Root → French homepage |
| `/index.html` | `/fr/` | 301 | Static index file |
| _to fill from audit_ | | | |
| _to fill from audit_ | | | |

### Catch-all fallbacks (always include)

| Old URL pattern | New URL | Status | Reason |
|---|---|---|---|
| `/*.html` (any unmatched HTML) | `/fr/` | 301 | Anything else falls back to homepage rather than 404 |
| Trailing slash variations | canonical | 301 | Normalise `/page` ↔ `/page/` |

---

## 4. Generated `_redirects` file (target, to live in `public/_redirects`)

Once §3 is filled, generate this. Cloudflare Pages syntax:

```
# Root → French default
/                           /fr/                                301

# Legacy HTML pages → modern equivalents
# (TO FILL FROM AUDIT)

# Catch-all
/*.html                     /fr/                                301
```

---

## 5. Validation plan (post-launch, Phase 7)

Before lowering DNS TTL and switching:

- [ ] Compile the full list from §3.
- [ ] Build a script (`scripts/check-redirects.sh`) that `curl -I`s every old URL and asserts it returns `301` to the expected new URL.
- [ ] Run on staging deploy.
- [ ] Run again 5 minutes after DNS cutover (production check).
- [ ] Pull 14-day Search Console crawl errors after launch — fix any new 404s with additional redirects.

---

## 6. SEO continuity checklist

| Item | Done? |
|---|---|
| All pages from old `sitemap.xml` redirect to a real new URL | ☐ |
| Top 100 GSC-impression pages all redirect | ☐ |
| All external backlinks land on a relevant page (no homepage dump for content links) | ☐ |
| `hreflang` tags announce FR/EN equivalence | ☐ |
| New `sitemap.xml` submitted to Google + Bing | ☐ |
| `robots.txt` allows the new structure | ☐ |
| Old domain DNS still resolves during the 48h cutover window | ☐ |

---
