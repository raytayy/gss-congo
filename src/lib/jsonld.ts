/**
 * GSS Congo — JSON-LD schema builders.
 * Each helper returns a plain JSON-serialisable object meant to be
 * embedded in a <script type="application/ld+json"> tag.
 *
 * Schema choices:
 *   - LocalBusiness + SecurityService (multi-type) for the org/global block.
 *     SecurityService is a defined schema.org subtype of LocalBusiness.
 *   - Service for each service detail page, referencing the org via @id.
 *   - NewsArticle for each news detail page.
 *   - BreadcrumbList for any nested route.
 *
 * Absolute URLs are required by schema.org consumers; helpers take a
 * `siteUrl` parameter (typically derived from Astro.site).
 */

import { contact } from './contact';
import { services, type Service, getServiceUrl } from './services';
import type { Article } from './news';
import { faqItems, careersFaqItems, type FaqItem } from './faq';

export type Locale = 'fr' | 'en';

/** Stable @id for the organisation, used to cross-link schemas. */
export const ORG_ID = 'https://gss-congo.com/#organization';

/** Build an absolute URL from a relative path. Trims trailing slash on origin. */
function abs(siteUrl: string, path: string): string {
  const origin = siteUrl.replace(/\/+$/, '');
  const tail = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${tail}`;
}

/** Locale → BCP-47 tag GSS uses (DRC region). */
function bcp47(locale: Locale): string {
  return locale === 'fr' ? 'fr-CD' : 'en-CD';
}

// ─── ORGANISATION / LOCAL BUSINESS ─────────────────────────────

export function localBusinessSchema(locale: Locale, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SecurityService'],
    '@id': ORG_ID,
    name: 'Guarde Security Services',
    alternateName: 'GSS Congo',
    legalName: 'Guarde Security Services SARL',
    url: abs(siteUrl, '/'),
    logo: abs(siteUrl, '/images/logo.png'),
    image: abs(siteUrl, '/images/logo.png'),
    description:
      locale === 'fr'
        ? 'Sécurité privée à Kinshasa depuis 2014 — gardiennage, intervention, sécurité résidentielle, industrielle, escorte, supervision vidéo, formation.'
        : 'Private security in Kinshasa since 2014 — guarding, intervention, residential and industrial security, escort, video supervision, training.',
    telephone: contact.phones.primary.display,
    email: contact.email,
    foundingDate: String(contact.legal.foundedYear),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: contact.legal.employeeCount,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.addresses.hq.detail}, ${contact.addresses.hq.street}`,
      addressLocality: contact.addresses.hq.city,
      addressRegion: 'Kinshasa',
      addressCountry: 'CD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -4.3217,
      longitude: 15.3125,
    },
    areaServed: {
      '@type': 'City',
      name: 'Kinshasa',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    identifier: [
      { '@type': 'PropertyValue', name: 'RCCM', value: contact.legal.rccm },
      { '@type': 'PropertyValue', name: 'IDNAT', value: contact.legal.idnat },
      { '@type': 'PropertyValue', name: 'Tax ID', value: contact.legal.taxId },
    ],
    sameAs: [contact.social.facebook, contact.social.instagram].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Services de sécurité' : 'Security services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name[locale],
          description: s.blurb[locale],
          url: abs(siteUrl, getServiceUrl(s, locale)),
        },
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phones.primary.display,
      contactType: 'sales',
      email: contact.email,
      areaServed: 'CD',
      availableLanguage: ['fr', 'en'],
    },
  };
}

// ─── SERVICE (per detail page) ─────────────────────────────────

export function serviceSchema(service: Service, locale: Locale, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name[locale],
    description: service.intro?.[locale] ?? service.blurb[locale],
    serviceType: locale === 'fr' ? 'Sécurité privée' : 'Private security',
    image: abs(siteUrl, service.image),
    url: abs(siteUrl, getServiceUrl(service, locale)),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Kinshasa' },
    audience: service.audience
      ? { '@type': 'Audience', audienceType: service.audience[locale] }
      : undefined,
    inLanguage: bcp47(locale),
  };
}

// ─── ARTICLE (per news detail page) ────────────────────────────

export function articleSchema(article: Article, locale: Locale, siteUrl: string, pagePath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title[locale],
    description: article.excerpt[locale],
    image: [abs(siteUrl, article.image)],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@id': ORG_ID, '@type': 'Organization', name: 'Guarde Security Services' },
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: 'Guarde Security Services' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': abs(siteUrl, pagePath),
    },
    inLanguage: bcp47(locale),
  };
}

