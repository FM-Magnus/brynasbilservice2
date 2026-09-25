import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useBookingModal } from '../../hooks/useBookingModal'
import { PublicHeader } from '../../components/layout/PublicHeader'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { ArrowRightIcon } from '../../components/icons/ArrowRightIcon'
import { CalendarIcon } from '../../components/icons/CalendarIcon'
import { CheckIcon } from '../../components/icons/CheckIcon'
import { MapPinIcon } from '../../components/icons/MapPinIcon'
import { MonitorIcon } from '../../components/icons/MonitorIcon'
import { PhoneIcon } from '../../components/icons/PhoneIcon'
import { WrenchIcon } from '../../components/icons/WrenchIcon'
import { GaugeIcon } from '../../components/icons/GaugeIcon'
import { WavesIcon } from '../../components/icons/WavesIcon'
import heroWebp from '../../assets/images/home/landing-v2/landing-sunset-road-hero.webp'
import heroJpg from '../../assets/images/home/landing-v2/landing-sunset-road-hero.jpg'
import heroFamilyWebp from '../../assets/images/home/landing-v2/landing-family-windscreen-hero.webp'
import heroFamilyJpg from '../../assets/images/home/landing-v2/landing-family-windscreen-hero.jpg'
import { GalleryDockStrip } from '../../components/ui/GalleryDockStrip'
import { GoogleReviewsCard } from '../../components/ui/GoogleReviewsCard'
import { ContactFormCard } from '../../components/ui/ContactFormCard'
import whyReassuranceWebp from '../../assets/images/home/landing-v2/landing-why-reassurance-handshake-v2.webp'
import customerInteractionWebp from '../../assets/images/home/landing-v2/landing-customer-interaction-background.webp'
import customerInteractionJpg from '../../assets/images/home/landing-v2/landing-customer-interaction-background.jpg'
import vehicleForSale from '../../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile.webp'
import { BUSINESS } from '../../data/business'
import './LandingPage.css'

type IconName = 'chat' | 'shield' | 'clock' | 'car'

function TireIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.3" />
      <path d="M12 3v5.7m0 6.6V21M3 12h5.7m6.6 0H21M5.64 5.64l4.03 4.03m4.66 4.66 4.03 4.03m0-12.72-4.03 4.03m-4.66 4.66-4.03 4.03" />
    </svg>
  )
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h7l3-5h12l3 5h5v18H9z" />
      <path d="M16 18v-5m14 5v-5M9 24H5v9h4m30-9h4v9h-4M14 36v4m21-4v4" />
      <path d="M17 23h14v8H17zM20 23v-3m8 3v-3" />
      <path d="M19 15h13" />
      <circle cx="20" cy="27" r="1" />
      <circle cx="28" cy="27" r="1" />
    </svg>
  )
}

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  const paths: Record<IconName, ReactNode> = {
    chat: <><path d="M20 11.5a7.8 7.8 0 0 1-8 7.5 8.6 8.6 0 0 1-3.5-.7L4 20l1.3-3.6A7.3 7.3 0 0 1 4 12a7.8 7.8 0 0 1 8-7.5 7.8 7.8 0 0 1 8 7Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.4-8 10-4.5-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    car: <><path d="m5 17-1 3M19 17l1 3M3 13l2.4-6.1A2 2 0 0 1 7.2 5.5h9.6a2 2 0 0 1 1.8 1.4L21 13v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" /><path d="M3 13h18M7 16h.01M17 16h.01" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const services = [
  { number: '01', title: 'Bilservice & underhåll', desc: 'Regelbunden service, olja, filter och viktiga slitdelar i bilens serviceplan.', to: '/service-reparationer#bilservice', icon: <WrenchIcon /> },
  { number: '02', title: 'Däckservice', desc: 'Däckskifte, balansering, hjulinställning och däckhotell.', to: '/dackservice', icon: <TireIcon /> },
  { number: '03', title: 'AC-service', desc: 'Felsökning, provtryckning och påfyllning för god kupékomfort.', to: '/ac-service', icon: <WavesIcon /> },
  { number: '04', title: 'Felsökning & diagnostik', desc: 'Felkodsläsning och analys av modern fordonselektronik.', to: '/felsokning', icon: <GaugeIcon /> },
  { number: '05', title: 'Reparationer & större arbeten', desc: 'Större arbeten som motor- och topplocksbyten.', to: '/service-reparationer', icon: <EngineIcon /> },
]
const process = [['01', 'Bokning och inlämning', 'Du bokar en tid som passar din bil.'], ['02', 'Initial kontroll', 'Vi gör en första bedömning av behovet.'], ['03', 'Service enligt checklista', 'Arbetet följer den servicenivå som är aktuell.'], ['04', 'Godkännande vid extraarbete', 'Vi kontaktar dig innan vi går vidare.'], ['05', 'Slutkontroll och rapport', 'Du får en genomgång när bilen är klar.']]

