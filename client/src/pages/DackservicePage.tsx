// Sibling 2 of 3 of the "Bilservice" shared-family template (Bilservice,
// Felsökning, Däckservice and AC-service all mount on ServiceReparationerPage.css):
// clean automotive advertising / ownership confidence, distinct from both
// index.css and the teal-technical ServiceGuideTemplate.css used by the
// Guide family. Styled entirely by ./ServiceReparationerPage.css (class
// prefix .bilservice__) — zero dependency on index.css or its --redesign-*
// tokens; consumes --bb-* tokens only.
import { useEffect } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { GoogleReviewsCard } from '../components/ui/GoogleReviewsCard'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { UsersIcon } from '../components/icons/UsersIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import heroBgJpg from '../assets/images/services/tires/tires-hero-bg.jpg'
import heroBgWebp from '../assets/images/services/tires/tires-hero-bg.webp'
import imgTyres from '../assets/images/services/tires/tire-storage-wheel.jpg'
import wheelChangeJpg from '../assets/images/services/tires/tire-wheel-change.jpg'
import wheelChangeWebp from '../assets/images/services/tires/tire-wheel-change.webp'
import storageRackJpg from '../assets/images/services/tires/tire-storage-rack.jpg'
import storageRackWebp from '../assets/images/services/tires/tire-storage-rack.webp'
import refittingJpg from '../assets/images/services/tires/tire-refitting.jpg'
import refittingWebp from '../assets/images/services/tires/tire-refitting.webp'
import alignmentJpg from '../assets/images/services/tires/tire-wheel-alignment.jpg'
import alignmentWebp from '../assets/images/services/tires/tire-wheel-alignment.webp'
import balancingJpg from '../assets/images/services/tires/tire-wheel-balancing.jpg'
import balancingWebp from '../assets/images/services/tires/tire-wheel-balancing.webp'
import punctureRepairJpg from '../assets/images/services/tires/tire-puncture-repair.jpg'
import punctureRepairWebp from '../assets/images/services/tires/tire-puncture-repair.webp'
import { BUSINESS } from '../data/business'
import './ServiceReparationerPage.css'

type PriceEntry = { label?: string; prefix?: string; amount?: string; unit?: string; contactText?: string }

type TyreServiceItem = {
  title: string
  description: string
  priceData: PriceEntry[]
  imageJpg: string
  imageWebp: string
  imageAlt: string
}

