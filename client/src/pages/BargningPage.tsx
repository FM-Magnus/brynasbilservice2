import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { TruckIcon } from '../components/icons/TruckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import imgTow from '../assets/images/services/towing/tow-truck-night.jpg'
import './BargningPage.css'

interface ServiceCategory {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  icon: JSX.Element
  actionType: 'booking' | 'call'
  items: string[]
  troubleshooting: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'bargning-transport',
    title: 'Bärgning & Biltransport',
    subtitle: 'Lokal bärgningshjälp och säker fordonstransport i Gävle med omnejd',
    description: 'Ett haveri kommer sällan lägligt. Oavsett om bilen har stannat på vägen, inte startar på uppfarten eller är för skadad för att köras säkert, hjälper vi dig med bärgning och transport direkt till verkstaden i Gävle — så att felsökningen kan komma igång så fort bilen är hos oss.',
    image: imgTow,
    imageAlt: 'Bärgningsbil utför säker transport av bil till verkstaden',
    icon: <TruckIcon />,
    actionType: 'call',
    items: [
      'Bärgning vid motorstopp och haveri',
      'Biltransport till verkstaden i Gävle',
      'Starthjälp och assistans på plats',
      'Snabb intagning för felsökning'
    ],
    troubleshooting: [
      'Bilen startar inte hemma på uppfarten eller arbetsplatsen',
      'Haveri, punktering eller överhettning under färd',
      'Bilen kan inte framföras på ett säkert eller lagligt sätt',
      'Behov av transport från annan plats till vår verkstad'
    ]
  }
]

const processSteps = [
  {
    num: '01',
    title: 'Kontakta oss vid haveri',
    desc: 'Ring 070-553 33 95 och berätta var bilen står och vad som hänt.'
  },
  {
    num: '02',
    title: 'Bärgning & transport',
    desc: 'Vi ordnar bärgning eller starthjälp och transporterar bilen säkert till verkstaden.'
  },
  {
    num: '03',
    title: 'Felsökning & åtgärd',
    desc: 'Bilen tas emot i vår verkstad i Brynäs för direkt diagnos och kostnadsförslag.'
  }
]

