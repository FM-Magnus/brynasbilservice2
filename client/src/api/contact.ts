import { BUSINESS } from '../data/business'

// There is no /api/contact endpoint yet (docs/BACKEND.md). Until there is, the
// contact forms hand the message to the visitor's own e-mail program as a
// pre-filled mailto: link, so nothing is silently lost behind a false "Tack".
// When the endpoint exists, replace this module; the forms only call it.

export type ContactMessage = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

/** Inquiry subjects offered by the contact forms. */
export const contactSubjects: readonly string[] = [
  'Bilservice & oljebyte',
  'Reparation & felsökning',
  'Däckservice & hjulinställning',
  'AC-service',
  'Bärgning & transport',
  'Övrigt',
]

export function contactMailtoHref({ name, email, phone, subject, message }: ContactMessage, to: string = BUSINESS.email.address): string {
  const lines = [`Namn: ${name}`, `E-post: ${email}`]
  if (phone) lines.push(`Telefon: ${phone}`)
  if (subject) lines.push(`Ärende: ${subject}`)
  lines.push('', message)

  const mailSubject = `Förfrågan via webbplatsen${subject ? ` – ${subject}` : ''}`
  // encodeURIComponent turns the CRLF line breaks mail clients expect into %0D%0A.
  return `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(lines.join('\r\n'))}`
}

export function openContactEmail(message: ContactMessage, to?: string): string {
  const href = contactMailtoHref(message, to)
  window.location.href = href
  return href
}
