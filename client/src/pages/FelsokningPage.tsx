import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import heroJpg from '../assets/images/services/diagnostics/vehicle-diagnostics-laptop.jpg'
import heroWebp from '../assets/images/services/diagnostics/vehicle-diagnostics-laptop.webp'
import introJpg from '../assets/images/services/diagnostics/diagnostics-mechanic-laptop-workshop.jpg'
import introWebp from '../assets/images/services/diagnostics/diagnostics-mechanic-laptop-workshop.webp'
import serviceJpg from '../assets/images/services/diagnostics/diagnostics-obd-connector-closeup.jpg'
import serviceWebp from '../assets/images/services/diagnostics/diagnostics-obd-connector-closeup.webp'

const categories = [
  ['Felkodsläsning (OBD)', 'Vi läser av bilens styrsystem via OBD-uttaget och tolkar vilka felkoder som är lagrade eller pågående.'],
  ['Motordiagnostik', 'Kontroll av tändning, bränsletillförsel och motorstyrning när motorn går ojämnt eller tappar effekt.'],
  ['Elektronik & sensorer', 'Test av givare och styrsystem som annars ger felmeddelanden eller oregelbunden funktion.'],
  ['Bränsle- & avgassystem', 'Felsökning av system som påverkar bränsleförbrukning, utsläpp och en godkänd besiktning.'],
  ['Kylsystem', 'Kontroll av kylvätskenivå, termostat och temperaturövervakning så att motorn inte överhettas.'],
  ['Batteri & laddsystem', 'Test av batteri och generator när elsystemet inte får den ström det behöver.'],
] as const

const symptoms = [
  {
    question: 'Motorlampan (Check Engine) eller andra varningslampor lyser',
    advice: 'Felkodsläsning',
    description: 'En lysande lampa betyder att bilens system har upptäckt en avvikelse. Vi läser av felkoderna för att se vilket system som larmar.',
    adviceDetail: 'Vi kopplar in diagnostikutrustning och läser av lagrade koder. Tar normalt 30–60 minuter.',
  },
  {
    question: 'Bilen är svårstartad eller stannar under körning',
    advice: 'Motor- och elsystemdiagnostik',
    description: 'Kan bero på allt från tändning och bränsletillförsel till sensorer eller batteri/laddsystem — vi mäter oss fram till orsaken.',
    adviceDetail: 'Kontroll av tändning, bränsletillförsel och elsystem. Normalt 1–2 timmar beroende på orsak.',
  },
  {
    question: 'Ojämn motorgång eller märkbart sämre effekt',
    advice: 'Motordiagnostik',
    description: 'Ofta ett tecken på fel i tändning, insprutning eller givare som påverkar motorstyrningen.',
    adviceDetail: 'Mätning av tändläge, insprutning och relevanta givare. Normalt 1–2 timmar.',
  },
  {
    question: 'Elektriska funktioner eller instrument fungerar konstigt',
    advice: 'Elektronik- och elsystemfelsökning',
    description: 'Fönsterhissar, belysning eller instrumentpanel som beter sig oregelbundet pekar ofta på ett elfel snarare än en mekanisk komponent.',
    adviceDetail: 'Felsökning av kablage, säkringar och styrenheter. Tidsåtgången varierar med felets omfattning.',
  },
] as const

const guidance = [
  { title: 'Tidsåtgång för en diagnostik', value: '1–2 tim', text: 'En standarddiagnostik med felkodsläsning och grundläggande kontroll tar normalt 1–2 timmar. Mer omfattande fel som kräver ytterligare mätning kan ta längre tid.' },
  { title: 'En kod visar bara vilket system som larmar', value: 'Inte exakt del', text: 'En felkod pekar ut vilket system som reagerat, men avgör sällan ensam vilken specifik komponent som är trasig — därför krävs en verklig bedömning, inte bara en avläsning.' },
  { title: 'Bäst att göra innan besiktningen', value: 'Före besiktning', text: 'Att felsöka och åtgärda orsaken till en varningslampa innan besiktningen kan spara en omkörning och en extra avgift om bilen annars hade blivit underkänd.' },
  { title: 'Prisuppgift innan vi går vidare', value: 'Fast offert', text: 'Kostnaden beror på hur omfattande felsökningen blir. Vi lämnar alltid en tydlig prisuppgift innan vi går vidare med reparation.' },
] as const

