/**
 * GSS Congo — i18n helpers.
 * - Nav + UI labels in FR/EN
 * - Locale URL pair mapping (for hreflang and lang switch)
 *
 * Slug translation table mirrors src/lib/services.ts (services have their own
 * slugs per locale). For non-service pages we use a small dictionary here.
 */

import type { Locale, LocalisedString } from './services';

export type { Locale, LocalisedString };

export const locales = ['fr', 'en'] as const satisfies readonly Locale[];

export const defaultLocale: Locale = 'fr';

/**
 * UI strings used across components. Keep keys flat and short.
 */
export const ui = {
  nav: {
    services: { fr: 'Services', en: 'Services' },
    about: { fr: 'À propos', en: 'About' },
    formation: { fr: 'Formation', en: 'Training' },
    careers: { fr: 'Carrières', en: 'Careers' },
    news: { fr: 'Actualités', en: 'News' },
    contact: { fr: 'Contact', en: 'Contact' },
  },
  cta: {
    quote: { fr: 'Demander un devis', en: 'Request a quote' },
    quoteShort: { fr: 'Devis', en: 'Quote' },
    discoverServices: { fr: 'Découvrir nos services', en: 'Explore our services' },
    call: { fr: 'Appeler', en: 'Call' },
    whatsapp: { fr: 'WhatsApp', en: 'WhatsApp' },
  },
  footer: {
    services: { fr: 'Nos services', en: 'Our services' },
    company: { fr: 'L\'entreprise', en: 'Company' },
    coordinates: { fr: 'Nous joindre', en: 'Get in touch' },
    legal: { fr: 'Mentions légales', en: 'Legal notice' },
    privacy: { fr: 'Confidentialité', en: 'Privacy' },
    cookies: { fr: 'Cookies', en: 'Cookies' },
    hq: { fr: 'Siège', en: 'Headquarters' },
    trainingCenter: { fr: 'Centre de formation', en: 'Training centre' },
    hours: { fr: 'Horaires', en: 'Hours' },
    rights: {
      fr: 'Tous droits réservés.',
      en: 'All rights reserved.',
    },
    builtBy: { fr: 'Site par', en: 'Site by' },
  },
  a11y: {
    skipToContent: { fr: 'Aller au contenu principal', en: 'Skip to main content' },
    openMenu: { fr: 'Ouvrir le menu', en: 'Open menu' },
    closeMenu: { fr: 'Fermer le menu', en: 'Close menu' },
    languageSwitch: { fr: 'Changer de langue', en: 'Switch language' },
  },
  language: {
    fr: { fr: 'Français', en: 'French' },
    en: { fr: 'Anglais', en: 'English' },
  },
} satisfies Record<string, Record<string, LocalisedString>>;

/**
 * Path translations for non-service pages.
 * Service pages translate via src/lib/services.ts.
 */
const pathSegments: Record<string, LocalisedString> = {
  services: { fr: 'services', en: 'services' },
  'a-propos': { fr: 'a-propos', en: 'about' },
  about: { fr: 'a-propos', en: 'about' },
  'centre-de-formation': {
    fr: 'centre-de-formation',
    en: 'training-centre',
  },
  'training-centre': {
    fr: 'centre-de-formation',
    en: 'training-centre',
  },
  galerie: { fr: 'galerie', en: 'gallery' },
  gallery: { fr: 'galerie', en: 'gallery' },
  temoignages: { fr: 'temoignages', en: 'testimonials' },
  testimonials: { fr: 'temoignages', en: 'testimonials' },
  carrieres: { fr: 'carrieres', en: 'careers' },
  careers: { fr: 'carrieres', en: 'careers' },
  postuler: { fr: 'postuler', en: 'apply' },
  apply: { fr: 'postuler', en: 'apply' },
  actualites: { fr: 'actualites', en: 'news' },
  news: { fr: 'actualites', en: 'news' },
  contact: { fr: 'contact', en: 'contact' },
  inscription: { fr: 'inscription', en: 'enrol' },
  enrol: { fr: 'inscription', en: 'enrol' },
  'mentions-legales': {
    fr: 'mentions-legales',
    en: 'legal-notice',
  },
  'legal-notice': {
    fr: 'mentions-legales',
    en: 'legal-notice',
  },
  'politique-confidentialite': {
    fr: 'politique-confidentialite',
    en: 'privacy-policy',
  },
  'privacy-policy': {
    fr: 'politique-confidentialite',
    en: 'privacy-policy',
  },
  'politique-cookies': {
    fr: 'politique-cookies',
    en: 'cookies-policy',
  },
  'cookies-policy': {
    fr: 'politique-cookies',
    en: 'cookies-policy',
  },
};

/**
 * Convert a path in one locale to its sibling path in the other locale.
 * Falls back to the locale's homepage if the segment isn't translatable.
 *
 * Note: service detail slugs are NOT handled here — pages that display services
 * should compute the alt URL from src/lib/services.ts directly.
 *
 * @example
 *   getAltLocaleHref('/fr/a-propos/', 'fr') // → '/en/about/'
 *   getAltLocaleHref('/en/services/', 'en') // → '/fr/services/'
 */
export function getAltLocaleHref(currentPath: string, currentLocale: Locale): string {
  const altLocale: Locale = currentLocale === 'fr' ? 'en' : 'fr';
  const trimmed = currentPath.replace(/^\/+|\/+$/g, '');
  const parts = trimmed.split('/').filter(Boolean);

  // Drop the leading locale segment if present.
  if (parts[0] === currentLocale) parts.shift();

  if (parts.length === 0) {
    return `/${altLocale}/`;
  }

  const translated = parts.map((seg) => pathSegments[seg]?.[altLocale] ?? seg);
  return `/${altLocale}/${translated.join('/')}/`;
}

/** Resolve a UI label for the given locale. */
export function t(label: LocalisedString, locale: Locale): string {
  return label[locale];
}
