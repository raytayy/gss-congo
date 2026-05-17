# GSS Congo — Brand Foundation (provisional)

> **Status:** 🟡 PROVISIONAL — awaiting Bechir's validation on call 01.
> **Last updated:** 2026-05-02.
> **Sources of truth:** this file (design tokens) + `docs/decisions/01-decisions-log.md` (decision rationale) + `docs/EXECUTION_PLAN.md` §3 (design direction).
>
> Once validated, locked tokens propagate to:
> - Tailwind v4 `@theme` block (CSS-first config)
> - Figma local variables
> - All Astro components

---

## Brand statement (one line)

> *« Une autorité calme. La sécurité comme service de prestige, pas comme menace exhibée. »*

This is the filter for every visual decision. If a token, photo, or animation can't sit comfortably under this line, it's wrong.

---

## 1. Colour tokens

### 1.0 Source — derived from the GSS logo

The existing GSS logo is built around **bronze + blue**, not gold + navy. Reading the logo carefully:

- **The shield** is a glossy **coppery bronze** (not yellow gold) with metallic highlights and darker brown shadows.
- **The eagle** is white/cream with bronze edge-lighting.
- **The ribbon** is a layered blue: a darker base blue with **brighter cyan-blue highlights** along the fold.
- **The banner** ("GSS") sits on a medium-bright blue.
- **"Guarde Security Service" arc** is in dark bronze on a light cream halo.

