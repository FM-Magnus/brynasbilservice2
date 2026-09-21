// Rebuilt 2026-09-16 on the shared ServiceGuideTemplate first built for
// /koppling — third proof the template is reusable, not a second design.
// The one addition here is a single --urgent (amber) symptom-row modifier
// for the most safety-critical warning sign, alongside the existing teal
// --featured modifier. No dependency on any page-specific rule in index.css.
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import { HourglassIcon } from '../components/icons/HourglassIcon'
import '../styles/ServiceGuideTemplate.css'

const trustBadges = [
  { icon: ShieldIcon, title: 'Säkerhet i fokus', text: 'Bromsarna är bilens viktigaste säkerhetssystem, vi tar inga genvägar.' },
  { icon: WrenchIcon, title: 'Rätt diagnos först', text: 'Vi byter det som faktiskt behövs, inte allt på måfå.' },
  { icon: ClockIcon, title: 'Klart samma dag', text: 'De flesta bromsbyten är klara samma dag du lämnar in bilen.' },
] as const

const brakeParts = [
  { title: 'Bromsbelägg', text: 'slits ner varje gång du bromsar.' },
  { title: 'Bromsskivor', text: 'håller längre, men slits ojämnt och i förtid om beläggen fått gå för länge innan byte.' },
  { title: 'Bromsok', text: 'kan drabbas av fel som oftast utvecklas gradvis snarare än uppstår på en gång.' },
  { title: 'Bromsrör och bromsslangar', text: 'leder bromsvätskan från huvudcylindern ut till varje hjul, och ska vara hela och täta.' },
  { title: 'Bromsvätska', text: 'åldras kemiskt över tid, även om ingen del är synligt sliten.' },
  { title: 'Handbroms/parkeringsbroms', text: 'är ett eget system, antingen mekaniskt med vajrar till bakhjulen eller elektroniskt på nyare bilar.' },
] as const

const importance = [
  { icon: ShieldIcon, title: 'Säkerhet', text: 'Rätt monterade bromsar är inte något att chansa med, och en felmontering kan i värsta fall leda till bromssvikt.' },
  { icon: GaugeIcon, title: 'Rätt diagnos', text: 'Vi avgör vilka delar som verkligen behöver bytas istället för att byta allt på måfå.' },
  { icon: ThumbsUpIcon, title: 'Kvalitet', text: 'Vi använder komponenter som håller vad de lovar, inte de absolut billigaste alternativen på en säkerhetsdel.' },
  { icon: InfoIcon, title: 'Helheten', text: 'Vi ser inte bara till beläggen, utan till hela systemet: vätska, slangar, ok och handbroms.' },
  { icon: ClockIcon, title: 'Tidsbesparing', text: 'Ett bromsbyte är tekniskt krävande att göra själv, och hos oss är det klart samma dag i de flesta fall.' },
] as const

interface SymptomItem {
  icon: (props: { className?: string }) => React.ReactElement | null
  title: string
  text: string
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
  { icon: Volume2Icon, title: 'Ljud vid inbromsning', text: 'Gnisslande, pipande eller skrapande ljud är vanliga första varningstecken. Ett lätt gnissel efter ett nytt beläggbyte är normal inkörning, ett kraftigt ihållande skrap är det aldrig.' },
  { icon: WavesIcon, title: 'Vibrationer', text: 'Vibrationer i pedalen eller ratten vid inbromsning kan tyda på skeva eller ojämnt slitna bromsskivor.' },
  { icon: SlidersIcon, title: 'Förändrad pedalkänsla', text: 'Längre bromssträcka, hårdare tryck, mjuk eller svampig pedalkänsla kan tyda på slitage eller luft i systemet.' },
  { icon: AlertTriangleIcon, title: 'Pedalen sjunker', text: 'Om pedalen sjunker sakta mot golvet när den hålls intryckt kan det vara tecken på läckage någonstans i systemet och bör kollas direkt.', urgent: true },
  { icon: GaugeIcon, title: 'Bilen drar åt sidan', text: 'Ojämn bromsverkan, ofta kopplad till bromsok, kan göra att bilen drar åt ena hållet vid inbromsning.' },
  { icon: InfoIcon, title: 'Synliga spår eller varningslampa', text: 'Repor eller en tydlig kant på bromsskivan kan ibland synas via fälgen. Även varningslampa för bromssystem eller ABS ska tas på allvar.' },
  { icon: WrenchIcon, title: 'Handbromsen förändras', text: 'Om handbromsen tar ovanligt högt upp eller bilen rullar trots att den är åtdragen kan den behöva justering.' },
]

