import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const brakeParts = [
  ['Bromsbelägg', 'slits ner varje gång du bromsar.'],
  ['Bromsskivor', 'håller längre, men slits ojämnt och i förtid om beläggen fått gå för länge innan byte.'],
  ['Bromsok', 'kan drabbas av fel som oftast utvecklas gradvis snarare än uppstår på en gång.'],
  ['Bromsrör och bromsslangar', 'leder bromsvätskan från huvudcylindern ut till varje hjul, och ska vara hela och täta.'],
  ['Bromsvätska', 'åldras kemiskt över tid, även om ingen del är synligt sliten.'],
  ['Handbroms/parkeringsbroms', 'är ett eget system, antingen mekaniskt med vajrar till bakhjulen eller elektroniskt på nyare bilar.'],
]

const benefits = [
  ['Säkerhet', 'Rätt monterade bromsar är inte något att chansa med, och en felmontering kan i värsta fall leda till bromssvikt.'],
  ['Rätt diagnos', 'Vi avgör vilka delar som verkligen behöver bytas istället för att byta allt på måfå.'],
  ['Kvalitet', 'Vi använder komponenter som håller vad de lovar, inte de absolut billigaste alternativen på en säkerhetsdel.'],
  ['Helheten', 'Vi ser inte bara till beläggen, utan till hela systemet: vätska, slangar, ok och handbroms.'],
  ['Tidsbesparing', 'Ett bromsbyte är tekniskt krävande att göra själv, och hos oss är det klart samma dag i de flesta fall.'],
]

