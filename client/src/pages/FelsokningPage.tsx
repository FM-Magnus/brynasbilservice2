import { useEffect, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'

const symptoms = [
  'Motorlampan (Check Engine) eller varningslampor tänds',
  'Bilen är svårstartad eller dör under körning',
  'Ojämn motorgång eller reducerad motoreffekt',
  'Elektriska funktioner eller instrument slutat fungera',
] as const

const services = [
  'Felsökning & felkodsläsning',
  'Elektronik & givardiagnostik',
  'Elarbete & elsystem',
  'Batteri- och laddningssystem',
] as const

export default function FelsokningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />

      <main className="ac-page diagnostics-page">
        <section className="ac-page__hero" aria-labelledby="diagnostics-hero-title">
          <div className="container ac-page__container">
            <div className="ac-page__hero-copy">
              <h1 id="diagnostics-hero-title">Felsökning &amp; <span>Diagnostik</span></h1>
              <p>Avancerad datoriserad felsökning för modern fordonselektronik.</p>
              <button type="button" onClick={() => setIsModalOpen(true)} className="ac-page__button ac-page__button--primary diagnostics-page__hero-cta">
                Boka tid
              </button>
              <a className="ac-page__phone" href="tel:0705533395">
                <PhoneIcon />Ring oss: 070-553 33 95
              </a>
            </div>

            <div
              className="diagnostics-page__hero-placeholder"
              role="img"
              aria-label="Platshållare för framtida bild: Felsökning i verkstaden"
            >
              <MonitorIcon aria-hidden="true" />
              <span>Felsökning i verkstaden</span>
              <small>Bild kommer</small>
            </div>
          </div>
        </section>

        <section className="ac-page__section ac-page__symptoms" aria-labelledby="diagnostics-symptoms-title">
          <div className="container ac-page__container">
            <div className="ac-page__section-heading">
              <h2 id="diagnostics-symptoms-title">Vanliga tecken på att du behöver hjälp</h2>
            </div>
            <div className="ac-page__symptom-grid diagnostics-page__symptom-grid">
              {symptoms.map((symptom) => (
                <article key={symptom} className="diagnostics-page__symptom-card">
                  <h3>{symptom}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ac-page__section diagnostics-page__help" aria-labelledby="diagnostics-help-title">
          <div className="container ac-page__container">
            <div className="diagnostics-page__help-card">
              <div>
                <h2 id="diagnostics-help-title">Felsökning, Diagnostik &amp; Elsystem</h2>
                <p>En varningslampa säger sällan hela sanningen. Vi börjar alltid med att läsa av bilens felkoder, men en kod visar bara vilket system som larmar — inte exakt vilken del som är trasig.</p>
              </div>
              <ul aria-label="Det här kan vi hjälpa dig med">
                {services.map((service) => (
                  <li key={service}><CheckIcon aria-hidden="true" />{service}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="diagnostics-page__booking" aria-labelledby="diagnostics-booking-title">
          <div className="container ac-page__container">
            <div className="diagnostics-page__booking-card">
              <div>
                <h2 id="diagnostics-booking-title">Boka tid för felsökning</h2>
                <p>Välj datum, tid och tjänst i vårt befintliga bokningsformulär.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="ac-page__button ac-page__button--primary">Boka tid</button>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
