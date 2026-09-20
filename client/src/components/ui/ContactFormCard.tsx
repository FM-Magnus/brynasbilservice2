import { useState } from 'react'
import type { FormEvent } from 'react'
import { BUSINESS } from '../../data/business'
import { MailIcon } from '../icons/MailIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { PhoneIcon } from '../icons/PhoneIcon'
import { SendIcon } from '../icons/SendIcon'
import './ContactFormCard.css'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

// Canonical central list of inquiry subjects for Brynäs Bilservice
export const defaultContactSubjects: string[] = [
  'Bilservice & oljebyte',
  'Reparation & felsökning',
  'Däckservice & hjulinställning',
  'AC-service',
  'Bärgning & transport',
  'Övrigt',
]

export interface ContactFormCardProps {
  variant?: 'full-section' | 'card-only'
  title?: string
  description?: string
  subjects?: string[]
  initialSubject?: string
  sectionTitle?: string
  sectionAccent?: string
  sectionDescription?: string
  phone?: string
  phoneDisplay?: string
  email?: string
  address?: string
  googleMapsUrl?: string
  className?: string
  onSubmitSuccess?: (data: ContactFormData) => void
}

export function ContactFormCard({
  variant = 'full-section',
  title = 'Skicka ett meddelande',
  description = 'Berätta hur vi kan hjälpa dig. Obligatoriska fält är markerade med *.',
  subjects = defaultContactSubjects,
  initialSubject = '',
  sectionTitle = 'Hör av dig',
  sectionAccent = 'till oss',
  sectionDescription = 'Har du frågor, vill boka tid eller behöver rådgivning? Skicka ett meddelande så återkommer vi så snart vi kan.',
  phone = BUSINESS.phone.e164,
  phoneDisplay = BUSINESS.phone.display,
  email = BUSINESS.email.address,
  address = BUSINESS.address.full,
  googleMapsUrl = BUSINESS.address.mapsUrl,
  className = '',
  onSubmitSuccess,
}: ContactFormCardProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data: ContactFormData = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    }
    setSubmitted(true)
    onSubmitSuccess?.(data)
  }

  const formCardElement = (
    <div className={`bb-contact-form-card ${variant === 'card-only' ? className : ''}`.trim()}>
      <h2>{title}</h2>
      <p>{description}</p>

      {submitted ? (
        <div className="bb-contact-form__success" role="status">
          <span>✓</span>
          <h3>Tack för ditt meddelande!</h3>
          <p>Vi har tagit emot din förfrågan och återkommer så snart vi kan under våra öppettider.</p>
          <button type="button" onClick={() => setSubmitted(false)}>
            Skicka ett till meddelande
          </button>
        </div>
      ) : (
        <form className="bb-contact-form" onSubmit={handleSubmit}>
          <div className="bb-contact-form__grid">
            <label>
              Namn <span>*</span>
              <input required name="name" placeholder="Ditt namn" autoComplete="name" />
            </label>
            <label>
              E-post <span>*</span>
              <input required type="email" name="email" placeholder="din@epost.se" autoComplete="email" />
            </label>
            <label>
              Telefon
              <input type="tel" name="phone" placeholder="07X - XXX XX XX" autoComplete="tel" />
            </label>
            <label>
              Ärende
              <select name="subject" defaultValue={initialSubject}>
                <option value="">Välj ärende</option>
                {subjects.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="bb-contact-form__message">
            Meddelande <span>*</span>
            <textarea required name="message" rows={4} placeholder="Skriv ditt meddelande här..." />
          </label>

          <button className="bb-contact-form__submit" type="submit">
            Skicka meddelande <SendIcon />
          </button>
        </form>
      )}
    </div>
  )

  if (variant === 'card-only') {
    return formCardElement
  }

  return (
    <section
      className={`bb-contact-section ${className}`.trim()}
      aria-labelledby="bb-contact-section-title"
    >
      <svg
        className="bb-contact-section__art"
        viewBox="0 0 450 450"
        fill="none"
        aria-hidden="true"
      >
        <path d="M75 140C50 115 50 75 75 50c25-25 65-25 90 0 15 15 20 35 15 55l80 80-35 35-80-80c-20 5-40 0-55-15Z" />
        <circle cx="90" cy="360" r="140" />
        <circle cx="90" cy="360" r="200" />
      </svg>

      <div className="bb-contact-section__wrap bb-contact-section__grid">
        <div className="bb-contact-section__copy">
          <h2 id="bb-contact-section-title">
            {sectionTitle}
            <br />
            <span className="bb-contact-section__accent">{sectionAccent}</span>
          </h2>
          <p>{sectionDescription}</p>

          <div className="bb-contact-section__list">
            <a href={`tel:${phone}`}>
              <i>
                <PhoneIcon />
              </i>
              <span>
                <small>Ring oss</small>
                <b>{phoneDisplay}</b>
              </span>
            </a>

            <a href={`mailto:${email}`}>
              <i>
                <MailIcon />
              </i>
              <span>
                <small>Mejla oss</small>
                <b>{email}</b>
              </span>
            </a>

            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <i>
                <MapPinIcon />
              </i>
              <span>
                <small>Besök oss</small>
                <b>{address}</b>
              </span>
            </a>
          </div>

          <p className="bb-contact-section__note">
            Fyll i formuläret så återkommer vi till dig så snart som möjligt!
          </p>
        </div>

        {formCardElement}
      </div>
    </section>
  )
}

export default ContactFormCard