export default function BargningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="services-page">
        {/* Hero Section */}
        <section className="services-page__hero bargning-hero" aria-labelledby="services-hero-title">
          <div className="container">
            <div className="services-page__hero-content">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Vår verkstad i Brynäs, Gävle
              </div>
              <h1 className="services-page__title" id="services-hero-title">
                Bärgning & <span className="title-accent">Biltransport</span>
              </h1>
              <p className="services-page__lead">
                Ett haveri kommer sällan lägligt. Vi erbjuder lokal bärgningshjälp, starthjälp och säker biltransport direkt till vår verkstad i Gävle — så att vi snabbt kan påbörja felsökning och reparation.
              </p>
              <div className="services-page__hero-actions">
                <a
                  href="tel:0705533395"
                  className="services-page__btn services-page__btn--primary"
                >
                  <PhoneIcon className="services-page__btn-icon" />
                  <span>Ring för bärgning: 070-553 33 95</span>
                </a>
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--outline"
                >
                  Boka verkstadstid
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section (Bärgning card only) */}
        <section className="services-page__categories" aria-labelledby="services-categories-title">
          <div className="container">
            <header className="section-header">
              <div className="section-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Akuthjälp & Transport
              </div>
              <h2 className="section-title" id="services-categories-title">
                Bärgning till <span className="title-accent">Verkstaden</span>
              </h2>
              <p className="section-desc">
                Här hittar du detaljerad information om hur vi hjälper dig vid motorstopp, haveri eller transportbehov.
              </p>
            </header>

            <div className="services-page__category-list">
              {serviceCategories.map((cat, index) => (
                <article
                  className="services-category-card"
                  id={cat.id}
                  key={cat.id}
                  aria-labelledby={`${cat.id}-title`}
                >
                  <div className="services-category-card__media">
                    <img
                      src={cat.image}
                      alt={cat.imageAlt}
                      className="services-category-card__img"
                      loading="lazy"
                    />
                    <div className="services-category-card__badge" aria-hidden="true">
                      {cat.icon}
                    </div>
                    <span className="services-category-card__badge-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="services-category-card__content">
                    <div className="services-category-card__header">
                      <h3 className="services-category-card__title" id={`${cat.id}-title`}>
                        {cat.title}
                      </h3>
                      <p className="services-category-card__subtitle">
                        {cat.subtitle}
                      </p>
                      <p className="services-category-card__desc">
                        {cat.description}
                      </p>
                    </div>

                    <div className="services-category-card__details">
                      {/* What we do */}
                      <div className="services-category-card__col">
                        <h4 className="services-category-card__subheading">
                          Det här ingår & utförs:
                        </h4>
                        <ul className="services-category-card__items">
                          {cat.items.map(item => (
                            <li key={item}>
                              <CheckIcon className="services-category-card__check" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common symptoms */}
                      <div className="services-category-card__col">
                        <h4 className="services-category-card__subheading">
                          Vanliga tecken på att du behöver hjälp:
                        </h4>
                        <ul className="services-category-card__symptoms">
                          {cat.troubleshooting.map(symptom => (
                            <li key={symptom}>
                              <span className="services-category-card__bullet" aria-hidden="true">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="services-category-card__actions">
                      <a
                        href="tel:0705533395"
                        className="services-category-card__cta"
                        aria-label={`Ring för ${cat.title}`}
                      >
                        <span>Ring 070-553 33 95</span>
                        <span className="services-category-card__arrow-badge" aria-hidden="true">
                          <PhoneIcon className="services-category-card__phone-icon" />
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={openModal}
                        className="services-category-card__call-link"
                      >
                        Boka tid direkt i verkstaden
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Card ("Så fungerar det") - MOVED TO BOTTOM */}
        <section className="services-page__process-section" aria-labelledby="services-process-title">
          <div className="container">
            <div className="services-page__process-card">
              <div className="services-page__process-inner">
                <div className="services-page__process-text">
                  <div className="section-eyebrow section-eyebrow--dark">
                    <span className="eyebrow-line" aria-hidden="true" />
                    Så fungerar bärgningen
                  </div>
                  <h2 className="services-page__process-heading" id="services-process-title">
                    Från vägkant <br />
                    <span className="title-accent">till färdig reparation</span>
                  </h2>
                  <p className="services-page__process-desc">
                    När bilen har bärgats till vår verkstad i Brynäs påbörjar vi felsökningen och kontaktar dig med ett kostnadsförslag innan vi reparerar.
                  </p>
                  <div className="services-page__process-action">
                    <a href="tel:0705533395" className="services-page__process-cta">
                      <PhoneIcon className="services-page__process-icon" />
                      <span>Ring oss: 070-553 33 95</span>
                    </a>
                  </div>
                </div>

                <div className="services-page__process-steps">
                  <div className="services-page__steps-list">
                    {processSteps.map(step => (
                      <div className="services-page__step" key={step.num}>
                        <div className="services-page__step-num" aria-hidden="true">
                          {step.num}
                        </div>
                        <div className="services-page__step-content">
                          <h3 className="services-page__step-title">{step.title}</h3>
                          <p className="services-page__step-desc">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicles note section */}
        <section className="services-page__cars-note" aria-labelledby="cars-note-title">
          <div className="container">
            <div className="services-page__cars-box">
              <div className="services-page__cars-text">
                <div className="section-eyebrow section-eyebrow--dark">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Kvalitetskontrollerade fordon
                </div>
                <h3 className="services-page__cars-heading" id="cars-note-title">
                  Letar du efter en begagnad bil?
                </h3>
                <p className="services-page__cars-desc">
                  Vi säljer även noggrant genomgångna och besiktigade begagnade bilar i Gävle. Varje bil kontrolleras av våra mekaniker innan försäljning.
                </p>
              </div>
              <div className="services-page__cars-action">
                <a href="/bilar-till-salu" className="services-page__cars-btn">
                  <span>Se bilar till salu</span>
                  <ArrowRightIcon className="services-page__cars-arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance section */}
        <section className="services-page__reassurance" aria-labelledby="reassurance-title">
          <div className="container">
            <div className="services-page__reassurance-card">
              <div className="services-page__reassurance-header">
                <div className="services-page__reassurance-icon" aria-hidden="true">
                  <ShieldHeartIcon />
                </div>
                <div>
                  <h3 className="services-page__reassurance-title" id="reassurance-title">
                    Säker transport och tryggt omhändertagande
                  </h3>
                  <p className="services-page__reassurance-desc">
                    När din bil anländer till Brynäs Bilservice hamnar den i goda händer hos lokala mekaniker. Vi kontaktar dig så fort bilen är uppkopplad för diagnos.
                  </p>
                </div>
              </div>
              <div className="services-page__reassurance-actions">
                <a
                  href="tel:0705533395"
                  className="services-page__btn services-page__btn--primary"
                >
                  Ring: 070-553 33 95
                </a>
                <button
                  type="button"
                  onClick={openModal}
                  className="services-page__btn services-page__btn--outline"
                >
                  Boka verkstadstid
                </button>
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
