// Sibling of the "Bilservice" shared-family template (Bilservice, Felsökning,
// Däckservice and AC-service all mount on ServiceReparationerPage.css): the
// page for larger repairs. Styled entirely by ./ServiceReparationerPage.css
// (class prefix .bilservice__), consuming --bb-* tokens only.
//
// Images are placeholders: the three photos below are existing workshop
// pictures standing in until the real ones are delivered (see docs/IMAGES.md).
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { TrustStrip } from '../components/ui/TrustStrip'
import { Tip } from '../components/ui/Tip'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { useBookingModal } from '../hooks/useBookingModal'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { CarSaleIcon } from '../components/icons/CarSaleIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import heroWebp from '../assets/images/services/repair/repair-engine-bay-workshop-hero.webp'
import introWebp from '../assets/images/workshop/workshop-car-open-hood.webp'
import serviceWebp from '../assets/images/services/general/service-performance-diagnostics.webp'
import { BUSINESS } from '../data/business'
import './ServiceReparationerPage.css'
import { heroImgAttrs } from '../data/heroImgAttrs'
import { heroSrcSet } from '../data/heroSrcSet'
import processBandWebp from '../assets/images/services/repair/band-process-engine-work.webp'

const trustRow = [
  { icon: CheckIcon, title: 'Kostnadsförslag först', text: 'Du vet vad det kostar innan vi börjar.' },
  { icon: ShieldIcon, title: 'Inget extra utan ditt OK', text: 'Vi frågar innan vi går utanför uppdraget.' },
  { icon: WrenchIcon, title: 'Alla bilmärken', text: 'Oberoende verkstad i Gävle.' },
] as const

const jobTypes = [
  ['Motor och topplock', 'Packningar, topplock, kamdrivning och andra arbeten inne i motorn.'],
  ['Koppling', 'Byte av koppling och svänghjul när kopplingen slirar eller kärvar.'],
  ['Drivlina', 'Drivaxlar, drivknutar och lager mellan växellåda och hjul.'],
  ['Hjulupphängning och styrning', 'Länkarmar, bussningar, kulleder och stötdämpare.'],
  ['Bromsar', 'Skivor, okar, bromsrör och slangar när felet är mer än ett klossbyte.'],
  ['Avgassystem och el', 'Ljuddämpare och avgasrör samt elfel som kräver felsökning.'],
] as const

const processSteps = [
  { num: '01', icon: GaugeIcon, title: 'Genomgång och felsökning', desc: 'Vi lyssnar på vad du märkt och undersöker bilen. Vid behov börjar vi med en felsökning.' },
  { num: '02', icon: MonitorIcon, title: 'Kostnadsförslag', desc: 'Du får en beskrivning av arbetet och en beräkning av kostnaden innan något påbörjas.' },
  { num: '03', icon: CheckIcon, title: 'Ditt godkännande', desc: 'Du bestämmer om vi ska sätta igång. Vi väntar in ditt besked.' },
  { num: '04', icon: WrenchIcon, title: 'Reparationen', desc: 'Mekanikern utför arbetet. Hittar vi något mer hör vi av oss först.' },
  { num: '05', icon: CarSaleIcon, title: 'Provkörning och utlämning', desc: 'Vi kontrollerar att felet är åtgärdat och går igenom vad som gjorts när du hämtar bilen.' },
] as const

const rights = [
  { title: 'Kostnadsförslag först', text: 'Ett större arbete kostar mer än en vanlig service, och då är det rimligt att du vet vad du säger ja till. Hos oss får du en beskrivning av arbetet och en beräkning av kostnaden innan vi sätter igång.' },
  { title: 'Ungefärligt pris', text: 'Ibland går det inte att säga exakt vad det kostar förrän bilen är delvis isärtagen. Då lämnar vi ett ungefärligt pris, och enligt konsumenttjänstlagen får slutpriset inte bli mer än 15 procent högre än det uppgivna. Behöver vi göra något utöver det vi kommit överens om frågar vi dig först.' },
  { title: 'Specificerad faktura', text: 'Du har alltid rätt till en specificerad faktura, så att du kan se vad som gjorts och vad det kostade.' },
  { title: 'Är du inte nöjd', text: 'Hör av dig till oss så snart du märker något, så rättar vi till det som är fel.' },
] as const

