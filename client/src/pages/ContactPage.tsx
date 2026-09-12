import React, { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { FacebookIcon } from '../components/icons/FacebookIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

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

function InfoCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    namn: '',
    epost: '',
    telefon: '',
    arende: '',
    meddelande: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="contact-page" id="main-content">
        {/* Hero Section */}
        <section className="contact-page__hero" aria-labelledby="contact-hero-title">
          <div className="container">
            <div className="contact-page__hero-content">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Kontakta oss
              </div>
              <h1 className="contact-page__hero-title" id="contact-hero-title">
                Hör av dig till Brynäs Bilservice
              </h1>
              <p className="contact-page__hero-lead">
                Har du frågor om din bil, behöver rådgivning eller vill skicka en förfrågan? Vår verkstad ligger på Utmarksvägen i Brynäs, Gävle och vi hjälper dig gärna med snabba och raka besked.
              </p>
              <p className="contact-page__hero-sub">
                Välj det sätt som passar dig bäst: skicka ett meddelande via formuläret, ring oss direkt eller boka tid via vårt bokningssystem.
              </p>
              <div className="contact-page__hero-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="contact-page__btn contact-page__btn--primary"
                >
                  <span>Boka tid</span>
                  <span className="contact-page__btn-arrow" aria-hidden="true">
                    <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </button>
                <a
                  href="tel:0705533395"
                  className="contact-page__btn contact-page__btn--outline"
                >
                  <PhoneIcon className="w-4 h-4 text-teal-400" />
                  <span>Ring: 070-553 33 95</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Two Columns */}
        <section className="contact-page__main" aria-label="Kontaktinformation och formulär">
          <div className="container">
            <div className="contact-page__grid">
              
              {/* Left Column: Details, Hours & Steps */}
              <div className="contact-page__info-col">
                
                {/* Contact Card */}
                <div className="contact-page__card contact-page__card--dark">
                  <div className="contact-page__card-header">
                    <span className="contact-page__card-eyebrow">Direktkontakt</span>
                    <h2 className="contact-page__card-title">Kontakt & Besöksadress</h2>
                  </div>

                  <ul className="contact-page__details-list">
                    <li className="contact-page__detail-item">
                      <div className="contact-page__detail-icon" aria-hidden="true">
                        <PhoneIcon />
                      </div>
                      <div className="contact-page__detail-content">
                        <span className="contact-page__detail-label">Telefon</span>
                        <a href="tel:0705533395" className="contact-page__detail-link">
                          070-553 33 95
                        </a>
                      </div>
                    </li>

                    <li className="contact-page__detail-item">
                      <div className="contact-page__detail-icon" aria-hidden="true">
                        <MailIcon className="w-5 h-5" />
                      </div>
                      <div className="contact-page__detail-content">
                        <span className="contact-page__detail-label">E-post</span>
                        <a href="mailto:info@brynasbilservice.se" className="contact-page__detail-link">
                          info@brynasbilservice.se
                        </a>
                      </div>
                    </li>

                    <li className="contact-page__detail-item">
                      <div className="contact-page__detail-icon" aria-hidden="true">
                        <MapPinIcon />
                      </div>
                      <div className="contact-page__detail-content">
                        <span className="contact-page__detail-label">Verkstadsadress</span>
                        <span className="contact-page__detail-val">
                          Utmarksvägen 21B<br />
                          802 91 Gävle
                        </span>
                        <a
                          href="https://maps.google.com/?q=Utmarksvägen+21B,+802+91+Gävle"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-page__map-link"
                        >
                          Öppna i Google Maps →
                        </a>
                      </div>
                    </li>

                    <li className="contact-page__detail-item">
                      <div className="contact-page__detail-icon" aria-hidden="true">
                        <FacebookIcon className="w-5 h-5" />
                      </div>
                      <div className="contact-page__detail-content">
                        <span className="contact-page__detail-label">Facebook</span>
                        <a
                          href="https://www.facebook.com/p/Brynäs-Bilservice-AB-100076623266130/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-page__detail-link"
                        >
                          Brynäs Bilservice AB på Facebook →
                        </a>
                      </div>
                    </li>
                  </ul>

                  <div className="contact-page__card-divider" aria-hidden="true" />

                  {/* Opening Hours */}
                  <div className="contact-page__hours-block">
                    <div className="contact-page__hours-header">
                      <ClockIcon className="w-4 h-4 text-teal-400" />
                      <span className="contact-page__hours-title">Öppettider</span>
                    </div>
                    <div className="contact-page__hours-list">
                      <div className="contact-page__hours-row">
                        <span>Måndag – Fredag:</span>
                        <span className="font-semibold text-white">08:00 – 17:00</span>
                      </div>
                      <div className="contact-page__hours-row">
                        <span>Lördag:</span>
                        <span className="font-medium text-teal-300">Förfrågan</span>
                      </div>
                      <div className="contact-page__hours-row">
                        <span>Söndag:</span>
                        <span className="text-gray-400">Stängt</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps Reassurance Card */}
                <div className="contact-page__card contact-page__card--light">
                  <span className="contact-page__card-eyebrow text-teal-700">Så fungerar det</span>
                  <h3 className="contact-page__steps-title">Från förfrågan till bekräftad tid</h3>
                  <div className="contact-page__steps-list">
                    <div className="contact-page__step-item">
                      <div className="contact-page__step-badge">1</div>
                      <div className="contact-page__step-content">
                        <h4 className="contact-page__step-heading">Du skickar en förfrågan eller ringer</h4>
                        <p className="contact-page__step-text">
                          Beskriv vad du vill ha hjälp med, vilka symptom du upplever eller vilken service bilen behöver.
                        </p>
                      </div>
                    </div>

                    <div className="contact-page__step-item">
                      <div className="contact-page__step-badge">2</div>
                      <div className="contact-page__step-content">
                        <h4 className="contact-page__step-heading">Vi undersöker och återkopplar</h4>
                        <p className="contact-page__step-text">
                          Vi återkommer till dig under våra öppettider med förslag på tid och tydliga kostnadsuppgifter.
                        </p>
                      </div>
                    </div>

                    <div className="contact-page__step-item">
                      <div className="contact-page__step-badge">3</div>
                      <div className="contact-page__step-content">
                        <h4 className="contact-page__step-heading">Tid bekräftas innan vi börjar</h4>
                        <p className="contact-page__step-text">
                          Vi påbörjar inga reparationer utan ditt godkännande. Du har full kontroll hela vägen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Form */}
              <div className="contact-page__form-col">
                <div className="contact-page__form-card">
                  <h2 className="contact-page__form-heading">Skicka ett meddelande</h2>
                  <p className="contact-page__form-intro">
                    Fyll i dina uppgifter och vad ärendet gäller. Fält markerade med * är obligatoriska.
                  </p>

                  {/* Booking distinction callout */}
                  <div className="contact-page__notice" role="note">
                    <InfoCircleIcon className="contact-page__notice-icon" />
                    <p className="contact-page__notice-text">
                      <strong>Viktigt att veta:</strong> Ett inskickat formulär är en förfrågan och inte en bekräftad bokning. Vi kontaktar dig för att bekräfta tid och gå igenom detaljer innan arbetet påbörjas.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="contact-page__form-success" role="status">
                      <div className="contact-page__success-icon">✓</div>
                      <h3 className="contact-page__success-title">Tack för ditt meddelande!</h3>
                      <p className="contact-page__success-desc">
                        Vi har tagit emot din förfrågan och återkommer till dig så snart vi kan under våra öppettider (Mån–Fre 08:00–17:00).
                      </p>
                      <button
                        type="button"
                        className="contact-page__reset-btn"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ namn: '', epost: '', telefon: '', arende: '', meddelande: '' })
                        }}
                      >
                        Skicka ett till meddelande
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-page__form" noValidate={false}>
                      {/* Row 1: Namn & E-post */}
                      <div className="contact-page__form-row">
                        <div className="contact-page__field">
                          <label htmlFor="contact-name" className="contact-page__label">
                            Namn <span className="contact-page__required">*</span>
                          </label>
                          <input
                            type="text"
                            id="contact-name"
                            name="namn"
                            required
                            value={formData.namn}
                            onChange={handleChange}
                            placeholder="Ditt för- och efternamn"
                            className="contact-page__input"
                          />
                        </div>

                        <div className="contact-page__field">
                          <label htmlFor="contact-email" className="contact-page__label">
                            E-post <span className="contact-page__required">*</span>
                          </label>
                          <input
                            type="email"
                            id="contact-email"
                            name="epost"
                            required
                            value={formData.epost}
                            onChange={handleChange}
                            placeholder="din@epost.se"
                            className="contact-page__input"
                          />
                        </div>
                      </div>

                      {/* Row 2: Telefon & Ärende */}
                      <div className="contact-page__form-row">
                        <div className="contact-page__field">
                          <label htmlFor="contact-phone" className="contact-page__label">
                            Telefonnummer
                          </label>
                          <input
                            type="tel"
                            id="contact-phone"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="07X - XXX XX XX"
                            className="contact-page__input"
                          />
                        </div>

                        <div className="contact-page__field">
                          <label htmlFor="contact-subject" className="contact-page__label">
                            Ärende
                          </label>
                          <div className="contact-page__select-wrapper">
                            <select
                              id="contact-subject"
                              name="arende"
                              value={formData.arende}
                              onChange={handleChange}
                              className="contact-page__select"
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
                            <ChevronDownIcon className="contact-page__select-chevron" />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Meddelande */}
                      <div className="contact-page__field contact-page__field--full">
                        <label htmlFor="contact-message" className="contact-page__label">
                          Meddelande <span className="contact-page__required">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="meddelande"
                          required
                          rows={5}
                          value={formData.meddelande}
                          onChange={handleChange}
                          placeholder="Beskriv vad du behöver hjälp med, bilmodell, registreringsnummer eller eventuella felkoder/symptom..."
                          className="contact-page__textarea"
                        />
                      </div>

                      {/* Action */}
                      <div className="contact-page__form-action">
                        <button type="submit" className="contact-page__submit-btn">
                          <span>Skicka meddelande</span>
                          <SendPlaneIcon className="contact-page__submit-icon" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Closing Actions Section */}
        <section className="contact-page__closing" aria-labelledby="closing-title">
          <div className="container">
            <div className="contact-page__closing-card">
              <div className="contact-page__closing-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Kom i kontakt med oss
                </div>
                <h2 className="contact-page__closing-title" id="closing-title">
                  Behöver du hjälp med din bil?
                </h2>
                <p className="contact-page__closing-desc">
                  Oavsett om det gäller regelbunden service, felsökning eller däckskifte är du varmt välkommen att kontakta oss.
                </p>
                <div className="contact-page__closing-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="contact-page__btn contact-page__btn--primary"
                  >
                    <span>Boka tid nu</span>
                    <span className="contact-page__btn-arrow" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href="tel:0705533395"
                    className="contact-page__btn contact-page__btn--outline"
                  >
                    <PhoneIcon className="w-4 h-4 text-teal-400" />
                    <span>Ring: 070-553 33 95</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Utmarksvägen+21B,+802+91+Gävle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-page__btn contact-page__btn--secondary"
                  >
                    <MapPinIcon className="w-4 h-4 text-teal-400" />
                    <span>Vägbeskrivning</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  )
}