const tyreServices: TyreServiceItem[] = [
  {
    title: 'Hjulskifte',
    description: 'Dags att byta till sommar- eller vinterdäck? Vi ser till att bytet går snabbt, smidigt och säkert. Vi kontrollerar mönsterdjup, slitage och lufttryck samt ser över synliga bromskomponenter. Efterdragning av hjulbultarna efter cirka 10 mil ingår kostnadsfritt.',
    priceData: [{ label: 'Personbil', amount: '350 kr' }, { label: 'SUV & lätt lastbil', amount: '500 kr' }],
    imageJpg: wheelChangeJpg,
    imageWebp: wheelChangeWebp,
    imageAlt: 'Mekaniker lyfter av ett hjul från en bil på lyft vid hjulskifte',
  },
  {
    title: 'Däckförvaring',
    description: 'Slipp tunga hjul och frigör plats hemma. Vi grovtvättar och kontrollerar hjulen vid inlämning, förvarar dem skyddade från UV-ljus och temperatursvängningar och kontaktar dig via SMS inför nästa säsongsskifte. Om däcken börjar bli slitna hör vi av oss i god tid.',
    priceData: [{ label: 'Personbil', amount: '890 kr' }, { label: 'SUV & lätt lastbil', amount: '990 kr' }],
    imageJpg: storageRackJpg,
    imageWebp: storageRackWebp,
    imageAlt: 'Märkta hjul i förvaringsställ i verkstadens däckhotell',
  },
  {
    title: 'Omläggning av däck',
    description: 'När nya däck ska monteras på fälgarna utför vi omläggningen med precision, monterar nya ventiler och balanserar hjulen så att allt sitter rätt från första kilometern.',
    priceData: [{ prefix: 'Från', amount: '180 kr', unit: 'per däck' }],
    imageJpg: refittingJpg,
    imageWebp: refittingWebp,
    imageAlt: 'Mekaniker monterar ett nytt däck på fälg i däckmaskin',
  },
  {
    title: 'Hjulinställning',
    description: 'Rätt hjulinställning bidrar till jämnare däckslitage, stabilare vägegenskaper och lägre rullmotstånd. Vi utför fackmässig fyrhjulsinställning med modern utrustning.',
    priceData: [{ prefix: 'Från', amount: '1 495 kr' }],
    imageJpg: alignmentJpg,
    imageWebp: alignmentWebp,
    imageAlt: 'Mekaniker utför fyrhjulsinställning med mätutrustning på en bil',
  },
  {
    title: 'Däckbalansering',
    description: 'Vibrationer i ratten vid vissa hastigheter är ofta ett tecken på obalans. Vi mäter hjulen med precisionsutrustning och kompenserar obalansen med rätt vikter. Det ger lugnare körning och minskar onödigt slitage på däck, styrning, fjädring och chassikomponenter.',
    priceData: [{ contactText: 'Kontakta oss för pris' }],
    imageJpg: balancingJpg,
    imageWebp: balancingWebp,
    imageAlt: 'Hjul monterat i balanseringsmaskin som visar obalansvärden',
  },
  {
    title: 'Punkteringslagning',
    description: 'Har du fått punktering? Vi inspekterar skadan och bedömer om däcket kan repareras säkert. När en fackmässig lagning är möjlig hjälper vi dig tillbaka på vägen utan onödigt dröjsmål.',
    priceData: [{ contactText: 'Kontakta oss för pris' }],
    imageJpg: punctureRepairJpg,
    imageWebp: punctureRepairWebp,
    imageAlt: 'Mekaniker lagar en punktering på ett däck med vulkaniseringslapp',
  },
]

const localValueProps = [
  { icon: UsersIcon, title: 'Personlig service', text: 'Du möter samma ansikten varje gång — ingen anonym kö eller nummerlapp.' },
  { icon: MapPinIcon, title: 'Din lokala verkstad', text: 'Vi finns på Utmarksvägen i Gävle och känner våra kunder och deras bilar.' },
  { icon: ClockIcon, title: 'Snabb hjälp inför säsong', text: 'Vi planerar för säsongstoppen så du slipper onödigt lång väntetid vid hjulskifte.' },
] as const

const winterDates = [
  { dates: '1 dec–31 mar', desc: 'Krav på vinterdäck vid vinterväglag' },
  { dates: '1 okt–15 apr', desc: 'Dubbdäck tillåtet' },
  { dates: '16 apr–30 sep', desc: 'Dubbdäck i regel inte tillåtet' },
  { dates: '3PMSF-märkning', desc: 'krävs för dubbfria vinterdäck' },
] as const

const storageBenefits = [
  ['Skyddad förvaring', 'Däcken förvaras inomhus, skyddade från UV-ljus och temperatursvängningar.'],
  ['Tvätt och kontroll', 'Vi grovtvättar och kontrollerar hjulen redan vid inlämning.'],
  ['Påminnelse via SMS', 'Vi hör av oss inför nästa säsongsskifte så du slipper hålla koll själv.'],
  ['Tidig varning vid slitage', 'Börjar däcken bli slitna säger vi till i god tid innan nästa byte.'],
] as const