const serviceItems = [
  'Felsökning av orsaken innan delar byts.',
  'Kostnadsförslag före start.',
  'Reparation av alla bilmärken.',
  'Kontakt innan vi gör något utöver uppdraget.',
  'Provkörning och slutkontroll.',
  'Genomgång och specificerad faktura vid utlämning.',
]

const faqs = [
  { question: 'Får jag veta vad det kostar innan ni börjar?', answer: 'Ja. Du får en beskrivning av arbetet och en beräkning av kostnaden innan vi påbörjar det.' },
  { question: 'Vad händer om ni hittar något mer under reparationen?', answer: 'Vi kontaktar dig innan vi gör något utanför det vi kommit överens om, och du bestämmer om det ska åtgärdas. Inget extraarbete utan ditt godkännande.' },
  { question: 'Hur lång tid tar ett större arbete?', answer: 'Det beror på bil och arbete. Ett kopplingsbyte tar ofta en dag, och ett motorarbete kan ta flera dagar, särskilt om delar ska beställas (branschmässigt riktvärde). Du får en tidsuppskattning i kostnadsförslaget.' },
  { question: 'Påverkas nybilsgarantin om ni reparerar min bil?', answer: 'Det ska den inte göra så länge arbetet utförs fackmässigt, enligt tillverkarens föreskrifter och med delar av motsvarande kvalitet. Rena garantiåtgärder och återkallelser görs dock hos märkesverkstaden.' },
  { question: 'Vad gör jag om jag inte är nöjd efter en reparation?', answer: 'Hör av dig till oss så fort du märker något, så tar vi tag i det. Du har enligt konsumenttjänstlagen rätt att reklamera fel i arbetet, och det bör ske inom skälig tid, normalt inom två månader efter att du upptäckt felet.' },
]

