import { useEffect, useState } from 'react'
import './KopplingPage.css'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Kopplingssatsen', 'Lamell, tryckplatta och urtrampningslager byts normalt tillsammans eftersom arbetet för att komma åt dem är detsamma.'],
  ['Tvåmassesvänghjul', 'På bilar som har ett tvåmassesvänghjul kontrolleras det samtidigt, så att drivlinan inte behöver tas isär igen kort efter arbetet.'],
]

const benefits = [
  ['Undviker följdskador', 'Väntar man för länge kan även svänghjul och urtrampningslager slitas, vilket gör reparationen större och dyrare.'],
  ['Rätt diagnos', 'Ett missljud eller en förändrad pedalkänsla betyder inte alltid att hela kopplingen behöver bytas.'],
  ['Kvalitet', 'Vi använder kopplingssatser som håller måttet för din bilmodell och körning.'],
  ['Trygghet vid större arbete', 'Kopplingsbyte kräver att växellådan demonteras och är inte ett jobb att chansa med utan rätt verktyg och erfarenhet.'],
]

const symptoms = [
  ['Kopplingen slirar', 'Motorvarvtalet stiger utan att farten hänger med. Det märks ofta först i uppförsbacke eller vid hård acceleration, och kan ibland lukta bränt.'],
  ['Greppunkten har flyttat sig', 'Om pedalen griper mycket högt upp, nära toppen av rörelsen, är friktionsbelägget ofta kraftigt nedslitet.'],
  ['Svårt att lägga i växlar', 'Knastrande eller knirrande ljud kan tyda på att kopplingen inte frikopplar ordentligt, ofta på grund av ett urtrampningsproblem.'],
  ['Vibrationer eller ryck', 'När du släpper upp kopplingen kan vibrationer bero på sliten lamell, oljeläckage på belägget eller ett slitet svänghjul.'],
  ['Ljud när pedalen trycks ner', 'Ett gnisslande eller morrande ljud pekar ofta mot ett slitet urtrampningslager och försvinner ofta när pedalen släpps.'],
]

const serviceItems = [
  'Bedömning av om hela kopplingssatsen behöver bytas eller om felet sitter i en enskild komponent, till exempel urtrampningslagret.',
  'Byte av lamell, tryckplatta och urtrampningslager som en samlad kopplingssats.',
  'Kontroll av svänghjulet och byte om det visar tecken på slitage — särskilt relevant på bilar med tvåmassesvänghjul.',
  'Kontroll av kopplingens hydraulik på bilar med hydraulisk urkoppling och luftning av systemet vid behov.',
  'Funktionstest efter monteringen innan bilen lämnas ut.',
]

