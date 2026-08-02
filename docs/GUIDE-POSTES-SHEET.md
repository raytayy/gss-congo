# Postes carrières — pilotés par Google Sheet

Bechir édite un Google Sheet → la page `/fr/carrieres/` (et `/en/careers/`)
se met à jour automatiquement. Aucun code à toucher.

## Comment ça marche

```
Google Sheet (Bechir) → publié en CSV → Vercel build lit le CSV
     └── Apps Script "onChange" → ping le Deploy Hook → rebuild auto
```

Le site reste 100 % statique. Si le Sheet est vide, cassé ou injoignable,
le build garde la liste de postes intégrée au code (aucun risque de page vide).

## Mise en place (une seule fois, ~10 min)

### 1. Créer le Sheet
1. [sheets.google.com](https://sheets.google.com) → nouveau classeur « GSS — Postes carrières »
2. Fichier → Importer → Importer un fichier → `docs/postes-carrieres-template.csv`
   (remplacer la feuille). Les 6 postes actuels sont préremplis.
3. Partager le Sheet avec Bechir (éditeur).

### 2. Publier en CSV
1. Fichier → Partager → **Publier sur le web**
2. Choisir : la feuille (pas « document entier ») + format **CSV** → Publier
3. Copier l'URL (`https://docs.google.com/spreadsheets/d/e/…/pub?output=csv`)

### 3. Brancher Vercel
1. Vercel → projet gss-congo → Settings → **Environment Variables**
   - Nom : `JOBS_SHEET_CSV_URL` — Valeur : l'URL copiée — Env : Production + Preview
2. Settings → Git → **Deploy Hooks** → Create Hook
   - Nom : `sheet-postes`, branche : `main` → copier l'URL du hook

### 4. Rebuild automatique à chaque modification
Dans le Sheet : Extensions → **Apps Script**, coller, puis Enregistrer :

```js
const DEPLOY_HOOK = 'https://api.vercel.com/v1/integrations/deploy/…'; // URL du hook (étape 3.2)

function pingVercel() {
  UrlFetchApp.fetch(DEPLOY_HOOK, { method: 'post' });
}
```

Puis à gauche : Déclencheurs (icône réveil) → Ajouter un déclencheur →
fonction `pingVercel`, source « Depuis la feuille de calcul », type
« Lors d'une modification ». Autoriser le script quand Google le demande.

> Sans cette étape, le site se met à jour au prochain déploiement quel
> qu'il soit (push Git, redeploy manuel) — le hook rend juste ça instantané.

## Règles d'édition pour Bechir

| Colonne | Rôle |
|---|---|
| `actif` | `OUI` = affiché, `NON` = masqué (sans supprimer la ligne) |
| `code` | Référence courte unique (ex. `AGT-01`) |
| `statut` | `OUVERT` · `PROCHAINE COHORTE` · `LISTE D'ATTENTE` |
| `titre_fr` / `titre_en` | Intitulé du poste |
| `description_fr` / `description_en` | 1-2 phrases |
| `type_fr` / `type_en` | Ex. `CDI · cohorte` |

- Ajouter un poste = ajouter une ligne. Retirer = `actif` → `NON`.
- Une ligne sans `code`, `statut` ou `titre_fr` valide est ignorée (les autres restent).
- Si `titre_en`/`description_en` sont vides, le FR est réutilisé côté EN.
- Après modification : le site se reconstruit en ~1-2 min.

## Côté code

- Fetch + parsing + fallback : `src/lib/jobs.ts`
- Consommé par : `src/pages/fr/carrieres/index.astro`, `src/pages/en/careers/index.astro`
- Test local : `JOBS_SHEET_CSV_URL=<url> npm run build`
