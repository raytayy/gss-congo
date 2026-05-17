# GSS Congo — Premium Execution Blueprint

> **Document type:** Master execution plan
> **Author:** Lead web developer (telic. studio)
> **Client:** Guarde Security Services (GSS Congo)
> **Offer signed:** Premium — 2 000 USD — signed 2026-05-01
> **Target launch:** 2026-06-03 (≈ 5 working weeks from signature)
> **Posture:** Deliver a site that reads as a 20 000 USD agency build, not a 2 000 USD freelance build.

This document is the single source of truth for the project. Every design, technical, and content decision should be traceable back to a section here. If reality forces a deviation, update this file in the same PR.

---

## 0. North Star

One sentence to keep above every decision:

> **A bilingual, editorial-grade institutional site that makes a Kinshasa CFO, an embassy security officer, and a VIP resident all feel like GSS is the safest bet they can make — within five seconds of landing.**

Three rules that override anything else:

1. **Trust > Flash.** When in doubt, choose the calmer, quieter option. Security ≠ action movie.
2. **First five seconds matter more than the rest of the site combined.** Hero photo, headline, navigation polish, page-load speed — these four things decide whether they read further.
3. **Real over generic.** Real photos of real GSS agents in real Kinshasa locations beat any stock asset, any template, any clever animation.

---

## 1. Strategic Project Breakdown

### 1.1 Business goals (from the cahier des charges, re-ranked by commercial leverage)

| # | Goal (brief order) | Real commercial leverage | Site implication |
|---|---|---|---|
| 1 | Renforcer image / crédibilité | **Highest** — gates everything else | Visual quality, photography, copy tone, performance |
| 2 | Générer demandes de devis qualifiées | **Highest measurable KPI** | Devis form UX, WhatsApp friction, trust signals adjacent to CTAs |
| 3 | Présenter services clairement | High | Service hub + 9 dedicated pages, scannable hierarchy |
| 4 | Attirer nouveaux clients B2B + B2C | Same as #2 | Audience-tailored sections, not one-size-fits-all |
| 5 | Informer sur formations | Medium (secondary funnel, but separates GSS from rivals) | Standalone Centre de formation page, distinct CTA |
| 6 | Recruter | Medium (ops pain, not revenue) | Carrières page with CV upload, distinct visual zone |
| 7 | SEO 1ère page Google | High (long-term lead gen) | Technical SEO + bilingual content + Google Business Profile |
| 8 | Remplacer le site actuel | Hygiene (table stakes) | Migration plan, redirect map |

**Real KPI to optimise for:** *qualified B2B devis requests per month*. Everything else is upstream of this.

### 1.2 Personas (5, ranked by revenue weight)

#### P1 — "Madame Kabongo" — Procurement Director, Kinshasa industrial group
- **Stakes:** Signs a 12-month gardiennage contract worth 10–50× the site's price.
- **Behaviour:** Compares 3 vendors. Reads About + Services + Témoignages + checks RCCM. Forwards link to her DG.
- **Trigger to convert:** Feels GSS is **not a risk** to her career.
- **What she needs to see:** Real client logos, RCCM/IDNAT visible, professional photography, a calm "Demander un devis" form (not a pop-up).

#### P2 — "Mr. Hendricks" — Security Officer, European Embassy / international NGO
- **Stakes:** Multi-year contract, strict compliance requirements.
- **Behaviour:** Reads in **English**. Looks for ISO/standards language, agent training credentials, response time SLAs, vetting process.
- **Trigger:** Bilingual quality, methodology page, references with international names.
- **What he needs:** EN site that doesn't read like a translation. Centre de formation as proof-of-rigour. Method/process visualised.

#### P3 — "Monsieur Diop" — Wealthy resident, Gombe
- **Stakes:** Personal/family safety, residence + escorte.
- **Behaviour:** Discreet. Doesn't fill forms — calls or WhatsApps. Often his assistant browses on his behalf.
- **Trigger:** Visual restraint (no flashy badges), the word "discrétion", premium photography, a one-tap WhatsApp.
- **What he needs:** Sécurité Résidentielle + Sécurité d'Élite pages, mobile-first, instant phone/WhatsApp.

#### P4 — "Chef de chantier Kasongo" — BTP site manager
- **Stakes:** 3-month contract per site.
- **Behaviour:** Quick mobile check, calls within minutes.
- **Trigger:** Visible phone number on mobile, response-time guarantee.
- **What he needs:** Sécurité Industrielle / Chantiers page, fast mobile load, sticky call CTA.

#### P5 — "Joseph" — Aspiring security agent / formation candidate
- **Stakes:** Career change.
- **Behaviour:** Mobile only, low data plan (this is critical — Kinshasa data costs are real).
- **Trigger:** Clear formation listings, simple sign-up, sees real graduates.
- **What he needs:** Centre de formation page + formulaire d'inscription that works on 3G, Carrières page.

### 1.3 Conversion goals — tiered

| Tier | Action | Surface | Measurement |
|---|---|---|---|
| **Macro** (revenue) | Signed contract | Offline (post-form) | Internal CRM |
| **Hard** (qualified lead) | Devis form completed | Contact + every service page | Form submission event |
| **Soft** | Formation sign-up, CV upload | Centre formation, Carrières | Form events |
| **Micro** | WhatsApp tap, phone tap, language switch, +30s session | All pages | Cloudflare Analytics events |

Every page must have **one primary CTA** (devis or call), no secondary CTA competing with it above the fold.

---

## 2. Information Architecture

### 2.1 Sitemap (validated, with URL strategy)

