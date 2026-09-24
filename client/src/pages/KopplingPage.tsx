// Rebuilt from scratch 2026-09-16 as Magnus's template for the other bland
// guide pages. Styled entirely by ../styles/ServiceGuideTemplate.css — this
// page has NO dependency on any page-specific rule in client/src/css/index.css.
// Reuse ServiceGuideTemplate.css for future rebuilds; do not fork its classes
// into another colocated file, and do not add rules for this page to index.css.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { Tip } from '../components/ui/Tip'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideParts, GuideProcess, GuideServiceCard, GuideSymptoms } from '../components/guide/ServiceGuideSections'
import type { GuideSymptom } from '../components/guide/ServiceGuideSections'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { UsersIcon } from '../components/icons/UsersIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { HourglassIcon } from '../components/icons/HourglassIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import heroJpg from '../assets/images/services/clutch/clutch-under-vehicle-workshop.jpg'
import heroWebp from '../assets/images/services/clutch/clutch-under-vehicle-workshop.webp'
import componentsJpg from '../assets/images/services/clutch/clutch-components-on-bench.jpg'
import componentsWebp from '../assets/images/services/clutch/clutch-components-on-bench.webp'
import symptomsJpg from '../assets/images/services/clutch/mechanic-under-vehicle-diagnosis.jpg'
import symptomsWebp from '../assets/images/services/clutch/mechanic-under-vehicle-diagnosis.webp'
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

const symptoms: readonly GuideSymptom[] = [
  { icon: GaugeIcon, title: 'Kopplingen slirar', text: 'Motorvarvtalet stiger utan att farten hänger med. Det märks ofta först i uppförsbacke eller vid hård acceleration, och kan ibland lukta bränt.', featured: true },
  { icon: SlidersIcon, title: 'Greppunkten har flyttat sig', text: 'Om pedalen griper mycket högt upp, nära toppen av rörelsen, är friktionsbelägget ofta kraftigt nedslitet.' },
  { icon: WrenchIcon, title: 'Svårt att lägga i växlar', text: 'Knastrande eller knirrande ljud kan tyda på att kopplingen inte frikopplar ordentligt, ofta på grund av ett urtrampningsproblem.' },
  { icon: WavesIcon, title: 'Vibrationer eller ryck', text: 'När du släpper upp kopplingen kan vibrationer bero på sliten lamell, oljeläckage på belägget eller ett slitet svänghjul.' },
  { icon: Volume2Icon, title: 'Ljud när pedalen trycks ner', text: 'Ett gnisslande eller morrande ljud pekar ofta mot ett slitet urtrampningslager och försvinner ofta när pedalen släpps.' },
]

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

export default function KopplingPage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="koppling-title"
          eyebrow="Kraftöverföring & drivlina"
          title={<>Koppling <span className="bb-accent">när</span><br />kraften behöver<br />nå hjulen</>}
          lead="Kopplingen överför kraften mellan motorn och växellådan och gör att du kan växla utan att motorn stannar eller rycker till. Den är en slitdel, och att den till slut behöver bytas är en förväntad del av bilens underhåll."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Mekaniker arbetar med kopplingen under en lyft bil i verkstaden', lazy: true }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="koppling-intro-title"
          heading="Vad är en koppling?"
          image={{ webp: componentsWebp, jpg: componentsJpg, alt: 'Kopplingssats med lamell, tryckplatta och svänghjul på en arbetsbänk' }}
          caption="Samma kraft. En mjukare resa."
        >
          <p>Varje gång du släpper upp kopplingspedalen sliter friktionsmaterialet på kopplingsskivan lite grann. Därför är ett framtida byte inte i sig ett fel, utan en del av bilens normala underhåll.</p>
          <GuideParts items={components} />
          <Tip
            title="Osäker på vad som gäller för din bil?"
            text="Vi läser av felkoder, gör en bedömning och förklarar vad som behöver åtgärdas – utan överraskningar."
            action={<Link to="/felsokning" className="bb-btn bb-btn--teal service-guide__btn">Boka en felsökning<ArrowRightIcon aria-hidden="true" /></Link>}
          />
        </GuideIntro>

        <GuideImportance
          id="koppling-importance-title"
          heading="Varför är det viktigt att åtgärda i tid?"
          text="En sliten koppling påverkar inte bara körkomforten. Om den inte byts i tid kan det leda till följdskador och högre reparationskostnader."
          items={importance}
        />

        <GuideSymptoms
          id="koppling-symptoms-title"
          heading="Tecken på att kopplingen behöver ses över"
          text="Du behöver inte själv avgöra exakt vilken del som är problemet. De här signalerna är skäl att låta oss bedöma bilen."
          items={symptoms}
          image={{ webp: symptomsWebp, jpg: symptomsJpg, alt: 'Mekaniker från Brynäs Bilservice arbetar under en lyft bil' }}
          caption="Vi hittar problemet – innan det blir större."
        />

        <GuideServiceCard
          id="koppling-service-title"
          text="Vi börjar med att bedöma vad som faktiskt behöver göras och kontaktar dig innan vi går vidare med arbete utöver den första bedömningen."
          items={serviceItems}
        />

        <GuideInfo
          id="koppling-info-title"
          heading="Mer info"
          text="Här finns generella riktvärden som kan hjälpa dig att förstå omfattningen. Vi bedömer alltid din bil utifrån dess faktiska skick."
          cards={infoCards}
          safetyIcon={InfoIcon}
          safety={<><strong>Säkerhetsnot:</strong> Ett kopplingsbyte är ett omfattande ingrepp i drivlinan. Vi rekommenderar inte att göra det själv utan rätt specialverktyg och erfarenhet av just den här typen av arbete.</>}
        />

        <GuideProcess
          id="koppling-process-title"
          text="Att förstå processen gör det enklare att veta vad som händer med bilen och varför ett större drivlinearbete ibland behöver ta lite tid."
          steps={processSteps}
        />

        <BiltjansterFaq id="koppling-faq" heading="Vanliga frågor om koppling" items={faqs} />

        <GuideClosing
          id="koppling-booking-title"
          heading="Boka kopplingskontroll"
          text={<>Priset beror på bilmodell, vilket typ av kopplingssats som krävs och om svänghjulet behöver bytas samtidigt. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
