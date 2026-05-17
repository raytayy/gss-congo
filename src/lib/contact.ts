/**
 * GSS Congo — Contact data.
 * Public business information used in Header, Footer, MobileActionBar, Contact page.
 *
 * ⚠️ PLACEHOLDER VALUES until Bechir confirms clarifications #4 to #7
 * (see docs/client-comms/clarifications-tracking.md).
 * Replace before production launch (Phase 7).
 */

export const contact = {
  phones: {
    /** Primary number to display in header + bottom of CTAs. */
    primary: {
      display: '+243 99 666 6699',
      tel: '+243996666699',
      label: 'Standard',
    },
    /** Additional numbers shown in footer. From the legacy site — verify. */
    alt: [
      { display: '+243 972 125 400', tel: '+243972125400' },
      { display: '+243 900 049 360', tel: '+243900049360' },
      { display: '+243 999 880 588', tel: '+243999880588' },
    ],
    /** Centre de formation. */
    training: [
      { display: '+243 999 922 429', tel: '+243999922429' },
      { display: '+243 825 150 807', tel: '+243825150807' },
    ],
  },

  whatsapp: {
    number: '+243996666699',
    link: 'https://wa.me/243996666699',
    presetMessage:
      'Bonjour GSS, je vous contacte depuis votre site internet. Je souhaite obtenir un devis pour…',
  },

  addresses: {
    hq: {
      street: 'Avenue du 24 novembre',
      detail: 'Infinity Centre, 5ème étage',
      city: 'Kinshasa',
      country: 'République Démocratique du Congo',
      countryCode: 'CD',
      mapsUrl: 'https://maps.google.com/?q=Infinity+Centre+Avenue+du+24+novembre+Kinshasa',
    },
    training: {
      street: 'Carrefour des Jeunes',
      detail: 'Victoire',
      city: 'Kinshasa',
      country: 'République Démocratique du Congo',
      countryCode: 'CD',
      mapsUrl: 'https://maps.google.com/?q=Carrefour+des+Jeunes+Victoire+Kinshasa',
    },
  },

  hours: {
    fr: '24 h / 24 — 7 jours / 7',
    en: '24 hours, 7 days a week',
  },

  email: 'contact@gss-congo.com', // ⚠️ verify with Bechir

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