const processIcons: Record<string, ReactNode> = {
  '01': <CalendarIcon />,
  '02': <MonitorIcon />,
  '03': <WrenchIcon />,
  '04': <Icon name="car" />,
  '05': <CheckIcon />,
}

const heroSlides = [
  { webp: heroWebp, jpg: heroJpg, alt: 'Bil på väg mot solnedgången' },
  { webp: heroFamilyWebp, jpg: heroFamilyJpg, alt: 'En mamma kör bil med sitt barn i baksätet' },
]
const HERO_SLIDE_INTERVAL_MS = 7000

function useHeroSlideshow(slideCount: number) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slideCount < 2) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let intervalId: ReturnType<typeof setInterval> | undefined
    const start = () => {
      intervalId = setInterval(() => {
        setActiveSlide(i => (i + 1) % slideCount)
      }, HERO_SLIDE_INTERVAL_MS)
    }
    const stop = () => {
      if (intervalId) clearInterval(intervalId)
    }
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [slideCount])

  return activeSlide
}

export default function LandingPage() {
  const { openBooking, bookingModal } = useBookingModal()
  const activeHeroSlide = useHeroSlideshow(heroSlides.length)
  return (
    <main className="landing-v2">
      <section className="bb-hero" aria-labelledby="landing-v2-hero-title">
        <div className="bb-hero__media" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <picture key={slide.jpg} className={`landing-v2__hero-slide${i === activeHeroSlide ? ' is-active' : ''}`}>
              <source srcSet={slide.webp} type="image/webp" />
              <img src={slide.jpg} alt="" />
            </picture>
          ))}
        </div>
        <div className="bb-hero__shade" aria-hidden="true" />
        <PublicHeader onBookingClick={openBooking} variant="overlay" />
        <div className="bb-wrap bb-hero__content">
          <div className="bb-hero__copy">
            <p className="bb-eyebrow bb-eyebrow--dark">Din lokala bilverkstad i Gävle</p>
            <h1 id="landing-v2-hero-title" className="bb-h1">
              <span>Din bil</span>
              <span className="bb-accent">förtjänar</span>
              <span>det bästa</span>
            </h1>
            <p>
              Brynäs Bilservice är din lokala, oberoende verkstad i Gävle. Vi utför all typ av service och reparation – för alla bilmärken, till konkurrenskraftiga priser.
            </p>
            <div className="bb-hero__actions">
              <button className="bb-btn bb-btn--teal" type="button" onClick={openBooking}>
                <CalendarIcon />
                Boka tid
              </button>
              <a className="bb-btn bb-btn--ember" href={BUSINESS.phone.href}>
                <PhoneIcon />
                Ring oss nu
              </a>
            </div>
          </div>
          <div className="bb-hero__bottom">
            <div className="bb-trust-row">
              <div className="bb-trust-row__item">
                <i className="bb-icon-bare"><Icon name="shield" /></i>
                <span className="bb-trust-row__text"><b>Personlig service</b><small>Du och din bil i fokus.</small></span>
              </div>
              <div className="bb-trust-row__item">
                <i className="bb-icon-bare"><WrenchIcon /></i>
                <span className="bb-trust-row__text"><b>Erfarna mekaniker</b><small>Mångårig erfarenhet.</small></span>
              </div>
              <div className="bb-trust-row__item">
                <i className="bb-icon-bare"><Icon name="clock" /></i>
                <span className="bb-trust-row__text"><b>Tryggt och enkelt</b><small>Från bokning till färdig bil.</small></span>
              </div>
            </div>
            <GoogleReviewsCard variant="hero-overlay" />
          </div>
        </div>
      </section>

      <ContactFormCard variant="full-section" />

      <GalleryDockStrip />

      <section className="landing-v2__why-section" aria-labelledby="landing-v2-why-title">
        <img src={whyReassuranceWebp} alt="Två personer skakar hand i en bilverkstad" loading="lazy" />
        <div className="landing-v2__why-shade" aria-hidden="true" />
        <div className="bb-wrap landing-v2__why-content">
          <div>
            <p className="bb-eyebrow bb-eyebrow--dark">Varför välja Brynäs Bilservice?</p>
            <h2 id="landing-v2-why-title" className="bb-h2">
              Trygg bilservice<br />i <span className="bb-accent">lokala Gävle</span>
            </h2>
            <p className="bb-lead--dark">
              Vi kombinerar erfarenhet, noggrannhet och ett personligt bemötande – oavsett om det gäller en enkel service eller en mer omfattande reparation.
            </p>
            <Link className="bb-btn bb-btn--teal" to="/om-oss">
              Läs mer om oss <ArrowRightIcon />
            </Link>
          </div>
          <ul className="bb-card--glass">
            <li>
              <i className="bb-icon-badge"><Icon name="chat" /></i>
              <span><b>Tydlig kommunikation</b><small>Vi håller dig uppdaterad genom hela processen.</small></span>
            </li>
            <li>
              <i className="bb-icon-badge"><Icon name="shield" /></i>
              <span><b>Omsorg om din bil</b><small>Vi arbetar noggrant och med rätt kunskap.</small></span>
            </li>
            <li>
              <i className="bb-icon-badge"><WrenchIcon /></i>
              <span><b>Personlig service</b><small>Du och din bil är alltid i fokus.</small></span>
            </li>
            <li>
              <i className="bb-icon-badge"><MapPinIcon /></i>
              <span><b>Lokal verkstad</b><small>Nära dig i Brynäs, Gävle.</small></span>
            </li>
          </ul>
        </div>
      </section>

      <section className="landing-v2__services-section" aria-label="Våra tjänster">
        <div className="landing-v2__services-layout">
          <div className="landing-v2__service-graphic">
            <ol className="landing-v2__service-grid">
              {services.map(service => (
                <li key={service.number}>
                  <Link to={service.to} className="landing-v2__service-point">
                    <span className="landing-v2__service-point-icon">{service.icon}</span>
                    <span className="landing-v2__service-point-number">{service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <p className="bb-wrap landing-v2__services-intro bb-lead">
            Vi hjälper dig med regelbunden bilservice, däckservice, AC-service och reparationer. Vi utför även avancerad diagnostik och större arbeten som motor- och topplocksbyten. Vi arbetar med alla bilmärken.
          </p>
        </div>
      </section>

      <section className="landing-v2__process-section" aria-labelledby="landing-v2-process-title">
        <picture aria-hidden="true">
          <source srcSet={customerInteractionWebp} type="image/webp" />
          <img src={customerInteractionJpg} alt="" />
        </picture>
        <div className="landing-v2__process-shade" aria-hidden="true" />
        <div className="bb-wrap landing-v2__process-content">
          <div>
            <p className="bb-eyebrow bb-eyebrow--dark">Så går det till</p>
            <h2 id="landing-v2-process-title" className="bb-h2">
              Så går det till<br /><span className="bb-accent">hos oss</span>
            </h2>
            <p className="bb-lead--dark">
              Att förstå processen gör det enklare att veta vad som händer med bilen och varför en service ibland behöver ta lite tid.
            </p>
          </div>
          <ol className="bb-process-grid">
            {process.map(([number, title, text]) => (
              <li key={number}>
                <b>{number}</b>
                <i className="bb-icon-bare">
                  {processIcons[number]}
                </i>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="landing-v2__about-section" aria-labelledby="landing-v2-about-title">
        <div className="bb-wrap landing-v2__about-grid">
          <div className="landing-v2__about-copy">
            <p className="bb-eyebrow">Om Brynäs Bilservice</p>
            <h2 id="landing-v2-about-title" className="bb-h2">
              Lokal verkstad.<br /><span className="bb-accent">Personlig service.</span>
            </h2>
            <p className="bb-lead">
              Brynäs Bilservice grundades 2021 och är din lokala, oberoende verkstad i Brynäs, Gävle. Vi brinner för bilar och för människorna som kör dem. Hos oss möts du av erfarenhet, noggrannhet och ett personligt bemötande – oavsett om det gäller en enkel service eller en mer omfattande reparation.
            </p>
            <p className="bb-lead">
              Vi servar alla bilmärken. Hittar vi något extra under arbetet kontaktar vi alltid dig först – inga överraskningar på fakturan.
            </p>
            <Link className="bb-btn bb-btn--ember-solid" to="/om-oss">
              Läs mer om oss <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-v2__cars-section" aria-labelledby="landing-v2-cars-title">
        <img src={vehicleForSale} alt="Begagnad bil till salu hos Brynäs Bilservice" />
        <div className="landing-v2__cars-shade" aria-hidden="true" />
        <div className="bb-wrap landing-v2__cars-content">
          <div>
            <p className="bb-eyebrow bb-eyebrow--dark">Kvalitetskontrollerade fordon</p>
            <h2 id="landing-v2-cars-title" className="bb-h2">
              Letar du efter en <span className="bb-accent">begagnad bil?</span>
            </h2>
            <p className="bb-lead--dark">
              Vi säljer även noggrant genomgångna och besiktigade begagnade bilar i Gävle. Varje bil kontrolleras av våra mekaniker innan försäljning.
            </p>
            <Link className="bb-btn bb-btn--teal" to="/bilar-till-salu">
              Se bilar till salu <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter onBookingClick={openBooking} />
      {bookingModal}
    </main>
  )
}