const faqs = [
  { question: 'Hur lång tid tar ett hjulskifte?', answer: 'Ett vanligt hjulskifte tar normalt 20–30 minuter. Vid högsäsong, när många byter samtidigt, kan väntetiden bli längre — boka gärna i god tid.' },
  { question: 'Behövs hjulinställning efter ett däckbyte?', answer: 'Inte alltid. Drar bilen åt ena hållet, står ratten snett när du kör rakt fram, slits däcken ojämnt eller har hjulet tagit i en trottoarkant är det klokt att kontrollera hjulinställningen. Vibrerar ratten vid en viss hastighet är obalans i hjulen en vanligare orsak, men även en skadad fälg eller ett skadat däck kan ge vibrationer.' },
  { question: 'Vad är skillnaden mellan hjulskifte och omläggning av däck?', answer: 'Ett hjulskifte innebär att färdigmonterade hjul (däck + fälg) byts som en enhet, till exempel sommar- mot vinterhjul. En omläggning innebär att nya däck monteras på dina befintliga fälgar.' },
  { question: 'Behöver jag tänka på däcktrycksövervakningen (TPMS)?', answer: 'På bilar med TPMS varnar systemet när lufttrycket är för lågt. Efter ett hjulskifte kan systemet i vissa fall behöva kontrolleras eller återställas — fråga oss vid bokning så ser vi vad som gäller för din bil.' },
  { question: 'Kan jag boka däckhotell utan att göra ett hjulskifte samtidigt?', answer: 'Ja, du kan lämna in däcken för förvaring separat, men de flesta väljer att kombinera det med sitt hjulskifte för att slippa ett extra besök.' },
]

