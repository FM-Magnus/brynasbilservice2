// Rebuilt from scratch 2026-09-16 as Magnus's template for the other bland
// guide pages. Styled entirely by ../styles/ServiceGuideTemplate.css — this
// page has NO dependency on any page-specific rule in client/src/css/index.css.
// Reuse ServiceGuideTemplate.css for future rebuilds; do not fork its classes
// into another colocated file, and do not add rules for this page to index.css.
import { useEffect, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { UsersIcon } from '../components/icons/UsersIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { HourglassIcon } from '../components/icons/HourglassIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import '../styles/ServiceGuideTemplate.css'

const trustBadges = [
  { icon: ShieldIcon, title: 'Trygg och säker körning', text: 'En fungerande koppling ger full kontroll.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Vi arbetar med alla vanliga bilmärken.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Du får en ärlig bedömning och tydligt prisuppgift.' },
] as const

const components = [
  { title: 'Kopplingssatsen', text: 'Lamell, tryckplatta och urtrampningslager byts normalt tillsammans eftersom arbetet för att komma åt dem är detsamma.' },
  { title: 'Tvåmassesvänghjul', text: 'På bilar som har ett tvåmassesvänghjul kontrolleras det samtidigt, så att drivlinan inte behöver tas isär igen kort efter arbetet.' },
] as const

const importance = [
  { icon: AlertTriangleIcon, title: 'Undviker följdskador', text: 'Väntar man för länge kan även svänghjul och urtrampningslager slitas, vilket gör reparationen större och dyrare.' },
  { icon: WrenchIcon, title: 'Rätt diagnos', text: 'Ett missljud eller en förändrad pedalkänsla betyder inte alltid att hela kopplingen behöver bytas.' },
  { icon: ThumbsUpIcon, title: 'Kvalitet', text: 'Vi använder kopplingssatser som håller måttet för din bilmodell och körning.' },
  { icon: UsersIcon, title: 'Trygghet vid större arbete', text: 'Kopplingsbyte kräver att växellådan demonteras och är inte ett jobb att chansa med utan rätt verktyg och erfarenhet.' },
] as const

const symptoms = [
  { icon: GaugeIcon, title: 'Kopplingen slirar', text: 'Motorvarvtalet stiger utan att farten hänger med. Det märks ofta först i uppförsbacke eller vid hård acceleration, och kan ibland lukta bränt.', featured: true },
  { icon: SlidersIcon, title: 'Greppunkten har flyttat sig', text: 'Om pedalen griper mycket högt upp, nära toppen av rörelsen, är friktionsbelägget ofta kraftigt nedslitet.' },
  { icon: WrenchIcon, title: 'Svårt att lägga i växlar', text: 'Knastrande eller knirrande ljud kan tyda på att kopplingen inte frikopplar ordentligt, ofta på grund av ett urtrampningsproblem.' },
  { icon: WavesIcon, title: 'Vibrationer eller ryck', text: 'När du släpper upp kopplingen kan vibrationer bero på sliten lamell, oljeläckage på belägget eller ett slitet svänghjul.' },
  { icon: Volume2Icon, title: 'Ljud när pedalen trycks ner', text: 'Ett gnisslande eller morrande ljud pekar ofta mot ett slitet urtrampningslager och försvinner ofta när pedalen släpps.' },
] as const

const serviceItems = [
  'Bedömning av om hela kopplingssatsen behöver bytas eller om felet sitter i en enskild komponent, till exempel urtrampningslagret.',
  'Byte av lamell, tryckplatta och urtrampningslager som en samlad kopplingssats.',
  'Kontroll av svänghjulet och byte om det visar tecken på slitage — särskilt relevant på bilar med tvåmassesvänghjul.',
  'Kontroll av kopplingens hydraulik på bilar med hydraulisk urkoppling och luftning av systemet vid behov.',
  'Funktionstest efter monteringen innan bilen lämnas ut.',
]

const infoCards = [
  { icon: HourglassIcon, title: 'Hur länge håller en koppling?', text: 'En koppling håller vanligtvis mellan 100 000 och 200 000 km beroende på körstil. Mycket stadskörning med start och stopp sliter mer än jämn landsvägskörning. Detta är ett branschmässigt riktvärde, inte en Brynäs-specifik mätning.' },
  { icon: ClockIcon, title: 'Arbetstid', text: 'Ett kopplingsbyte tar normalt 4–10 timmars arbetstid eftersom växellådan måste demonteras för att komma åt kopplingen. Tidsuppgiften är inte bekräftad mot Brynäs egna verkstadstider.' },
] as const

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  { question: 'Hur länge håller en koppling?', answer: 'Vanligtvis mellan 100 000 och 200 000 km, men det varierar mycket med körstil. Mycket stadskörning med start och stopp sliter betydligt mer än jämn landsvägskörning.' },
  { question: 'Måste hela kopplingssatsen bytas, eller räcker det med en del?', answer: 'Det beror på vad som faktiskt är fel. Ibland räcker det med att byta enbart urtrampningslagret, men eftersom arbetet för att komma åt kopplingen är detsamma oavsett görs oftast hela satsen samtidigt för att slippa göra om jobbet inom kort.' },
  { question: 'Varför är kopplingsbyte dyrt jämfört med andra reparationer?', answer: 'Det är främst en fråga om arbetstid. Växellådan måste demonteras för att komma åt kopplingen, vilket tar betydligt längre tid än de flesta andra reparationer.' },
  { question: 'Vad är ett tvåmassesvänghjul, och behöver det bytas samtidigt?', answer: 'Det är en typ av svänghjul som dämpar vibrationer mellan motor och växellåda. Visar det tecken på slitage rekommenderar vi att byta det samtidigt som kopplingen, eftersom det annars kan gå sönder kort efter och tvinga fram ett nytt, lika omfattande ingrepp.' },
  { question: 'Kan jag köra bilen ett tag till om kopplingen börjat slira?', answer: 'Kortsiktigt, men det är inte att rekommendera. Slirning sliter snabbt ut det som är kvar av friktionsbelägget, och i värsta fall kan även svänghjul och urtrampningslager skadas.' },
  { question: 'Hur lång tid tar ett kopplingsbyte?', answer: 'Normalt 4–10 timmars arbetstid beroende på bilmodell, eftersom växellådan behöver demonteras. Ring oss så får du en tidsuppskattning anpassad efter din bil.' },
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

export default function KopplingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={openModal} />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="koppling-title">
          <div className="service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="service-guide__eyebrow">Kraftöverföring &amp; drivlina</div>
                <h1 className="service-guide__title" id="koppling-title">
                  KOPPLING <span className="title-accent">NÄR</span><br />
                  KRAFTEN BEHÖVER<br />
                  NÅ HJULEN
                </h1>
                <p className="service-guide__lead">
                  Kopplingen överför kraften mellan motorn och växellådan och gör att du kan växla utan att motorn stannar eller rycker till. Den är en slitdel, och att den till slut behöver bytas är en förväntad del av bilens underhåll.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="service-guide__btn service-guide__btn--primary">Boka tid</button>
                  <a href="tel:0705533395" className="service-guide__btn service-guide__btn--outline"><PhoneIcon />Ring 070-553 33 95</a>
                </div>
                <div className="service-guide__trust-row">
                  {trustBadges.map(({ icon: Icon, title, text }) => (
                    <div className="service-guide__trust-item" key={title}>
                      <Icon className="service-guide__trust-icon" aria-hidden="true" />
                      <div><h3>{title}</h3><p>{text}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-guide__hero-media">
                <MediaPlaceholder label="Hero: koppling under bil" note="Bild kommer" />
                <div className="service-guide__hero-badge">
                  <span className="service-guide__hero-badge-icon"><WrenchIcon aria-hidden="true" /></span>
                  <div><h3>Kopplingsbyte i vår verkstad i Gävle</h3><p>Kvalitet, erfarenhet och rätt utrustning.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad är en koppling? */}
        <section className="service-guide__section" aria-labelledby="koppling-intro-title">
          <div className="service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <MediaPlaceholder label="Kopplingskomponenter" note="Bild kommer" light />
              <p className="service-guide__intro-caption">Samma kraft. En mjukare resa.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="koppling-intro-title">Vad är en koppling?</h2>
              <p>Varje gång du släpper upp kopplingspedalen sliter friktionsmaterialet på kopplingsskivan lite grann. Därför är ett framtida byte inte i sig ett fel, utan en del av bilens normala underhåll.</p>
              <div className="service-guide__component-grid">
                {components.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="service-guide__tip-strip">
                <span className="service-guide__tip-icon"><LightbulbIcon aria-hidden="true" /></span>
                <div className="service-guide__tip-text">
                  <strong>Osäker på vad som gäller för din bil?</strong>
                  <span>Vi läser av felkoder, gör en bedömning och förklarar vad som behöver åtgärdas – utan överraskningar.</span>
                </div>
                <a href="/felsokning" className="service-guide__btn service-guide__btn--primary">Boka en felsökning<ArrowRightIcon aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att åtgärda i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="koppling-importance-title">
          <div className="service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="koppling-importance-title">Varför är det viktigt att åtgärda i tid?</h2>
                <p>En sliten koppling påverkar inte bara körkomforten. Om den inte byts i tid kan det leda till följdskador och högre reparationskostnader.</p>
              </div>
              <div className="service-guide__importance-grid">
                {importance.map(({ icon: Icon, title, text }) => (
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

        {/* Tecken på att kopplingen behöver ses över */}
        <section className="service-guide__section" aria-labelledby="koppling-symptoms-title">
          <div className="service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="koppling-symptoms-title">Tecken på att kopplingen behöver ses över</h2>
              <p>Du behöver inte själv avgöra exakt vilken del som är problemet. De här signalerna är skäl att låta oss bedöma bilen.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured }) => (
                  <article className={`service-guide__symptom-row${featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <MediaPlaceholder label="Mekaniker under bil" note="Bild kommer" light />
              <p className="service-guide__symptoms-caption">Vi hittar problemet – innan det blir större.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="koppling-service-title">
          <div className="service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="koppling-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi börjar med att bedöma vad som faktiskt behöver göras och kontaktar dig innan vi går vidare med arbete utöver den första bedömningen.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info */}
        <section className="service-guide__section" aria-labelledby="koppling-info-title">
          <div className="service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="koppling-info-title">Mer info</h2>
              <p>Här finns generella riktvärden som kan hjälpa dig att förstå omfattningen. Vi bedömer alltid din bil utifrån dess faktiska skick.</p>
            </div>
            <div className="service-guide__info-grid">
              {infoCards.map(({ icon: Icon, title, text }) => (
                <div className="service-guide__info-card" key={title}>
                  <span className="service-guide__info-icon"><Icon aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
            <div className="service-guide__safety-strip">
              <InfoIcon aria-hidden="true" />
              <p><strong>Säkerhetsnot:</strong> Ett kopplingsbyte är ett omfattande ingrepp i drivlinan. Vi rekommenderar inte att göra det själv utan rätt specialverktyg och erfarenhet av just den här typen av arbete.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="koppling-process-title">
          <div className="service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="koppling-process-title">SÅ GÅR DET TILL<br /><span className="title-accent">HOS OSS</span></h2>
                <p>Att förstå processen gör det enklare att veta vad som händer med bilen och varför ett större drivlinearbete ibland behöver ta lite tid.</p>
                <a href="tel:0705533395" className="service-guide__btn service-guide__btn--primary"><PhoneIcon aria-hidden="true" />Ring oss: 070-553 33 95</a>
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

        <BiltjansterFaq id="koppling-faq" heading="Vanliga frågor om koppling" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="koppling-booking-title">
          <div className="service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="koppling-booking-title">Boka kopplingskontroll</h2>
                <p>Priset beror på bilmodell, vilket typ av kopplingssats som krävs och om svänghjulet behöver bytas samtidigt. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="service-guide__btn service-guide__btn--primary">Boka tid</button>
                <a href="tel:0705533395" className="service-guide__btn service-guide__btn--outline">Ring 070-553 33 95</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