const serviceItems = [
  'Felkodsläsning via OBD med tolkning av lagrade och pågående koder.',
  'Kontroll av relevanta givare, tryck och spänningar kopplade till felkoden.',
  'Bedömning av om felet kräver ytterligare mätning för att fastställas exakt.',
  'Tydlig genomgång av vad koderna betyder och vad vi rekommenderar.',
  'Fast prisuppgift innan vi går vidare med eventuell reparation.',
  'Dokumentation av resultatet, till nytta inför en kommande besiktning.',
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  ['Vad betyder det att motorlampan lyser?', 'Det betyder att bilens styrsystem har upptäckt en avvikelse och sparat en felkod i felminnet. Koden visar vilket system som larmar, men avgör inte ensam vilken del som är trasig — därför läser vi av koden och gör en bedömning utifrån den.'],
  ['Hur lång tid tar en felsökning?', 'En vanlig felkodsläsning med grundläggande kontroll tar normalt 1–2 timmar. Mer komplicerade fel som kräver ytterligare mätning kan ta längre tid.'],
  ['Behöver jag veta vad problemet är innan jag bokar?', 'Nej. Berätta gärna vad du har märkt — ljud, lampor eller beteende — men du behöver inte kunna peka ut orsaken själv. Det är det vi hjälper till med.'],
  ['Bör jag felsöka bilen innan besiktningen?', 'Ja, om en varningslampa lyser är det klokt att åtgärda orsaken innan besiktningen. Annars riskerar bilen bli underkänd och kräva en omkörning.'],
  ['Förklarar ni vad felkoderna betyder?', 'Ja, vi går igenom vad koderna innebär i klartext och vad vi rekommenderar innan något repareras.'],
  ['Vad kostar en felsökning?', 'Kostnaden beror på hur omfattande felsökningen blir. Ring oss på 070-553 33 95 så ger vi en tydlig prisuppgift innan vi sätter igång.'],
] as const