const serviceItems = [
  'Bedömning av vilka delar som faktiskt behöver bytas — belägg, skivor, ok, bromsrör/slangar eller en kombination.',
  'Byte av de aktuella delarna med kvalitetskomponenter.',
  'Kontroll av bromsvätskans nivå och skick, med byte vid behov.',
  'Luftning av systemet när arbetet kräver det.',
  'Kontroll och vid behov justering av handbroms/parkeringsbroms.',
  'Funktionstest efter monteringen innan bilen lämnas ut.',
  'Felsökning av bromssystemet som ett fristående alternativ när det är oklart vilken del som är problemet.',
]

const infoCards = [
  { icon: ClockIcon, title: 'Bromsbelägg', text: 'Håller normalt cirka 3 000–5 000 mil och anses uttjänta när tjockleken går under cirka 3 mm. Det är ett branschmässigt riktvärde som varierar med körstil, körmiljö och bilmodell.' },
  { icon: GaugeIcon, title: 'Bromsskivor', text: 'Håller normalt cirka 6 000–8 000 mil, men slits ojämnt och i förtid om beläggen fått gå för länge. Även detta är ett branschriktvärde.' },
  { icon: HourglassIcon, title: 'Bromsvätska', text: 'Bör bytas ungefär vart 2–3 år, oavsett hur mycket bilen körts, eftersom vätskan drar åt sig fukt över tid även vid stillastående.' },
  { icon: ClockIcon, title: 'Tidsåtgång', text: 'Ett rent beläggbyte tar normalt omkring en timme. Ett mer omfattande byte med skivor, ok eller luftning tar normalt 1–3 timmar.' },
] as const

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  { question: 'Hur ofta behöver jag byta bromsar?', answer: 'Det beror på körstil, körmiljö och bilmodell. Som riktvärde håller bromsbelägg 3 000–5 000 mil och bromsskivor 6 000–8 000 mil, men regelbundna kontroller är det som faktiskt avgör — inte ett fast intervall.' },
  { question: 'Hur ofta ska bromsvätskan bytas?', answer: 'Vanligtvis vart 2–3 år, oavsett hur mycket bilen körts. Vätskan drar åt sig fukt över tid även om bilen står stilla, vilket sänker bromsverkan gradvis utan att du märker det förrän vid en kontroll.' },
  { question: 'Behöver handbromsen service om jag ändå ska byta bromsarna?', answer: 'Inte alltid, men det är ett bra tillfälle att kontrollera den samtidigt eftersom bilen ändå är uppe — särskilt på bilar med mekanisk vajerhandbroms som kan behöva efterjusteras med tiden.' },
  { question: 'Hur mycket kostar det att byta bromsar?', answer: 'Kostnaden beror på vilka delar som behöver bytas. Ett byte av enbart belägg brukar kosta mindre än ett komplett byte som även innefattar skivor och eventuellt ok. Ring oss för en tydlig prisuppgift innan vi sätter igång.' },
  { question: 'Kan jag byta bromsar själv?', answer: 'Det går, med rätt verktyg och kunskap. Men bromssystemet är en säkerhetskomponent där en felaktig montering kan få allvarliga konsekvenser — vi rekommenderar att låta en verkstad göra jobbet.' },
  { question: 'Hur lång tid tar ett bromsbyte?', answer: 'Vanligtvis 1–3 timmar beroende på omfattning — ett rent beläggbyte går snabbare än ett byte som även omfattar skivor, ok eller luftning.' },
  { question: 'Vad händer om jag väntar för länge med att byta bromsar?', answer: 'Utslitna belägg som får gå för länge sliter i sin tur ner bromsskivorna, och i värsta fall skadas även bromsoket. Det som hade varit ett enkelt beläggbyte kan då bli ett betydligt dyrare, mer omfattande jobb.' },
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