export default function ReparationerPage() {
  const { openBooking, bookingModal } = useBookingModal('Gäller reparation & större arbeten')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="bilservice">
        {/* Hero */}
        <section className="bb-hero" id="reparationer" aria-labelledby="reparationer-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture data-image-slot="reparationer-hero">
              <img src={heroWebp} srcSet={heroSrcSet(heroWebp)} sizes="100vw" alt="" {...heroImgAttrs} />
            </picture>
          </div>
          <div className="bb-hero__shade bb-shade-copy-left" aria-hidden="true" />
          <PublicHeader onBookingClick={openBooking} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Motor, drivlina &amp; chassi</p>
              <h1 className="bb-h1" id="reparationer-hero-title">
                <span>Reparationer när</span>
                <span>det är <span className="bb-accent">mer än</span></span>
                <span>en service</span>
              </h1>
              <p>
                Motor, koppling, avgassystem eller fjädring – när det som är fel är mer än en vanlig service tar vi oss an jobbet. Du får ett tydligt kostnadsförslag innan vi börjar, och vi gör inget extra utan att ha frågat dig.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
            <div className="bb-hero__bottom">
              <GoogleReviewsCard variant="hero-overlay" />
            </div>
          </div>
        </section>
        <TrustStrip items={trustRow} />

        {/* Vad räknas som ett större arbete? */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="reparationer-intro-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__split">
              <div>
                <h2 className="bb-h2" id="reparationer-intro-title">Vad räknas som ett <span className="bb-accent">större arbete</span>?</h2>
                <p className="bb-lead bilservice__lead--split">
                  Med större arbeten menar vi reparationer där bilen behöver stå hos oss en längre tid, där flera delar tas isär eller där felet sitter djupt i motor, drivlina eller hjulupphängning. Det kan vara något du planerat, som ett kopplingsbyte, eller något som dykt upp vid en <Link to="/felsokning">felsökning</Link>.
                </p>
                <p className="bb-lead bilservice__lead--split">
                  Läs mer om de vanligaste jobben: <Link to="/kamrem">kamrem</Link>, <Link to="/koppling">koppling</Link>, <Link to="/bromssystem">bromssystem</Link>, <Link to="/drivaxel-drivknutar">drivaxel och drivknutar</Link> och <Link to="/avgassystem">avgassystem</Link>.
                </p>
                <div className="bilservice__actions">
                  <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka tid</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring {BUSINESS.phone.display}</a>
                </div>
              </div>
              <div className="bilservice__split-media--right">
                <picture data-image-slot="reparationer-intro" className="bilservice__image-slot--radius-lg bilservice__image-slot--ar-16-9">
                  <img src={introWebp} alt="Bil med öppen motorhuv i verkstaden" loading="lazy" />
                </picture>
              </div>
            </div>

            <dl className="bilservice__ledger" aria-label="Exempel på större arbeten">
              {jobTypes.map(([title, text]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Så går ett större arbete till */}
        <section className="bilservice__section bilservice__section--dark bilservice__section--photo" aria-labelledby="reparationer-process-title">
          <picture className="bilservice__band-photo" aria-hidden="true">
            <img src={processBandWebp} alt="" loading="lazy" width={1000} height={500} />
          </picture>
          <div className="bb-wrap bilservice__container bilservice__process">
            <div className="bilservice__process-text">
              <h2 className="bilservice__process-heading bb-h2" id="reparationer-process-title">Så går ett <span className="bb-accent">större arbete</span> till</h2>
              <p className="bb-lead--dark">Ett större arbete ska aldrig komma som en överraskning. Så här går vi tillväga.</p>
              <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal"><PhoneIcon aria-hidden="true" /><span>Ring {BUSINESS.phone.display}</span></a>
            </div>
            <ol className="bb-process-grid">
              {processSteps.map((step) => (
                <li key={step.num}>
                  <b>{step.num}</b>
                  <span className="bb-icon-bare"><step.icon aria-hidden="true" /></span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Bra att veta om pris och dina rättigheter */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="reparationer-rights-title">
          <div className="bb-wrap bilservice__container bilservice__editorial">
            <div className="bilservice__editorial-head">
              <h2 className="bb-h2" id="reparationer-rights-title">Bra att veta om pris och dina rättigheter</h2>
              <p className="bb-lead">Tydliga besked är en del av jobbet. Här är det viktigaste att veta innan du lämnar in bilen för ett större arbete.</p>
              <div className="bilservice__actions">
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember-solid"><PhoneIcon aria-hidden="true" /><span>Ring {BUSINESS.phone.display}</span></a>
              </div>
            </div>
            <div className="bilservice__prose">
              {rights.map(({ title, text }) => (
                <p key={title}><strong>{title}.</strong> {text}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Det här ingår i våra reparationer (service card with checklist) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="reparationer-service-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__service-card">
              <div className="bilservice__service-media">
                <picture data-image-slot="reparationer-service">
                  <img src={serviceWebp} alt="Mekaniker arbetar i motorrummet med en surfplatta" loading="lazy" />
                </picture>
              </div>
              <div className="bilservice__service-content">
                <div>
                  <h2 className="bb-h2" id="reparationer-service-title">Det här ingår i våra reparationer</h2>
                  <p className="bb-lead--dark">Från första genomgången till att du hämtar bilen – så här arbetar vi.</p>
                </div>
                <ul className="bilservice__checklist">
                  {serviceItems.map(item => (
                    <li key={item}>
                      <CheckIcon aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bilservice__section bilservice__section--tight" aria-label="Tips">
          <div className="bb-wrap bilservice__container">
            <Tip
              title="Äldre bil och stor reparation?"
              text="Fråga oss vad reparationen kostar i förhållande till bilens värde innan du bestämmer dig. Vi hjälper dig att väga det och berättar om det finns fler sätt att lösa jobbet."
              action={<button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka tid</button>}
            />
          </div>
        </section>

        {/* Vanliga frågor */}
        <BiltjansterFaq id="reparationer-faq" heading="Vanliga frågor om reparationer" items={faqs} />

        {/* Tydligt pris, inga överraskningar */}
        <section aria-labelledby="reparationer-trust-title">
          <div className="bb-wrap bilservice__container bilservice__container--flow">
            <div className="bb-card--trust bilservice__closing-card bilservice__closing-card--underlift">
              <span className="bb-icon-badge bb-card--trust__icon"><ShieldHeartIcon aria-hidden="true" /></span>
              <div className="bb-card--trust__text">
                <h3 id="reparationer-trust-title">Tydligt pris, inga överraskningar</h3>
                <p className="bb-lead">Berätta vad som är fel eller vad du vill ha gjort, så återkommer vi med ett kostnadsförslag. Vi gör inga reparationer utan ditt medgivande.</p>
              </div>
              <div className="bilservice__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--ember-solid">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
