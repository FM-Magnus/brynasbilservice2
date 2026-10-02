import type { FormEvent } from 'react'
import { submitContact } from '../api/contact'
import type { ContactMessage } from '../api/contact'
import { useFormSubmission } from './useFormSubmission'
import type { SubmissionErrorKind } from './useFormSubmission'

const contactErrors: Record<SubmissionErrorKind, string> = {
  network: 'Vi når inte servern just nu. Ditt meddelande har inte skickats.',
  timeout: 'Det tog för lång tid att skicka. Kontrollera om meddelandet kom fram innan du försöker igen.',
  'rate-limit': 'För många försök på kort tid. Vänta en stund innan du försöker igen.',
  rejected: 'Meddelandet kunde inte skickas. Kontrollera uppgifterna och försök igen.',
  server: 'Vi kunde inte ta emot meddelandet just nu. Försök igen senare.',
  unknown: 'Meddelandet kunde inte skickas. Försök igen senare.',
}

export function contactErrorMessage(kind: SubmissionErrorKind | null): string {
  return contactErrors[kind || 'unknown']
}

/** Shared submission state for the Kontakt and Landing contact forms. */
export function useContactForm({ onSent }: { onSent?: (message: ContactMessage) => void } = {}) {
  const submission = useFormSubmission()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const field = (name: keyof ContactMessage) => String(formData.get(name) || '').trim()
    const message: ContactMessage = {
      name: field('name'),
      email: field('email'),
      phone: field('phone'),
      subject: field('subject'),
      message: field('message'),
    }
    void submission.submit((signal) => submitContact(message, signal)).then((accepted) => {
      if (accepted) onSent?.(message)
    })
  }

  return { ...submission, handleSubmit }
}