```
/                                        Accueil
/services/                               Hub résumé (9 services en bento)
/services/gardiennage-intervention/      ★ Priorité 1
/services/securite-residentielle/        ★ Priorité 2
/services/securite-industrielle/         ★ Priorité 3
/services/securite-elite/
/services/escorte-facilitation/
/services/securite-parking/
/services/desinsectisation-fumigation/
/services/video-surveillance/
/services/installation-cameras/
/a-propos/
/centre-de-formation/
/centre-de-formation/inscription/        formulaire dédié
/galerie/
/temoignages/
/carrieres/
/carrieres/postuler/                     formulaire + upload CV
/actualites/                             blog hub
/actualites/[slug]/                      articles
/contact/
/mentions-legales/
/politique-confidentialite/
/politique-cookies/
/404
```

**English mirror:** identical structure under `/en/...` (Astro i18n native). Slugs translated where natural (`/en/services/guarding-and-intervention/`), kept identical where it would damage SEO.

**Total page count: 22 unique routes × 2 languages = 44 rendered pages.** Comfortably above the "15+ pages" Premium commitment.

### 2.2 Navigation logic

**Header — desktop**
- Left: Logo (links to `/`)
- Centre: 5 items max → `Services` (hover-revealed mega-panel with the 9 children + a small visual), `À propos`, `Formation`, `Carrières`, `Actualités`
- Right: `FR / EN` switch · primary CTA `Demander un devis`
- Phone number tucked inline next to lang switch — small, always visible
- Behaviour: transparent over the hero, fades to a frosted dark navy on scroll past 80px (single transition, 250ms)

**Header — mobile**
- Logo · WhatsApp icon · Hamburger
- Slide-in panel with the same 5 items, large tap targets, `Devis` button at bottom
- Sticky bottom action bar on mobile: **`Appeler`** + **`WhatsApp`** + **`Devis`** — 56px height, navy with gold accent. This is a premium app pattern; it will materially lift conversions on P3/P4/P5.

**Footer — substantial, 4 columns**
1. Identity: logo, slogan, brief manifesto, social
2. Services (9 links, two columns)
3. Company: À propos, Formation, Carrières, Actualités, Contact
4. Coordinates: siège, centre de formation, phones, hours, RCCM/IDNAT/N° impôt visible (institutional trust)

Bottom strip: copyright, legal links, language switch, "Site by telic.".

### 2.3 User journey flows

**P1 (Procurement) flow:**
`Hero (impression) → Trust band (logos) → Services (recognition) → Service page (depth) → Témoignages (peer validation) → Contact form (action)`
→ Optimisation: every service page must end with a peer testimonial + a devis form, not just a CTA button.

**P2 (Embassy) flow:**
`Hero EN → À propos (credentials) → Méthode (process) → Centre de formation (rigour) → Contact`
→ Optimisation: an `À propos` page that reads like a credentials dossier, not a sales pitch.

**P3 (VIP) flow:**
`Hero → Sécurité d'Élite + Résidentielle → WhatsApp tap`
→ Optimisation: WhatsApp must be one tap from anywhere. The Sécurité d'Élite page should feel like a Rolls-Royce brochure, not a flyer.

**P5 (Recruit) flow:**
`Hero → Carrières OR Formation → Form`
→ Optimisation: must work under 1 MB total transfer for the entry point. Mobile-only fast path.

---

## 3. Premium Design Direction

### 3.1 Brand positioning statement

> *"Une autorité calme. La sécurité comme service de prestige, pas comme menace exhibée."*

This is the line that filters every visual decision. If a photo, animation, or typeface choice doesn't sit comfortably under this line, it doesn't ship.

### 3.2 Reference moodboard (not to copy — to triangulate)

Three coordinates, deliberately mixed:

- **Institutional anchor:** `securitas.com`, `g4s.com`, `prosegur.com` — for the language of trust at scale.
- **Discreet luxury:** `brunellocucinelli.com`, `aman.com`, `ritzcarlton.com` — for restraint, ivory tones, photographic dignity.
- **Modern editorial / motion craft:** `linear.app`, `vercel.com`, `koto.studio`, `ungrid.studio`, `resn.co.nz` — for spacing rhythm, type contrast, scroll choreography.

We are NOT copying any of them. We are landing in the triangle they form.

**Anti-references** (what we explicitly are not): `fiverr` security templates, `themeforest` corporate themes, any site whose hero photo is a man with crossed arms in a black suit.

### 3.3 Colour system (proposed — needs client validation, see §11)

The brief says "bleu" without a specific value. Proposing a system, not a single hex:

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A1628` | Primary navy — almost-black, authority. Backgrounds, large type. |
| `--ink-2` | `#142238` | Secondary navy — section separation, subtle layering. |
| `--ivory` | `#F7F4ED` | Primary surface — warm, hotel-lobby ivory, not sterile white. |
| `--ivory-2` | `#EFEAE0` | Secondary surface — alternation rhythm. |
| `--gold` | `#C9A96E` | Brand accent — references existing GSS gold without screaming. |
| `--gold-deep` | `#A8884F` | Hover/pressed state for gold elements. |
| `--hairline` | `#1F2A3A` (on dark) / `#D9D2C2` (on light) | 1px borders, dividers. |
| `--text-mute` | `#6B7280` (on light) / `#A6B0BF` (on dark) | Secondary text. |
| `--alert` | `#A8503A` | Sole non-blue/gold tone — used only for critical errors, never decorative. |

**Discipline:** the entire site uses **5 colours total in the rendered output**. Anything else is grain, photo, or shadow.

OKLCH companions for borders and atmospheres should be used in CSS so colour transitions look filmic, not banded:
```css
border: 1px solid oklch(15% 0.02 250 / 0.6);
```

### 3.4 Typography pairing

