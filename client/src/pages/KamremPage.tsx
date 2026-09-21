// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, First Sibling Proof).
// Proves template reusability for /kamrem without inventing a new CSS file.
// Zero dependency on index.css; inherits Level 0 tokens and shared-elements.
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import '../styles/ServiceGuideTemplate.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import { WavesIcon } from '../components/icons/WavesIcon'
import timingBeltJpg from '../assets/images/services/timing-belt/timing-belt-in-hand.jpg'
import timingBeltWebp from '../assets/images/services/timing-belt/timing-belt-in-hand.webp'

const trustBadges = [
  { icon: ShieldIcon, title: 'Förebygg motorhaveri', text: 'Ett kamremsbyte i tid skyddar motorn mot totalhaveri.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Exakt nollställning och låsning med modellanpassade specialverktyg.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Vi kontrollerar intervall via reg.nr och ger fast prisuppgift.' },
] as const

const parts = [
  { title: 'Kamrem & spännrullar', text: 'Driver kamaxeln och ser till att motorns ventiler öppnas och stängs i exakt synk med kolvarnas rörelse.' },
  { title: 'Kamkedja', text: 'Alternativ konstruktion i metall på vissa motorer som normalt håller bilens livslängd utan schemalagt byte.' },
  { title: 'Vattenpump', text: 'Drivs ofta av kamremmen och kontrolleras eller byts normalt samtidigt för att undvika framtida haveri och dubbel arbetskostnad.' },
] as const

