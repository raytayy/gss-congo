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
import { faqItems } from './faq';

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
    alternateName: 'GSS',
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
export function faqPageSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: bcp47(locale),
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[locale],
      },
    })),
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