**Display:** **Fraunces** (variable, free, Google/Fontshare) — confident editorial serif with optical sizing. Used for headlines, large quotes, hero.
- Optical size: 144 for hero (`opsz` axis), 32 for section heads.
- Weight: 380–500 only (never extra-bold — that reads as cheap).
- Letter-spacing: -0.02em on display sizes.

**Body:** **Inter** (variable, free) — neutral, legible at every size. Used for everything else.
- Weight: 400 body, 500 UI labels, 600 emphasis.
- Letter-spacing: 0 body, +0.06em uppercase eyebrows.

**Numerals:** Fraunces tabular figures for stat counters (`font-variant-numeric: tabular-nums`).

**Self-hosted via `@fontsource-variable/fraunces` and `@fontsource-variable/inter`.** No Google Fonts CDN call — better performance, better privacy, no FOUT.

**Type scale (modular, ratio 1.25):**
```
12 · 14 · 16 · 18 · 20 · 25 · 32 · 40 · 50 · 64 · 80 · 100 · 128
```

### 3.5 Spacing & grid

- **Base unit:** 8px.
- **Spacing scale:** 0 · 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256 (px).
- **Section padding y:** clamp(96px, 12vw, 192px) — generous, hotel-lobby vertical rhythm.
- **Container max-width:** 1440px desktop, 1280px content, **640px for prose** (long lines kill premium feel).
- **Grid:** 12-col, 24px gutters desktop, 16px mobile. **Asymmetry encouraged** — hero, services, manifesto should break the grid editorially.

### 3.6 Layout philosophy

- **Editorial, not corporate.** Headlines can be 100px+. Whitespace is the brand.
- **Asymmetric heroes.** No centred-headline-centered-button cliché.
- **Bento for services**, not uniform 3×3 cards. Top 3 priorities (Gardiennage, Résidentielle, Industrielle) get larger tiles. Bento creates hierarchy without effort.
- **Photographic full-bleed** for emotional sections. Tight contained grids for informational sections. Alternate.

### 3.7 Mood — emotional feel

| Adjective | Yes | No |
|---|---|---|
| Calm | ✅ | ❌ Tense |
| Confident | ✅ | ❌ Boastful |
| Discreet | ✅ | ❌ Loud |
| Warm | ✅ (ivory, gold) | ❌ Cold corporate blue-only |
| Photographic | ✅ | ❌ Iconographic / illustrated |
| Restrained motion | ✅ | ❌ Awwwards-bait spectacle |

The site should feel like the lobby of a private bank in Geneva, not a tech startup landing page.

---

## 4. Homepage Experience Plan

A homepage is a sequence of emotional beats, not a list of sections. Here's the choreography:

### Beat 1 — Hero (above the fold)
- **Layout:** asymmetric 60/40 split — left holds type, right holds image.
- **Type:** eyebrow (`PRÉSENCE · 2014`), then a Fraunces headline ~96–128px reading something like:
  > *"La sécurité, exercée comme un métier."*
  Sub (Inter 20px, navy 80%): one sentence positioning — *"Onze ans de présence à Kinshasa, 300 agents formés, une vigilance permanente."*
- **CTAs:** primary `Demander un devis` (gold), secondary `Découvrir nos services` (ghost). 16px gap. Never centred.
- **Image:** single high-grade photograph of a GSS agent — **shot in golden hour at a real Kinshasa location**, slightly desaturated, fine grain overlay (0.04 opacity), subtle ken-burns scale (1.0 → 1.04 over 12s).
- **Animation:** headline reveals line-by-line on load (mask up, 120ms stagger, ease-out-expo). Image fades from blur(12px) to blur(0) over 800ms.
- **First impression target:** 0.8s LCP, 0% CLS, "premium" reaction in <2s.

### Beat 2 — KPI strip
- Thin band immediately under hero. Four numbers, Fraunces, tabular: `11 ans · 300 agents · 24/7 · < 20 min`.
- No icons. Numbers do the work.
- Counts up on scroll-into-view (GSAP, 1.2s ease-out, only on prefers-reduced-motion: no-preference).