const benefits = [
  { icon: AlertTriangleIcon, title: 'Förebygger katastrofal motorskada', text: 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motor kostar att reparera eller byta efter ett rembrott.' },
  { icon: GaugeIcon, title: 'Rätt intervall för just din motor', text: 'Vi identifierar bytesintervallet utifrån bilens specifika motor, inte bara modellnamnet, eftersom det kan skilja mellan varianter.' },
  { icon: WrenchIcon, title: 'Helhetsbedömning', text: 'Eftersom motorn ändå är demonterad kontrollerar vi relaterade delar som vattenpump och spännrullar som annars kräver ett eget, dyrare ingrepp.' },
  { icon: ThumbsUpIcon, title: 'Trygghet & andrahandsvärde', text: 'Ett dokumenterat kamremsbyte i serviceboken är en av de viktigaste trygghetsfaktorerna vid bilägande och försäljning.' },
] as const

interface SymptomItem {
  icon: (props: { className?: string }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
  { icon: Volume2Icon, title: 'Missljud från motorns framsida', text: 'Kan tyda på slitage i remmen eller på en spännrulle, men förekommer långt ifrån alltid innan ett haveri.', featured: true },
  { icon: AlertTriangleIcon, title: 'Oljeläckage nära kamremskåpan', text: 'Olja eller kylarvätska som når remmen påskyndar nedbrytningen av gummimaterialet kraftigt.', urgent: true },
  { icon: WavesIcon, title: 'Ojämn motorgång eller startproblem', text: 'Kan i vissa fall bero på att remmen kuggat över och att motorns ventiltajming därmed rubbats.' },
  { icon: ClockIcon, title: 'Passerat tids- eller milintervall', text: 'Har bilen nått sitt intervall är risken för plötsligt rembrott verklig – även om motorn går helt ljudlöst och normalt.' },
]

const serviceItems = [
  'Byte av kamremmen enligt biltillverkarens föreskrifter för bilens specifika motor.',
  'Kontroll och normalt byte av vattenpump, spännrullar och löphjul i en komplett sats.',
  'Nollställning och låsning av motorns axlar till exakta tajmingsmärken med specialverktyg.',
  'Kontroll av aggregatrem / poly-v-rem och dess spännare om de demonteras under arbetet.',
  'Påfyllning och avluftning av kylsystemet om vattenpumpen bytts.',
  'Noggrann funktionskontroll och provstart innan bilen lämnas ut.',
]

interface InfoCardItem {
  icon: (props: { className?: string }) => React.ReactElement | null
  title: string
  text: string
  flag?: string
}

const infoCards: readonly InfoCardItem[] = [
  { icon: ClockIcon, title: 'Bytesintervall i mil och år', text: 'Kamremmen bör normalt bytas efter 60 000–100 000 km eller vart 6:e år (vissa moderna bilar har längre intervall). Intervallet avgörs alltid av motorkod och tillverkarens data.' },
  { icon: InfoIcon, title: 'Kontrollera alltid via registreringsnummer', text: 'Exakt intervall måste alltid kontrolleras mot bilens registreringsnummer eller chassinummer, inte gissas utifrån modellnamnet — samma modell kan ha olika motorer.', flag: 'VIKTIGT' },
  { icon: GaugeIcon, title: 'Arbetstid i verkstaden', text: 'Ett kamremsbyte tar normalt 2–6 timmars arbetstid beroende på bilmodell och hur trångt motorutrymmet är. Detta är ett branschmässigt riktvärde.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  { question: 'Hur vet jag om min bil har kamrem eller kamkedja?', answer: 'Det beror på motorn, inte bara bilmodellen – samma modell kan ha kamrem på en motorvariant och kamkedja på en annan. Vi slår gärna upp vad som gäller för just din bil via registreringsnumret.' },
  { question: 'Får jag någon varning innan kamremmen går sönder?', answer: 'Sällan en tillförlitlig sådan. Vissa tecken som missljud eller oljeläckage kan förekomma, men en kamrem kan också gå av helt utan förvarning. Det är därför bytesintervallet ska följas strikt oavsett hur bra bilen känns.' },
  { question: 'Vad händer om kamremmen går sönder under körning?', answer: 'På motorer med interferenskonstruktion (vanligast idag) slår kolvarna rakt in i de öppna ventilerna. Detta leder till böjda ventiler, skadade kolvar och ofta totalt motorhaveri. Misstänker du att det har hänt – försök absolut inte starta om motorn.' },
  { question: 'Varför byts vattenpumpen ofta samtidigt som kamremmen?', answer: 'Eftersom vattenpumpen på många motorer drivs av kamremmen och kräver samma demontering, är det ekonomiskt fördelaktigt att byta den samtidigt. Om en gammal vattenpump skär kort efter kamremsbytet kan det orsaka ett nytt rembrott.' },
  { question: 'Vad kostar ett kamremsbyte jämfört med en motorskada?', answer: 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motorrenovering eller motorbyte kostar efter ett haveri, där notan snabbt kan överstiga bilens restvärde.' },
  { question: 'Hur lång tid tar ett kamremsbyte?', answer: 'Normalt tar arbetet 2–6 timmar beroende på bilmodell och hur trångt motorutrymmet är. Ring oss så ger vi en specifik tidsuppskattning för din bil.' },
]

function MediaPlaceholder({ label, note, light }: { label: string; note: string; light?: boolean }) {
  return (
    <div className={`service-guide__placeholder${light ? ' service-guide__placeholder--light' : ''}`} role="img" aria-label={`Platshållare för framtida bild: ${label}`}>
      <WrenchIcon aria-hidden="true" />
      <span>{label}</span>
      <small>{note}</small>
    </div>
  )
}

export default function KamremPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="kamrem-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Förebyggande motorskydd</div>
                <h1 className="bb-h1 service-guide__title" id="kamrem-title">
                  Kamremsbyte i <span className="bb-accent">Gävle</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Kamremmen synkroniserar motorns vevaxel och kamaxel så att kolvar och ventiler rör sig i exakt rätt takt. Det är en av bilens mest kritiska delar där ett missat byte kan leda till totalt motorhaveri.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
                </div>
                <div className="bb-trust-row">
                  {trustBadges.map(({ icon: Icon, title, text }) => (
                    <div className="bb-trust-row__item" key={title}>
                      <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
                      <span className="bb-trust-row__text">
                        <b>{title}</b>
                        <small>{text}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-guide__hero-media">
                <picture data-image-slot="timing-belt-hero">
                  <source srcSet={timingBeltWebp} type="image/webp" />
                  <img src={timingBeltJpg} alt="Kamrem som hålls upp vid ett motorarbete" />
                </picture>
                <div className="service-guide__hero-badge">
                  <span className="service-guide__hero-badge-icon"><WrenchIcon aria-hidden="true" /></span>
                  <div><h3>Kamremsbyte i vår verkstad i Gävle</h3><p>Kvalitetsdelar, modellanpassade verktyg och noggrannhet.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad är en kamrem? */}
        <section className="service-guide__section" aria-labelledby="kamrem-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <MediaPlaceholder label="Kamremmens komponenter" note="Bild kommer" light />
              <p className="service-guide__intro-caption">Precision, synk och driftsäkerhet.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="kamrem-intro-title">Vad är en kamrem?</h2>
              <p>Värt att veta innan man läser vidare: inte alla bilar har kamrem. Vissa motorer har istället kamkedja i metall som normalt håller bilens livslängd utan schemalagt byte. Eftersom samma bilmodell kan ha kamrem på en motorvariant och kamkedja på en annan räcker inte modellnamnet ensamt för att veta vad som gäller din bil.</p>
              <div className="service-guide__component-grid">
                {parts.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="service-guide__tip-strip">
                <span className="service-guide__tip-icon"><LightbulbIcon aria-hidden="true" /></span>
                <div className="service-guide__tip-text">
                  <strong>Osäker på om din bil har rem eller kedja?</strong>
                  <span>Vi slår upp exakta uppgifter i biltillverkarens databas utifrån ditt registreringsnummer.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Fråga oss<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att byta i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="kamrem-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="kamrem-importance-title">Varför är det viktigt att byta i tid?</h2>
                <p>Ett förebyggande kamremsbyte kostar en bråkdel av vad en motor kostar att reparera efter ett haveri.</p>
              </div>
              <div className="service-guide__importance-grid">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div className="service-guide__importance-card" key={title}>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Varningstecken och när kamremmen ska bytas */}
        <section className="service-guide__section" aria-labelledby="kamrem-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="kamrem-symptoms-title">Varningstecken och när kamremmen ska bytas</h2>
              <p>Till skillnad från de flesta andra delar på bilen ger kamremmen sällan någon tillförlitlig förvarning innan den går sönder. Vissa tecken kan förekomma, men de ska aldrig tolkas som att det finns gott om tid.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <MediaPlaceholder label="Motorarbete och nollställning" note="Bild kommer" light />
              <p className="service-guide__symptoms-caption">Rätt intervall och åtgärd i tid.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="kamrem-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="kamrem-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi utför kompletta kamremsbyten med kvalitetsdelar anpassade för just din motors specifikation och nollställer motorn med specialverktyg.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info om intervall och säkerhet */}
        <section className="service-guide__section" aria-labelledby="kamrem-info-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="kamrem-info-title">Mer info om intervall och säkerhet</h2>
              <p>Här finns generella riktlinjer och fakta kring kamremsintervall och motorkonstruktion. Vi kontrollerar alltid vad som gäller specifikt för din bil.</p>
            </div>
            <div className="service-guide__info-grid">
              {infoCards.map(({ icon: Icon, title, text, flag }) => (
                <div className="service-guide__info-card" key={title}>
                  <span className="service-guide__info-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    {flag && <span className="service-guide__info-flag" aria-hidden="true">{flag}</span>}
                    <h3>{title}</h3><p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-guide__safety-strip">
              <AlertTriangleIcon aria-hidden="true" />
              <p><strong>Säkerhetsnotis:</strong> De flesta moderna motorer är interferensmotorer, vilket innebär att kolvar och ventiler kolliderar om remmen brister med totalt motorhaveri som följd. Misstänker du att kamremmen har gått av under färd – gör inga försök att starta motorn igen.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="kamrem-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="kamrem-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att förstå processen gör det enklare och tryggare att lämna in bilen för ett avancerat motorarbete.</p>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal service-guide__btn"><PhoneIcon aria-hidden="true" />Ring oss: {BUSINESS.phone.display}</a>
              </div>
              <div className="service-guide__process-steps">
                {processSteps.map(([num, title, text]) => (
                  <div className="service-guide__process-step" key={num}>
                    <span className="service-guide__process-num" aria-hidden="true">{num}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BiltjansterFaq id="kamrem-faq" heading="Vanliga frågor om kamrem" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="kamrem-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="kamrem-booking-title">Boka kamremsbyte</h2>
                <p>Priset beror på bilmodell, motortyp och om vattenpump samt spännrullar ingår i bytet. Ring oss på {BUSINESS.phone.display} för en tydlig och fast prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller kamremsbyte" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
