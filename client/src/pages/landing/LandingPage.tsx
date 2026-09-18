import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BookingFormModal } from '../../components/BookingForm'
import { PublicHeader } from '../../components/layout/PublicHeader'
import { PublicFooter } from '../../components/layout/PublicFooter'
import heroWebp from '../../assets/images/home/landing-v2/landing-sundown-hero.webp'
import heroJpg from '../../assets/images/home/landing-v2/landing-sundown-hero.jpg'
import { GalleryTeaserCard } from '../../components/ui/GalleryTeaserCard'
import { GoogleReviewsCard } from '../../components/ui/GoogleReviewsCard'
import { ContactFormCard } from '../../components/ui/ContactFormCard'
import mechanicDiagnostic from '../../assets/images/services/diagnostics/diagnostics-mechanic-laptop-workshop.webp'
import wrenchWorkbench from '../../assets/images/services/general/wrench-and-bolt-workbench.webp'
import tireStorage from '../../assets/images/services/tires/tire-storage-rack.webp'
import acManometers from '../../assets/images/services/ac/ac-manometers-on-engine.jpg'
import vehicleForSale from '../../assets/images/vehicles/peugeot-307-cc/peugeot-307-cc-side-profile.webp'
import './LandingPage.css'

type IconName = 'calendar' | 'phone' | 'mail' | 'pin' | 'arrow' | 'wrench' | 'monitor' | 'wheel' | 'snowflake' | 'chat' | 'shield' | 'clock' | 'send' | 'facebook' | 'car' | 'check'

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  const paths: Record<IconName, ReactNode> = {
    calendar: <><path d="M7 3v3M17 3v3M4 9h16" /><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 13h2M14 13h2M8 17h2M14 17h2" /></>,
    phone: <path d="M21 16.8v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3.1A19 19 0 0 1 4.3 12a19.5 19.5 0 0 1-3.1-8.5A2 2 0 0 1 3.2 1.3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1l-.9.9a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2.1Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 9 5.7a2 2 0 0 0 2 0L22 7" /></>,
    pin: <><path d="M20.5 10c0 6.5-8.5 12-8.5 12S3.5 16.5 3.5 10a8.5 8.5 0 1 1 17 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    wrench: <path d="M14.8 6.2a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 8l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 8-8l-3.8 3.7Z" />,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    wheel: <><circle cx="12" cy="12" r="9.5" /><circle cx="12" cy="12" r="3" /><path d="M12 2.5v6.5M21.5 12H15M12 21.5V15M2.5 12H9" /></>,
    snowflake: <><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1 19.1 4.9" /><path d="m8 2 4 4 4-4M8 22l4-4 4 4M2 8l4 4-4 4M22 8l-4 4 4 4" /></>,
    chat: <><path d="M20 11.5a7.8 7.8 0 0 1-8 7.5 8.6 8.6 0 0 1-3.5-.7L4 20l1.3-3.6A7.3 7.3 0 0 1 4 12a7.8 7.8 0 0 1 8-7.5 7.8 7.8 0 0 1 8 7Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.4-8 10-4.5-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="m22 2-11 11" /></>,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    car: <><path d="m5 17-1 3M19 17l1 3M3 13l2.4-6.1A2 2 0 0 1 7.2 5.5h9.6a2 2 0 0 1 1.8 1.4L21 13v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" /><path d="M3 13h18M7 16h.01M17 16h.01" /></>,
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const services = [
  { title: 'Bilservice och reparationer', desc: 'Underhåll, oljebyte, bromsar, kamrem och mekaniska reparationer.', to: '/service-reparationer#bilservice', icon: 'wrench' as const, image: wrenchWorkbench },
  { title: 'Felsökning och diagnostik', desc: 'Felkodsläsning och noggrann analys av modern fordonselektronik.', to: '/felsokning', icon: 'monitor' as const, image: mechanicDiagnostic },
  { title: 'Däckservice och däckhotell', desc: 'Däckskifte, balansering, hjulinställning och förvaring.', to: '/dackservice', icon: 'wheel' as const, image: tireStorage },
  { title: 'AC-service', desc: 'Felsökning, provtryckning och påfyllning för god kupékomfort.', to: '/ac-service', icon: 'snowflake' as const, image: acManometers },
]
const process = [['01', 'Bokning och inlämning', 'Du bokar en tid som passar din bil.'], ['02', 'Initial kontroll', 'Vi gör en första bedömning av behovet.'], ['03', 'Service enligt checklista', 'Arbetet följer den servicenivå som är aktuell.'], ['04', 'Godkännande vid extraarbete', 'Vi kontaktar dig innan vi går vidare.'], ['05', 'Slutkontroll och rapport', 'Du får en genomgång när bilen är klar.']]

export default function LandingPage() {
  const [bookingOpen, setBookingOpen] = useState(false)
  return (
    <main className="landing-v2">
      <section className="bb-hero" aria-labelledby="landing-v2-hero-title">
        <picture className="bb-hero__media">
          <source srcSet={heroWebp} type="image/webp" />
          <img src={heroJpg} alt="Honda CR-V i verkstaden vid solnedgång" />
        </picture>
        <div className="bb-hero__shade" aria-hidden="true" />
        <PublicHeader onBookingClick={() => setBookingOpen(true)} variant="overlay" />
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
              <button className="bb-btn bb-btn--teal" type="button" onClick={() => setBookingOpen(true)}>
                <Icon name="calendar" />
                Boka tid
              </button>
              <a className="bb-btn bb-btn--ember" href="tel:+46705533395">
                <Icon name="phone" />
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
                <i className="bb-icon-bare"><Icon name="wrench" /></i>
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

      <section className="landing-v2__why-section" aria-labelledby="landing-v2-why-title">
        <img src={mechanicDiagnostic} alt="Mekaniker som arbetar med diagnostik i verkstaden" />
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
              Läs mer om oss <Icon name="arrow" />
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
              <i className="bb-icon-badge"><Icon name="wrench" /></i>
              <span><b>Personlig service</b><small>Du och din bil är alltid i fokus.</small></span>
            </li>
            <li>
              <i className="bb-icon-badge"><Icon name="pin" /></i>
              <span><b>Lokal verkstad</b><small>Nära dig i Brynäs, Gävle.</small></span>
            </li>
          </ul>
        </div>
      </section>

      <section className="landing-v2__services-section" aria-labelledby="landing-v2-services-title">
        <div className="bb-wrap landing-v2__services-layout">
          <header>
            <p className="bb-eyebrow">Vad vi hjälper dig med</p>
            <h2 id="landing-v2-services-title" className="bb-h2">
              Service för<br /><span className="bb-accent">hela bilen</span>
            </h2>
            <p className="bb-lead">
              Vi utför allt från regelbunden service och mekaniska reparationer till avancerad diagnostik, däckservice och AC-service för alla bilmärken.
            </p>
            <Link className="bb-btn bb-btn--ember-solid" to="/biltjanster">
              Se alla tjänster <Icon name="arrow" />
            </Link>
          </header>
          <div className="landing-v2__service-grid">
            {services.map(service => (
              <Link key={service.to} to={service.to} className="landing-v2__service-card bb-card--photo">
                <img src={service.image} alt="" />
                <div className="landing-v2__service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="bb-card-arrow"><Icon name="arrow" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-v2__process-section" aria-labelledby="landing-v2-process-title">
        <img src={wrenchWorkbench} alt="Arbetsbänk med verktyg i Brynäs Bilservice verkstad" />
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
            <a className="bb-btn bb-btn--teal" href="tel:+46705533395">
              <Icon name="phone" />
              Ring oss: 070–553 33 95
            </a>
          </div>
          <ol className="bb-process-grid">
            {process.map(([number, title, text]) => (
              <li key={number}>
                <b>{number}</b>
                <i className="bb-icon-bare">
                  <Icon name={number === '01' ? 'calendar' : number === '02' ? 'monitor' : number === '03' ? 'wrench' : number === '04' ? 'car' : 'check'} />
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
          <GalleryTeaserCard />
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
              Läs mer om oss <Icon name="arrow" />
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
              Se bilar till salu <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter onBookingClick={() => setBookingOpen(true)} />
      <BookingFormModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  )
}
