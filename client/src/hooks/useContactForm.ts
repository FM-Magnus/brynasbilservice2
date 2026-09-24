import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import { openContactEmail } from '../api/contact'
import type { ContactMessage } from '../api/contact'

/**
 * Submit and "sent" state shared by the contact forms (Kontakt and the
 * Landing card), which differ only in markup and copy.
 *
 * The form's fields must be named `name`, `email`, `phone`, `subject` and
 * `message`. Values are trimmed, handed to the visitor's e-mail program
 * (see `api/contact.ts`), and `mailtoHref` is set so the form can show its
 * "Klart att skicka" panel with a fallback link. `reset` returns to the form.
 */
export function useContactForm({ to, onSent }: { to?: string; onSent?: (message: ContactMessage) => void } = {}) {
  const [mailtoHref, setMailtoHref] = useState<string | null>(null)

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
    setMailtoHref(openContactEmail(message, to))
    onSent?.(message)
  }

  const reset = useCallback(() => setMailtoHref(null), [])

  return { mailtoHref, handleSubmit, reset }
}
