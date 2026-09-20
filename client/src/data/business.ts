/**
 * Single source of truth for Brynäs Bilservice's business facts.
 *
 * Phone number, e-mail, address, map link and opening hours were previously
 * hard-coded in ~25 page and component files, which had already drifted: the
 * telephone link existed as both `tel:0705533395` and `tel:+46705533395`, and
 * the opening hours appeared in five different typographic variants.
 *
 * These values come from Magnus and are business facts — never edit them from
 * a model's guess, a competitor reference or a research document. Presentation
 * (dashes, spacing, surrounding wording) stays with each page; only the values
 * live here.
 */

export const BUSINESS = {
  name: 'Brynäs Bilservice',
  legalName: 'Brynäs Bilservice AB',
  orgNumber: '559343-5307',

  phone: {
    /** E.164 form, used for every `tel:` link so it also works from abroad. */
    e164: '+46705533395',
    href: 'tel:+46705533395',
    /** Swedish reading form, used in all visible copy. */
    display: '070-553 33 95',
  },

  email: {
    address: 'info@brynasbilservice.se',
    href: 'mailto:info@brynasbilservice.se',
  },

  address: {
    street: 'Utmarksvägen 21B',
    postalCode: '802 91',
    city: 'Gävle',
    district: 'Brynäs',
    full: 'Utmarksvägen 21B, 802 91 Gävle',
    mapsUrl: 'https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle',
  },

  hours: {
    weekdays: { open: '08:00', close: '17:00' },
    saturday: 'Förfrågan',
    sunday: 'Stängt',
  },
} as const

/**
 * Renders the Mon–Fri opening hours in the typography a given page already
 * uses, so centralising the values changes no visible copy.
 *
 *   weekdayHours()                          → '08:00–17:00'
 *   weekdayHours({ dash: ' – ' })           → '08:00 – 17:00'
 *   weekdayHours({ dash: ' – ', dots: true }) → '08.00 – 17.00'
 */
export function weekdayHours({ dash = '–', dots = false }: { dash?: string; dots?: boolean } = {}): string {
  const { open, close } = BUSINESS.hours.weekdays
  const format = (time: string) => (dots ? time.replace(':', '.') : time)
  return `${format(open)}${dash}${format(close)}`
}
