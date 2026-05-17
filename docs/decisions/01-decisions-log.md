# Decisions Log — GSS Congo

> **Purpose:** single source of truth for every design + technical + business decision on this project.
> Once a row reaches `✅ LOCKED`, it overrides anything else (cahier des charges, blueprint, conversation memory).
> Update with the **decision date** and a **one-line rationale**. Never silently change a locked row — supersede with a new entry.

> **Owner:** lead web dev (you).
> **Updated:** 2026-05-01 (initial draft, day of signature).

---

## Legend

| Status | Meaning |
|---|---|
| ✅ LOCKED | Decision final, propagated everywhere |
| 🟢 RECOMMENDED | My recommendation, awaits client validation |
| 🟡 PROPOSED | Default option in case client doesn't push back |
| 🔴 OPEN | Needs decision, no proposal yet |
| ⚠️ AT RISK | Decision made but unstable — flagged for re-review |

---

## A. Strategic decisions

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| A1 | Offer level | ✅ | Premium 2 000 USD | Client signed | 2026-05-01 |
| A2 | Target launch date | ✅ | 2026-06-03 | 5-week roadmap from signature | 2026-05-01 |
| A3 | Primary KPI | 🟢 | Qualified B2B devis requests / month | All other goals are upstream of this | 2026-05-01 |
| A4 | Anchor positioning | 🟢 | *« Une autorité calme. Sécurité comme service de prestige. »* | Differentiates from "muscular security" cliché | 2026-05-01 |

---

## B. Technical stack

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| B1 | Frontend framework | ✅ | Astro 5 + Tailwind CSS v4 | Best-in-class for content-heavy + perf; ~0 KB JS by default | 2026-05-01 |
| B2 | Content authoring | ✅ | MDX in repo (no CMS) | Brief Q8.2 confirms client doesn't edit; saves CMS complexity | 2026-05-01 |
| B3 | Hosting | 🟢 | Cloudflare Pages | Lagos PoP closer to Kinshasa than Vercel/Netlify US-East; same price (free) | 2026-05-01 |
| B4 | DNS | 🟢 | Cloudflare DNS | Free WAF + DDoS — meaningful for a security company's site | 2026-05-01 |
| B5 | Forms | 🟢 | Web3Forms (250/mo free) | No backend, no signup, anti-spam built-in | 2026-05-01 |
| B6 | CV uploads | 🟢 | Cloudflare R2 (10 GB free) + Worker | Keeps PII out of email, free tier sufficient | 2026-05-01 |
| B7 | Motion library | ✅ | GSAP + ScrollTrigger | Free since Webflow acquisition; industry standard | 2026-05-01 |
| B8 | Smooth scroll | ✅ | Lenis (touch-disabled) | MIT licence; native scroll preserved on mobile | 2026-05-01 |
| B9 | Page transitions | ✅ | Astro View Transitions API | Native, free, zero JS overhead | 2026-05-01 |
| B10 | Internationalisation | ✅ | Astro i18n native (FR default, EN mirror) | Per brief; native support saves a dependency | 2026-05-01 |
| B11 | Analytics — primary | 🟢 | Cloudflare Web Analytics | No cookie banner needed; privacy-friendly | 2026-05-01 |
| B12 | Analytics — secondary (client reporting) | 🟢 | Google Analytics 4 (consent-gated) | Brief asks for it; behind a deny-default banner | 2026-05-01 |
| B13 | SEO toolbelt | ✅ | `@astrojs/sitemap` + `astro-seo` + hand-written JSON-LD | Premium offer requires Schema.org LocalBusiness/Service/FAQ/Review | 2026-05-01 |
| B14 | Image pipeline | ✅ | Sharp via Astro `<Image>`, AVIF + WebP, blur placeholders | Required for <1 MB homepage budget | 2026-05-01 |
| B15 | CI / quality gates | 🟢 | GitHub Actions: astro check, ESLint, Stylelint, Lighthouse CI, Playwright smoke, axe-core | Enforces Lighthouse > 95 per page automatically | 2026-05-01 |

---

