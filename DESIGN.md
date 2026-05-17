# Design

Visual system for `gss-congo.com`. Mirrors the source of truth at `design/BRAND.md` and the locked decisions in `docs/decisions/01-decisions-log.md` §C. When tokens change, update both.

## Theme

**Mode**: light-default with dark-section alternation. Single grain layer. No automatic dark-mode toggle. The scene that decides this:

> A procurement director glances at this on her 14-inch laptop in a sunlit Kinshasa office at 11am. An embassy security officer reads it on a 27-inch monitor in a quiet, low-lit Brussels office at 2pm. Both should feel the same calm authority.

That sentence forces a warm, ivory-leaning light surface as the default canvas, with deep-navy hero and CTA bands punched in for emotional weight, not "dark mode". No glassmorphism. No gradient text.

## Color

OKLCH-aware palette. **All neutrals are tinted toward ink (chroma ~0.005–0.02)**. Never `#000` or `#fff`.

**Color strategy: Restrained.**

The bronze accent is used at ≤10% of any rendered surface: primary CTA, focus rings, KPI highlights, hairline accents. The blue is a sparing brand callback. Most surface area is ink (deep navy) or cream (warm ivory). This is deliberate: the contracted promise is *« autorité calme »*, and a Committed or Drenched strategy would betray that.

```css
@theme {
  /* INK — deep refined ribbon-blue, almost-black, institutional authority */
  --color-ink: #0e2e4a;
  --color-ink-2: #154062;

  /* BLUE — logo ribbon mid-tone, used sparingly as brand callback */
  --color-blue: #1f6ba6;
  --color-blue-glow: #4a9cc9;

  /* CREAM — warm surface, harmonises with bronze (NOT pure white) */
  --color-cream: #f5f0e6;
  --color-cream-2: #ece4d3;

  /* BRONZE — derived from the actual GSS shield. NOT yellow gold. */
  --color-bronze: #9b7a4f;
  --color-bronze-deep: #7a5e3a;
  --color-bronze-warm: #b89569;

  /* HAIRLINES — 1px borders */
  --color-hairline-on-dark: #1e3a5c;
  --color-hairline-on-light: #d9cfb8;

  /* MUTED — secondary text, biased to bronze family */
  --color-mute-on-light: #6b6258;
  --color-mute-on-dark: #a6b0bf;

  /* ALERT — sole non-blue/bronze tone. Critical errors only. */
  --color-alert: #b85838;
}
```

OKLCH companions for filmic borders (avoid banding on dark surfaces):

```css
border: 1px solid oklch(20% 0.04 250 / 0.6);   /* on dark, ink family */
border: 1px solid oklch(75% 0.04 75 / 0.5);    /* on light, cream/bronze family */
```

**Selection** is bronze on cream, never default browser blue.

**Discipline**: maximum 5 colours visible in any rendered surface (typically ink + cream + bronze + mute + one extra). Anything else is photo, grain, or shadow.

## Typography

**Two faces, both variable, both self-hosted.**

- **Display: Fraunces** (Google/Fontshare, OFL, free). Editorial confidence with optical sizing. Variable axes used: `wght`, `opsz`, `SOFT`. Weight range 380–500 only, never extra-bold.
- **Body: Inter** (free, OFL). Neutral, legible at every size. Weight 400 body, 500 UI labels, 600 emphasis.

```css
--font-display: 'Fraunces Variable', 'Cormorant Garamond', Georgia, serif;
--font-body: 'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
```

Self-hosted via `@fontsource-variable/*`. No Google Fonts CDN call. `font-display: swap` (never FOIT).

**Optical sizing on Fraunces, non-negotiable** (this is the difference between "nice serif" and "real typography"):