// ─── FAQ PAGE ──────────────────────────────────────────────────

/**
 * Emit a Schema.org FAQPage for pages that mount the Faq component.
 * Mirrors `lib/faq.ts` items so the schema is always in sync with the
 * rendered accordion. Covered by Premium contract §12.1 row
 * "Schema.org étendu : LocalBusiness + Service + FAQ + Review".
 */
export function faqPageSchema(locale: Locale, items: FaqItem[] = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: bcp47(locale),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[locale],
      },
    })),
  };
}

/** Convenience: schema for the dedicated /faq/ page covering both categories. */
export function combinedFaqPageSchema(locale: Locale) {
  return faqPageSchema(locale, [...faqItems, ...careersFaqItems]);
}

// ─── WEBSITE ───────────────────────────────────────────────────

/**
 * Emit a Schema.org WebSite for the homepage. No `potentialAction`
 * because the site has no internal search feature — declaring one
 * would lie about a capability that doesn't exist.
 */
export function webSiteSchema(locale: Locale, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs(siteUrl, '/#website'),
    url: abs(siteUrl, '/'),
    name: 'GSS Congo',
    alternateName: 'Guarde Security Services',
    publisher: { '@id': ORG_ID },
    inLanguage: bcp47(locale),
    description:
      locale === 'fr'
        ? 'Site institutionnel de Guarde Security Services à Kinshasa — sécurité privée, gardiennage, formation.'
        : 'Institutional site of Guarde Security Services in Kinshasa — private security, guarding, training.',
  };
}

// ─── EDUCATIONAL ORGANIZATION (Centre de formation) ────────────

/**
 * Emit an EducationalOrganization for /centre-de-formation/ that
 * lists the 5 in-house programmes via an OfferCatalog of Course
 * entries. No `hasCourseInstance` because we don't yet have firm
 * upcoming session dates — adding fake dates would invalidate Rich
 * Results and lie about the schedule. Add real instances when client
 * confirms cohort calendar.
 *
 * Address mirrors `contact.addresses.training` (Carrefour des Jeunes,
 * Victoire, Kinshasa).
 */
export function educationalOrgSchema(locale: Locale, siteUrl: string) {
  const trainingPath = locale === 'fr' ? '/fr/centre-de-formation/' : '/en/training-centre/';

  const programmes = [
    {
      name: { fr: 'Agent de prévention et de sécurité', en: 'Prevention and security agent' },
      description: {
        fr: 'Tronc commun. Cadre légal, gestion d’accès, posture, communication radio, gestion de conflit.',
        en: 'Common core. Legal framework, access control, posture, radio communication, conflict management.',
      },
    },
    {
      name: { fr: 'Sécurité incendie & premiers secours', en: 'Fire safety & first aid' },
      description: {
        fr: 'Modules type SSIAP : prévention incendie, évacuation, manipulation des extincteurs, gestes qui sauvent.',
        en: 'SSIAP-style modules: fire prevention, evacuation, extinguisher handling, life-saving gestures.',
      },
    },
    {
      name: { fr: 'Cynophile & maître-chien', en: 'Canine handler & K9' },
      description: {
        fr: 'Travail en binôme avec chien d’intervention : dressage, commandement, lecture comportementale, dissuasion encadrée.',
        en: 'Paired work with a response dog: training, commands, behavioural reading, supervised deterrence.',
      },
    },
    {
      name: { fr: 'Conduite défensive & escorte', en: 'Defensive driving & escort' },
      description: {
        fr: 'Étude d’itinéraire, anticipation, conduite sous pression, coordination en convoi, posture en cas d’incident.',
        en: 'Route study, anticipation, driving under pressure, convoy coordination, posture in incidents.',
      },
    },
    {
      name: { fr: 'Protocole & sécurité d’élite', en: 'Protocol & elite security' },
      description: {
        fr: 'Tenue civile, étiquette diplomatique, oreillette discrète, lecture de salle, déplacements VIP.',
        en: 'Civilian dress, diplomatic etiquette, discreet earpiece, room reading, VIP movements.',
      },
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': abs(siteUrl, '/#training-centre'),
    name: locale === 'fr' ? 'Centre de formation GSS Congo' : 'GSS Congo Training Centre',
    url: abs(siteUrl, trainingPath),
    parentOrganization: { '@id': ORG_ID },
    description:
      locale === 'fr'
        ? "École interne de Guarde Security Services à Kinshasa. Cinq cursus, un même standard : agent de prévention/sécurité, sécurité incendie et premiers secours, cynologie, conduite défensive, protocole VIP."
        : 'In-house school of Guarde Security Services in Kinshasa. Five programmes, one standard: prevention/security agent, fire safety and first aid, canine, defensive driving, VIP protocol.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addresses.training.street,
      addressLocality: contact.addresses.training.city,
      addressRegion: 'Kinshasa',
      addressCountry: 'CD',
    },
    telephone: contact.phones.training[0]?.display,
    areaServed: { '@type': 'Country', name: 'République Démocratique du Congo' },
    inLanguage: bcp47(locale),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Cursus de formation' : 'Training programmes',
      itemListElement: programmes.map((p) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: p.name[locale],
          description: p.description[locale],
          provider: { '@id': abs(siteUrl, '/#training-centre') },
          inLanguage: bcp47(locale),
        },
      })),
    },
  };
}

