/**
 * GSS Congo — FAQ items.
 * Single source of truth for the Faq.astro component AND the FAQPage
 * schema.org JSON-LD emitted on pages that mount the Faq component.
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
      fr: 'Moins de vingt minutes en moyenne sur Kinshasa, inscrit au contrat. Le délai est mesuré, audité, et figure au reporting hebdomadaire, pas seulement dans une plaquette.',
      en: 'Under twenty minutes on average in Kinshasa, written into the contract. The delay is measured, audited, and appears in our weekly reporting, not only in a brochure.',
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