```css
.display-hero    { font-variation-settings: 'opsz' 144, 'wght' 420, 'SOFT' 50;  font-size: clamp(3.5rem, 9vw, 8rem); line-height: 1.05; letter-spacing: -0.02em; }
.display-large   { font-variation-settings: 'opsz' 80,  'wght' 440, 'SOFT' 30;  font-size: clamp(2.5rem, 5vw, 5rem); line-height: 1.08; letter-spacing: -0.015em; }
.display-medium  { font-variation-settings: 'opsz' 32,  'wght' 460;             font-size: clamp(2rem, 3vw, 2.5rem); line-height: 1.15; letter-spacing: -0.01em; }
.display-small   { font-variation-settings: 'opsz' 14,  'wght' 500;             font-size: 1.5rem; line-height: 1.25; }
```

**Modular scale (1.25 ratio)**: 12 · 14 · 16 · 18 · 20 · 25 · 32 · 40 · 50 · 64 · 80 · 100 · 128 px.

**Body line length: cap at 65–75ch.** Prose container `max-width: 640px` enforces this.

**Tabular numerals** on KPI surfaces, phones, hours: `font-variant-numeric: tabular-nums lining-nums;`.

**Eyebrows**: 12px, +0.12em letter-spacing, uppercase, bronze.

## Layout

**Spacing scale** (8px base, modular, NOT linear): `0 · 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256` px.

**Section vertical rhythm, the single biggest premium signal:**

```css
.section { padding-block: clamp(6rem, 12vw, 12rem); }
```

Same padding everywhere is monotony. Vary section padding by emotional weight: hero and Méthode get max; KPI strip and trust band get compressed.

**Containers:**
- `--container-max: 1440px` (hard outer)
- `--container-content: 1280px` (default)
- `--container-narrow: 900px` (forms, narrow editorial)
- `--container-prose: 640px` (prose only, long lines kill premium feel)

**Grid:**
- Desktop: 12 columns, 24px gutters
- Tablet: 8 columns, 20px gutters
- Mobile: 4 columns, 16px gutters
- Asymmetry encouraged in hero, services bento, manifesto blocks. Centered-everything is corporate-template tell.

**Cards: rare.** Bento for services (asymmetric, top-3 priority tiles get wider span), not uniform 3×3. Identical card grids are explicitly banned. Never nest cards.

**Don't wrap everything in a container.** Full-bleed photographic sections are part of the rhythm.

## Radius

```css
--radius-xs:   4px;
--radius-sm:   8px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-pill: 9999px;
```

Maximum 3 radii per page. Mixing 5 different radii is a Bootstrap signature. Full-bleed sections use radius-none.

## Shadows

We mostly avoid shadows. When used:

```css
--shadow-hairline:  0 0 0 1px var(--color-hairline-on-light);
--shadow-soft:      0 4px 16px -4px rgba(10, 22, 40, 0.08);
--shadow-lift:      0 12px 40px -8px rgba(10, 22, 40, 0.16);
--shadow-focus:     0 0 0 3px rgba(155, 122, 79, 0.3);  /* bronze halo */
```

**Never** drop-shadows on cards to mimic depth. That is the Bootstrap signature. Use `--shadow-hairline` instead.

## Motion

**Tokens:**

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-expo:  cubic-bezier(0.7, 0, 0.84, 0);
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);