// ─── COLLECTION / ABOUT / CONTACT / GALLERY / COURSE ───────────

/**
 * CollectionPage — for index pages that list a collection of items
 * (services index, news index, gallery index, etc.). The page itself
 * acts as a discovery hub for the items rendered below it; the actual
 * item schemas (Service, NewsArticle, ImageObject…) are emitted by
 * each listed item where appropriate.
 */
export function collectionPageSchema(
  locale: Locale,
  siteUrl: string,
  pagePath: string,
  name: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': abs(siteUrl, pagePath) + '#webpage',
    url: abs(siteUrl, pagePath),
    name,
    description,
    inLanguage: bcp47(locale),
    isPartOf: { '@id': abs(siteUrl, '/#website') },
    about: { '@id': ORG_ID },
  };
}

/**
 * Course — for individual training programmes under the training
 * centre. No `hasCourseInstance` until the client confirms a cohort
 * schedule; emitting fake dates would invalidate Rich Results.
 *
 * `provider` defaults to a reference to the organisation. Callers may
 * pass a custom provider name (e.g. the in-house training centre) to
 * override.
 */
export function courseSchema(
  locale: Locale,
  siteUrl: string,
  name: string,
  description: string,
  courseCode: string,
  provider?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': abs(siteUrl, `/#course-${courseCode}`),
    name,
    description,
    courseCode,
    provider: provider
      ? {
          '@type': 'Organization',
          name: provider,
          sameAs: abs(siteUrl, '/'),
        }
      : { '@id': ORG_ID },
    inLanguage: bcp47(locale),
  };
}

/** AboutPage — for /a-propos/ and /en/about/. */
export function aboutPageSchema(
  locale: Locale,
  siteUrl: string,
  pagePath: string,
  name: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': abs(siteUrl, pagePath) + '#webpage',
    url: abs(siteUrl, pagePath),
    name,
    description,
    inLanguage: bcp47(locale),
    isPartOf: { '@id': abs(siteUrl, '/#website') },
    mainEntity: { '@id': ORG_ID },
  };
}

/** ContactPage — for /contact/ in both locales. */
export function contactPageSchema(
  locale: Locale,
  siteUrl: string,
  pagePath: string,
  name: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': abs(siteUrl, pagePath) + '#webpage',
    url: abs(siteUrl, pagePath),
    name,
    description,
    inLanguage: bcp47(locale),
    isPartOf: { '@id': abs(siteUrl, '/#website') },
    about: { '@id': ORG_ID },
  };
}

/**
 * ImageGallery — for /galerie/ and /en/gallery/. The individual
 * ImageObject entries are rendered alongside each gallery item; this
 * top-level schema only declares the gallery itself and its size.
 */
export function imageGallerySchema(
  locale: Locale,
  siteUrl: string,
  pagePath: string,
  name: string,
  numberOfItems: number,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': abs(siteUrl, pagePath) + '#webpage',
    url: abs(siteUrl, pagePath),
    name,
    numberOfItems,
    inLanguage: bcp47(locale),
    isPartOf: { '@id': abs(siteUrl, '/#website') },
    about: { '@id': ORG_ID },
  };
}

// ─── BREADCRUMBS ───────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  /** Path on this site, e.g. "/fr/services/". Trailing slash safe. */
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(siteUrl, item.path),
    })),
  };
}
