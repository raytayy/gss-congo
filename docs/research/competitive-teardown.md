# Competitive Teardown — Sécurité privée

> **Purpose:** triangulate the visual, functional, and positioning standards we're aiming above.
> **Method:** for each competitor, answer five questions: *What works? What fails? What do we steal? What do we avoid? What's the takeaway for GSS?*
> **Last updated:** 2026-05-02 (initial pass — based on industry knowledge; verify with a live visit before locking design choices).
>
> ⚠️ **Pending action:** visit each site live, take screenshots, and store them in `docs/research/screenshots/<brand>/`. This file captures the analytical frame; the visuals back it up.

---

## 1. International references (the bar to clear)

### 1.1 Securitas — `securitas.com`

**Positioning:** *"Helping make your world a safer place."* Calm, institutional, scale-first.

| Dimension | Observation |
|---|---|
| ✅ What works | Restrained navy palette, generous whitespace, photographic warmth, multi-country selector front-and-centre, clear service taxonomy |
| ❌ What fails | Stock-feeling photos in places, copy is corporate-bland (we can do better here), CTA hierarchy weak |
| 💎 To steal | Country/region-aware homepage pattern; method/process visualisation; trust-building footer with credentials |
| 🚫 To avoid | Generic "we are global" rhetoric; uninspired hero composition |
| 🎯 GSS takeaway | Match their **institutional gravity**, beat them on **editorial voice and visual craft** |

### 1.2 G4S — `g4s.com`

**Positioning:** *"Securing your world."* Heavy on industry-vertical messaging.

| Dimension | Observation |
|---|---|
| ✅ What works | Vertical-by-vertical service pages (banking, healthcare, government...) — clear B2B segmentation |
| ❌ What fails | Cluttered, busy hero, too many CTAs competing, dated grid system |
| 💎 To steal | Vertical/industry pages — useful pattern for GSS's "Industriels / Ambassades / ONG / BTP / Hôtellerie / Résidences" cuts |
| 🚫 To avoid | Multi-CTA above the fold; "we do everything" energy |
| 🎯 GSS takeaway | Audience-tailored landing zones make sense; we'll do them with more visual restraint |

### 1.3 Prosegur — `prosegur.com`

**Positioning:** Innovation-leaning ("intelligent security").

| Dimension | Observation |
|---|---|
| ✅ What works | Bolder visual identity, more confident type, decent motion |
| ❌ What fails | Tries to look "tech startup", which can dilute the institutional trust angle |
| 💎 To steal | Type confidence, single primary CTA per section |
| 🚫 To avoid | Tech-startup vibes; we're not selling SaaS, we're selling presence |
| 🎯 GSS takeaway | Borrow the type confidence, keep the institutional anchor |

### 1.4 Tango International — `tango-international.com` (RDC market reference)

**Positioning:** Local + regional security, often cited next to GSS.

| Dimension | Observation |
|---|---|
| ✅ What works | Regional credibility, local-language content |
| ❌ What fails | Visual quality below international tier; site feels dated |
| 💎 To steal | Local credibility cues (Congolese context, regional offices) |
| 🚫 To avoid | The visual gap is exactly the gap we're closing |
| 🎯 GSS takeaway | **This is who we're beating on craft.** Same market, materially better build = competitive advantage. |

### 1.5 Delta Protection — `delta-protection.com` (RDC market reference)

| Dimension | Observation |
|---|---|
| ✅ What works | Direct, factual, gets the job done |
| ❌ What fails | Template aesthetic; no editorial point of view |
| 💎 To steal | Phone-first contact pattern (relevant for African mobile-first audience) |
| 🚫 To avoid | Template grid, generic typography |
| 🎯 GSS takeaway | **This is the floor we must rise above.** Anything we ship that resembles this fails the Premium bar. |

---

## 2. RDC market — additional local competitors to research

> **Action item:** identify and analyse 3 other Congolese security companies. Search Google for *"société de sécurité Kinshasa"* and screenshot the top 5 organic results.

