/**
 * GSS Congo — FAQ items.
 *
 * Two categories:
 *   - faqItems          : general / services questions (response time, billing…)
 *   - careersFaqItems   : recruit-funnel questions (cohorts, salary, training…)
 *
 * Both are rendered on the dedicated /faq/ page with section anchors
 * (#services, #careers). faqItems is also reused by the Faq.astro
 * component on the contact page and by faqPageSchema() JSON-LD.
 */

export interface FaqItem {
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

export const faqItems: FaqItem[] = [
  {
    q: {
      fr: 'Quel est votre délai d’intervention ?',
      en: 'What is your response time?',
    },
    a: {
      fr: 'Moins de 20 minutes en moyenne sur Kinshasa, inscrit au contrat. Le délai est mesuré, audité, et figure au reporting hebdomadaire, pas seulement dans une plaquette.',
      en: 'Under 20 minutes on average in Kinshasa, written into the contract. The delay is measured, audited, and appears in our weekly reporting, not only in a brochure.',
    },
  },
  {
    q: {
      fr: 'Couvrez-vous toute la RDC ou uniquement Kinshasa ?',
      en: 'Do you cover all of DRC or only Kinshasa?',
    },
    a: {
      fr: 'Notre dispositif principal est à Kinshasa, où nous sommes établis depuis 2014. Des interventions en province sont possibles sur projet, après audit logistique. Demandez-nous une étude.',
      en: 'Our primary deployment is in Kinshasa, where we have been established since 2014. Provincial interventions are possible on a project basis, after a logistical audit. Ask us for a study.',
    },
  },
  {
    q: {
      fr: 'Vos agents sont-ils formés en interne ?',
      en: 'Are your agents trained in-house?',
    },
    a: {
      fr: 'Oui. Notre centre de formation, à Kinshasa, calibre chaque agent au contexte congolais avant déploiement. Pas d’intérim importé, pas de standard générique.',
      en: 'Yes. Our training centre, in Kinshasa, calibrates every agent to the Congolese context before deployment. No imported staffing, no generic standard.',
    },
  },
  {
    q: {
      fr: 'Combien de temps prend la mise en service ?',
      en: 'How long does deployment take?',
    },
    a: {
      fr: 'Audit et plan, sous une semaine. Déploiement opérationnel, 48 heures après signature. Les ajustements de terrain sont absorbés sans rupture de service.',
      en: 'Audit and plan, within one week. Operational deployment, 48 hours after sign-off. Ground-level adjustments are absorbed without service interruption.',
    },
  },
  {
    q: {
      fr: 'Comment se passe la facturation ?',
      en: 'How is billing handled?',
    },
    a: {
      fr: 'Mensualité contractuelle, calibrée au dispositif (effectifs, postures, équipements). Aucun frais caché. Audit financier disponible sur demande pour les contrats institutionnels.',
      en: 'Contractual monthly fee, calibrated to the posture (headcount, equipment, rotations). No hidden costs. Financial audit available on request for institutional contracts.',
    },
  },
];

export const careersFaqItems: FaqItem[] = [
  {
    q: {
      fr: 'Quand ouvre la prochaine cohorte ?',
      en: 'When does the next cohort open?',
    },
    a: {
      fr: 'Nos promotions ouvrent par cycles, en lien avec le centre de formation. Envoyez votre dossier — nous vous indiquons la prochaine fenêtre sous 7 jours ouvrés.',
      en: 'Our cohorts open in cycles, in lock-step with the training centre. Send your application — we get back to you within 7 working days with the next window.',
    },
  },
  {
    q: {
      fr: 'Faut-il une expérience préalable ?',
      en: 'Do I need prior experience?',
    },
    a: {
      fr: 'Non. Notre centre de formation prépare des candidats sans expérience préalable. L’intégrité et la rigueur priment sur l’historique.',
      en: 'No. Our training centre prepares candidates with no prior experience. Integrity and rigour matter more than résumé length.',
    },
  },
  {
    q: {
      fr: 'La formation est-elle payante ?',
      en: 'Is the training paid?',
    },
    a: {
      fr: 'La formation interne, dispensée avant déploiement, est prise en charge par GSS pour les candidats retenus en cohorte.',
      en: 'In-house training, delivered before deployment, is covered by GSS for candidates selected into a cohort.',
    },
  },
  {
    q: {
      fr: 'Quel est le salaire de départ ?',
      en: 'What is the starting salary?',
    },
    a: {
      fr: 'Le salaire varie selon le poste, la zone et la rotation. Il est communiqué à l’entretien — au-dessus du minimum sectoriel du gardiennage en RDC.',
      en: 'Salary depends on the role, zone and rotation. It is shared at interview — above the DRC guarding sector minimum.',
    },
  },
];
