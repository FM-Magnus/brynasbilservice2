import React, { useState } from 'react'
import { PhoneIcon } from '../icons/PhoneIcon'
import { MapPinIcon } from '../icons/MapPinIcon'

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function SendPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function ContactIntro() {
  const [formData, setFormData] = useState({
    namn: '',
    epost: '',
    telefon: '',
    arende: '',
    meddelande: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact-intro" id="kontakt-intro" aria-labelledby="contact-intro-title">
      {/* Background line illustration watermark */}
      <svg className="contact-intro__watermark" viewBox="0 0 450 450" fill="none" aria-hidden="true">
        {/* Decorative wrench outline */}
        <path
          d="M75 140 C50 115 50 75 75 50 C100 25 140 25 165 50 C180 65 185 85 180 105 L260 185 L225 220 L145 140 C125 145 105 140 90 125 Z M100 70 A15 15 0 0 0 100 100 A15 15 0 0 0 100 70 Z"
          stroke="rgba(36, 150, 160, 0.12)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Concentric wheel / tire arcs */}
        <circle cx="90" cy="360" r="140" stroke="rgba(36, 150, 160, 0.08)" strokeWidth="2" />
        <circle cx="90" cy="360" r="200" stroke="rgba(36, 150, 160, 0.06)" strokeWidth="1.8" />
        <circle cx="90" cy="360" r="260" stroke="rgba(36, 150, 160, 0.04)" strokeWidth="1.5" />
      </svg>

      <div className="container">
        <div className="contact-intro__inner">
          {/* Left Column: Contact Info */}
          <div className="contact-intro__info">
            <div className="contact-intro__eyebrow">
              <span className="contact-intro__eyebrow-dash" aria-hidden="true" />
              <span>KONTAKT</span>
            </div>

            <h2 className="contact-intro__heading" id="contact-intro-title">
              <span className="contact-intro__heading-line1">HÖR AV DIG</span>
              <span className="contact-intro__heading-line2">TILL OSS</span>
            </h2>

            <p className="contact-intro__desc">
              Har du frågor, vill boka tid eller behöver rådgivning? Skicka ett meddelande så återkommer vi så snart vi kan.
            </p>

            <ul className="contact-intro__list">
              <li className="contact-intro__item">
                <a href="tel:0705533395" className="contact-intro__item-link">
                  <div className="contact-intro__icon-badge" aria-hidden="true">
                    <PhoneIcon className="contact-intro__badge-svg" />
                  </div>
                  <div className="contact-intro__item-content">
                    <span className="contact-intro__item-label">RING OSS</span>
                    <span className="contact-intro__item-value">070-553 33 95</span>
                  </div>
                </a>
              </li>

              <li className="contact-intro__item">
                <a href="mailto:info@brynasbilservice.se" className="contact-intro__item-link">
                  <div className="contact-intro__icon-badge" aria-hidden="true">
                    <MailIcon className="contact-intro__badge-svg" />
                  </div>
                  <div className="contact-intro__item-content">
                    <span className="contact-intro__item-label">MEJLA OSS</span>
                    <span className="contact-intro__item-value">info@brynasbilservice.se</span>
                  </div>
                </a>
              </li>

              <li className="contact-intro__item">
                <div className="contact-intro__item-link contact-intro__item-link--static">
                  <div className="contact-intro__icon-badge" aria-hidden="true">
                    <MapPinIcon className="contact-intro__badge-svg" />
                  </div>
                  <div className="contact-intro__item-content">
                    <span className="contact-intro__item-label">BESÖK OSS</span>
                    <span className="contact-intro__item-value">
                      Utmarksvägen 21B<br />
                      802 91 Gävle
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <p className="contact-intro__note">
              Fyll i formuläret så återkommer vi till dig så snart som möjligt!
            </p>
          </div>

          {/* Right Column: Teal Contact Form Card */}
          <div className="contact-intro__form-card">
            <h3 className="contact-intro__form-title">SKICKA ETT MEDDELANDE</h3>
            <p className="contact-intro__form-subtext">
              Berätta hur vi kan hjälpa dig. Obligatoriska fält är markerade med *.
            </p>

            {submitted ? (
              <div className="contact-intro__form-success" role="status">
                <div className="contact-intro__success-icon">✓</div>
                <h4>Tack för ditt meddelande!</h4>
                <p>Vi har tagit emot din förfrågan och återkommer så snart vi kan under våra öppettider.</p>
                <button
                  type="button"
                  className="contact-intro__reset-btn"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ namn: '', epost: '', telefon: '', arende: '', meddelande: '' })
                  }}
                >
                  Skicka ett till meddelande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-intro__form" noValidate={false}>
                {/* Row 1: Namn & E-post */}
                <div className="contact-intro__form-row">
                  <div className="contact-intro__field">
                    <label htmlFor="intro-name" className="contact-intro__label">
                      Namn <span className="contact-intro__required">*</span>
                    </label>
                    <input
                      type="text"
                      id="intro-name"
                      name="namn"
                      required
                      value={formData.namn}
                      onChange={handleChange}
                      placeholder="Ditt namn"
                      className="contact-intro__input"
                    />
                  </div>

                  <div className="contact-intro__field">
                    <label htmlFor="intro-email" className="contact-intro__label">
                      E-post <span className="contact-intro__required">*</span>
                    </label>
                    <input
                      type="email"
                      id="intro-email"
                      name="epost"
                      required
                      value={formData.epost}
                      onChange={handleChange}
                      placeholder="din@epost.se"
                      className="contact-intro__input"
                    />
                  </div>
                </div>

                {/* Row 2: Telefon & Ärende */}
                <div className="contact-intro__form-row">
                  <div className="contact-intro__field">
                    <label htmlFor="intro-phone" className="contact-intro__label">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="intro-phone"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="07X - XXX XX XX"
                      className="contact-intro__input"
                    />
                  </div>

                  <div className="contact-intro__field">
                    <label htmlFor="intro-subject" className="contact-intro__label">
                      Ärende
                    </label>
                    <div className="contact-intro__select-wrapper">
                      <select
                        id="intro-subject"
                        name="arende"
                        value={formData.arende}
                        onChange={handleChange}
                        className="contact-intro__select"
                      >
                        <option value="">Välj ärende</option>
                        <option value="bilservice">Bilservice &amp; oljebyte</option>
                        <option value="reparation">Reparation &amp; felsökning</option>
                        <option value="bromsar">Bromsar</option>
                        <option value="dack">Däckservice &amp; hjulinställning</option>
                        <option value="ac">AC-service</option>
                        <option value="bargning">Bärgning &amp; transport</option>
                        <option value="prisforfragan">Offert / Prisförfrågan</option>
                        <option value="ovrigt">Övrigt</option>
                      </select>
                      <ChevronDownIcon className="contact-intro__select-chevron" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Meddelande */}
                <div className="contact-intro__field contact-intro__field--full">
                  <label htmlFor="intro-message" className="contact-intro__label">
                    Meddelande <span className="contact-intro__required">*</span>
                  </label>
                  <textarea
                    id="intro-message"
                    name="meddelande"
                    required
                    rows={4}
                    value={formData.meddelande}
                    onChange={handleChange}
                    placeholder="Skriv ditt meddelande här..."
                    className="contact-intro__textarea"
                  />
                </div>

                {/* Submit Button */}
                <div className="contact-intro__form-action">
                  <button type="submit" className="contact-intro__submit-btn">
                    <span>SKICKA MEDDELANDE</span>
                    <SendPlaneIcon className="contact-intro__submit-icon" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