| Brand | Status | URL | Notes |
|---|---|---|---|
| (TBD #1) | 🔴 to identify | — | — |
| (TBD #2) | 🔴 to identify | — | — |
| (TBD #3) | 🔴 to identify | — | — |

Likely candidates to investigate first: *Aigle Royal Sécurité*, *Top Service Sécurité*, *Cobra Sécurité*, *Sécuricom*, *KK Security RDC*. Verify activity (some sites are abandoned).

---

## 3. Adjacent references (NOT security, but instructive for tone)

These are NOT competitors — they're tone references for what "premium institutional B2B" can look like.

### 3.1 Brunello Cucinelli — `brunellocucinelli.com`
- **Why we look:** discreet luxury, ivory tones, photographic dignity, restraint as identity.
- **What we steal:** spacing rhythm, full-bleed photography that breathes, type that is confident but not loud.

### 3.2 Aman Resorts — `aman.com`
- **Why we look:** hospitality at its quietest. Trust through atmosphere.
- **What we steal:** the absence of "buy now" energy. Calm CTAs.

### 3.3 Linear — `linear.app`
- **Why we look:** modern motion craft, interaction polish.
- **What we steal:** scroll choreography ideas, micro-interaction quality bar.

### 3.4 Vercel — `vercel.com`
- **Why we look:** type contrast, product-page pattern depth, dark/light handling.
- **What we steal:** display-type confidence, hierarchy via scale.

### 3.5 Koto Studio — `koto.studio`
- **Why we look:** editorial brand-agency aesthetic.
- **What we steal:** asymmetric grid, generous negative space, image craft.

---

## 4. The triangle GSS lands inside

```
        Securitas / G4S
        (institutional gravity)
              ▲
              │
              │
              │
              │
              │
   ◀─────── GSS ────────▶
              │
              │
              ▼
   Brunello Cucinelli /         Linear /
   Aman                         Koto / Vercel
   (discreet luxury)            (modern editorial / motion craft)
```

We are NOT cloning any vertex. We are landing in the middle of the triangle. If a design decision pulls us toward only one vertex, it's wrong.

---

## 5. Patterns we adopt (from this teardown)

| Pattern | Source(s) | How we apply it |
|---|---|---|
| Audience-segmented landing within a single homepage | G4S vertical pages | Bento services tiles + audience-specific service pages |
| Method/process visualisation | Securitas | Sticky-scroll Méthode section (Audit → Plan → Déploiement → Supervision) |
| Trust-stacked footer | Securitas | RCCM, IDNAT, certifications visible |
| Asymmetric editorial hero | Koto / Vercel | 60/40 split, headline left, photograph right |
| Type-as-identity | Linear / Vercel | Fraunces display + Inter body, opsz axis |
| Photographic dignity | Brunello Cucinelli / Aman | No stock; real golden-hour photography |
| Single primary CTA | Aman / Linear | Devis above the fold, never competing CTAs |

## 6. Patterns we explicitly reject

| Pattern | Source seen | Why reject |
|---|---|---|
| Multi-CTA hero | G4S, several local Congolese security sites | Dilutes conversion; reads as desperate |
| Stock photo of guard with crossed arms | Most local + many international | Generic security cliché — biggest "cheap-tell" |
| Auto-rotating carousel | Tango, Delta Protection, several locals | 2010 pattern; nobody waits for slide 3 |
| Floating green WhatsApp blob | Most local Congolese sites | Cheap-site signature — we use a refined treatment |
| Bootstrap-ish card grids | Tango, Delta | Default-tooling tell; we use bento with asymmetry |
| Lottie locks/shields | Several internationals | Stock motion library — premium sites avoid |

---

## 7. Action items from this teardown

- [ ] Visit all 5 international + 3-5 local sites live. Screenshot homes + 1 service page each. Store in `docs/research/screenshots/<brand>/`.
- [ ] Time the LCP / first-paint of each (Chrome DevTools Network → Slow 4G). Note in §8.
- [ ] Pull 3 hero images from each, into a single Figma board to study composition.
- [ ] Validate the "triangle" framing in §4 with Bechir during call 01 — does he agree with the positioning?
- [ ] Write a one-page summary to attach to Bechir's call recap email.

---

## 8. Performance benchmark (TODO — fill after live audits)

| Site | LCP (4G) | Page weight | Lighthouse perf | Notes |
|---|---|---|---|---|
| Securitas | TBD | TBD | TBD | — |
| G4S | TBD | TBD | TBD | — |
| Prosegur | TBD | TBD | TBD | — |
| Tango Intl | TBD | TBD | TBD | — |
| Delta Protection | TBD | TBD | TBD | — |

Goal: GSS Congo must beat **every single competitor** on these three metrics. Performance is itself a luxury cue — the site loading instantly is part of the brand.

---

*This document evolves: add screenshots, update with live observations, supersede assumptions with verified data.*
