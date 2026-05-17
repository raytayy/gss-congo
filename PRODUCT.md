# Product

## Register

brand

## Users

Five named personas drive every interface decision (full versions in `docs/EXECUTION_PLAN.md` §1.2). Ranked by revenue weight:

**P1 — Procurement Director, Kinshasa industrial group.** Risk-averse, compares 3 vendors, signs contracts worth 10–50× the site's price, forwards links to her DG. Trigger: feeling GSS is *not a risk to her career*. Reads *À Propos* + *Services* + *Témoignages*, checks RCCM in the footer.

**P2 — Embassy Security Officer / international NGO.** Reads in **English**. Looks for ISO/standards language, agent training credentials, response-time SLAs. Trigger: bilingual quality that doesn't read as machine-translated. Buys the contract on the *Méthode* page.

**P3 — Wealthy resident, Gombe.** Discreet. Doesn't fill forms — calls or WhatsApps. Often his assistant browses on his behalf. Trigger: visual restraint, the word *discrétion*, premium photography. Mobile-first.

**P4 — Construction site manager.** Quick mobile check, calls within minutes. Trigger: visible phone, response-time guarantee.

**P5 — Aspiring agent / recruit.** Mobile only, low data plan. Reads *Carrières* and *Centre de formation*. Must work under 1 MB transfer.

Three audiences, one page hierarchy: trust over throughput, photography over icons, call/WhatsApp/devis equally one tap from anywhere.

## Product Purpose

Re-platform `gss-congo.com` from a Bootstrap-era HTML site (SSL expired, dated, weak SEO) into a bilingual editorial-grade institutional site that wins B2B contracts.

Why this exists: the existing site materially undersells GSS Congo's standing in the RDC market. The brief describes a 11-year-old company with 300 trained agents, embassy and industrial clients, and a training centre, but the current site reads as a freelance template. The new site must close the gap between the company's actual operational standing and how it presents online.

Success looks like:
- **Primary KPI**: qualified B2B *devis* requests per month (target: ≥15/mo within 90 days of launch).
- **Secondary**: WhatsApp + phone taps from mobile (P3/P4 funnel).
- **Tertiary**: formation sign-ups and CV uploads (P5 funnel).
- **Hygiene**: Lighthouse > 95 on every route, LCP < 1.8s, WCAG 2.2 AA.

The site IS the product surface. There is no app. No dashboard. No transactional workflow. Every pixel is brand. Hence: register = brand.

## Brand Personality

Three words: **calm · confident · discreet.**

Voice:
- Short, declarative sentences with editorial confidence.
- Never *innovative*, *leading*, *cutting-edge*, *premier*, *solutions*, *synergy*.
- Welcomed: *présence*, *rigueur*, *vigilance*, *discrétion*, *métier*, *onze ans*.
- Voice rule: *"Could a luxury hotel brand write this line? If not, rewrite."*

Emotional goal:
> *« Une autorité calme. La sécurité comme service de prestige, pas comme menace exhibée. »*

This filters every visual decision. Lobby of a private bank in Geneva, not a tech startup landing page.

## Anti-references

The site must not read like:

1. **G4S template aesthetic**, multi-CTA hero, busy grid, "we are global" rhetoric.
2. **Tango International / Delta Protection** (the local RDC competitors), Bootstrap card grids, dated typography, template feel. *This is the floor we must rise above.*
3. **Generic security clichés**, guard with arms crossed, red/black "alert" palette, Lottie locks and shields, surveillance-camera icons used as decoration.
4. **SaaS-cream / dashboard-by-numbers**, purple-to-blue gradients, "innovative" headlines, hero metric template, identical card grids, gradient text.
5. **AI-slop tells**, the same handful of training-data reflexes every model produces: Inter for everything, rounded-square icon tile above every heading, gray text on colored backgrounds, flat layouts with no layering.
6. **Awwwards-bait spectacle**, scroll-jacking that hurts performance, parallax in the hero, custom cursors that read as gimmicks.
7. **Fiverr / ThemeForest security templates.**

Targets to triangulate (not copy):
- **Institutional gravity**: Securitas, G4S (the language of trust at scale, but better photographic restraint).
- **Discreet luxury**: Brunello Cucinelli, Aman Resorts (spacing rhythm, ivory tones, photographic dignity).
- **Modern editorial / motion craft**: Linear, Vercel, Koto Studio (type contrast, asymmetric grid, scroll choreography).

GSS lands in the middle of that triangle. If a design decision pulls toward only one vertex, it's wrong.

## Design Principles

1. **Trust > Flash.** When in doubt, choose the calmer, quieter option. Security is not an action movie.
2. **First five seconds matter more than the rest of the site combined.** Hero photo, headline, navigation polish, page-load speed: these four decide whether they read further.
3. **Real over generic.** Real photos of real GSS agents in real Kinshasa locations beat any stock asset, any template, any clever animation. Until the real shoot lands, atmospheric AI photography is the bridge, never agent faces.
4. **Restraint as luxury signal.** Section padding ≥ 96px. Maximum 5 colours visible. Two fonts. No more than 3 radii per page. Whitespace is the brand.
5. **Mobile is not a constraint, it is a feature.** Sticky bottom action bar (Call / WhatsApp / Devis) is a premium app pattern, not a fallback. Designed at 375px first.
6. **Photography is the #1 multiplier.** A great photo replaces an icon, an illustration, three decorative gradients. Every section should ask: could a photograph carry this meaning better?
7. **Motion serves comprehension, never decoration.** Three things animate, perfectly: hero entrance, scroll reveals (subtle), Méthode pin. Everything else respects `prefers-reduced-motion`.

## Accessibility & Inclusion

- **WCAG 2.2 AA**, full. Contracted commitment from the Premium offer signed 2026-05-01.
- Focus rings: visible bronze halo, never default browser blue.
- Skip link first focusable on every page.
- Semantic HTML, `<header>`, `<nav>`, `<main>`, `<section>` with `aria-labelledby`. No `<div>` soup.
- `prefers-reduced-motion: reduce` disables every scroll-driven and decorative animation; reveals become instant.
- Tap targets ≥ 44×44, sticky bottom action bar 56px.
- Bilingual `lang` and `hreflang` per route (FR default, EN mirror).
- Manual keyboard walkthrough + axe-core CI gate, zero serious issues.
- Embassy traffic from EU triggers GDPR-grade cookie default-deny banner.

---

*Source synthesis: cahier des charges signed 2026-05-01, `docs/EXECUTION_PLAN.md`, `design/BRAND.md`, `docs/decisions/01-decisions-log.md`. Last updated 2026-05-04. Update before any architectural pivot.*