export default function FelsokningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recommendation, setRecommendation] = useState('')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const openBooking = () => setIsModalOpen(true)

  return (
    <>
      <Header onBookingClick={openBooking} />
      <main className="services-page diagnostics-page">
        <section className="services-page__hero diagnostics-page__hero" aria-labelledby="diagnostics-page-title">
          <div className="container"><div className="services-page__hero-layout diagnostics-page__hero-layout">
            <div className="services-page__hero-content">
              <div className="diagnostics-page__eyebrow"><MonitorIcon aria-hidden="true" /><span>Elektronik &amp; diagnostik</span></div>
              <h1 className="services-page__title" id="diagnostics-page-title">Felsökning &amp; <span className="title-accent">Diagnostik</span> när bilen behöver ett tydligt svar</h1>
              <p className="services-page__lead">Lyser en varningslampa eller låter bilen konstigt? Vi läser av felkoder och mäter oss fram till den verkliga orsaken med modern diagnostikutrustning — för alla märken och modeller.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={openBooking} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="diagnostics-page__hero-visual">
              <picture><source srcSet={heroWebp} type="image/webp" /><img src={heroJpg} alt="Diagnostikverktyg som visar lagrade felkoder i en bils styrsystem" /></picture>
              <div className="diagnostics-page__code-readout" aria-hidden="true">
                <div className="diagnostics-page__code-row"><span className="diagnostics-page__code-dot" /><code>P0128</code><span>Kylvätsketemperatur</span></div>
                <div className="diagnostics-page__code-row"><span className="diagnostics-page__code-dot diagnostics-page__code-dot--warn" /><code>P0171</code><span>Bränslesystem för magert</span></div>
              </div>
            </div>
          </div></div>
        </section>

        <section className="services-page__guide diagnostics-page__intro" aria-labelledby="diagnostics-intro-title"><div className="container">
          <div className="diagnostics-page__intro-layout">
            <div className="services-page__guide-intro"><h2 id="diagnostics-intro-title">Vad innebär en felsökning?</h2><p>Moderna bilar styrs av ett nätverk av datorer som ständigt övervakar motor, elsystem och avgasrening. När något avviker sparas en felkod i felminnet och en varningslampa kan tändas. Vi kopplar in diagnostikutrustning, läser av koderna och avgör vad de faktiskt betyder för just din bil — istället för att bara byta delar på måfå.</p></div>
            <div className="diagnostics-page__intro-media"><picture><source srcSet={introWebp} type="image/webp" /><img src={introJpg} alt="Mekaniker analyserar diagnosdata på en bärbar dator i verkstaden" loading="lazy" /></picture></div>
          </div>
          <div className="diagnostics-page__category-grid">{categories.map(([title, text]) => <article className="diagnostics-page__category-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="diagnostics-page__symptoms" aria-labelledby="diagnostics-symptoms-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="diagnostics-symptoms-title">Känner du igen något av detta?</h2><p>Välj det som stämmer bäst in på din bil, så följer rekommendationen med till bokningsformulärets kommentar.</p></div>
          <div className="diagnostics-page__symptom-grid">{symptoms.map(({ question, advice, description, adviceDetail }) => <button type="button" className={recommendation === advice ? 'is-selected' : ''} key={question} onClick={() => setRecommendation(advice)} aria-pressed={recommendation === advice}><strong className="diagnostics-page__symptom-question">{question}</strong><p className="diagnostics-page__symptom-description">{description}</p><div className="diagnostics-page__symptom-advice-block"><span className="diagnostics-page__symptom-advice">{advice}</span><p className="diagnostics-page__symptom-advice-detail">{adviceDetail}</p></div></button>)}</div>
          {recommendation && <p className="diagnostics-page__recommendation" role="status">Vi föreslår: <strong>{recommendation}</strong>. Det följer med till bokningsformulärets kommentar.</p>}
        </div></section>

        <section className="diagnostics-page__guidance" aria-labelledby="diagnostics-guidance-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="diagnostics-guidance-title">Bra att veta om felsökning och pris</h2><p>Här är branschmässiga riktlinjer kring tidsåtgång och vad en diagnostik faktiskt kan säga dig. Vi kontrollerar alltid vad som gäller för din bil.</p></div>
          <div className="diagnostics-page__guidance-stats">{guidance.map(({ title, value, text }) => <article className="diagnostics-page__stat-card" key={title}><span className="diagnostics-page__stat-value">{value}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          {/* DRAFT GUIDANCE: Tidsåtgången 1–2 timmar är ett branschmässigt riktvärde utifrån marknadsjämförelse (bl.a. Sala Bilteknik, Vianor), ej en bekräftad fast Brynäs-policy eller -pris. */}
        </div></section>

        <section className="diagnostics-page__service" aria-labelledby="diagnostics-service-title"><div className="container"><div className="diagnostics-page__service-card">
          <div className="diagnostics-page__service-media"><picture><source srcSet={serviceWebp} type="image/webp" /><img src={serviceJpg} alt="OBD-läsare ansluts i bilens diagnostikuttag" /></picture></div>
          <div className="diagnostics-page__service-content"><div><h2 id="diagnostics-service-title">Det här kan vi hjälpa dig med</h2><p>Vi läser av bilens styrsystem och går igenom vad felkoderna faktiskt betyder innan något repareras.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="diagnostics-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
        </div></div></section>

        <section className="services-page__process-section diagnostics-page__process" aria-labelledby="diagnostics-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="diagnostics-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att förstå processen gör det enklare att veta vad som händer med bilen och varför en felsökning ibland behöver ta lite tid.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="felsokning-faq" heading="Vanliga frågor om felsökning" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing diagnostics-page__booking" aria-labelledby="diagnostics-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="diagnostics-booking-title">Boka felsökning</h2><p>Priset beror på hur omfattande felsökningen blir. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={openBooking} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment={recommendation ? `Önskad hjälp: ${recommendation}` : ''} />
      <Footer />
    </>
  )
}
