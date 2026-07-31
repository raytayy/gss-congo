# GSS Congo

Site web institutionnel de **Guarde Security Services** (GSS Congo) — société de gardiennage et de sécurité privée à Kinshasa, RDC.

---

## Stack technique

| Couche | Choix | Décision |
|---|---|---|
| Framework | **Astro 5** + **Tailwind CSS v4** (CSS-first) | B1 |
| Contenu | MDX en repo (pas de CMS) | B2 |
| Hébergement | Cloudflare Pages (PoP Lagos pour Kinshasa) | B3 |
| DNS | Cloudflare DNS (WAF + DDoS gratuits) | B4 |
| Formulaires | Web3Forms + Cloudflare Worker (CV) | B5/B6 |
| Animations | GSAP + ScrollTrigger + Lenis | B7/B8 |
| Transitions | Astro View Transitions | B9 |
| i18n | Astro i18n (FR par défaut, EN miroir) | B10 |
| Analytics | Cloudflare Web Analytics + GA4 (consenti) | B11/B12 |
| Typographie | Fraunces + Inter (variables, self-hosted) | C4/C5/C6 |



## Démarrage rapide

```bash
# Installer les dépendances (Node ≥ 20)
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Vérification TypeScript
npm run check
```

---

## Arborescence

```
gss-congo/
├── astro.config.mjs              # config Astro (i18n, intégrations, Vite)
├── package.json                  # dépendances + scripts
├── tsconfig.json                 # alias @/, @components/, etc.
├── public/
│   └── _redirects                # redirections Cloudflare Pages (cf docs/research/redirect-map.md)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # wrapper global (head, fonts, transitions, skip-link, grain)
│   ├── pages/
│   │   ├── index.astro           # racine /, redirige vers /fr/
│   │   ├── fr/
│   │   │   └── index.astro       # accueil français
│   │   └── en/                   # accueil anglais (Phase 4)
│   └── styles/
│       └── app.css               # tokens @theme + globals (mirror design/BRAND.md)
├── design/
│   └── BRAND.md                  # tokens design (palette logo-derived bronze + blue)
└── docs/
    ├── EXECUTION_PLAN.md         # plan maître du projet
    ├── decisions/                # journal des décisions
    ├── client-comms/             # email + agenda + tracker clarifications
    └── research/                 # teardown concurrentiel + redirect map
```

---

## Conventions

- **Tokens design** déclarés dans `src/styles/app.css` sous `@theme {}` — Tailwind v4 les transforme automatiquement en utilitaires (`bg-ink`, `text-bronze`, etc.).
- **Composants Astro** sans JS sauf îlots interactifs (formulaires, mega-menu, switch langue).
- **Accessibilité** WCAG 2.2 AA — focus rings bronze, skip-link, semantic HTML, prefers-reduced-motion respecté.
- **Performance** Lighthouse > 95 par page, LCP < 1.8s, page d'accueil < 700 KB.
- **Pas d'emoji**, pas de `console.log`, pas de commentaires expliquant *quoi* (le code dit quoi) — uniquement *pourquoi* quand non-évident.

---



---


---

*Build par telic. studio — © GSS Congo 2026*