--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-slow:    600ms;
--duration-reveal:  900ms;
--duration-hero:    1200ms;
```

**Rules:**
- No bounces. No springs. No elastic.
- Animate `transform` and `opacity` only. Never width/height/top/left/margin.
- `prefers-reduced-motion: reduce` disables all scroll-driven and decorative animation; reveals become instant.
- One pinned section maximum site-wide (the *Méthode*).

**Where motion is used (the three earned moments):**
1. Hero entrance: line-by-line text mask reveal, hero image blur-to-clear over 1100ms, slow ken-burns over 18s.
2. Scroll reveals: subtle fade-up via `data-reveal` attribute + IntersectionObserver. Stagger 60–120ms.
3. Méthode pin: GSAP ScrollTrigger pins viewport, 4 steps progress as user scrolls, horizontal progress hairline.

Plus: page transitions via Astro View Transitions (350ms cross-fade), KPI count-up on scroll-into-view, top page-progress hairline (bronze, scaleX-driven).

## Components

Defined in code under `src/components/`. Conventions:

| Component | Variants | Notes |
|---|---|---|
| `Button` | primary (bronze fill), ghost (ink hairline → fills on hover), ghost-on-dark (cream + bronze hairline) | Optional arrow that translates +0.25rem on hover. `:active` scale(0.98). |
| `Logo` | sm/md/lg, on-light/on-dark | Placeholder shield SVG until vector logo arrives. |
| `Header` | transparent over hero, frosted ink past 80px scroll. Mega-panel for services on desktop, slide-in panel on mobile. | |
| `Footer` | 4 columns: Identity / Services / Company / Coordinates. RCCM/IDNAT/N° impôt visible. | |
| `MobileActionBar` | 56px sticky bottom bar: Call / WhatsApp / Devis. Premium app pattern. | |
| `KpiStrip` | dark navy band, 4 stats, Fraunces tabular numerals in bronze-warm. Counts up on scroll-into-view. | |
| `ServicesBento` | 9 services in asymmetric grid. Top 3 priority tiles are wider. Photo + hover scale + border lights bronze. | No card-lift shadows. |
| `Method` | sticky-pin scrollytelling. 4 steps, horizontal progress hairline, giant `01–04` numerals. | Mobile fallback: vertical stack. |
| `TrustBand` | 6–8 client logos monochrome OR sectoral fallback band when permissions pending. | Optical (not geometric) logo sizing. |
| `HeroVisual` | Photo + grain overlay + vignette. 4:5 aspect on desktop. | Ken-burns 18s, blur-clear on entrance. |

**Form fields:** 1px hairline default → bronze + 4px bronze halo on focus. Error: `--color-alert` border + helper text linked via `aria-describedby`.

## Iconography

**Lucide**, custom-stroked at **1.5px** (default Lucide is 2px, generic). Sizes: 16 / 20 / 24 / 32. No 18, no 22, odd values feel arbitrary. Never used as decoration; decorative icons get `aria-hidden="true"`.

## Imagery

- **No stock.** Real GSS agents, real Kinshasa locations, golden hour. Until the real shoot lands, use atmospheric AI photography from Pollinations.ai (Flux backend, free, CC0). NEVER agent faces from AI, clients spot it instantly and trust collapses.
- **Single colour grade across the site**: cool shadows, warm highlights, mild desaturation (~0.92).
- **Format**: AVIF first, WebP fallback. Hero ≤ 80 KB; content images ≤ 50 KB.
- **Aspect ratios**: 16:10 (services), 4:5 (hero portraits), 21:9 (full-bleed atmospheres).
- **Loading**: `fetchpriority="high"` on hero only; `loading="lazy"` everywhere else.

## Texture

**SVG fractal grain** site-wide, 0.04 opacity, `mix-blend-mode: overlay`, fixed position. ~2 KB inline. The single biggest "luxury" cue at zero perceptible cost. Disabled under `prefers-reduced-motion`.

## Voice and copy

| Yes | No |
|---|---|
| *« Vigilance permanente, depuis Kinshasa. »* | *« Solutions de sécurité innovantes. »* |
| *« Onze ans de présence. »* | *« Leader de la sécurité au Congo. »* |
| *« Une autorité calme. »* | *« Soyez en sécurité avec nous ! »* |
| *« Nos agents ne sont pas recrutés, ils sont formés. »* | *« Nos professionnels qualifiés à votre service. »* |

**Banned words**: *innovative · leading · cutting-edge · premier · solutions · synergy · expertise*.
**Welcome words**: *présence · rigueur · vigilance · discrétion · métier · onze ans*.
**Em dashes are banned** (per impeccable shared design law). Use commas, colons, semicolons, periods, parentheses.

---

*Source of truth: `design/BRAND.md`. Token changes propagate here, to `src/styles/app.css` `@theme` block, and to Figma variables. Last updated 2026-05-04.*
