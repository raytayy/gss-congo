/**
 * GSS Congo — Contact data.
 * Public business information used in Header, Footer, MobileActionBar, Contact page.
 *
 * Phone + address locked to match the Google Business Profile registered
 * by Bechir on 2026-05-17 (waiting for postal verification). NAP must stay
 * consistent across GBP + JSON-LD + visible site content — any divergence
 * weakens the local-pack ranking signal.
 */

export const contact = {
  phones: {
    /** Primary number — locked by GBP registration 2026-05-17. */
    primary: {
      display: '+243 996 666 699',
      tel: '+243996666699',
      label: 'Standard',
    },
    /** Additional numbers from the legacy site. Status: see CDC §13 #3 — keep
       until Bechir confirms which to retire. */
    alt: [
      { display: '+243 972 125 400', tel: '+243972125400' },
      { display: '+243 900 049 360', tel: '+243900049360' },
    ],
    /** Centre de formation. */
    /** Centre de formation — single official line. */
    training: [
      { display: '+243 825 150 807', tel: '+243825150807' },
    ],
  },

  whatsapp: {
    /** Bound to the same line as `phones.primary` by default. If GSS has a
       dedicated WhatsApp Business number on a different line, override here. */
    number: '+243996666699',
    link: 'https://wa.me/243996666699',
    presetMessage:
      'Bonjour GSS, je vous contacte depuis votre site gss-congo.com. Je souhaite obtenir un devis. Merci de me recontacter.',
  },

  addresses: {
    hq: {
      /** Includes the commune (Gombe) to match GBP-registered address. */
      street: 'Avenue du 24 novembre, Gombe',
      detail: 'Infinity Center, 5ème étage',
      city: 'Kinshasa',
      country: 'République Démocratique du Congo',
      countryCode: 'CD',
      mapsUrl: 'https://maps.google.com/?q=Infinity+Center+Avenue+du+24+novembre+Gombe+Kinshasa',
    },
    training: {
      street: '5151, avenue Kasavubu',
      detail: 'Kalamu — Réf. carrefour de jeunes',
      city: 'Kinshasa',
      country: 'République Démocratique du Congo',
      countryCode: 'CD',
      mapsUrl: 'https://maps.google.com/?q=5151+avenue+Kasavubu+Kalamu+Kinshasa',
    },
  },

  hours: {
    fr: '24 h / 24 — 7 jours / 7',
    en: '24 hours, 7 days a week',
  },

  /** Primary public inbox — used in JSON-LD and legal pages. */
  email: 'info@gss-congo.com',
  /** All public inboxes, in display order — contact page + footer list these. */
  emails: ['info@gss-congo.com', 'dop@gss-congo.com'],

  social: {
    facebook: 'https://www.facebook.com/gsskinshasa/',
    instagram: 'https://www.instagram.com/gsskinshasa/',
  },

  legal: {
    rccm: 'CD/KIN/RCCM/14-B-5645',
    idnat: '01-83-189525D',
    taxId: 'A150011U',
    foundedYear: 2014,
    employeeCount: 300,
  },
};

/** Helper: build a `tel:` URI safely from a phone object. */
export function telLink(phone: { tel: string }): string {
  return `tel:${phone.tel}`;
}

/** Helper: build the WhatsApp link with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const msg = message ?? contact.whatsapp.presetMessage;
  return `https://wa.me/${contact.whatsapp.number.replace('+', '')}?text=${encodeURIComponent(msg)}`;
}
