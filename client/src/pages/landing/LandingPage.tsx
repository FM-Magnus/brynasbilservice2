import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useBookingModal } from '../../hooks/useBookingModal'
import { useHeroSlideshow } from '../../hooks/useHeroSlideshow'
import { PublicHeader } from '../../components/layout/PublicHeader'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { CalendarIcon } from '../../components/icons/CalendarIcon'
import { CheckIcon } from '../../components/icons/CheckIcon'
import { MapPinIcon } from '../../components/icons/MapPinIcon'
import { MonitorIcon } from '../../components/icons/MonitorIcon'
import { PhoneIcon } from '../../components/icons/PhoneIcon'
import { WrenchIcon } from '../../components/icons/WrenchIcon'
import heroWebp from '../../assets/images/home/landing-v2/landing-happy-customer-key-hero.webp'
import heroJpg from '../../assets/images/home/landing-v2/landing-happy-customer-key-hero.jpg'
import heroToolsWebp from '../../assets/images/home/landing-v2/landing-tool-drawer-hero.webp'
import heroToolsJpg from '../../assets/images/home/landing-v2/landing-tool-drawer-hero.jpg'
import { TrustStrip } from '../../components/ui/TrustStrip'
import { ChatDotsIcon } from '../../components/icons/ChatDotsIcon'
import { ShieldIcon } from '../../components/icons/ShieldIcon'
import { GalleryDockStrip } from '../../components/ui/GalleryDockStrip'
import { GoogleReviewsCard } from '../../components/ui/GoogleReviewsCard'
import { ContactFormCard } from '../../components/ui/ContactFormCard'
import customerInteractionWebp from '../../assets/images/home/landing-v2/landing-customer-interaction-background.webp'
import customerInteractionJpg from '../../assets/images/home/landing-v2/landing-customer-interaction-background.jpg'
import { BUSINESS } from '../../data/business'
import './LandingPage.css'

type IconName = 'chat' | 'shield' | 'clock' | 'car'

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

const trustItems = [
  { icon: ChatDotsIcon, title: 'Tydlig kommunikation', text: 'Vi håller dig uppdaterad genom hela processen.' },
  { icon: ShieldIcon, title: 'Omsorg om din bil', text: 'Vi arbetar noggrant och med rätt kunskap.' },
  { icon: WrenchIcon, title: 'Personlig service', text: 'Du och din bil är alltid i fokus.' },
  { icon: MapPinIcon, title: 'Lokal verkstad', text: 'Nära dig i Brynäs, Gävle.' },
] as const

const services = [
  { number: '01', title: 'Bilservice & underhåll', desc: 'Regelbunden service, olja, filter och viktiga slitdelar i bilens serviceplan.', to: '/service-reparationer#bilservice', icon: 'bilservice' },
  { number: '02', title: 'Däckservice', desc: 'Däckskifte, balansering, hjulinställning och däckhotell.', to: '/dackservice', icon: 'dackservice' },
  { number: '03', title: 'AC-service', desc: 'Felsökning, provtryckning och påfyllning för god kupékomfort.', to: '/ac-service', icon: 'ac' },
  { number: '04', title: 'Felsökning & diagnostik', desc: 'Felkodsläsning och analys av modern fordonselektronik.', to: '/felsokning', icon: 'felsokning' },
  { number: '05', title: 'Reparationer & större arbeten', desc: 'Större arbeten som motor- och topplocksbyten.', to: '/reparationer-storre-arbeten', icon: 'reparationer' },
  { number: '06', title: 'Bärgning', desc: 'Lokal bärgningshjälp och säker biltransport direkt till vår verkstad.', to: '/bargning', icon: 'bargning' },
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
  { webp: heroWebp, jpg: heroJpg, alt: 'Maher lämnar över bilnyckeln till en leende kund i verkstaden' },
  { webp: heroToolsWebp, jpg: heroToolsJpg, alt: 'En öppen verktygslåda med hylsor och spärrskaft i verkstaden' },
]
export default function LandingPage() {
  const { openBooking, bookingModal } = useBookingModal()
  const activeHeroSlide = useHeroSlideshow(heroSlides.length)
  return (
    <main className="landing-v2">
      <section className="bb-hero" aria-labelledby="landing-v2-hero-title">
        <div className="bb-hero__media" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <picture key={slide.jpg} className={`bb-hero__slide${i === activeHeroSlide ? ' is-active' : ''}`}>
              <source srcSet={slide.webp} type="image/webp" />
              <img src={slide.jpg} alt="" />
            </picture>
          ))}
        </div>
        <div className="bb-hero__shade bb-shade-copy-left" aria-hidden="true" />
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
            <GoogleReviewsCard variant="hero-overlay" />          </div>
        </div>
      </section>

      <section className="landing-v2__services-section" aria-label="Våra tjänster">
        <div className="landing-v2__services-layout">
          <div className="landing-v2__service-graphic">
            <ol className="landing-v2__service-grid">
              {services.map(service => (
                <li key={service.number}>
                  <Link to={service.to} className="landing-v2__service-point">
                    <i className={`landing-v2__service-icon landing-v2__service-icon--${service.icon}`} aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContactFormCard variant="full-section" />

      <TrustStrip items={trustItems} />

      <section className="landing-v2__why-section" aria-labelledby="landing-v2-why-title">
        <div className="bb-wrap landing-v2__why-content">
          <div>
            <p className="bb-eyebrow">Om Brynäs Bilservice</p>
            <h2 id="landing-v2-why-title" className="bb-h2">
              Trygg bilservice<br />i <span className="bb-accent">lokala Gävle</span>
            </h2>
            <p className="bb-lead--dark">
              Brynäs Bilservice grundades 2021 och är din lokala, oberoende verkstad i Brynäs, Gävle. Vi brinner för bilar och för människorna som kör dem. Hos oss möts du av erfarenhet, noggrannhet och ett personligt bemötande – oavsett om det gäller en enkel service eller en mer omfattande reparation.
            </p>
            <p className="bb-lead--dark">
              Vi servar alla bilmärken. Hittar vi något extra under arbetet kontaktar vi alltid dig först – inga överraskningar på fakturan.
            </p>
          </div>
        </div>
      </section>

      <GalleryDockStrip />

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

      <PublicFooter onBookingClick={openBooking} />
      {bookingModal}
    </main>
  )
}
