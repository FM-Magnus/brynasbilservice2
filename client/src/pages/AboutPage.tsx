import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { UsersIcon } from '../components/icons/UsersIcon'
import { ChatDotsIcon } from '../components/icons/ChatDotsIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'

import imgMaherBenchWebp from '../assets/images/about/maher-workshop-bench.webp'
import imgMaherBenchJpg from '../assets/images/about/maher-workshop-bench.jpg'

import gallery1Webp from '../assets/images/archive/gallery-legacy/workshop-exterior.webp'
import gallery1Jpg from '../assets/images/archive/gallery-legacy/workshop-exterior.jpg'
import gallery2Webp from '../assets/images/services/tires/tire-wheel-change.webp'
import gallery2Jpg from '../assets/images/services/tires/tire-wheel-change.jpg'
import gallery3Webp from '../assets/images/gallery/workshop/workshop-car-open-hood.webp'
import gallery3Jpg from '../assets/images/gallery/workshop/workshop-car-open-hood.jpg'
import gallery4Webp from '../assets/images/gallery/workshop/workshop-car-on-lift.webp'
import gallery4Jpg from '../assets/images/gallery/workshop/workshop-car-on-lift.jpg'

import { BUSINESS, weekdayHours } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import './AboutPage.css'

function StarBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function StarOutlineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function SearchLensIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CalendarCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ApprovalCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} />

      <main className="omoss-page" id="main-content">
        {/* =========================================================
            1. HERO SECTION
            ========================================================= */}
        <section className="omoss-page__hero" aria-labelledby="omoss-hero-title">
          <div className="bb-wrap">
            <div className="omoss-page__hero-inner">
              <div className="omoss-page__hero-content">
                <p className="bb-eyebrow bb-eyebrow--dark omoss-page__hero-eyebrow">
                  Sedan 2021 i Gävle
                </p>
                <h1 className="bb-h1 omoss-page__hero-title" id="omoss-hero-title">
                  Din lokala och <span className="bb-accent">personliga</span> bilverkstad i Brynäs
                </h1>
                <p className="bb-lead--dark omoss-page__hero-lead">
                  Sedan starten 2021 har vi drivit en oberoende bilverkstad på Utmarksvägen i Gävle med ett enkelt mål: att ge bilägare personlig service, fackmannamässigt utfört arbete och raka besked utan krångel.
                </p>
                <div className="omoss-page__hero-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="bb-btn bb-btn--teal"
                  >
                    <span>Boka tid</span>
                    <ArrowRightIcon />
                  </button>
                  <a
                    href={BUSINESS.phone.href}
                    className="bb-btn bb-btn--ember omoss-page__hero-phone-btn"
                  >
                    <PhoneIcon />
                    <span>Ring {BUSINESS.phone.display}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. TRUST BADGES STRIP
            ========================================================= */}
        <section className="omoss-page__trust-strip-section" aria-label="Trygghetsfaktorer">
          <div className="bb-wrap">
            <div className="omoss-page__trust-strip">
              <div className="omoss-page__trust-item">
                <div className="omoss-page__trust-icon" aria-hidden="true">
                  <ShieldIcon />
                </div>
                <div>
                  <h2 className="omoss-page__trust-title">Personlig service</h2>
                  <p className="omoss-page__trust-desc">Du och din bil i fokus.</p>
                </div>
              </div>

              <div className="omoss-page__trust-item">
                <div className="omoss-page__trust-icon" aria-hidden="true">
                  <StarBadgeIcon />
                </div>
                <div>
                  <h2 className="omoss-page__trust-title">Erfarna mekaniker</h2>
                  <p className="omoss-page__trust-desc">Mångårig erfarenhet.</p>
                </div>
              </div>

              <div className="omoss-page__trust-item">
                <div className="omoss-page__trust-icon" aria-hidden="true">
                  <ClockIcon />
                </div>
                <div>
                  <h2 className="omoss-page__trust-title">Tryggt och enkelt</h2>
                  <p className="omoss-page__trust-desc">Från bokning till färdig bil.</p>
                </div>
              </div>

              <div className="omoss-page__trust-item">
                <div className="omoss-page__trust-icon" aria-hidden="true">
                  <UsersIcon />
                </div>
                <div>
                  <h2 className="omoss-page__trust-title">Oberoende verkstad</h2>
                  <p className="omoss-page__trust-desc">För alla bilmärken.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. WORKSHOP STORY & FACTS
            ========================================================= */}
        <section className="omoss-page__story" aria-labelledby="story-title">
          <div className="bb-wrap">
            <div className="omoss-page__story-grid">
              <div className="omoss-page__story-aside">
                <div className="omoss-page__bench-card">
                  <picture>
                    <source srcSet={imgMaherBenchWebp} type="image/webp" />
                    <img
                      src={imgMaherBenchJpg}
                      alt="Maher Basher vid arbetsbänken i verkstaden"
                      className="omoss-page__bench-img"
                      loading="lazy"
                    />
                  </picture>
                  <div className="omoss-page__bench-badge">
                    Maher Basher | Grundare &amp; mekaniker
                  </div>
                </div>

                <div className="omoss-page__facts-card">
                  <div>
                    <h3 className="omoss-page__facts-title">Företagsfakta &amp; kontakt</h3>
                    <div className="omoss-page__facts-list">
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">Juridiskt namn:</span>
                        <span className="omoss-page__fact-val">Brynäs Bilservice AB</span>
                      </div>
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">Organisationsnr:</span>
                        <span className="omoss-page__fact-val">559343-9307</span>
                      </div>
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">Verksamhetsstart:</span>
                        <span className="omoss-page__fact-val">Grundat 2021</span>
                      </div>
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">Verkstad:</span>
                        <span className="omoss-page__fact-val">
                          <a
                            href={BUSINESS.address.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {BUSINESS.address.full}
                          </a>
                        </span>
                      </div>
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">Telefon:</span>
                        <span className="omoss-page__fact-val">
                          <a href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a>
                        </span>
                      </div>
                      <div className="omoss-page__fact-row">
                        <span className="omoss-page__fact-label">E-post:</span>
                        <span className="omoss-page__fact-val">
                          <a href={BUSINESS.email.href}>{BUSINESS.email.address}</a>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="omoss-page__facts-title">Öppettider</h3>
                    <div className="omoss-page__hours-list">
                      <div className="omoss-page__hours-row">
                        <span className="omoss-page__hours-day">Måndag - Fredag:</span>
                        <span className="omoss-page__hours-time">{weekdayHours({ dash: ' – ', dots: true })}</span>
                      </div>
                      <div className="omoss-page__hours-row">
                        <span className="omoss-page__hours-day">Lördag:</span>
                        <span className="omoss-page__hours-inquiry">{BUSINESS.hours.saturday}</span>
                      </div>
                      <div className="omoss-page__hours-row">
                        <span className="omoss-page__hours-day">Söndag:</span>
                        <span className="omoss-page__hours-closed">{BUSINESS.hours.sunday}</span>
                      </div>
                    </div>
                    <a
                      href={BUSINESS.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="omoss-page__maps-link"
                    >
                      <span>Öppna i Google Maps</span>
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div className="omoss-page__story-text">
                <p className="bb-eyebrow">
                  Om Brynäs Bilservice
                </p>
                <h2 className="bb-h2 omoss-page__story-heading" id="story-title">
                  En fristående verkstad med hjärtat i Gävle
                </h2>
                <p className="omoss-page__story-paragraph">
                  Brynäs Bilservice drivs av Maher Basher, som vuxit upp med bilar och motorer som en livslång passion, gick fordonsprogrammet på gymnasiet och arbetade sedan som mekaniker innan han startade eget. Han drev tidigare en verkstad som gick under smeknamnet Shomaher – ett skämtsamt spel på hans eget namn och F1-föraren Schumacher – och namnet lever kvar än idag.
                </p>
                <p className="omoss-page__story-paragraph">
                  Vi är en oberoende bilverkstad, vilket innebär att vi inte är styrda av någon enskild biltillverkares kedja. Det gör att vi kan ge ärliga och anpassade rekommendationer utifrån vad som är bäst och mest ekonomiskt för just din bil.
                </p>

                <div className="omoss-page__quote-card">
                  <div className="omoss-page__quote-symbol" aria-hidden="true">“</div>
                  <p className="omoss-page__quote-text">
                    Det viktigaste för mig är nöjda kunder som känner sig trygga. Vi förklarar alltid vad som behöver göras och varför – på ett enkelt och tydligt sätt.
                  </p>
                  <div className="omoss-page__quote-author">
                    Maher Basher <span className="omoss-page__quote-role">– Grundare &amp; mekaniker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. CORE PRINCIPLES
            ========================================================= */}
        <section className="omoss-page__principles" aria-labelledby="principles-title">
          <div className="bb-wrap">
            <div className="omoss-page__principles-header">
              <p className="bb-eyebrow">
                Våra principer
              </p>
              <h2 className="bb-h2 omoss-page__principles-title" id="principles-title">
                Därför väljer kunder oss
              </h2>
              <p className="bb-lead omoss-page__principles-intro">
                Vi tror på långsiktiga kundrelationer och gör alltid vårt bästa för att du ska känna dig trygg genom hela processen.
              </p>
            </div>

            <div className="omoss-page__principles-grid">
              <article className="omoss-page__principle-card">
                <div className="omoss-page__principle-icon" aria-hidden="true">
                  <ChatDotsIcon />
                </div>
                <h3 className="omoss-page__principle-title">Tydlig kommunikation</h3>
                <p className="omoss-page__principle-desc">
                  Vi förklarar vad som behöver göras, visar utbytta delar vid önskemål och håller dig uppdaterad genom hela processen.
                </p>
              </article>

              <article className="omoss-page__principle-card">
                <div className="omoss-page__principle-icon" aria-hidden="true">
                  <ShieldHeartIcon />
                </div>
                <h3 className="omoss-page__principle-title">Omsorg om din bil</h3>
                <p className="omoss-page__principle-desc">
                  Vi tar hand om din bil som om det vore vår egen – med noggrannhet, rätt moment och godkända vätskor.
                </p>
              </article>

              <article className="omoss-page__principle-card">
                <div className="omoss-page__principle-icon" aria-hidden="true">
                  <DocumentIcon />
                </div>
                <h3 className="omoss-page__principle-title">Kostnadsförslag före arbete</h3>
                <p className="omoss-page__principle-desc">
                  Du får alltid ett tydligt kostnadsförslag innan vi påbörjar något arbete.
                </p>
              </article>

              <article className="omoss-page__principle-card">
                <div className="omoss-page__principle-icon omoss-page__principle-icon--amber" aria-hidden="true">
                  <StarOutlineIcon />
                </div>
                <h3 className="omoss-page__principle-title">Oberoende rådgivning</h3>
                <p className="omoss-page__principle-desc">
                  Vi är inte bundna till någon tillverkare utan rekommenderar det som är bäst och mest ekonomiskt för just din bil.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. STEP-BY-STEP PROCESS
            ========================================================= */}
        <section className="omoss-page__process" aria-labelledby="process-title">
          <div className="bb-wrap">
            <div className="omoss-page__process-header">
              <p className="bb-eyebrow bb-eyebrow--dark">
                Från inlämning till färdig bil
              </p>
              <h2 className="bb-h2 omoss-page__process-title" id="process-title">
                Så här går det till
              </h2>
              <p className="bb-lead--dark omoss-page__process-subtitle">
                Du ska alltid veta vad som händer med din bil och vad det kommer att kosta.
              </p>
            </div>

            <div className="omoss-page__process-flow">
              <div className="omoss-page__step-card">
                <div className="omoss-page__step-top">
                  <span className="omoss-page__step-number">01</span>
                  <div className="omoss-page__step-icon" aria-hidden="true">
                    <CalendarCheckIcon />
                  </div>
                </div>
                <h3 className="omoss-page__step-title">Du berättar om bilen</h3>
                <p className="omoss-page__step-desc">
                  Du bokar via formuläret eller slår en signal till verkstaden. Berätta vad du upplever för symptom, missljud eller vilken serviceintervall bilen har nått.
                </p>
              </div>

              <div className="omoss-page__step-connector" aria-hidden="true">
                <ArrowRightIcon />
              </div>

              <div className="omoss-page__step-card">
                <div className="omoss-page__step-top">
                  <span className="omoss-page__step-number">02</span>
                  <div className="omoss-page__step-icon" aria-hidden="true">
                    <SearchLensIcon />
                  </div>
                </div>
                <h3 className="omoss-page__step-title">Vi undersöker och återkopplar</h3>
                <p className="omoss-page__step-desc">
                  Vi gör en fackmannamässig undersökning och provkörning. Innan vi gör några åtgärder eller byter slitagedelar får du ett fast och tydligt kostnadsförslag.
                </p>
              </div>

              <div className="omoss-page__step-connector" aria-hidden="true">
                <ArrowRightIcon />
              </div>

              <div className="omoss-page__step-card">
                <div className="omoss-page__step-top">
                  <span className="omoss-page__step-number">03</span>
                  <div className="omoss-page__step-icon" aria-hidden="true">
                    <ApprovalCheckIcon />
                  </div>
                </div>
                <h3 className="omoss-page__step-title">Du godkänner innan vi börjar</h3>
                <p className="omoss-page__step-desc">
                  Inga överraskningar på fakturan. Vi påbörjar arbetet först när du gett ditt godkännande och meddelar så fort bilen är provkörd, kontrollerad och klar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. WORKSHOP GALLERY PREVIEW
            ========================================================= */}
        <section className="omoss-page__gallery-preview" aria-labelledby="gallery-title">
          <div className="bb-wrap">
            <div className="omoss-page__gallery-top">
              <div className="omoss-page__gallery-header">
                <h2 className="bb-h2 omoss-page__gallery-title" id="gallery-title">
                  Bakom garageportarna
                </h2>
                <p className="bb-lead omoss-page__gallery-subtitle">
                  En titt in i vår vardag. Här ser du vår verkstad, utrustning och några glimtar från arbetet vi gör varje dag i Brynäs, Gävle.
                </p>
              </div>
              <Link to="/galleri" className="bb-btn bb-btn--teal">
                <span>Se fler bilder i galleriet</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="omoss-page__gallery-grid">
              <Link to="/galleri" className="omoss-page__gallery-item" aria-label="Visa verkstadsfasaden i bildgalleriet">
                <picture>
                  <source srcSet={gallery1Webp} type="image/webp" />
                  <img
                    src={gallery1Jpg}
                    alt="Verkstadens entré och fasad i Brynäs"
                    className="omoss-page__gallery-img"
                    width={400}
                    height={275}
                  />
                </picture>
              </Link>

              <Link to="/galleri" className="omoss-page__gallery-item" aria-label="Visa däckarbete i bildgalleriet">
                <picture>
                  <source srcSet={gallery2Webp} type="image/webp" />
                  <img
                    src={gallery2Jpg}
                    alt="Mekaniker som arbetar med däck och hjul i verkstaden"
                    className="omoss-page__gallery-img"
                    width={400}
                    height={275}
                  />
                </picture>
              </Link>

              <Link to="/galleri" className="omoss-page__gallery-item" aria-label="Visa motorarbete i bildgalleriet">
                <picture>
                  <source srcSet={gallery3Webp} type="image/webp" />
                  <img
                    src={gallery3Jpg}
                    alt="Arbete under öppen motorhuv på billyft"
                    className="omoss-page__gallery-img"
                    width={400}
                    height={275}
                  />
                </picture>
              </Link>

              <Link to="/galleri" className="omoss-page__gallery-item" aria-label="Visa lyft och fordon i bildgalleriet">
                <picture>
                  <source srcSet={gallery4Webp} type="image/webp" />
                  <img
                    src={gallery4Jpg}
                    alt="Bil på lyft inne i verkstadshallen"
                    className="omoss-page__gallery-img"
                    width={400}
                    height={275}
                  />
                </picture>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            7. CLOSING CTA BANNER
            ========================================================= */}
        <section className="omoss-page__cta" aria-labelledby="cta-title">
          <div className="bb-wrap">
            <div className="omoss-page__cta-card">
              <h2 className="bb-h2 omoss-page__cta-title" id="cta-title">
                Redo att boka service eller reparation?
              </h2>
              <p className="bb-lead--dark omoss-page__cta-desc">
                Har du frågor om din bil eller vill du boka tid? Skicka en förfrågan via formuläret eller ring direkt till verkstaden på Utmarksvägen.
              </p>
              <div className="omoss-page__cta-actions">
                <button
                  type="button"
                  onClick={openModal}
                  className="bb-btn bb-btn--teal"
                >
                  <span>Boka tid nu</span>
                  <ArrowRightIcon />
                </button>
                <Link
                  to="/biltjanster"
                  className="bb-btn omoss-page__cta-secondary-btn"
                >
                  <span>Se alla tjänster</span>
                </Link>
                <a
                  href={BUSINESS.phone.href}
                  className="bb-btn bb-btn--ember omoss-page__cta-phone-btn"
                >
                  <PhoneIcon />
                  <span>Ring: {BUSINESS.phone.display}</span>
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
