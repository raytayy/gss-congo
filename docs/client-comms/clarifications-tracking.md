# Clarifications tracker — GSS Congo

> **Source :** Cahier des charges signé 2026-05-01, §13 *« Points à clarifier avec le client »*
> **Email envoyé :** `docs/client-comms/email-01-recap-clarifications.md` — date d'envoi à inscrire ci-dessous
> **Appel 01 :** `docs/client-comms/call-01-agenda.md`
> **Mise à jour :** après chaque réponse de Bechir (mail, appel, WhatsApp). Toujours dater l'entrée.

---

## Résumé statut

| Statut | Symbole | Signification |
|---|---|---|
| Ouvert | 🔴 | Pas de réponse client |
| Proposition envoyée | 🟡 | Vous avez proposé une valeur par défaut, en attente de validation |
| Réponse reçue | 🟢 | Réponse client claire, à reporter dans le code/design |
| Verrouillé | ✅ | Décision figée, reportée dans `decisions-log.md` et `BRAND.md` |

**Email envoyé à Bechir le :** _____________ (à remplir)
**Date butoir réponses écrites :** 2026-05-04 (lundi EOD)
**Date butoir verrouillage total :** 2026-05-06 (post-call)

---

## Tableau de suivi

### Bloc — Identité de marque

| # | Question | Statut | Proposition / Réponse | Date | Notes |
|---|---|---|---|---|---|
| 1 | Slogan officiel | 🟡 | *« La sécurité, exercée comme un métier. »* (proposition) | 2026-05-01 | À valider en appel |
| 2 | Couleur bleue exacte | 🟡 | `#0A1628` (bleu nuit institutionnel) | 2026-05-01 | À valider visuellement en appel |
| 3 | Accroche de visite (Q2.2 du CdC) | 🔴 | — | — | Décide la hiérarchie des CTA |

### Bloc — Coordonnées

| # | Question | Statut | Réponse | Date | Notes |
|---|---|---|---|---|---|
| 4 | Adresse exacte du siège | ✅ | Infinity Centre, 5ème étage, Avenue du 24 novembre, Gombe, Kinshasa | 2026-05-17 | Locked via GBP registration. Reflected in `src/lib/contact.ts` + `localBusinessSchema()`. |
| 5 | Numéros de téléphone du siège | ✅ | Primary : **+243 999 880 588** (GBP-registered). 3 alts conservés pour l'instant (à arbitrer plus tard avec Bechir). | 2026-05-17 | WhatsApp aligné sur le primaire — à confirmer si ligne dédiée différente. |
| 6 | Numéros du centre de formation | 🔴 | — | — | Vérifier si toujours actifs |
| 7 | Adresse complète du centre de formation | 🔴 | — | — | Compléter avenue + numéro |

### Bloc — Contenus

| # | Question | Statut | Réponse | Date | Notes |
|---|---|---|---|---|---|
| 8 | Top 3 services à mettre en avant | 🟡 | Gardiennage, Résidentielle, Industrielle (proposition) | 2026-05-01 | Cahier des charges suggère ce top 3 |
| 9 | Sujets blog d'inauguration | 🟡 | 3 sujets proposés dans le plan | 2026-05-01 | Voir EXECUTION_PLAN §7 Phase 5 |
| 10 | Liste exhaustive formations | 🔴 | — | — | Bloque la page Centre de formation |
| 11 | Chiffres clés supplémentaires | 🔴 | — | — | Au-delà de 300 agents / 11 ans |

### Bloc — Preuve sociale

| # | Question | Statut | Réponse | Date | Notes |
|---|---|---|---|---|---|
| 12 | Logos clients à afficher (avec accord) | 🔴 | — | — | Si pas d'accord : bande sectorielle de fallback |
| 13 | URL exactes IG + FB + activité | 🟡 | URLs confirmées : `https://www.facebook.com/gsskinshasa/` + `https://www.instagram.com/gsskinshasa/` (déjà câblées dans `contact.ts`). | 2026-05-17 | Manque : statut compte IG (Business/Creator ?) et tokens Graph API pour le live feed — cf. checklist Meta. |

### Bloc — SEO / Accès Google

| # | Question | Statut | Réponse | Date | Notes |
|---|---|---|---|---|---|
| 14 | Comptes Google existants (GBP / GA / GSC) | 🟡 | **GBP créé par Bechir le 2026-05-17, vérification postale en cours (~5 jours).** GA4 et Search Console : compte admin email confirmé, propriétés à créer/lier après réception du code postal. | 2026-05-17 | NAP figé pour cohérence (cf. #4 + #5). À l'arrivée du code postal : récupérer URL Google Maps + ajouter à `sameAs` JSON-LD. |
| 15 | Workshop mots-clés SEO — modalité | 🔴 | — | — | Visio ou échange écrit ? Date à fixer |

---

## Décision photographie (annexe — point critique)

| Champ | Valeur |
|---|---|
| Statut | 🔴 ouvert |
| Décision | (A shooting / B curation / C illustration) |
| Date de décision | — |
| Si A : photographe | — |
| Si A : date du shoot | — (deadline absolue : **2026-05-15**) |
| Si A : budget engagé | — |
| Si B : volume images existantes | — |

---

## Comment utiliser ce tracker

1. **Avant chaque interaction client** : relire ce fichier pour savoir ce qui est encore ouvert.
2. **Pendant l'appel / en lisant un mail Bechir** : noter en direct dans la colonne *Réponse*. Mettre à jour le statut.
3. **Après une décision figée** : passer en ✅ et reporter dans `decisions-log.md` (qui devient la source de vérité pour le design + le code).
4. **À la fin de la phase 1 (2026-05-04)** : tout doit être 🟢 ou ✅. Sinon, escalader avec un mail relance.

---

## Plan de relance si pas de réponse

| Délai sans nouvelle | Action |
|---|---|
| 48 h après envoi mail (jeudi 3 mai matin) | WhatsApp court, amical : *« Bonjour, juste un petit rappel pour le mail d'hier — on en parle en appel cette semaine ? »* |
| 72 h | Appel téléphonique direct |
| 96 h | Mail formel reprenant les conséquences sur le planning : *« Sans vos réponses d'ici demain, la livraison du 3 juin devient compromise. »* |

---