const symptoms = [
  ['Ljud vid inbromsning', 'Gnisslande, pipande eller skrapande ljud är vanliga första varningstecken. Ett lätt gnissel efter ett nytt beläggbyte är normal inkörning, ett kraftigt ihållande skrap är det aldrig.'],
  ['Vibrationer', 'Vibrationer i pedalen eller ratten vid inbromsning kan tyda på skeva eller ojämnt slitna bromsskivor.'],
  ['Förändrad pedalkänsla', 'Längre bromssträcka, hårdare tryck, mjuk eller svampig pedalkänsla kan tyda på slitage eller luft i systemet.'],
  ['Pedalen sjunker', 'Om pedalen sjunker sakta mot golvet när den hålls intryckt kan det vara tecken på läckage någonstans i systemet och bör kollas direkt.'],
  ['Bilen drar åt sidan', 'Ojämn bromsverkan, ofta kopplad till bromsok, kan göra att bilen drar åt ena hållet vid inbromsning.'],
  ['Synliga spår eller varningslampa', 'Repor eller en tydlig kant på bromsskivan kan ibland synas via fälgen. Även varningslampa för bromssystem eller ABS ska tas på allvar.'],
  ['Handbromsen förändras', 'Om handbromsen tar ovanligt högt upp eller bilen rullar trots att den är åtdragen kan den behöva justering.'],
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

const guidance = [
  ['Bromsbelägg', 'Håller normalt cirka 3 000–5 000 mil och anses uttjänta när tjockleken går under cirka 3 mm. Det är ett branschmässigt riktvärde som varierar med körstil, körmiljö och bilmodell.'],
  ['Bromsskivor', 'Håller normalt cirka 6 000–8 000 mil, men slits ojämnt och i förtid om beläggen fått gå för länge. Även detta är ett branschriktvärde.'],
  ['Bromsvätska', 'Bör bytas ungefär vart 2–3 år, oavsett hur mycket bilen körts, eftersom vätskan drar åt sig fukt över tid även vid stillastående.'],
  ['Tidsåtgång', 'Ett rent beläggbyte tar normalt omkring en timme. Ett mer omfattande byte med skivor, ok eller luftning tar normalt 1–3 timmar.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
]

const faqs = [
  ['Hur ofta behöver jag byta bromsar?', 'Det beror på körstil, körmiljö och bilmodell. Som riktvärde håller bromsbelägg 3 000–5 000 mil och bromsskivor 6 000–8 000 mil, men regelbundna kontroller är det som faktiskt avgör — inte ett fast intervall.'],
  ['Hur ofta ska bromsvätskan bytas?', 'Vanligtvis vart 2–3 år, oavsett hur mycket bilen körts. Vätskan drar åt sig fukt över tid även om bilen står stilla, vilket sänker bromsverkan gradvis utan att du märker det förrän vid en kontroll.'],
  ['Behöver handbromsen service om jag ändå ska byta bromsarna?', 'Inte alltid, men det är ett bra tillfälle att kontrollera den samtidigt eftersom bilen ändå är uppe — särskilt på bilar med mekanisk vajerhandbroms som kan behöva efterjusteras med tiden.'],
  ['Hur mycket kostar det att byta bromsar?', 'Kostnaden beror på vilka delar som behöver bytas. Ett byte av enbart belägg brukar kosta mindre än ett komplett byte som även innefattar skivor och eventuellt ok. Ring oss för en tydlig prisuppgift innan vi sätter igång.'],
  ['Kan jag byta bromsar själv?', 'Det går, med rätt verktyg och kunskap. Men bromssystemet är en säkerhetskomponent där en felaktig montering kan få allvarliga konsekvenser — vi rekommenderar att låta en verkstad göra jobbet.'],
  ['Hur lång tid tar ett bromsbyte?', 'Vanligtvis 1–3 timmar beroende på omfattning — ett rent beläggbyte går snabbare än ett byte som även omfattar skivor, ok eller luftning.'],
  ['Vad händer om jag väntar för länge med att byta bromsar?', 'Utslitna belägg som får gå för länge sliter i sin tur ner bromsskivorna, och i värsta fall skadas även bromsoket. Det som hade varit ett enkelt beläggbyte kan då bli ett betydligt dyrare, mer omfattande jobb.'],
]

export default function BromssystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page brake-page">
        <section className="services-page__hero" aria-labelledby="brake-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="brake-page-title">Bromssystem <span className="title-accent">när säkerheten måste fungera</span></h1>
              <p className="services-page__lead">Bromsarna är bilens viktigaste säkerhetssystem – helt enkelt det som avgör om du stannar i tid eller inte. Slitna bromsar brukar varna i god tid, men bara om du vet vad du ska lyssna och känna efter.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka bromsservice</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av bromsarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Bromsarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide brake-page__intro" aria-labelledby="brake-intro-title">
          <div className="container">
            <div className="services-page__guide-intro"><h2 id="brake-intro-title">Vad ingår i bromssystemet?</h2><p>Bromssystemet består av flera delar som slits i olika takt. En kontroll handlar därför om mer än att bara titta på belägg och skivor.</p></div>
            <div className="brake-page__parts-grid">{brakeParts.map(([title, text]) => <article className="brake-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
            <div className="services-page__guide-intro brake-page__section-gap"><h2>Varför är bromsservice viktigt?</h2></div>
            <div className="services-page__benefit-grid brake-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="brake-page__symptoms" aria-labelledby="brake-symptoms-title">
          <div className="container"><div className="services-page__guide-intro"><h2 id="brake-symptoms-title">Tecken på att bromsarna behöver ses över</h2><p>Du behöver inte själv avgöra exakt vad som är fel. De här signalerna är skäl att låta oss kontrollera systemet.</p></div><div className="brake-page__symptom-grid">{symptoms.map(([title, text]) => <article className="brake-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <section className="brake-page__service" aria-labelledby="brake-service-title"><div className="container"><div className="brake-page__service-card"><div><h2 id="brake-service-title">Det här kan vi hjälpa dig med</h2><p>Vi börjar med att bedöma vad som faktiskt behöver göras och går inte vidare med extra arbete utan ditt godkännande.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="brake-page__guidance" aria-labelledby="brake-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="brake-guidance-title">Mer info</h2><p>Riktvärden kan skilja mellan bilmodeller, körstil och körmiljö. Vi bedömer alltid din bil utifrån dess faktiska skick.</p></div><div className="brake-page__guidance-grid">{guidance.map(([title, text]) => <article className="brake-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="brake-page__safety-note"><strong>Säkerhetsnot:</strong> Bromssystemet är en säkerhetskomponent. En felaktig montering kan få allvarliga konsekvenser, vilket är varför vi rekommenderar att inte utföra bromsbyten själv utan rätt kunskap och verktyg.</aside></div></section>

        <section className="services-page__process-section brake-page__process" aria-labelledby="brake-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="brake-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att förstå processen gör det enklare att veta vad som händer med bilen och varför en bromskontroll ibland behöver ta lite tid.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="bromssystem-faq" heading="Vanliga frågor om bromsar" items={faqs.map(([question, answer]) => ({ question, answer }))} />
        <section className="services-page__pricing brake-page__booking" aria-labelledby="brake-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="brake-booking-title">Boka bromskontroll</h2><p>Priset beror på vilka delar som behöver bytas. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka bromsservice</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