## C. Brand & design

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| C1 | Primary ink (deepened ribbon-blue) | 🟢 | `#0E2E4A` | Refined institutional version of the logo's ribbon blue. SUPERSEDES initial `#0A1628` proposal once we saw the real logo (bronze+blue, not gold+navy). | 2026-05-02 |
| C2 | Surface cream | 🟢 | `#F5F0E6` | Warm cream harmonises with bronze. SUPERSEDES initial ivory `#F7F4ED` (slightly warmer to bridge with bronze). | 2026-05-02 |
| C3 | Accent bronze (logo-derived) | 🟢 | `#9B7A4F` | Derived from the actual shield colour. SUPERSEDES `#C9A96E` "gold" — logo is bronze, not yellow gold. | 2026-05-02 |
| C3b | Brand blue callback | 🟢 | `#1F6BA6` | Echoes the logo ribbon mid-tone; used sparingly. New token added 2026-05-02. | 2026-05-02 |
| C4 | Display typeface | 🟡 | Fraunces (variable, opsz axis) | Editorial confidence, free, optical sizing | 2026-05-01 |
| C5 | Body typeface | 🟡 | Inter (variable) | Neutral, legible at every size, free | 2026-05-01 |
| C6 | Font hosting | ✅ | Self-hosted via `@fontsource-variable/*` | Better perf + privacy; no third-party CDN call | 2026-05-01 |
| C7 | Spacing base unit | ✅ | 8px, scale: 0/4/8/16/24/32/48/64/96/128/192/256 | Hotel-lobby vertical rhythm | 2026-05-01 |
| C8 | Section vertical padding | ✅ | clamp(96px, 12vw, 192px) | Generous breathing room, the #1 premium signal | 2026-05-01 |
| C9 | Containers | ✅ | 1440 max / 1280 content / 640 prose | Long lines kill premium feel | 2026-05-01 |
| C10 | Slogan (hero) | ✅ | *« La sécurité, exercée comme un métier. »* | LOCKED 2026-05-02 by user instruction. | 2026-05-02 |
| C11 | Photography direction | 🔴 | A / B / C — undecided | Will integrate as photos arrive from client. | — |
| C12 | Iconography | ✅ | Lucide custom-stroked at 1.5px | Default Lucide is a free-tier tell; we customise | 2026-05-01 |

---

## D. Information architecture

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| D1 | Page count | ✅ | 22 unique routes | Above the "15+" Premium commitment | 2026-05-01 |
| D2 | URL strategy | ✅ | `/fr/` default + `/en/` mirror | Slugs translated; `hreflang` automatic | 2026-05-01 |
| D3 | Service hub pattern | ✅ | Hub page + 9 dedicated service pages, NOT mega-menu | Hub feels institutional; mega-menu feels e-commerce | 2026-05-01 |
| D4 | Top 3 priority services | 🟡 | Gardiennage / Résidentielle / Industrielle | Per brief §4 | 2026-05-01 |
| D5 | Sticky mobile action bar | ✅ | Call · WhatsApp · Devis | Premium app pattern; major conversion lift on P3/P4/P5 | 2026-05-01 |

---

## E. Content & copy

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| E1 | Voice rule | ✅ | Short declarative sentences, editorial confidence; no "innovative", "leading", "premier" | Premium voice rule | 2026-05-01 |
| E2 | EN strategy | 🟢 | LLM draft + bilingual human polish (Tunisian/EU pro reviewer) | Pure-LLM EN reads as machine-translated to embassies | 2026-05-01 |
| E3 | Blog inauguration articles | 🟡 | 3 proposed (see EXECUTION_PLAN §7 Phase 5) | Premium offer commitment | 2026-05-01 |
| E4 | Cookie banner behaviour | ✅ | Default *deny*, GA4 only behind consent, Cloudflare Analytics always on (no cookies) | GDPR-compatible, premium UX | 2026-05-01 |

---

## F. Performance & accessibility

| # | Decision | Status | Value | Rationale | Date |
|---|---|---|---|---|---|
| F1 | Performance targets | ✅ | LCP < 1.8s · CLS < 0.05 · INP < 150ms · Lighthouse > 95 | Beats brief targets | 2026-05-01 |
| F2 | Page-weight homepage | ✅ | < 700 KB total (brief: 1 MB) | Premium headroom | 2026-05-01 |
| F3 | Accessibility target | ✅ | WCAG 2.2 AA full | Premium offer commitment | 2026-05-01 |
| F4 | Reduced-motion | ✅ | All scroll-driven + decorative animation disabled | Non-negotiable for AA | 2026-05-01 |

---

## G. Open / non-decided

| # | Issue | Owner | Deadline | Notes |
|---|---|---|---|---|
| G1 | Photography decision | Bechir | 2026-05-04 | Critical path — see `clarifications-tracking.md` |
| G2 | Final navy hex | Bechir | 2026-05-04 | Visual validation in call |
| G3 | Logo permissions for client trust band | Bechir | 2026-05-08 | Fallback: sectoral band |
| G4 | Slogan validation | Bechir | 2026-05-04 | Default proposed locks in 48h |
| G5 | Existing Google accounts (GBP/GA/GSC) | Bechir | 2026-05-08 | Determines launch-day work |

---

## How to evolve this file

- **New decision:** add a row, status, rationale, date.
- **Decision changes:** add a new row with `SUPERSEDES Cn` in rationale; do not edit the old row.
- **Decision becomes obsolete:** mark `⚠️ AT RISK`, add note, escalate.
- **Always commit** in the same PR as the change it justifies.

---