export default function DackservicePage() {
  const { openBooking, openBookingWith, bookingModal } = useBookingModal('Gäller däckservice & hjulskifte')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="bilservice">
        {/* Hero */}
        <section className="bb-hero" id="dackservice" aria-labelledby="dackservice-hero-title">
          <div className="bb-hero__media" aria-hidden="true">
            <picture data-image-slot="tires-hero-bg">
              <source srcSet={heroBgWebp} type="image/webp" />
              <img src={heroBgJpg} alt="Däckverkstad och hjulförvaring" />
            </picture>
          </div>
          <div className="bb-hero__shade" aria-hidden="true" />
          <PublicHeader onBookingClick={openBooking} variant="overlay" />
          <div className="bb-wrap bb-hero__content">
            <div className="bb-hero__copy">
              <p className="bb-eyebrow bb-eyebrow--dark">Däckverkstad i Brynäs, Gävle</p>
              <h1 className="bb-h1" id="dackservice-hero-title">
                <span>Däckservice &amp;</span>
                <span className="bb-accent">Hjulskifte</span>
                <span>i Gävle</span>
              </h1>
              <p>
                Vi hjälper dig med hjulskifte, montering, balansering, hjulinställning, punkteringslagning och däckhotell — med omtanke om säkerhet, körkomfort och dina hjul.
              </p>
              <div className="bb-hero__actions">
                <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">
                  Boka tid
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  <PhoneIcon aria-hidden="true" />
                  <span>Ring oss nu</span>
                </a>
              </div>
            </div>
            <div className="bb-hero__bottom">
              <div className="bb-trust-row">
                {localValueProps.map(({ icon: Icon, title, text }) => (
                  <div className="bb-trust-row__item" key={title}>
                    <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
                    <span className="bb-trust-row__text">
                      <b>{title}</b>
                      <small>{text}</small>
                    </span>
                  </div>
                ))}
              </div>
              <GoogleReviewsCard variant="hero-overlay" />
            </div>
          </div>
        </section>

        {/* 6-Card Tire Service Grid */}
        <section className="bilservice__section bilservice__section--flow-bottom" aria-labelledby="dackservice-services-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__intro bilservice__intro--wide">
              <p className="bb-eyebrow">Våra däcktjänster</p>
              <h2 className="bb-h2" id="dackservice-services-title">Allt för dina <span className="bb-accent">hjul</span></h2>
              <p className="bb-lead bilservice__lead--intro">
                Från säsongsskifte till kontroll och reparation — välj den hjälp som passar din bil. Oavsett om det är dags att byta till vinterhjul, om ratten vibrerar vid motorväg, om ett däck fått en punktering eller om du bara vill slippa släpa på hjulen mellan säsongerna, hjälper vi dig hela vägen. Nedan hittar du våra vanligaste däck- och hjultjänster med tydliga priser, så att du vet vad som ingår innan du bokar.
              </p>
              <small>Samtliga priser är inklusive moms.</small>
            </div>

            <div className="bilservice__tire-grid">
              {tyreServices.map((service) => {
                const isContactPrice = service.priceData.some((price) => price.contactText)
                return (
                  <article className="bilservice__tire-card" key={service.title} aria-labelledby={`service-${service.title}`}>
                    <div className="bilservice__tire-media">
                      <picture data-image-slot={`tire-${service.title.toLowerCase()}`}>
                        <source srcSet={service.imageWebp} type="image/webp" />
                        <img src={service.imageJpg} alt={service.imageAlt} loading="lazy" />
                      </picture>
                    </div>
                    <div className="bilservice__tire-body">
                      <h3 id={`service-${service.title}`}>{service.title}</h3>
                      <p>{service.description}</p>
                      <div className="bilservice__tire-prices" aria-label={`Pris för ${service.title}`}>
                        {service.priceData.map((price) =>
                          price.contactText ? (
                            <p className="bilservice__tire-contact-price" key={price.contactText}>
                              {price.contactText}
                            </p>
                          ) : (
                            <div className="bilservice__tire-price-row" key={`${price.label ?? ''}-${price.amount ?? ''}`}>
                              {price.label && <span className="bilservice__tire-price-label">{price.label}</span>}
                              <span className="bilservice__tire-price-val">
                                {price.prefix && <span>{price.prefix}</span>}
                                <strong>{price.amount}</strong>
                                {price.unit && <small>{price.unit}</small>}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      <button
                        type="button"
                        className="bb-btn bb-btn--teal bilservice__tire-cta"
                        onClick={() => openBookingWith(`Gäller ${service.title.toLowerCase()}`)}
                      >
                        <span>{isContactPrice ? 'Kontakta oss' : 'Boka tid'}</span>
                        <ArrowRightIcon aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Legal Dates Bar */}
        <section aria-labelledby="dackservice-dates-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__dates-banner">
              <h3 className="bilservice__dates-title" id="dackservice-dates-title">
                Viktiga datum &amp; lagkrav för vinterdäck
              </h3>
              <ul className="bilservice__dates-pills">
                {winterDates.map(({ dates, desc }) => (
                  <li key={dates}>
                    <strong>{dates}</strong>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Däckhotell Section */}
        <section className="bilservice__section--aqua" aria-labelledby="dackservice-storage-title">
          <div className="bb-wrap bilservice__container bilservice__container--pad-lg">
            <div className="bilservice__storage-card">
              <h2 className="bb-h2" id="dackservice-storage-title">Trångt i garaget? Låt oss förvara dina däck.</h2>
              <p>Slipp bära och lagra tunga hjul hemma — vi tar hand om dem tryggt mellan säsongerna.</p>
              <ul className="bilservice__storage-grid">
                {storageBenefits.map(([title, text]) => (
                  <li key={title}>
                    <CheckIcon aria-hidden="true" />
                    <span><strong>{title}:</strong> {text}</span>
                  </li>
                ))}
              </ul>
              <div className="bilservice__storage-footer">
                <p>Från 890 kr för personbil, 990 kr för SUV &amp; lätt lastbil per säsong.</p>
                <button
                  type="button"
                  className="bb-btn bb-btn--ember-solid"
                  onClick={() => openBookingWith('Gäller däckhotell & förvaring')}
                >
                  Boka däckhotellplats
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Befintlig däckservice / Reassurance Split */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="dackservice-legacy-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__service-card">
              <div className="bilservice__service-media">
                <img src={imgTyres} alt="Montering och balansering av däck i däckverkstad" loading="lazy" />
              </div>
              <div className="bilservice__service-content">
                <div>
                  <p className="bb-eyebrow bb-eyebrow--dark">Befintlig däckservice</p>
                  <h2 className="bb-h2" id="dackservice-legacy-title">Mer om vår däckservice</h2>
                  <p className="bb-lead--dark">
                    Utöver skifte och balansering hjälper vi till med hjulinställning och säsongsförvaring. Vi ser över mönsterdjup, lufttryck och synliga bromskomponenter så att du får en bra överblick över hjulens skick.
                  </p>
                </div>
                <div className="bilservice__actions">
                  <button type="button" onClick={openBooking} className="bb-btn bb-btn--teal">Boka tid för däckservice</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Så håller du koll på däcken (Advice section) */}
        <section className="bilservice__section bilservice__section--tight" aria-labelledby="dackservice-advice-title">
          <div className="bb-wrap bilservice__container">
            <div className="bilservice__advice-grid">
              <div>
                <p className="bb-eyebrow">Råd till bilägaren</p>
                <h2 className="bb-h2" id="dackservice-advice-title">Så håller du koll på <span className="bb-accent">däcken</span></h2>
              </div>
              <div className="bilservice__advice-body">
                <p>
                  Kontrollera lufttrycket när däcken är kalla och jämför med bilens instruktionsbok. Som riktmärke är en kontroll varje månad en bra vana, och en extra kontroll inför längre resor eller säsongsskifte är klok. Rätt lufttryck ger bättre väggrepp, kortare bromssträcka, lägre bränsleförbrukning och jämnare slitage.
                </p>
                <p>
                  Balansering, hjulinställning och en skada på däcket är tre olika saker. Balansering gäller hjulet självt: däck och fälg ska väga jämnt runt om, och obalans märks oftast som vibrationer vid vissa hastigheter. Hjulinställning gäller bilens hjulvinklar; fel där märks snarare som att bilen drar åt ena hållet eller att däcken slits ojämnt, till exempel mer på ena kanten. En bula i däcksidan, ett snitt eller en spricka behöver bedömas för sig, eftersom den varken kan balanseras eller ställas bort.
                </p>
                <p>
                  Lagen kräver ett minsta mönsterdjup på 1,6 mm för sommardäck och 3 mm vid vinterväglag. För verkligt säker körning rekommenderas dock byte i god tid innan gränsen nås — sommardäck bör bytas vid cirka 3 mm för att minimera risken för vattenplaning, och vinterdäck bör bytas vid cirka 3–5 mm (gärna minst 4 mm) för att behålla fästet på snö och modd.
                </p>
                <p>
                  Kontrollera även däckens ålder via den fyrsiffriga DOT-koden på däcksidan. De sista fyra siffrorna visar tillverkningsvecka och tillverkningsår — till exempel anger 2421 vecka 24 år 2021. Gummi är en färskvara som åldras och hårdnar med tiden. Däck äldre än 6–10 år bör bytas ut oavsett kvarvarande mönsterdjup, eftersom åldrat gummi förlorar sin elasticitet och inte längre greppar vägbanan säkert.
                </p>
                <p>
                  Gör det till en vana att regelbundet syna däcken efter sprickor, utbuktningar, ojämnt slitage och främmande föremål. Är du osäker på däckens skick eller ålder är du alltid välkommen in till oss på Brynäs Bilservice för en fackmässig bedömning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vanliga frågor om däckservice */}
        <BiltjansterFaq id="dackservice-faq" heading="Vanliga frågor om däckservice" items={faqs} />

        {/* Closing Reassurance Card */}
        <section aria-labelledby="dackservice-closing-title">
          <div className="bb-wrap bilservice__container bilservice__container--flow">
            <div className="bb-card--trust">
              <span className="bb-icon-badge bb-card--trust__icon"><ShieldHeartIcon aria-hidden="true" /></span>
              <div className="bb-card--trust__text">
                <h3 id="dackservice-closing-title">Låt oss gå igenom dina hjul</h3>
                <p className="bb-lead">Vi hjälper dig att upptäcka skador, felaktigt lufttryck och slitage i tid.</p>
              </div>
              <div className="bilservice__actions">
                <button type="button" onClick={() => openBookingWith('Gäller genomgång av hjul & däck')} className="bb-btn bb-btn--ember-solid">
                  Boka tid
                </button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember">
                  Ring: {BUSINESS.phone.display}
                </a>
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