### Beat 3 — Trust band
- Single line: *"Ils nous font confiance."*
- 6–8 client logos, monochrome (navy on ivory). Logos scaled to **optical equivalence**, not geometric (this is the #1 thing that separates pro from amateur logo walls).
- If logo permissions are pending (clarification #11), show silhouettes: *"Industriels · Ambassades · ONG · Hôtellerie · BTP · Résidences"* as a tasteful fallback. Never invented logos.

### Beat 4 — Manifesto block
- Editorial paragraph, 640px max-width, centred with deep top/bottom padding.
- Fraunces 32px, navy on ivory.
- Sample copy (to refine with brand-voice work):
  > *"Depuis 2014, Guarde Security Services protège ce qui ne peut être confié au hasard. Industries, ambassades, résidences, chantiers. Un seul standard : la rigueur."*

### Beat 5 — Services bento
- 9 services in a deliberately uneven grid (e.g., 4 columns, with services 1–3 spanning 2 columns each on the first row, then smaller tiles).
- Each tile: photograph (16:10), gold-hairline border on hover, name in Fraunces 25px, one-line description, arrow-link.
- Hover: image subtle zoom (1.02), border lights to gold, arrow translates 8px. **No card lifting / shadow-bumping** (that's the Bootstrap tell).

### Beat 6 — Méthode (process)
- Sticky-scroll section: viewport pins, four steps progress horizontally as the user scrolls.
- Steps: `01 Audit · 02 Plan · 03 Déploiement · 04 Supervision`.
- Each step: a single clean line drawing (custom SVG, gold), a heading, a paragraph.
- This is the page's **rigour signal**. P2 (embassies) buys the contract here.

### Beat 7 — Témoignages
- One quote at a time, large (Fraunces 40px italic), with a small photo, name, title, company logo.
- Fade transitions, **no auto-rotate, no carousel arrows**. Either dot navigation or scroll-snap horizontal — no merry-go-round.

### Beat 8 — Centre de formation teaser
- Editorial split: 50% photograph of a training session, 50% text + CTA `Découvrir le centre`.
- Subtitle: *"Nos agents ne sont pas recrutés, ils sont formés."*

### Beat 9 — Carrières teaser
- Smaller band, dark navy background, gold rule, single line: *"Rejoindre GSS — Voir les postes ouverts →"*.

### Beat 10 — CTA contact (the funnel narrows here)
- Full-bleed dark navy section.
- Fraunces headline 80px: *"Parlons de votre site."*
- Two paths visualised side-by-side: `Devis détaillé →` (form) · `WhatsApp →` (immediate).
- Phone number and address as small footer-text inside the section.

### Beat 11 — Footer
- 4 columns as described in §2.2.
- Above the columns: a single editorial line in Fraunces — *"Vigilance permanente, depuis Kinshasa."*
- Below the columns: hairline rule, microcopy (legal, language, telic credit).

**Total scrollable height target on desktop:** ~7.5–8 viewports. Long enough to tell the story, short enough that nobody bounces from depth.

---

## 5. UI/UX Excellence Plan

### 5.1 Animation strategy

**Library:** GSAP + ScrollTrigger (free under Webflow ownership, all plugins included). Lenis for smooth scroll. Native View Transitions API via Astro for page transitions.

**Principles:**
1. **Motion serves comprehension, never decoration.** If an animation can be removed without losing meaning, remove it.
2. **Ease curves:** `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) for entrances. `cubic-bezier(0.7, 0, 0.84, 0)` (in-expo) for exits. **No bounces. No springs. No elastic.**
3. **Durations:** UI 150–250ms, content reveals 600–900ms, hero reveal up to 1200ms. Nothing else longer.
4. **Stagger:** 60–120ms between siblings. Never less (looks chaotic), never more (looks slow).
5. **Always GPU.** `transform` and `opacity` only. Anything animating `width`, `top`, `margin` is a bug.
6. **`prefers-reduced-motion: reduce`** disables every scroll-driven and decorative animation — content reveals become instant. This is non-negotiable for WCAG 2.2 AA.

### 5.2 Micro-interactions catalogue

| Element | Default | Hover | Active | Focus |
|---|---|---|---|---|
| Primary CTA | gold fill | gold-deep, +2px arrow translate | scale(0.98) | gold ring, 2px offset |
| Ghost CTA | navy hairline | navy fill, ivory text | scale(0.98) | gold ring |
| Service tile | photo + hairline | image scale(1.02), border→gold, arrow→8px | — | gold ring around tile |
| Nav link | ivory | gold underline grows L→R, 200ms | — | gold ring |
| Lang switch | small chip | invert | — | gold ring |
| Form input | hairline border | hairline darkens | — | gold border + 4px gold halo |

Every interactive element has all four states. **A site without focus states reads as amateur the moment a power-user hits Tab.**

### 5.3 Scroll effects

- Lenis smooth scroll, lerp 0.1, **disabled on touch devices** (native scroll feels better on mobile).
- ScrollTrigger reveals: text masks, image clip-paths, KPI counters.
- **One pinned section maximum** (the Méthode). More than one feels like Awwwards-bait.
- **No parallax on the hero image.** Parallax in the hero is the #1 cliché of 2018-era "premium" sites. Use ken-burns instead.
- A subtle "page progress" hairline (1px gold) at the very top, growing with scroll. Tasteful, not decorative.

### 5.4 Mobile experience

- Mobile-first CSS. Designed at 375px, scaled up.
- Hero image swapped to a portrait crop, smaller bytes, eager-loaded with `fetchpriority="high"`.
- Sticky bottom action bar (Call / WhatsApp / Devis) — premium pattern, big conversion lift.
- Tap targets 44×44 minimum, 56px for the bottom bar.
- All hover effects have a touch equivalent (`:active` styles) so iOS doesn't show a sticky-stuck hover.
- Mega-menu replaced with full-screen panel; service icons help scannability.
- Lazy-load every image below the fold; prefer AVIF, fall back to WebP.

### 5.5 Accessibility (WCAG 2.2 AA — full)

- **Semantic HTML.** `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` with `aria-labelledby`, `<footer>`. No `<div>` soup.
- **Skip link** as the first focusable element on every page.
- **Heading hierarchy** strictly H1 → H2 → H3, never skipping levels.
- **Contrast:** minimum 4.5:1 for body, 3:1 for large text. The ivory/navy/gold palette tested in §3.3 will pass; we'll verify with axe-core in CI.
- **Forms:** `<label for>` always, error messages linked via `aria-describedby`, errors announced via `aria-live="polite"`.
- **Images:** every `<img>` has `alt`. Decorative images get `alt=""` + `aria-hidden`.
- **Keyboard:** complete keyboard navigability. Custom dropdowns get full ARIA combobox patterns or use native `<details>`.
- **Reduced motion:** respected globally.
- **Lang attribute:** `<html lang="fr">` / `<html lang="en">` switched per locale. `hreflang` tags in head.
- **Tested with:** axe DevTools, Lighthouse a11y, manual keyboard-only walkthrough, NVDA + VoiceOver smoke tests.

### 5.6 Subconscious premium details (the things users can't name but feel)

- Selection colour: ivory text on `--gold` background, never default browser blue.
- Custom scrollbar: 4px wide, `--ink-2` track, `--gold` thumb. Subtle but premium.
- Custom 404: a calm editorial composition, not a meme. *"Cette page a échappé à notre vigilance."* + nav home.
- Custom cursor on desktop: **disabled by default**, optional 8px dot that morphs to 32px ring over interactive elements. Restraint here matters — most cursors are gimmicks.
- **Subtle film grain** overlay site-wide (SVG fractal noise, 0.04 opacity, fixed position). This is the single biggest "luxury" cue, takes 2KB.
- **Hairline borders in OKLCH** so they don't band on dark surfaces.
- **Optical sizing** on Fraunces (variable axis `opsz`) — display sizes use opsz 144, body uses opsz 14. This is the difference between "nice serif" and "real typography".
- **Image loading:** every photograph has a blurhash placeholder, fades in over 400ms. No layout shift, no white flash.
- **Page transitions:** Astro View Transitions, 350ms cross-fade. Feels like a SPA, ships like a static site.
- **Real photographs** instead of icons whenever a photo can carry the meaning. A photo of barbed wire fencing > an icon of a shield, every time.
- **Tabular numerals** in the footer hours, KPI strip, phone numbers.
- **No emoji.** Not even on the WhatsApp button. (Lucide icons, custom-stroked at 1.5px.)

---

## 6. Technical Stack Recommendation

> Constraint: **everything free**. The stack below has 0 € recurring cost at GSS Congo's scale.

### 6.1 Frontend

- **Astro 5** (latest) — content-first, ships ~0 KB JS by default, perfect for this brief.
- **Tailwind CSS v4** (CSS-first config, faster, no `tailwind.config.js`).
- **MDX** for service pages and blog — content authored in version-controlled files, no CMS dependency.
- **Astro Islands**: React used only where interactivity is required (forms, mega-menu, language switch). Not a single React island elsewhere.
- **Astro i18n** native — `/fr/` default, `/en/` mirror, `hreflang` automatic.

### 6.2 Motion & UX

- **GSAP** + **ScrollTrigger** (now free for commercial use including all plugins, since the Webflow acquisition).
- **Lenis** for smooth scroll (free, MIT).
- **Astro View Transitions** for page transitions (native, free).

### 6.3 Type & assets

- `@fontsource-variable/fraunces`, `@fontsource-variable/inter` — self-hosted variable fonts.
- **Sharp** via Astro `<Image>` component — AVIF/WebP, responsive `srcset`, blur placeholders.
- **Lucide** icons, custom-stroked at 1.5px, used as SVG components.

### 6.4 Forms (no backend server required)

- **Web3Forms** (free tier: 250 submissions/month, sufficient). No account required for submitters, anti-spam, email forwarding.
- **Backup option:** Cloudflare Worker + Resend (free 100 emails/day) if Web3Forms ever throttles.
- **CV upload:** Cloudflare R2 free tier (10 GB) via a small Worker — keeps PII out of email attachments.
- **Validation:** zod schema, client-side + server-side (Worker).

### 6.5 CMS

- **None.** Content is in MDX in the repo. Brief Q8.2 confirms client doesn't want to edit themselves. We push commits, deploy is automatic. This decision saves the project from CMS lock-in, security patching, and hosting cost.
- If client later asks to edit: drop in **Decap CMS** (free, git-based, no DB) — no migration needed since content is already MDX.

### 6.6 SEO

- `@astrojs/sitemap` — auto-generated `sitemap.xml`.
- `astro-seo` for `<head>` meta + Open Graph.
- Hand-written **JSON-LD components**: `LocalBusiness`, `Service` (per service page), `FAQPage` (homepage + service pages), `Review` (testimonials). Brief asks for the first two; we go further because Premium.
- `robots.txt` hand-written, generous to indexers, blocks `/en/` only if duplicated content becomes an issue (it shouldn't with proper `hreflang`).
- **Google Business Profile** created/optimised post-launch.
- **Bing Webmaster Tools** also submitted (often forgotten — embassies use Edge).

### 6.7 Analytics

- **Cloudflare Web Analytics** (free, privacy-friendly, no cookies, **no banner needed in the EU sense**) — primary analytics.
- **Google Analytics 4** added for client reporting (brief asks for it). Behind a single consent banner that defaults to *deny* (GDPR-compatible even though DRC isn't covered — embassy traffic from EU is).
- **Google Search Console** connected, sitemap submitted at launch.
- **Microsoft Clarity** (free, optional) for session recordings during the first month — invaluable for catching UX issues post-launch.

### 6.8 Hosting

- **Cloudflare Pages** (free, unlimited bandwidth, edge-cached including a Lagos PoP — closest to Kinshasa traffic).
- **Cloudflare DNS** (free) — moves DNS off Solidep, gives us WAF, DDoS shield, bot management free of charge.
- **Cloudflare SSL** — free, auto-renewing, full-strict mode.
- **Cloudflare R2** for CV uploads (10 GB free).
- **Cloudflare Workers** (free 100k requests/day) for form proxy + R2 signed URLs.

> **Why Cloudflare over Vercel/Netlify:** for a Kinshasa audience, latency to Lagos PoP is materially better than US-East PoPs. Brief allows Vercel/Netlify; we upgrade to Cloudflare for the same price (zero) and better African performance.

### 6.9 CI / quality gates

- **GitHub Actions** (free for private repos at this scale): on every PR, run
  - `astro check` (TypeScript)
  - `eslint` + `stylelint`
  - `lighthouse-ci` against staging deploy (fail if perf < 95, a11y < 95)
  - `playwright` smoke test (homepage, contact form, devis form, lang switch)
  - `axe-core` automated a11y scan
- **Lighthouse CI** thresholds enforced: LCP < 1.8s (better than brief's 2.5s), CLS < 0.05, INP < 150ms.

### 6.10 Performance stack

- **HTTP/3** via Cloudflare.
- **Brotli** compression (default).
- **Resource hints:** `<link rel="preconnect">` for the WhatsApp wa.me redirect, `<link rel="preload">` for the hero image only.
- **Critical CSS** inlined per-page by Astro.
- **JS budget:** target **< 60 KB JS gzipped** for the homepage. Tailwind purges aggressively. GSAP is the heaviest dep (~25 KB minified gzipped, only on pages that need it).
- **Image budget:** hero ≤ 80 KB AVIF, all other images ≤ 50 KB.
- **Page-weight budget homepage:** **< 700 KB total** (brief says 1 MB; we beat it).

---

## 7. Development Roadmap

### Master timeline

| Phase | Window | Calendar dates | Deliverables |
|---|---|---|---|
| 1. Research & lock-down | 3 days | 2026-05-01 → 2026-05-04 | Clarifications closed, persona/IA validated, brand foundation kicked off |
| 2. Brand & wireframes | 4 days | 2026-05-05 → 2026-05-08 | Logo system, palette, type, low-fi wireframes for 6 key pages |
| 3. UI design (Figma) | 6 days | 2026-05-09 → 2026-05-14 | High-fi designs for 12 pages × 2 breakpoints, prototype, client review |
| 4. Frontend build | 10 days | 2026-05-15 → 2026-05-24 | Component library, all routes built, motion, FR content integrated |
| 5. Content + integrations | 5 days | 2026-05-25 → 2026-05-29 | EN translations, blog articles, forms wired, CV upload, GA4/CWA, JSON-LD |
| 6. QA & accessibility | 3 days | 2026-05-30 → 2026-06-01 | Lighthouse > 95, axe pass, cross-browser, manual audits, client recette |
| 7. Launch | 2 days | 2026-06-02 → 2026-06-03 | DNS migration from Solidep, Cloudflare go-live, GBP published, monitoring |
| 8. Optimisation | 30 days post-launch | 2026-06-03 → 2026-07-03 | Real-user monitoring, SEO iteration, conversion tweaks, monthly SEO report |

**Total: 33 calendar days from signature to live.** Premium offer commits 6–7 weeks; we have ~5 working weeks of headroom + a 4-week optimisation tail. Healthy buffer.

### Phase 1 — Research (3 days)

- Close all 15 clarifications via a single client recap email + 30-min call.
- Validate IA in this document with Bechir.
- Audit the existing site: scrape content worth keeping, build a redirect map (old URL → new URL).
- Competitive teardown: G4S, Securitas, Tango International, Delta Protection, plus 3 RDC competitors. One-page summary.
- **Photography brief**: locations, agents, time of day, shot list. Blocker: needs client sign-off for any new shoot, OR confirmation that existing assets are sufficient (likely they're not for Premium — flag).

### Phase 2 — Brand & wireframes (4 days)

- Finalise palette, type pairing, logo treatment (existing logo cleaned up if needed — vector source from client).
- Write `design/BRAND.md` with full design tokens.
- **Wireframe in Figma at low fidelity** for: Home, Service hub, Service detail, À propos, Centre de formation, Contact. Mobile + desktop.
- Internal review against this blueprint before client sees anything.

### Phase 3 — UI design (6 days)

- High-fi Figma for 12 key pages × 2 breakpoints (desktop + mobile). Tablet derived, not designed bespoke.
- Component library in Figma: buttons, inputs, tiles, navigation, footer, cards.
- Motion specs documented as Figma annotations + a short Loom showing intended timing.
- **Client review** at end of phase 3 — formal sign-off gate before Phase 4 starts. This is the 40 % invoicing milestone per the brief.

### Phase 4 — Frontend build (10 days)

Sequence:
1. Repo scaffold + design tokens + Tailwind config (½ day).
2. Component library (3 days): Button, Input, Tile, Nav, Footer, Section, Image, Counter, Quote, Bento.
3. Page assembly (5 days): Home → Services hub → Service detail (1 template, 9 pages) → About → Formation → Carrières → Actualités → Contact.
4. Motion layer (1½ days): GSAP scroll, Lenis, View Transitions, reveals.

**Constraint:** every page passes Lighthouse > 90 before the next page is started. No "we'll fix perf later" — fixing perf later in a static site is 5× the work.

### Phase 5 — Content + integrations (5 days)

- EN translations done by a real bilingual writer (not LLM-only — LLM draft, human polish; use a Tunisian/EU pro reviewer or Bechir's network).
- Blog: 3 inauguration articles drafted (Premium offer commitment).
  1. *"Pourquoi 11 ans d'expérience changent tout en sécurité privée à Kinshasa"*
  2. *"Sécuriser une ambassade : protocole et exigences"*
  3. *"Devenir agent GSS : le parcours de formation"*
- Forms wired (Web3Forms + Cloudflare Worker for CV).
- Analytics: GA4, Cloudflare Web Analytics, Search Console.
- JSON-LD on every page.
- Google Business Profile created and verified (this can take 5–14 days for postcard verification — **start it day 1 of Phase 5**).

### Phase 6 — QA & accessibility (3 days)

- Lighthouse 95+ on every route (mobile + desktop).
- axe-core: zero serious issues.
- Manual keyboard walkthrough.
- NVDA + VoiceOver smoke test.
- Cross-browser: latest Chrome, Firefox, Safari, Edge, Samsung Internet (Africa-relevant).
- Cross-device: iPhone SE → 15 Pro Max, Pixel 6, low-end Android (test on 3G throttling).
- Client recette session — Bechir clicks through with us, log issues in GitHub.
- 48-hour fix window, then sign-off.

### Phase 7 — Launch (2 days)

**Day 1:**
- Final production build deployed to Cloudflare Pages.
- DNS lowered to 300s TTL on Solidep 24h prior.
- Cutover: change NS records from Solidep to Cloudflare.
- 301 redirects from old URLs (via `_redirects` file).
- Verify: SSL valid, all pages 200, sitemap submitted, GSC indexing.

**Day 2:**
- Submit to Bing.
- Publish Google Business Profile.
- Smoke-test forms end-to-end (real submission to client inbox).
- Hand over: docs, credentials (1Password vault transfer or sealed envelope), guide PDF, video tutorial.
- Tag `v1.0.0` in git.

### Phase 8 — Optimisation (30 days)

- Week 1: monitor Cloudflare Analytics + GSC; fix 404s, indexing issues.
- Week 2: first SEO report (Premium offer commits monthly reports for 3 months).
- Week 3: review form conversion data, tweak CTAs if needed.
- Week 4: review recordings (Microsoft Clarity), identify UX rough edges, ship 1.0.1.

This is the included month of maintenance from the Premium offer.

---

## 8. The "$20K Website" Secret Sauce

What actually separates a 2 000 USD freelance build from a 20 000 USD agency build, ranked by visible impact:

### 8.1 Photography (the #1 multiplier)
Cheap sites die on stock photography. Premium sites live or die on **bespoke, deliberate, art-directed photographs**. If GSS doesn't have premium-grade existing assets, we either:
- Commission a half-day shoot in Kinshasa (golden hour, real agents, real locations, ~300–600 USD locally),
- Or art-direct a curation pass + colour-grade existing photos to a single tonal palette, OR
- Use a **single tasteful editorial illustration style** as a fallback (commissioned vector work, not stock).

**This is the largest single risk to the "premium" verdict** — flagged in §11.

### 8.2 Copywriting voice
- Cheap: *"Solutions de sécurité innovantes pour entreprises et particuliers."*
- Premium: *"Vigilance permanente, depuis Kinshasa."*

We write in **short, declarative sentences with editorial confidence**. No corporate jargon. No "innovative", "leading", "cutting-edge". Voice rule: *"Could a luxury brand write this? If not, rewrite."*

### 8.3 Typography craft
- Optical sizing, tabular numerals, real hyphenation, controlled measure (45–75 chars per line on prose, max 2 fonts, max 4 weights). 90 % of "premium" sensation lives in type.

### 8.4 Spacing rhythm
- **Section padding ≥ 96px.** Premium sites breathe. Cheap sites pack.
- **One sentence per line on hero subheads.**
- **Right-side alignment on non-prose content where it earns hierarchy.**

### 8.5 Restrained motion
- Cheap sites animate everything. Premium sites animate **three things, perfectly**.
- The three: hero entry, scroll reveals (subtle, not theatrical), the Méthode pin.

### 8.6 Trust signals stacked subtly
- Real client logos (with permission).
- Real numbers (300 agents, 11 ans).
- RCCM/IDNAT visible in footer.
- A real address with a real Google Maps embed.
- Real testimonials with real names and real company logos.
- Photo of the actual office building.
- No "fake it till you make it" anything.

### 8.7 Storytelling structure
Hero (impression) → manifesto (why) → proof (numbers + logos) → depth (services/method) → proof again (testimonials) → action (contact). This is a Pixar pitch arc applied to a B2B site.

### 8.8 Conversion science
- Each page = one primary CTA, visible above the fold AND repeated in the footer of the section.
- Forms: 4 fields max on the soft form (name, email/phone, service, message). The longer form (devis détaillé) lives behind a single button click.
- Phone numbers tap-to-call on mobile. WhatsApp links use `wa.me/...?text=...` with a pre-filled French message.
- After-form behaviour: redirect to `/merci/` page (conversion event tracked there), not a toast.

### 8.9 Polished details (the pile-on)
- Custom 404 with personality.
- Custom selection colour.
- Custom scrollbar.
- Print stylesheet (yes — embassies print PDFs of vendor sites).
- `og:image` per page, hand-designed, not auto-generated.
- Favicon as a complete set (16, 32, 180 apple-touch, 192/512 PWA).
- Structured data so a Google search of *"GSS Congo"* shows a knowledge-panel-worthy result.
- A `humans.txt`. Tiny detail. Premium tell.

### 8.10 Documentation
The handover dossier is itself a premium signal. A single-PDF brand book + technical README + 5-minute Loom walkthrough means the client never feels abandoned.

---

## 9. Risks to Avoid (the cheap-tells checklist)

If any of these appear in the final build, the project has failed the premium bar. Treat these as commit-blocking.

| # | Anti-pattern | Why it kills premium |
|---|---|---|
| 1 | Stock photo of a guard with crossed arms | Generic security cliché; every cheap site has it |
| 2 | Red/black palette ("alert" aesthetic) | Confuses authority with aggression |
| 3 | Auto-rotating testimonial carousel | 2010 pattern; nobody waits for slide 3 |
| 4 | Floating green WhatsApp blob bottom-right | Cheap-site signature; we use a refined treatment in the action bar |
| 5 | Bootstrap-style cards with drop shadows | Default-tooling tell |
| 6 | Lottie animations of locks/shields | Stock motion; every freelance security site has them |
| 7 | Headlines using "innovative", "leading", "premier" | Marketing-speak; lacks confidence |
| 8 | Logo wall of unverifiable clients | Trust killer if anyone Googles them |
| 9 | Awwwards-bait scroll spectacle | Hurts perf, distracts from CTAs, ages badly |
| 10 | Literal FR→EN translations | Reads as machine-translated; embassies notice instantly |
| 11 | One-size-fits-all service page template with no real depth | Premium offer promised enriched depth — deliver it |
| 12 | A cookie banner that blocks the page | First impression destroyed; use Cloudflare Analytics primarily, GA4 behind a tasteful banner |
| 13 | Accessibility as an afterthought | Legal + ethical + ranking risk |
| 14 | Font-display: block (FOIT) | White flash kills LCP; use swap |
| 15 | Background videos | Bandwidth murder for African mobile users |
| 16 | Centered hero with a centered button (every-template syndrome) | Dead-giveaway of generic origin |
| 17 | Heroicons / default Lucide unmodified | Free-tier tell; we custom-stroke ours |
| 18 | Generic favicon | A site without a designed favicon is amateur |
| 19 | "Powered by [framework]" footer credit | Looks like a portfolio piece, not a client site |
| 20 | Late-arriving content that forces wireframe assumptions | Single biggest project-failure mode — flag in §11 |

---

## 10. Immediate Next Action Plan

### Today (2026-05-01)
1. Save this blueprint to the repo (this file).
2. Send Bechir a single recap email containing:
   - Confirmation of Premium offer signed today.
   - The 15 clarifications bundled into a clean numbered list. Ask for written answers within 72h.
   - Photography question: does GSS have premium-grade photography? If not, propose a half-day shoot OR a curated image direction.
   - Logo permissions question (clarification #11).
   - Schedule a 30-min call within 48h to walk through the answers together.

### Tomorrow (2026-05-02)
3. Start Phase 1: competitive teardown (G4S / Securitas / Tango / Delta Protection / 3 RDC competitors). One-page summary committed to `docs/research/competitive-teardown.md`.
4. Audit existing `gss-congo.com` site, build a redirect map → `docs/research/redirect-map.md`.
5. Open a `clarifications-tracking.md` file in `docs/client-comms/` with status per question.

### Day 3–4 (2026-05-03 → 2026-05-04)
6. With clarifications in hand, lock the brand foundation: palette, type pairing (validated visually with a one-pager mock), logo treatment.
7. Write `design/BRAND.md` with final tokens (CSS custom properties, Figma variables).
8. Kick off photography decision (shoot vs. curate vs. illustrate).

### Day 5–8 (Phase 2 — wireframes)
9. Excalidraw or Figma low-fi wireframes for 6 key pages × 2 breakpoints.
10. Internal review against this blueprint.
11. Share wireframes with Bechir for directional sign-off (not pixel sign-off — that's Phase 3).

### Day 9–14 (Phase 3 — UI design)
12. Hi-fi Figma. Component library first, then page assembly.
13. Build a static **clickable Figma prototype** for the homepage. Send to client.
14. **Formal sign-off gate** at end of Phase 3 → 40 % invoice.

### Day 15+ (Phase 4 — build)
15. Repo scaffold (Astro 5 + Tailwind v4 + tokens + GSAP + Lenis).
16. Component library in code.
17. Page-by-page build with Lighthouse gating.
18. Continue per the §7 timeline.

### Standing rituals throughout
- **Daily:** 15-min self-review against §9 risks. Anything triggered? Roll back.
- **End of each phase:** update this blueprint with deviations + commit.
- **Weekly:** short status note to Bechir (Friday EOD).
- **Always:** if a decision conflicts with §0 North Star, the North Star wins.

---

## 11. Open dependencies (need client closure before Phase 3)

These block the design phase. Capture answers in `docs/client-comms/`.

| # | Question | Owner | Deadline |
|---|---|---|---|
| 1 | 15 clarifications from cahier des charges (slogan, addresses, phones, etc.) | Bechir | 2026-05-04 |
| 2 | Premium photography: existing assets sufficient OR commission a shoot? | Bechir | 2026-05-04 |
| 3 | Client logo permissions for trust band | Bechir | 2026-05-08 |
| 4 | Final exact navy hex (proposing `#0A1628`) | Bechir | 2026-05-04 |
| 5 | Slogan validation (proposing *"La sécurité, exercée comme un métier."*) | Bechir | 2026-05-08 |
| 6 | EN translation reviewer (in-house bilingual or external?) | Bechir | 2026-05-15 |
| 7 | Instagram + Facebook business account access (for Graph API, since Basic Display API was deprecated late 2024) | Bechir | 2026-05-22 |
| 8 | Existing Google Analytics / Search Console / Business Profile accounts | Bechir | 2026-05-08 |

**Critical path note:** photography decision (#2) is the single biggest schedule risk. If a shoot is needed, the shoot must happen by 2026-05-15 to feed Phase 4.

---

## 12. Definition of Done (launch gate)

The site ships only when **every single one** of these is true:

- [ ] All 22 routes × 2 languages render without errors.
- [ ] Lighthouse mobile ≥ 95 on Performance, Accessibility, Best Practices, SEO — on Home, Services hub, top-3 service pages, Contact.
- [ ] LCP < 1.8s on 4G simulation, CLS < 0.05, INP < 150ms.
- [ ] axe-core: zero serious or critical issues.
- [ ] Manual keyboard walkthrough: every interactive element reachable + visibly focused.
- [ ] Forms tested end-to-end with a real submission landing in client's inbox.
- [ ] CV upload tested with PDF + DOCX + a 5 MB file.
- [ ] FR + EN content reviewed by a bilingual human, not LLM-only.
- [ ] JSON-LD validates in Google Rich Results Test.
- [ ] All `og:image` rendered correctly in Twitter/Slack/LinkedIn previews.
- [ ] Sitemap submitted to GSC + Bing.
- [ ] Google Business Profile published.
- [ ] 301 redirects from old URLs verified (curl -I).
- [ ] DNS migrated, SSL full-strict, Cloudflare WAF on.
- [ ] Print stylesheet renders A4 cleanly.
- [ ] Favicon set complete.
- [ ] Custom 404 verified.
- [ ] Cookie banner (GA4 only) defaults to *deny*.
- [ ] `humans.txt`, `robots.txt`, `security.txt` in place.
- [ ] Documentation handover delivered (PDF + Loom).
- [ ] Bechir has signed the certificat de livraison.

---

*Document version: 1.0 — 2026-05-01. Update with every phase transition.*
