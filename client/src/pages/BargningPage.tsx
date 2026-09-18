import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { TruckIcon } from '../components/icons/TruckIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'

import imgTowTruckJpg from '../assets/images/services/towing/tow-truck-at-workshop.jpg'
import imgTowTruckWebp from '../assets/images/services/towing/tow-truck-at-workshop.webp'
import imgWorkshopLiftJpg from '../assets/images/gallery/workshop/workshop-car-on-lift.jpg'
import imgWorkshopLiftWebp from '../assets/images/gallery/workshop/workshop-car-on-lift.webp'
import imgPeugeotFrontWebp from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile.webp'
import imgPeugeotFrontJpg from '../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile.jpg'
import imgSunsetRoadWebp from '../assets/images/home/landing-v2/landing-sundown-hero.webp'
import imgSunsetRoadJpg from '../assets/images/home/landing-v2/landing-sundown-hero.jpg'

import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import './BargningPage.css'

function SparkleDirectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function GarageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function CarBatteryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M6 7V4h4v3M14 7V4h4v3" />
      <line x1="6" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="18" y2="12" />
      <line x1="17" y1="11" x2="17" y2="13" />
    </svg>
  )
}

function RoadWayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19L9 5" />
      <path d="M20 19l-5-14" />
      <line x1="12" y1="8" x2="12" y2="10" strokeDasharray="2 2" />
      <line x1="12" y1="14" x2="12" y2="16" strokeDasharray="2 2" />
    </svg>
  )
}

function FlowArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function BargningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} />

      <main className="bargning-page" id="main-content">
        {/* =========================================================
            1. HERO SECTION
            ========================================================= */}
        <section className="bargning-page__hero" aria-labelledby="bargning-hero-title">
          <div className="bb-wrap">
            <div className="bargning-page__hero-content">
              <p className="bb-eyebrow bb-eyebrow--dark bargning-page__hero-eyebrow">
                Bärgning i Gävle med omnejd
              </p>
              <h1 className="bb-h1 bargning-page__hero-title" id="bargning-hero-title">
                Bärgning &amp; <span className="bb-accent">Biltransport</span>
              </h1>
              <p className="bb-lead--dark bargning-page__hero-lead">
                Ett haveri kommer sällan lägligt. Vi erbjuder lokal bärgningshjälp, starthjälp och säker biltransport direkt till vår verkstad i Gävle — så att vi snabbt kan påbörja felsökning och reparation.
              </p>
              <div className="bargning-page__hero-actions">
                <a
                  href="tel:0705533395"
                  className="bb-btn bb-btn--teal bargning-page__hero-phone-btn"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Ring för bärgning: 070-553 33 95</span>
                </a>
                <button
                  type="button"
                  onClick={openModal}
                  className="bb-btn bb-btn--ember bargning-page__hero-book-btn"
                >
                  <span>Boka verkstadstid</span>
                </button>
              </div>

              <div className="bargning-page__hero-trust-row" aria-label="Fördelar med vår bärgning">
                <div className="bargning-page__hero-trust-item">
                  <div className="bargning-page__hero-trust-icon" aria-hidden="true">
                    <ShieldIcon />
                  </div>
                  <span>Trygg och säker transport</span>
                </div>

                <div className="bargning-page__hero-trust-item">
                  <div className="bargning-page__hero-trust-icon" aria-hidden="true">
                    <ClockIcon />
                  </div>
                  <span>Lokal bärgning i Gävle med omnejd</span>
                </div>

                <div className="bargning-page__hero-trust-item">
                  <div className="bargning-page__hero-trust-icon" aria-hidden="true">
                    <SparkleDirectIcon />
                  </div>
                  <span>Direkt till vår verkstad</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. QUICK 3-STEP ACTION BAR
            ========================================================= */}
        <section className="bargning-page__quick-steps" aria-labelledby="quick-steps-title">
          <div className="bb-wrap">
            <div className="bargning-page__quick-steps-header">
              <h2 className="bb-h2 bargning-page__quick-steps-title" id="quick-steps-title">
                Snabb hjälp när du behöver det
              </h2>
              <p className="bb-lead bargning-page__quick-steps-subtitle">
                Så enkelt är det att få bärgning eller transport till vår verkstad.
              </p>
            </div>

            <div className="bargning-page__quick-steps-grid">
              <div className="bargning-page__quick-step-card">
                <div className="bargning-page__quick-step-icon-wrap">
                  <span className="bargning-page__quick-step-badge">01</span>
                  <div className="bargning-page__quick-step-icon" aria-hidden="true">
                    <PhoneIcon />
                  </div>
                </div>
                <h3 className="bargning-page__quick-step-heading">Ring oss</h3>
                <p className="bargning-page__quick-step-desc">
                  Berätta var bilen står och vad som har hänt.
                </p>
              </div>

              <div className="bargning-page__quick-step-arrow" aria-hidden="true">
                <FlowArrowIcon />
              </div>

              <div className="bargning-page__quick-step-card">
                <div className="bargning-page__quick-step-icon-wrap">
                  <span className="bargning-page__quick-step-badge">02</span>
                  <div className="bargning-page__quick-step-icon" aria-hidden="true">
                    <TruckIcon />
                  </div>
                </div>
                <h3 className="bargning-page__quick-step-heading">Bärgning / Starthjälp</h3>
                <p className="bargning-page__quick-step-desc">
                  Vi kommer till dig och hjälper dig på plats.
                </p>
              </div>

              <div className="bargning-page__quick-step-arrow" aria-hidden="true">
                <FlowArrowIcon />
              </div>

              <div className="bargning-page__quick-step-card">
                <div className="bargning-page__quick-step-icon-wrap">
                  <span className="bargning-page__quick-step-badge">03</span>
                  <div className="bargning-page__quick-step-icon" aria-hidden="true">
                    <GarageIcon />
                  </div>
                </div>
                <h3 className="bargning-page__quick-step-heading">Transport till verkstaden</h3>
                <p className="bargning-page__quick-step-desc">
                  Vi transporterar bilen säkert till vår verkstad i Gävle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. MAIN SHOWCASE SPLIT CARD
            ========================================================= */}
        <section className="bargning-page__showcase" aria-labelledby="showcase-title">
          <div className="bb-wrap">
            <div className="bargning-page__showcase-card">
              <div className="bargning-page__showcase-media">
                <picture>
                  <source srcSet={imgTowTruckWebp} type="image/webp" />
                  <img
                    src={imgTowTruckJpg}
                    alt="Brynäs Bilservice Iveco bärgningsbil parkerad vid verkstaden"
                    className="bargning-page__showcase-img"
                    loading="lazy"
                    width={580}
                    height={460}
                  />
                </picture>
                <div className="bargning-page__showcase-location-badge">
                  <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lokal bärgning i Gävle med omnejd</span>
                </div>
              </div>

              <div className="bargning-page__showcase-content">
                <h3 className="bb-h2 bargning-page__showcase-title" id="showcase-title">
                  Bärgning &amp; Biltransport
                </h3>
                <div className="bargning-page__showcase-pill">
                  Lokal bärgningshjälp och säker fordonstransport i Gävle med omnejd
                </div>
                <p className="bargning-page__showcase-lead">
                  Ett haveri kommer sällan lägligt. Oavsett om bilen har stannat på vägen, inte startar på uppfarten eller är för skadad för att köras säkert, hjälper vi dig med bärgning och transport direkt till verkstaden i Gävle — så att felsökningen kan komma igång så fort bilen är hos oss.
                </p>

                <div className="bargning-page__showcase-lists">
                  <div className="bargning-page__showcase-list-col">
                    <h4 className="bargning-page__showcase-list-title">Det här ingår &amp; utförs:</h4>
                    <ul className="bargning-page__feature-list">
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Bärgning vid motorstopp och haveri</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Biltransport till verkstaden i Gävle</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Starthjälp och assistans på plats</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Snabb intagning för felsökning</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bargning-page__showcase-list-col">
                    <h4 className="bargning-page__showcase-list-title">Vanliga tecken på att du behöver hjälp:</h4>
                    <ul className="bargning-page__feature-list">
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Bilen startar inte hemma på uppfarten eller arbetsplatsen</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Haveri, punktering eller överhettning under färd</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Bilen kan inte framföras på ett säkert eller lagligt sätt</span>
                      </li>
                      <li>
                        <span className="bargning-page__check-icon" aria-hidden="true"><CheckIcon /></span>
                        <span>Behov av transport från annan plats till vår verkstad</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bargning-page__showcase-actions">
                  <a
                    href="tel:0705533395"
                    className="bb-btn bb-btn--teal bargning-page__showcase-phone-btn"
                  >
                    <span>Ring 070-553 33 95</span>
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={openModal}
                    className="bargning-page__showcase-book-link"
                  >
                    <span>Boka tid direkt i verkstaden</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. TOWING SCENARIOS GRID
            ========================================================= */}
        <section className="bargning-page__scenarios" aria-labelledby="scenarios-title">
          <div className="bb-wrap">
            <div className="bargning-page__scenarios-header">
              <h2 className="bb-h2 bargning-page__scenarios-title" id="scenarios-title">
                När behöver du bärgning?
              </h2>
              <p className="bb-lead bargning-page__scenarios-subtitle">
                Här är några vanliga situationer där vi hjälper dig.
              </p>
            </div>

            <div className="bargning-page__scenarios-grid">
              {/* Card 1: Bilen startar inte */}
              <article className="bargning-page__scenario-card bargning-page__scenario-card--light">
                <div className="bargning-page__scenario-icon bargning-page__scenario-icon--amber" aria-hidden="true">
                  <CarBatteryIcon />
                </div>
                <h3 className="bargning-page__scenario-heading">Bilen startar inte</h3>
                <p className="bargning-page__scenario-desc">
                  Vi hjälper dig vid motorstopp – både hemma, på uppfarten och på arbetsplatsen.
                </p>
              </article>

              {/* Card 2: Haveri, punktering eller överhettning */}
              <article className="bargning-page__scenario-card bargning-page__scenario-card--teal-gradient">
                <div className="bargning-page__scenario-icon bargning-page__scenario-icon--amber" aria-hidden="true">
                  <AlertTriangleIcon />
                </div>
                <h3 className="bargning-page__scenario-heading">Haveri, punktering eller överhettning</h3>
                <p className="bargning-page__scenario-desc">
                  Vi bärgar din bil om den inte kan köras vidare på ett säkert eller lagligt sätt.
                </p>
              </article>

              {/* Card 3: Kan inte framföras säkert eller lagligt */}
              <article className="bargning-page__scenario-card bargning-page__scenario-card--dark">
                <div className="bargning-page__scenario-icon bargning-page__scenario-icon--amber" aria-hidden="true">
                  <RoadWayIcon />
                </div>
                <h3 className="bargning-page__scenario-heading">Kan inte framföras säkert eller lagligt</h3>
                <p className="bargning-page__scenario-desc">
                  Vi transporterar bilen till vår verkstad i Gävle för felsökning och kostnadsförslag.
                </p>
              </article>

              {/* Card 4: Transport till verkstaden */}
              <article className="bargning-page__scenario-card bargning-page__scenario-card--photo">
                <picture className="bargning-page__scenario-photo">
                  <source srcSet={imgSunsetRoadWebp} type="image/webp" />
                  <img
                    src={imgSunsetRoadJpg}
                    alt="Biltransport på väg mot verkstaden"
                    className="bargning-page__scenario-photo-img"
                    loading="lazy"
                  />
                </picture>
                <div className="bargning-page__scenario-photo-content">
                  <div className="bargning-page__scenario-icon bargning-page__scenario-icon--amber" aria-hidden="true">
                    <MapPinIcon />
                  </div>
                  <h3 className="bargning-page__scenario-heading">Transport till verkstaden</h3>
                  <p className="bargning-page__scenario-desc">
                    Behöver du transport från annan plats? Vi ordnar säker biltransport direkt till oss.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. STEP-BY-STEP WORKSHOP PROTOCOL
            ========================================================= */}
        <section className="bargning-page__process" aria-labelledby="process-title">
          <div className="bb-wrap">
            <div className="bargning-page__process-header">
              <p className="bb-eyebrow bb-eyebrow--dark">
                Från vägkant till färdig reparation
              </p>
              <h2 className="bb-h2 bargning-page__process-title" id="process-title">
                Från vägkant till färdig reparation
              </h2>
              <p className="bb-lead--dark bargning-page__process-subtitle">
                Vi tar hand om hela processen och ser till att din bil kommer till rätt plats.
              </p>
            </div>

            <div className="bargning-page__process-flow">
              <div className="bargning-page__process-card">
                <div className="bargning-page__process-card-top">
                  <span className="bargning-page__process-step-num">01</span>
                  <div className="bargning-page__process-icon" aria-hidden="true">
                    <PhoneIcon />
                  </div>
                </div>
                <h3 className="bargning-page__process-step-title">Kontakta oss vid haveri</h3>
                <p className="bargning-page__process-step-desc">
                  Ring 070-553 33 95 och berätta var bilen står och vad som har hänt.
                </p>
              </div>

              <div className="bargning-page__process-connector" aria-hidden="true">
                <FlowArrowIcon />
              </div>

              <div className="bargning-page__process-card">
                <div className="bargning-page__process-card-top">
                  <span className="bargning-page__process-step-num">02</span>
                  <div className="bargning-page__process-icon" aria-hidden="true">
                    <TruckIcon />
                  </div>
                </div>
                <h3 className="bargning-page__process-step-title">Bärgning &amp; transport</h3>
                <p className="bargning-page__process-step-desc">
                  Vi ordnar bärgning eller starthjälp och transporterar bilen säkert till verkstaden.
                </p>
              </div>

              <div className="bargning-page__process-connector" aria-hidden="true">
                <FlowArrowIcon />
              </div>

              <div className="bargning-page__process-card">
                <div className="bargning-page__process-card-top">
                  <span className="bargning-page__process-step-num">03</span>
                  <div className="bargning-page__process-icon" aria-hidden="true">
                    <WrenchIcon />
                  </div>
                </div>
                <h3 className="bargning-page__process-step-title">Felsökning &amp; åtgärd</h3>
                <p className="bargning-page__process-step-desc">
                  Bilen tas emot i vår verkstad i Brynäs för direkt diagnos och kostnadsförslag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. WORKSHOP INTAKE & REASSURANCE SECTION
            ========================================================= */}
        <section className="bargning-page__workshop-intake" aria-labelledby="intake-title">
          <div className="bb-wrap">
            <div className="bargning-page__intake-card">
              <div className="bargning-page__intake-media">
                <picture>
                  <source srcSet={imgWorkshopLiftWebp} type="image/webp" />
                  <img
                    src={imgWorkshopLiftJpg}
                    alt="Verkstadshallen med bil på lyft hos Brynäs Bilservice"
                    className="bargning-page__intake-img"
                    loading="lazy"
                    width={420}
                    height={320}
                  />
                </picture>
              </div>

              <div className="bargning-page__intake-copy">
                <p className="bb-eyebrow">
                  Din lokala verkstad
                </p>
                <h2 className="bb-h2 bargning-page__intake-title" id="intake-title">
                  Direkt till vår <span className="bb-accent">verkstad i Gävle</span>
                </h2>
                <p className="bargning-page__intake-text">
                  Vi tar emot din bil direkt när den har bärgats till vår verkstad. Här kan vi snabbt påbörja felsökning och ge dig ett tydligt kostnadsförslag innan reparation. Hos oss får du personlig service av erfarna mekaniker – oavsett vilka problem som har gjort att din bil inte kunde köras vidare.
                </p>
                <div className="bargning-page__intake-action">
                  <Link to="/om-oss" className="bb-btn bb-btn--teal">
                    <span>Läs mer om oss</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bargning-page__intake-facts">
                <div className="bargning-page__fact-item">
                  <div className="bargning-page__fact-icon" aria-hidden="true">
                    <MapPinIcon />
                  </div>
                  <div>
                    <span className="bargning-page__fact-label">Verkstad:</span>
                    <a
                      href="https://maps.google.com/?q=Utmarksv%C3%A4gen+21B,+802+91+G%C3%A4vle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bargning-page__fact-link"
                    >
                      Utmarksvägen 21B, 802 91 Gävle
                    </a>
                  </div>
                </div>

                <div className="bargning-page__fact-item">
                  <div className="bargning-page__fact-icon" aria-hidden="true">
                    <PhoneIcon />
                  </div>
                  <div>
                    <span className="bargning-page__fact-label">Telefon:</span>
                    <a href="tel:0705533395" className="bargning-page__fact-link">
                      070-553 33 95
                    </a>
                  </div>
                </div>

                <div className="bargning-page__fact-item">
                  <div className="bargning-page__fact-icon" aria-hidden="true">
                    <ShieldIcon />
                  </div>
                  <div>
                    <span className="bargning-page__fact-label">E-post:</span>
                    <a href="mailto:info@brynasbilservice.se" className="bargning-page__fact-link">
                      info@brynasbilservice.se
                    </a>
                  </div>
                </div>

                <div className="bargning-page__fact-item">
                  <div className="bargning-page__fact-icon" aria-hidden="true">
                    <ClockIcon />
                  </div>
                  <div>
                    <span className="bargning-page__fact-label">Öppettider:</span>
                    <p className="bargning-page__fact-hours">
                      Mån–Fre: 08:00 – 17:00<br />
                      Lördag: Förfrågan<br />
                      Söndag: Stängt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            7. USED CARS CROSS-SELL BANNER
            ========================================================= */}
        <section className="bargning-page__cars-banner" aria-labelledby="used-cars-title">
          <div className="bb-wrap">
            <div className="bargning-page__cars-card">
              <div className="bargning-page__cars-copy">
                <h3 className="bargning-page__cars-title" id="used-cars-title">
                  Letar du efter en begagnad bil?
                </h3>
                <p className="bargning-page__cars-desc">
                  Vi säljer även noggrant genomgångna och besiktigade begagnade bilar i Gävle. Varje bil kontrolleras av våra mekaniker innan försäljning.
                </p>
                <Link to="/bilar-till-salu" className="bb-btn bb-btn--teal bargning-page__cars-btn">
                  <span>Se bilar till salu</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              <div className="bargning-page__cars-media" aria-hidden="true">
                <picture>
                  <source srcSet={imgPeugeotFrontWebp} type="image/webp" />
                  <img
                    src={imgPeugeotFrontJpg}
                    alt=""
                    className="bargning-page__cars-img"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            8. CLOSING EMERGENCY CTA BANNER
            ========================================================= */}
        <section className="bargning-page__cta" aria-labelledby="cta-title">
          <div className="bb-wrap">
            <div className="bargning-page__cta-card">
              <p className="bb-eyebrow bb-eyebrow--dark bargning-page__cta-eyebrow">
                Vi hjälper dig vid haveri
              </p>
              <h2 className="bb-h2 bargning-page__cta-title" id="cta-title">
                Behöver du bärgning?
              </h2>
              <p className="bb-lead--dark bargning-page__cta-desc">
                Ring oss direkt så hjälper vi dig att få bilen till vår verkstad.
              </p>
              <div className="bargning-page__cta-actions">
                <a
                  href="tel:0705533395"
                  className="bb-btn bb-btn--teal bargning-page__cta-phone-btn"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Ring för bärgning: 070-553 33 95</span>
                </a>
                <button
                  type="button"
                  onClick={openModal}
                  className="bb-btn bb-btn--ember bargning-page__cta-book-btn"
                >
                  <span>Boka verkstadstid</span>
                </button>
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
