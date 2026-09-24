// Rebuilt 2026-09-16 on the shared ServiceGuideTemplate first built for
// /koppling — third proof the template is reusable, not a second design.
// The one addition here is a single --urgent (amber) symptom-row modifier
// for the most safety-critical warning sign, alongside the existing teal
// --featured modifier. No dependency on any page-specific rule in index.css.
import { useEffect } from 'react'
import { BUSINESS } from '../data/business'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideParts, GuideProcess, GuideServiceCard, GuideSymptoms } from '../components/guide/ServiceGuideSections'
import type { GuideSymptom } from '../components/guide/ServiceGuideSections'
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
import heroWebp from '../assets/images/services/brakes/brakes-disc-caliper-workshop-hero.webp'
import heroJpg from '../assets/images/services/brakes/brakes-disc-caliper-workshop-hero.jpg'
import componentsWebp from '../assets/images/services/brakes/brakes-components-caliper-pads.webp'
import componentsJpg from '../assets/images/services/brakes/brakes-components-caliper-pads.jpg'
import inspectionWebp from '../assets/images/services/brakes/brakes-mechanic-caliper-inspection-portrait.webp'
import inspectionJpg from '../assets/images/services/brakes/brakes-mechanic-caliper-inspection-portrait.jpg'
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

const symptoms: readonly GuideSymptom[] = [
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

export default function BromssystemPage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="brake-title"
          eyebrow="Bromsservice & säkerhet"
          title={<>Bromssystem<br />när <span className="bb-accent">säkerheten</span><br />måste fungera</>}
          lead="Bromsarna är bilens viktigaste säkerhetssystem – helt enkelt det som avgör om du stannar i tid eller inte. Slitna bromsar brukar varna i god tid, men bara om du vet vad du ska lyssna och känna efter."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Ventilerad bromsskiva och bromsok monterat på lyft fordon i verkstaden', lazy: true }}
          trustBadges={trustBadges}
          onBooking={openBooking}
          bookLabel="Boka bromsservice"
        />

        <GuideIntro
          id="brake-intro-title"
          heading="Vad ingår i bromssystemet?"
          image={{ webp: componentsWebp, jpg: componentsJpg, alt: 'Bromsok, bromsbelägg, monteringsfjädrar och slitagesensor uppradade på verkstadsbänk' }}
          caption="Säkra stopp, varje mil räknas."
        >
          <p>Bromssystemet består av flera delar som slits i olika takt. En kontroll handlar därför om mer än att bara titta på belägg och skivor.</p>
          <GuideParts items={brakeParts} />
        </GuideIntro>

        <GuideImportance
          id="brake-importance-title"
          heading="Varför är bromsservice viktigt?"
          text="Bromsarna är inte en del du ska chansa med. Så här tänker vi kring varje bromsjobb."
          items={importance}
        />

        <GuideSymptoms
          id="brake-symptoms-title"
          heading="Tecken på att bromsarna behöver ses över"
          text="Du behöver inte själv avgöra exakt vad som är fel. De här signalerna är skäl att låta oss kontrollera systemet."
          items={symptoms}
          image={{ webp: inspectionWebp, jpg: inspectionJpg, alt: 'Mekaniker mäter bromsskivans tjocklek med digitalt skjutmått under lyft bil i verkstaden' }}
          caption="Vi hittar problemet – innan det blir större."
        />

        <GuideServiceCard
          id="brake-service-title"
          text="Vi börjar med att bedöma vad som faktiskt behöver göras och går inte vidare med extra arbete utan ditt godkännande."
          items={serviceItems}
        />

        <GuideInfo
          id="brake-info-title"
          heading="Mer info"
          text="Riktvärden kan skilja mellan bilmodeller, körstil och körmiljö. Vi bedömer alltid din bil utifrån dess faktiska skick."
          cards={infoCards}
          safetyIcon={InfoIcon}
          safety={<><strong>Säkerhetsnot:</strong> Bromssystemet är en säkerhetskomponent. En felaktig montering kan få allvarliga konsekvenser, vilket är varför vi rekommenderar att inte utföra bromsbyten själv utan rätt kunskap och verktyg.</>}
        />

        <GuideProcess
          id="brake-process-title"
          text="Att förstå processen gör det enklare att veta vad som händer med bilen och varför en bromskontroll ibland behöver ta lite tid."
          steps={processSteps}
        />

        <BiltjansterFaq id="bromssystem-faq" heading="Vanliga frågor om bromsar" items={faqs} />

        <GuideClosing
          id="brake-booking-title"
          heading="Boka bromskontroll"
          text={<>Priset beror på vilka delar som behöver bytas. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</>}
          onBooking={openBooking}
          bookLabel="Boka bromsservice"
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