export default function BromssystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="brake-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Bromsservice &amp; säkerhet</div>
                <h1 className="bb-h1 service-guide__title" id="brake-title">
                  Bromssystem<br />
                  när <span className="bb-accent">säkerheten</span><br />
                  måste fungera
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Bromsarna är bilens viktigaste säkerhetssystem – helt enkelt det som avgör om du stannar i tid eller inte. Slitna bromsar brukar varna i god tid, men bara om du vet vad du ska lyssna och känna efter.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka bromsservice</button>
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
                <MediaPlaceholder label="Hero: bromsarbete i verkstaden" note="Bild kommer" />
                <div className="service-guide__hero-badge">
                  <span className="service-guide__hero-badge-icon"><WrenchIcon aria-hidden="true" /></span>
                  <div><h3>Bromsservice i vår verkstad i Gävle</h3><p>Kvalitet, erfarenhet och rätt utrustning.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad ingår i bromssystemet? */}
        <section className="service-guide__section" aria-labelledby="brake-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <MediaPlaceholder label="Bromssystemets komponenter" note="Bild kommer" light />
              <p className="service-guide__intro-caption">Säkra stopp, varje mil räknas.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="brake-intro-title">Vad ingår i bromssystemet?</h2>
              <p>Bromssystemet består av flera delar som slits i olika takt. En kontroll handlar därför om mer än att bara titta på belägg och skivor.</p>
              <div className="service-guide__component-grid">
                {brakeParts.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Varför är bromsservice viktigt? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="brake-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="brake-importance-title">Varför är bromsservice viktigt?</h2>
                <p>Bromsarna är inte en del du ska chansa med. Så här tänker vi kring varje bromsjobb.</p>
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

        {/* Tecken på att bromsarna behöver ses över */}
        <section className="service-guide__section" aria-labelledby="brake-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="brake-symptoms-title">Tecken på att bromsarna behöver ses över</h2>
              <p>Du behöver inte själv avgöra exakt vad som är fel. De här signalerna är skäl att låta oss kontrollera systemet.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <MediaPlaceholder label="Mekaniker under bil, diagnos" note="Bild kommer" light />
              <p className="service-guide__symptoms-caption">Vi hittar problemet – innan det blir större.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="brake-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="brake-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi börjar med att bedöma vad som faktiskt behöver göras och går inte vidare med extra arbete utan ditt godkännande.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info */}
        <section className="service-guide__section" aria-labelledby="brake-info-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="brake-info-title">Mer info</h2>
              <p>Riktvärden kan skilja mellan bilmodeller, körstil och körmiljö. Vi bedömer alltid din bil utifrån dess faktiska skick.</p>
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
              <p><strong>Säkerhetsnot:</strong> Bromssystemet är en säkerhetskomponent. En felaktig montering kan få allvarliga konsekvenser, vilket är varför vi rekommenderar att inte utföra bromsbyten själv utan rätt kunskap och verktyg.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="brake-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="brake-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att förstå processen gör det enklare att veta vad som händer med bilen och varför en bromskontroll ibland behöver ta lite tid.</p>
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

        <BiltjansterFaq id="bromssystem-faq" heading="Vanliga frågor om bromsar" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="brake-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="brake-booking-title">Boka bromskontroll</h2>
                <p>Priset beror på vilka delar som behöver bytas. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka bromsservice</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