const guidance = [
  ['Hur länge håller en koppling?', 'En koppling håller vanligtvis mellan 100 000 och 200 000 km beroende på körstil. Mycket stadskörning med start och stopp sliter mer än jämn landsvägskörning. Detta är ett branschmässigt riktvärde, inte en Brynäs-specifik mätning.'],
  ['Arbetstid', 'Ett kopplingsbyte tar normalt 4–10 timmars arbetstid eftersom växellådan måste demonteras för att komma åt kopplingen. Tidsuppgiften är inte bekräftad mot Brynäs egna verkstadstider.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
]

const faqs = [
  ['Hur länge håller en koppling?', 'Vanligtvis mellan 100 000 och 200 000 km, men det varierar mycket med körstil. Mycket stadskörning med start och stopp sliter betydligt mer än jämn landsvägskörning.'],
  ['Måste hela kopplingssatsen bytas, eller räcker det med en del?', 'Det beror på vad som faktiskt är fel. Ibland räcker det med att byta enbart urtrampningslagret, men eftersom arbetet för att komma åt kopplingen är detsamma oavsett görs oftast hela satsen samtidigt för att slippa göra om jobbet inom kort.'],
  ['Varför är kopplingsbyte dyrt jämfört med andra reparationer?', 'Det är främst en fråga om arbetstid. Växellådan måste demonteras för att komma åt kopplingen, vilket tar betydligt längre tid än de flesta andra reparationer.'],
  ['Vad är ett tvåmassesvänghjul, och behöver det bytas samtidigt?', 'Det är en typ av svänghjul som dämpar vibrationer mellan motor och växellåda. Visar det tecken på slitage rekommenderar vi att byta det samtidigt som kopplingen, eftersom det annars kan gå sönder kort efter och tvinga fram ett nytt, lika omfattande ingrepp.'],
  ['Kan jag köra bilen ett tag till om kopplingen börjat slira?', 'Kortsiktigt, men det är inte att rekommendera. Slirning sliter snabbt ut det som är kvar av friktionsbelägget, och i värsta fall kan även svänghjul och urtrampningslager skadas.'],
  ['Hur lång tid tar ett kopplingsbyte?', 'Normalt 4–10 timmars arbetstid beroende på bilmodell, eftersom växellådan behöver demonteras. Ring oss så får du en tidsuppskattning anpassad efter din bil.'],
]

export default function KopplingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page clutch-page">
        <section className="services-page__hero" aria-labelledby="clutch-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="clutch-page-title">Koppling <span className="title-accent">när kraften behöver nå hjulen</span></h1>
              <p className="services-page__lead">Kopplingen överför kraften mellan motorn och växellådan och gör att du kan växla utan att motorn stannar eller rycker till. Den är en slitdel, och att den till slut behöver bytas är en förväntad del av bilens underhåll.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av kopplingsarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Kopplingsarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide clutch-page__intro" aria-labelledby="clutch-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="clutch-intro-title">Vad är en koppling?</h2><p>Varje gång du släpper upp kopplingspedalen sliter friktionsmaterialet på kopplingsskivan lite grann. Därför är ett framtida byte inte i sig ett fel, utan en del av bilens normala underhåll.</p></div>
          <div className="clutch-page__parts-spec">
            {parts.map(([title, text], index) => (
              <div className="clutch-page__spec-item" key={title}>
                <span className="clutch-page__spec-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="services-page__guide-intro clutch-page__section-gap"><h2>Varför är det viktigt att åtgärda i tid?</h2></div>
          <div className="services-page__benefit-grid clutch-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="clutch-page__symptoms" aria-labelledby="clutch-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="clutch-symptoms-title">Tecken på att kopplingen behöver ses över</h2><p>Du behöver inte själv avgöra exakt vilken del som är problemet. De här signalerna är skäl att låta oss bedöma bilen.</p></div>
          <article className="clutch-page__symptom-featured">
            <h3>{symptoms[0][0]}</h3>
            <p>{symptoms[0][1]}</p>
          </article>
          <div className="clutch-page__symptom-grid">{symptoms.slice(1).map(([title, text]) => <article className="clutch-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="clutch-page__service" aria-labelledby="clutch-service-title"><div className="container"><div className="clutch-page__service-card"><div><h2 id="clutch-service-title">Det här kan vi hjälpa dig med</h2><p>Vi börjar med att bedöma vad som faktiskt behöver göras och kontaktar dig innan vi går vidare med arbete utöver den första bedömningen.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="clutch-page__guidance" aria-labelledby="clutch-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="clutch-guidance-title">Mer info</h2><p>Här finns generella riktvärden som kan hjälpa dig att förstå omfattningen. Vi bedömer alltid din bil utifrån dess faktiska skick.</p></div><div className="clutch-page__guidance-grid">{guidance.map(([title, text]) => <article className="clutch-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="clutch-page__safety-note"><strong>Säkerhetsnot:</strong> Ett kopplingsbyte är ett omfattande ingrepp i drivlinan. Vi rekommenderar inte att göra det själv utan rätt specialverktyg och erfarenhet av just den här typen av arbete.</aside></div></section>

        <section className="services-page__process-section clutch-page__process" aria-labelledby="clutch-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="clutch-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att förstå processen gör det enklare att veta vad som händer med bilen och varför ett större drivlinearbete ibland behöver ta lite tid.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="koppling-faq" heading="Vanliga frågor om koppling" items={faqs.map(([question, answer]) => ({ question, answer }))} />
        <section className="services-page__pricing clutch-page__booking" aria-labelledby="clutch-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="clutch-booking-title">Boka kopplingskontroll</h2><p>Priset beror på bilmodell, vilken typ av kopplingssats som krävs och om svänghjulet behöver bytas samtidigt. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
