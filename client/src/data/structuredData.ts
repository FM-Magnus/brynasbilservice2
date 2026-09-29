import { BUSINESS } from './business'

/**
 * schema.org data for search engines (benchmark finding A2). Built from
 * BUSINESS so the facts can never drift from what the pages show. Saturday
 * ("Förfrågan") has no fixed hours, so only Mon–Fri is listed.
 */
export const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email.address,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    postalCode: BUSINESS.address.postalCode,
    addressLocality: BUSINESS.address.city,
    addressCountry: 'SE',
  },
  areaServed: BUSINESS.address.city,
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: BUSINESS.hours.weekdays.open,
    closes: BUSINESS.hours.weekdays.close,
  }],
}

export function faqJsonLd(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** JSON for a <script type="application/ld+json">; `<` is escaped so text can never close the tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
