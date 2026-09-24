import { useState } from 'react'
import type { FormEvent } from 'react'
import { openContactEmail } from '../api/contact'
import { BUSINESS, weekdayHours } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { FacebookIcon } from '../components/icons/FacebookIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { MailIcon } from '../components/icons/MailIcon'
import { SendIcon } from '../components/icons/SendIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { defaultContactSubjects } from '../components/ui/ContactFormCard'
import aboutHeroWebp from '../assets/images/about/about-hero-bg.webp'
import aboutHeroJpg from '../assets/images/about/about-hero-bg.jpg'
import './ContactPage.css'

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const ADDRESS = BUSINESS.address.full
const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Utmarksv%C3%A4gen+21B+G%C3%A4vle'
const GOOGLE_MAPS_EMBED_URL = 'https://www.google.com/maps?q=Utmarksv%C3%A4gen+21B,+802+91+G%C3%A4vle&output=embed'

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Set once the message has been handed to the visitor's e-mail program.
  const [mailtoHref, setMailtoHref] = useState<string | null>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const field = (name: string) => String(formData.get(name) || '').trim()
    setMailtoHref(openContactEmail({
      name: field('namn'),
      email: field('epost'),
      phone: field('telefon'),
      subject: field('arende'),
      message: field('meddelande'),
    }))
  }

  return (
    <>
      <main className="kontakt-page" id="main-content">
        <section className="bb-hero kontakt-page__hero" aria-labelledby="contact-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture>
              <source srcSet={aboutHeroWebp} type="image/webp" />
              <img src={aboutHeroJpg} alt="" />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openModal} variant="overlay" />

          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Din lokala bilverkstad i Brynäs, Gävle</p>
              <h1 className="bb-h1" id="contact-hero-title">
                <span className="bb-accent">Hör av dig</span> till Brynäs Bilservice
              </h1>
              <p className="bb-lead--dark kontakt-page__lead">
                Har du frågor om din bil, behöver rådgivning eller vill skicka en förfrågan? Vår verkstad ligger på Utmarksvägen i Brynäs, Gävle och vi hjälper dig gärna med snabba och raka besked.
              </p>
              <p className="bb-lead--dark kontakt-page__sub">
                Välj det sätt som passar dig bäst: skicka ett meddelande via formuläret, ring oss direkt eller boka tid via vårt bokningssystem.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal">
                  <span>Boka tid</span>
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
            <GoogleReviewsCard variant="hero-overlay" />
          </div>
        </section>

        <section className="kontakt-page__main" aria-label="Kontaktinformation och formulär">
          <div className="bb-wrap kontakt-page__grid">
            <div className="kontakt-page__info-col">
              <div className="kontakt-page__card kontakt-page__card--dark">
                <span className="bb-eyebrow bb-eyebrow--dark">Direktkontakt</span>
                <h2 className="bb-h2 kontakt-page__card-title">Kontakt &amp; Besöksadress</h2>

                <ul className="kontakt-page__details-list">
                  <li className="kontakt-page__detail-item">
                    <span className="kontakt-page__detail-icon" aria-hidden="true"><PhoneIcon /></span>
                    <span className="kontakt-page__detail-content">
                      <span className="kontakt-page__detail-label">Telefon</span>
                      <a href={BUSINESS.phone.href} className="kontakt-page__detail-link">{BUSINESS.phone.display}</a>
                    </span>
                  </li>
                  <li className="kontakt-page__detail-item">
                    <span className="kontakt-page__detail-icon" aria-hidden="true"><MailIcon /></span>
                    <span className="kontakt-page__detail-content">
                      <span className="kontakt-page__detail-label">E-post</span>
                      <a href={BUSINESS.email.href} className="kontakt-page__detail-link">{BUSINESS.email.address}</a>
                    </span>
                  </li>
                  <li className="kontakt-page__detail-item">
                    <span className="kontakt-page__detail-icon" aria-hidden="true"><MapPinIcon /></span>
                    <span className="kontakt-page__detail-content">
                      <span className="kontakt-page__detail-label">Verkstadsadress</span>
                      <span className="kontakt-page__detail-val">{BUSINESS.address.street}<br />{BUSINESS.address.postalCode} {BUSINESS.address.city}</span>
                      <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="kontakt-page__map-link">
                        Öppna i Google Maps →
                      </a>
                    </span>
                  </li>
                  <li className="kontakt-page__detail-item">
                    <span className="kontakt-page__detail-icon" aria-hidden="true"><FacebookIcon /></span>
                    <span className="kontakt-page__detail-content">
                      <span className="kontakt-page__detail-label">Facebook</span>
                      <a href="https://www.facebook.com/p/Brynäs-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" className="kontakt-page__detail-link">
                        {BUSINESS.legalName} på Facebook →
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="kontakt-page__card-divider" aria-hidden="true" />

                <div className="kontakt-page__hours-block">
                  <div className="kontakt-page__hours-header">
                    <ClockIcon className="kontakt-page__hours-icon" />
                    <span className="kontakt-page__hours-title">Öppettider</span>
                  </div>
                  <div className="kontakt-page__hours-list">
                    <div className="kontakt-page__hours-row"><span>Måndag – Fredag</span><span className="kontakt-page__hours-val">{weekdayHours({ dash: ' – ' })}</span></div>
                    <div className="kontakt-page__hours-row"><span>Lördag</span><span className="kontakt-page__hours-val kontakt-page__hours-val--accent">{BUSINESS.hours.saturday}</span></div>
                    <div className="kontakt-page__hours-row"><span>Söndag</span><span className="kontakt-page__hours-val kontakt-page__hours-val--muted">{BUSINESS.hours.sunday}</span></div>
                  </div>
                </div>
              </div>

              <div className="kontakt-page__card kontakt-page__card--light">
                <span className="bb-eyebrow">Så fungerar det</span>
                <h3 className="kontakt-page__steps-title">Från förfrågan till bekräftad tid</h3>
                <div className="kontakt-page__steps-list">
                  <div className="kontakt-page__step-item">
                    <span className="kontakt-page__step-badge">01</span>
                    <div>
                      <h4 className="kontakt-page__step-heading">Du skickar en förfrågan eller ringer</h4>
                      <p className="kontakt-page__step-text">Beskriv vad du vill ha hjälp med, vilka symptom du upplever eller vilken service bilen behöver.</p>
                    </div>
                  </div>
                  <div className="kontakt-page__step-item">
                    <span className="kontakt-page__step-badge">02</span>
                    <div>
                      <h4 className="kontakt-page__step-heading">Vi undersöker och återkopplar</h4>
                      <p className="kontakt-page__step-text">Vi återkommer till dig under våra öppettider med förslag på tid och tydliga kostnadsuppgifter.</p>
                    </div>
                  </div>
                  <div className="kontakt-page__step-item">
                    <span className="kontakt-page__step-badge">03</span>
                    <div>
                      <h4 className="kontakt-page__step-heading">Tid bekräftas innan vi börjar</h4>
                      <p className="kontakt-page__step-text">Vi påbörjar inga reparationer utan ditt godkännande. Du har full kontroll hela vägen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="kontakt-page__form-col">
              <div className="kontakt-page__form-card">
                <h2 className="bb-h2 kontakt-page__form-heading">Skicka ett meddelande</h2>
                <p className="bb-lead kontakt-page__form-intro">Fyll i dina uppgifter och vad ärendet gäller. Fält markerade med * är obligatoriska.</p>

                <div className="kontakt-page__notice" role="note">
                  <InfoIcon className="kontakt-page__notice-icon" />
                  <p className="kontakt-page__notice-text">
                    <strong>Viktigt att veta:</strong> Ett inskickat formulär är en förfrågan och inte en bekräftad bokning. Vi kontaktar dig för att bekräfta tid och gå igenom detaljer innan arbetet påbörjas.
                  </p>
                </div>

                {mailtoHref ? (
                  <div className="kontakt-page__form-success" role="status">
                    <span className="kontakt-page__success-icon">✉</span>
                    <h3 className="kontakt-page__success-title">Klart att skicka</h3>
                    <p className="kontakt-page__success-desc">
                      Ditt e-postprogram öppnas med meddelandet ifyllt. Skicka det därifrån, så återkommer vi så snart vi kan under våra öppettider (Mån–Fre {weekdayHours()}). Öppnades inget? Mejla oss på{' '}
                      <a href={mailtoHref}>{BUSINESS.email.address}</a> eller ring <a href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a>.
                    </p>
                    <button type="button" className="bb-btn bb-btn--teal kontakt-page__reset-btn" onClick={() => setMailtoHref(null)}>
                      Skriv ett nytt meddelande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="kontakt-page__form">
                    <div className="kontakt-page__form-row">
                      <div className="kontakt-page__field">
                        <label htmlFor="contact-name" className="kontakt-page__label">Namn <span className="kontakt-page__required">*</span></label>
                        <input type="text" id="contact-name" name="namn" required placeholder="Ditt för- och efternamn" className="kontakt-page__input" autoComplete="name" />
                      </div>
                      <div className="kontakt-page__field">
                        <label htmlFor="contact-email" className="kontakt-page__label">E-post <span className="kontakt-page__required">*</span></label>
                        <input type="email" id="contact-email" name="epost" required placeholder="din@epost.se" className="kontakt-page__input" autoComplete="email" />
                      </div>
                    </div>

                    <div className="kontakt-page__form-row">
                      <div className="kontakt-page__field">
                        <label htmlFor="contact-phone" className="kontakt-page__label">Telefonnummer</label>
                        <input type="tel" id="contact-phone" name="telefon" placeholder="07X - XXX XX XX" className="kontakt-page__input" autoComplete="tel" />
                      </div>
                      <div className="kontakt-page__field">
                        <label htmlFor="contact-subject" className="kontakt-page__label">Ärende</label>
                        <div className="kontakt-page__select-wrapper">
                          <select id="contact-subject" name="arende" defaultValue="" className="kontakt-page__select">
                            <option value="">Välj ärende</option>
                            {defaultContactSubjects.map((subject) => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                          <ChevronDownIcon className="kontakt-page__select-chevron" />
                        </div>
                      </div>
                    </div>

                    <div className="kontakt-page__field kontakt-page__field--full">
                      <label htmlFor="contact-message" className="kontakt-page__label">Meddelande <span className="kontakt-page__required">*</span></label>
                      <textarea id="contact-message" name="meddelande" required rows={5} placeholder="Beskriv vad du behöver hjälp med, bilmodell, registreringsnummer eller eventuella felkoder/symptom..." className="kontakt-page__textarea" />
                    </div>

                    <div className="kontakt-page__form-action">
                      <button type="submit" className="bb-btn bb-btn--ember-solid">
                        <span>Skicka meddelande</span>
                        <SendIcon />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="kontakt-page__find" aria-labelledby="contact-find-title">
          <div className="bb-wrap kontakt-page__find-grid">
            <div className="kontakt-page__map-card">
              <iframe
                title={`Karta till ${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.city}`}
                src={GOOGLE_MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="kontakt-page__find-card">
              <h2 className="bb-h2 kontakt-page__find-title" id="contact-find-title">Hitta till oss</h2>
              <p className="kontakt-page__find-address">{ADDRESS}</p>
              <div className="kontakt-page__find-actions">
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="bb-btn bb-btn--teal">
                  <MapPinIcon />
                  <span>Vägbeskrivning</span>
                </a>
              </div>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="kontakt-page__find-link">
                Öppna i Google Maps <ArrowRightIcon className="kontakt-page__find-link-arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="kontakt-page__focus" aria-labelledby="contact-focus-title">
          <div className="bb-wrap kontakt-page__focus-content">
            <h2 className="bb-h2 kontakt-page__focus-title" id="contact-focus-title">Personlig service<br /><span className="bb-accent">i fokus</span></h2>
            <p className="bb-lead--dark kontakt-page__focus-lead">Vi tar hand om din bil med noggrannhet, erfarenhet och engagemang.</p>
          </div>
        </section>

        <section className="kontakt-page__closing" aria-labelledby="contact-closing-title">
          <div className="bb-wrap">
            <div className="kontakt-page__closing-card">
              <p className="bb-eyebrow bb-eyebrow--dark">Kom i kontakt med oss</p>
              <h2 className="bb-h2 kontakt-page__closing-title" id="contact-closing-title">Behöver du hjälp med din bil?</h2>
              <p className="bb-lead--dark kontakt-page__closing-desc">
                Oavsett om det gäller regelbunden service, felsökning eller däckskifte är du varmt välkommen att kontakta oss.
              </p>
              <div className="kontakt-page__closing-actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal">
                  <span>Boka tid nu</span>
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon />
                  <span>Ring: {BUSINESS.phone.display}</span>
                </a>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="bb-btn bb-btn--ember">
                  <MapPinIcon />
                  <span>Vägbeskrivning</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