The palette below is a **refined institutional version** of these brand colours — keeping the bronze + blue identity, but pushing values to where they serve a premium, editorial site (deeper blues for authority, calmer bronzes that won't read as costume jewellery, warm cream surfaces that harmonise with the bronze rather than fighting it).

### 1.1 Core palette

```css
@theme {
  /* INK — deep refined ribbon-blue, almost-black, institutional authority.
     This is a premium-deepening of the logo's mid-tone blue. */
  --color-ink:        #0E2E4A;   /* primary dark surface, hero, type on light */
  --color-ink-2:      #154062;   /* secondary, section layering */

  /* BLUE — the logo's living mid-tone blue, used SPARINGLY as a brand callback */
  --color-blue:       #1F6BA6;   /* small accents, links on light, brand moments */
  --color-blue-glow:  #4A9CC9;   /* hover/highlight only, never as a fill */

  /* CREAM — warm surface, harmonises with bronze (replaces "ivory") */
  --color-cream:      #F5F0E6;   /* primary light surface */
  --color-cream-2:    #ECE4D3;   /* alternation rhythm */

  /* BRONZE — brand accent, derived directly from the shield. NOT yellow gold. */
  --color-bronze:        #9B7A4F;   /* primary accent: CTAs, focus rings, dividers */
  --color-bronze-deep:   #7A5E3A;   /* hover/pressed */
  --color-bronze-warm:   #B89569;   /* used on dark backgrounds where deep bronze loses contrast */

  /* HAIRLINES — 1px borders, dividers */
  --color-hairline-on-dark:   #1E3A5C;
  --color-hairline-on-light:  #D9CFB8;

  /* MUTED — secondary text */
  --color-mute-on-light:  #6B6258;   /* warm grey, biased to bronze family */
  --color-mute-on-dark:   #A6B0BF;

  /* ALERT — sole non-blue/bronze tone. Critical errors only. Never decorative. */
  --color-alert:      #B85838;   /* desaturated rust, harmonises with bronze */
}
```

### 1.2 Discipline

- **Maximum 5 colours visible** in any rendered surface (typically: ink, cream, bronze, mute, one extra).
- Anything else is photo, grain texture, or shadow.
- Never decorative red, never default browser blue, never pure black, never pure white.
- `--color-blue` is a **callback to the logo**, used sparingly. Most of the site is ink + cream + bronze.

### 1.3 Contrast verification (must verify in Phase 3)

| Combination | Ratio target | Use case |
|---|---|---|
| `--color-ink` on `--color-cream` | ≥ 12:1 | body text on light surfaces |
| `--color-ink` on `--color-bronze` | ≥ 4.5:1 | CTA label (verify, may need bronze tweak) |
| `--color-cream` on `--color-bronze` | ≥ 4.5:1 | inverse CTA label (verify) |
| `--color-mute-on-light` on `--color-cream` | ≥ 4.5:1 | secondary text |
| `--color-cream` on `--color-ink` | ≥ 12:1 | hero text on dark |
| `--color-bronze-warm` on `--color-ink` | ≥ 4.5:1 | bronze on dark surfaces |
| `--color-blue` on `--color-cream` | ≥ 4.5:1 | inline links on light |

Run through axe-core / Stark before any design ships. **If `--color-bronze` fails on `--color-cream`, swap the CTA fill colour to `--color-ink` with bronze-bordered ghost as primary, bronze fill as secondary.**

### 1.4 OKLCH companions (for filmic borders, no banding)

```css
border: 1px solid oklch(20% 0.04 250 / 0.6);   /* on dark — matches ink family */
border: 1px solid oklch(75% 0.04 75 / 0.5);    /* on light — matches cream/bronze */
```

---

## 2. Typography

### 2.1 Faces

| Role | Face | Source | Notes |
|---|---|---|---|
| Display | **Fraunces Variable** | `@fontsource-variable/fraunces` (Google, OFL) | Variable axes used: `wght`, `opsz`, `SOFT`, `WONK` |
| Body | **Inter Variable** | `@fontsource-variable/inter` (Google, OFL) | Variable axis: `wght` |

**Fallback stacks:**
```css
--font-display: 'Fraunces Variable', 'Cormorant Garamond', Georgia, serif;
--font-body:    'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
```

### 2.2 Hosting

- **Self-hosted via `@fontsource-variable/*`** in `node_modules`. Imported in the global stylesheet only.
- **No Google Fonts CDN call.** Better perf, better privacy, no FOUT.
- **`font-display: swap`** so the fallback shows during font load (never FOIT).
- **Preload** the variable Fraunces file for the hero only (one `<link rel="preload" as="font" type="font/woff2" crossorigin>` per critical route).

### 2.3 Optical sizing on Fraunces

```css
.display-hero   { font-variation-settings: "opsz" 144, "wght" 420, "SOFT" 50; }
.display-large  { font-variation-settings: "opsz" 80,  "wght" 440, "SOFT" 30; }
.display-medium { font-variation-settings: "opsz" 32,  "wght" 460; }
.display-small  { font-variation-settings: "opsz" 14,  "wght" 500; }
```

This is the difference between "nice serif" and "real typography". Non-negotiable.

### 2.4 Type scale (modular, ratio 1.25)

```
xxs  = 12 px   |  caption, eyebrows
xs   = 14 px   |  micro UI, footer
sm   = 16 px   |  body small
md   = 18 px   |  body default
lg   = 20 px   |  body emphasis, lede
xl   = 25 px   |  H4, large UI
2xl  = 32 px   |  H3
3xl  = 40 px   |  H2 (display-medium opsz)
4xl  = 50 px   |  large editorial
5xl  = 64 px   |  page title
6xl  = 80 px   |  hero secondary
7xl  = 100 px  |  hero primary (mobile)
8xl  = 128 px  |  hero primary (desktop, opsz 144)
```

### 2.5 Weight rule

- **Never use weight > 600 on display.** Heavy bold reads as cheap.
- Body: 400 default, 500 UI labels, 600 emphasis.
- Display: 380–500 only (Fraunces opsz axis carries weight perception).

### 2.6 Letter-spacing

| Range | Tracking | Use |
|---|---|---|
| Display 64+ | `-0.02em` | hero, large display |
| Display 32-50 | `-0.01em` | section heads |
| Body | `0` | default |
| Eyebrows / uppercase | `+0.06em` | small caps tone |

### 2.7 Line height

| Use | Value |
|---|---|
| Display | 1.05–1.1 (tight) |
| H2/H3 | 1.15 |
| Body | 1.55 |
| UI / labels | 1.3 |

### 2.8 Numerals

```css
.kpi, .phone, .footer-hours {
  font-variant-numeric: tabular-nums lining-nums;
}
```

---

## 3. Spacing & rhythm

### 3.1 Base unit & scale

- **Base unit:** 8 px.
- **Scale (px):** `0 · 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256`.

```css
@theme {
  --space-0:   0;
  --space-1:   0.25rem;   /* 4 */
  --space-2:   0.5rem;    /* 8 */
  --space-4:   1rem;      /* 16 */
  --space-6:   1.5rem;    /* 24 */
  --space-8:   2rem;      /* 32 */
  --space-12:  3rem;      /* 48 */
  --space-16:  4rem;      /* 64 */
  --space-24:  6rem;      /* 96 */
  --space-32:  8rem;      /* 128 */
  --space-48:  12rem;     /* 192 */
  --space-64:  16rem;     /* 256 */
}
```

### 3.2 Section vertical padding

```css
.section {
  padding-block: clamp(6rem, 12vw, 12rem);  /* 96px → 192px */
}
```

This is **the single biggest premium signal**. Generous breathing room, hotel-lobby vertical rhythm.

### 3.3 Containers

```css
@theme {
  --container-max:     1440px;   /* hard outer limit */
  --container-content: 1280px;   /* default container */
  --container-prose:   640px;    /* prose/text-only */
  --container-narrow:  900px;    /* forms, narrow editorial */
}
```

### 3.4 Grid

- **Desktop:** 12 columns, 24px gutters
- **Mobile:** 4 columns, 16px gutters
- **Tablet:** 8 columns, 20px gutters
- **Asymmetry encouraged** in hero, services bento, manifesto blocks.

---

## 4. Radius

```css
@theme {
  --radius-xs:   4px;    /* form inputs, small chips */
  --radius-sm:   8px;    /* buttons, cards */
  --radius-md:   12px;   /* image tiles */
  --radius-lg:   16px;   /* large surfaces */
  --radius-pill: 9999px; /* badges */
  --radius-none: 0;      /* full-bleed sections */
}
```

**Discipline:** the entire site uses **at most 3 radius values per page**. Mixing 5 different radii is a Bootstrap tell.

---

## 5. Shadows

We mostly avoid shadows (premium = restraint). When used:

```css
@theme {
  --shadow-hairline:  0 0 0 1px var(--color-hairline-on-light);
  --shadow-soft:      0 4px 16px -4px rgba(10, 22, 40, 0.08);
  --shadow-lift:      0 12px 40px -8px rgba(10, 22, 40, 0.16);
  --shadow-focus:     0 0 0 3px rgba(201, 169, 110, 0.3);  /* gold halo */
}
```

**Never use:** drop-shadows that mimic depth on cards. That's the Bootstrap signature. Use `--shadow-hairline` instead.

---

## 6. Motion tokens

```css
@theme {
  /* Easing */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);

  /* Duration */
  --dur-fast:    150ms;
  --dur-normal:  250ms;
  --dur-slow:    600ms;
  --dur-reveal:  900ms;
  --dur-hero:    1200ms;

  /* Stagger */
  --stagger-tight:   60ms;
  --stagger-normal:  90ms;
  --stagger-loose:   120ms;
}
```

**Rules:**
- No bounces, no springs, no elastic.
- `transform` and `opacity` only.
- Honour `prefers-reduced-motion: reduce` (disable scroll-driven, keep instant content reveals).

---

## 7. Icons

- **Library:** Lucide (MIT, free).
- **Stroke:** custom-stroked at **1.5 px** (default Lucide is 2 px — feels generic).
- **Size scale:** 16 / 20 / 24 / 32. No 18, no 22 — odd values feel arbitrary.
- **Never** use icons as decoration without semantic value. Decorative icons get `aria-hidden="true"`.

---

## 8. Imagery

### 8.1 Photography rules

- **No stock.** Real GSS agents, real Kinshasa locations, golden hour.
- **Single colour grade across the site** (cool shadows, warm highlights, mild desaturation).
- **Format:** AVIF first, WebP fallback, never JPG except as last fallback.
- **Sizes:** hero ≤ 80 KB, content images ≤ 50 KB.
- **Loading:** `loading="lazy"` everywhere except the hero (`fetchpriority="high"`).
- **Placeholder:** blurhash or LQIP, fades in over 400 ms.
- **Aspect ratios:** prefer 16:10 (services), 4:5 (portraits), 21:9 (full-bleed atmospheres).

### 8.2 Texture overlay

A subtle SVG fractal noise overlay site-wide:

```html
<div aria-hidden="true" class="grain"></div>
```
```css
.grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background-image: url('data:image/svg+xml;utf8,<svg ...fractal noise...>');
  opacity: 0.04;
  mix-blend-mode: overlay;
}
```

~2 KB inline. The single biggest "luxury" cue at zero perceptible cost.

---

## 9. Component primitives (early sketches, will harden in Phase 3)

### 9.1 Button

| Variant | Default | Hover | Active | Focus |
|---|---|---|---|---|
| Primary | `bg-gold` ink text | `bg-gold-deep`, arrow translates +2px | scale 0.98 | gold halo (3px) |
| Ghost | hairline border, ink text on ivory | inverts to `bg-ink` ivory text | scale 0.98 | gold halo |
| Link | underline grows L→R on hover | gold underline | — | gold halo |

### 9.2 Form input

- Default: 1px hairline, 12px radius, 14px y-padding, body font.
- Focus: gold border + 4px gold halo.
- Error: alert-coloured border + helper text (`aria-describedby`).

### 9.3 Service tile

- Photo (16:10) at top.
- Hairline border default, lights to gold on hover.
- Image scale 1.02 on hover, arrow translates +8px.
- **Never** lifts via shadow — Bootstrap tell.

---

## 10. Voice & tone (copy)

| Yes | No |
|---|---|
| *« Vigilance permanente, depuis Kinshasa. »* | *« Solutions de sécurité innovantes. »* |
| *« Onze ans de présence. »* | *« Leader de la sécurité au Congo. »* |
| *« Une autorité calme. »* | *« Soyez en sécurité avec nous ! »* |
| *« Nos agents ne sont pas recrutés, ils sont formés. »* | *« Nos professionnels qualifiés à votre service. »* |

**Banned words:** *innovative · leading · cutting-edge · premier · solutions · synergy · expertise* (overused).
**Welcome words:** *présence · rigueur · vigilance · discrétion · métier · onze ans*.

**Rule:** if a luxury hotel brand wouldn't write this line, rewrite.

---

## 11. Validation status

| Token group | Status | Locks when |
|---|---|---|
| Colour palette | 🟡 PROPOSED | Bechir validates on call 01 |
| Type pairing | 🟡 PROPOSED | Bechir validates on call 01 |
| Spacing scale | ✅ LOCKED | Internal decision |
| Radius scale | ✅ LOCKED | Internal decision |
| Motion tokens | ✅ LOCKED | Internal decision |
| Icons | ✅ LOCKED | Internal decision |
| Imagery direction | 🔴 OPEN | Photography decision pending (Bechir) |
| Voice rules | 🟡 PROPOSED | Refines after slogan validation |

---

## 12. How to evolve this file

- A change to a token = a change to the site. Treat each token edit as a code change: PR, decision-log entry, propagation to Tailwind config + Figma variables.
- Never edit a locked token in place — supersede it with a new entry and migrate.

---
