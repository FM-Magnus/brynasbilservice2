// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Rebuild).
// Proves template reusability for /hjullagerbyte without inventing a new CSS file.
// Zero dependency on index.css; inherits Level 0 tokens and shared-elements.
import { useEffect } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/ServiceGuideTemplate.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { Tip } from '../components/ui/Tip'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideParts, GuideProcess, GuideServiceCard, GuideSymptoms } from '../components/guide/ServiceGuideSections'
import type { GuideInfoCard, GuideSymptom } from '../components/guide/ServiceGuideSections'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { SlidersIcon } from '../components/icons/SlidersIcon'
import { WavesIcon } from '../components/icons/WavesIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import heroWebp from '../assets/images/services/wheel-bearing/wheel-bearing-hub-unit-workbench-hero.webp'
import heroJpg from '../assets/images/services/wheel-bearing/wheel-bearing-hub-unit-workbench-hero.jpg'
import componentsWebp from '../assets/images/services/wheel-bearing/wheel-bearing-hub-assembly-closeup.webp'
import componentsJpg from '../assets/images/services/wheel-bearing/wheel-bearing-hub-assembly-closeup.jpg'
import inspectionWebp from '../assets/images/services/wheel-bearing/wheel-bearing-play-inspection-portrait.webp'
import inspectionJpg from '../assets/images/services/wheel-bearing/wheel-bearing-play-inspection-portrait.jpg'

const trustBadges = [
  { icon: ShieldIcon, title: 'Tyst & säker gång', text: 'Vi åtgärdar missljud och vibrationer i tid.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Rätt pressverktyg och exakt momentdragning.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Vi byter enbart det lager som faktiskt är defekt.' },
] as const

const parts = [
  { title: 'Förseglat hjullager', text: 'En underhållsfri och förseglad enhet med livstidssmörjmedel som möjliggör fri rotation med minimal friktion under enorm belastning och miljontals varv.' },
  { title: 'Komplett navenhet', text: 'På många moderna bilar sitter lagret integrerat i hjulnavet som en färdig modul, vilket ger hög stabilitet och byts som en hel enhet.' },
  { title: 'Inbyggd ABS-sensor & givarring', text: 'Många hjullager har en integrerad magnetisk sensorring för ABS och antisladd (ESP). Rätt reservdel är avgörande för säkerhetssystemens funktion.' },
] as const

const benefits = [
  { icon: AlertTriangleIcon, title: 'Säkerhet & trygghet', text: 'Ett dåligt hjullager kan i värsta fall skära eller överhettas, vilket riskerar att hjulet låser sig eller att styrförmågan försämras under körning.' },
  { icon: ShieldIcon, title: 'Skyddar kringliggande delar', text: 'Ett glappt lager belastar bromsskivor, bromsok och hjulupphängning onormalt, vilket snabbt kan leda till onödiga följdskador och dyrare reparationer.' },
  { icon: ClockIcon, title: 'Praktisk tidsbesparing', text: 'Eftersom bromsskivor och ok demonteras vid lagerbytet passar vi alltid på att kontrollera bromsarnas skick utan extra arbetskostnad.' },
  { icon: ThumbsUpIcon, title: 'Rätt del för rätt bil', text: 'Vi säkerställer att ersättningslagret matchar bilens specifikationer exakt, särskilt för bilar med ABS-integrerade magnetiska givarringar.' },
] as const

const symptoms: readonly GuideSymptom[] = [
  { icon: Volume2Icon, title: 'Mullrande eller brummande ljud', text: 'Ett dovt, malande eller brummande ljud som ökar med hastigheten är det vanligaste och tydligaste tecknet på ett slitet lager.', featured: true },
  { icon: SlidersIcon, title: 'Ljudet ändras vid kurvtagning', text: 'Brummar det mer när du svänger åt ena hållet och tystnar åt det andra pekar det oftast ut vilken sida lagret sitter på.' },
  { icon: WavesIcon, title: 'Vibrationer i ratt eller golv', text: 'Skakningar och vibrationer som tilltar i högre hastigheter och följer samma mönster och frekvens som missljudet.' },
  { icon: WrenchIcon, title: 'Märkbart glapp vid hjulvickning', text: 'Om hjulet vickas för hand när bilen är upphissad och det känns glappt är lagret redan kraftigt slitet och måste åtgärdas.', urgent: true },
  { icon: GaugeIcon, title: 'Oprecis väghållning i kurvor', text: 'Bilen kan kännas instabil, spårkänslig eller svävande vid kurvtagning på grund av det ökade spelet i hjulnavet.' },
  { icon: AlertTriangleIcon, title: 'Varmt hjulnav efter körning', text: 'Ökad friktion i ett defekt lager alstrar kraftig värme som sprider sig till fälgen och navet, ibland med lukt av bränt fett.', urgent: true },
]

const serviceItems = [
  'Felsökning och lokaliseringskontroll av vilket eller vilka hjullager som orsakar missljud eller vibrationer.',
  'Kontroll av mekaniskt spel, glapp och rullmotstånd med bilen upphissad.',
  'Fackmannamässigt byte av hjullager eller komplett navenhet enligt biltillverkarens anvisningar.',
  'Montering av kvalitetslager med integrerad ABS-sensorring anpassad för bilens styrsystem.',
  'Samtidig kontroll av bromsskivor, belägg och bromsok när komponenterna ändå är demonterade.',
  'Kontroll av hjulupphängning, drivaxeldamasker och kulleder i anslutning till hjulnavet.',
  'Slutkontroll, föreskriven momentdragning och provkörning innan bilen lämnas ut.',
]

const infoCards: readonly GuideInfoCard[] = [
  { icon: ClockIcon, title: 'Livslängd och intervall', text: 'Hjullager håller normalt 80 000–200 000 km beroende på körstil, fukt, salt och väglag. Framhjulslager slits ofta snabbare då de bär mer tyngd och styrkrafter.' },
  { icon: ThumbsUpIcon, title: 'Behöver inte bytas i par', text: 'Till skillnad från stötdämpare och bromsar behöver hjullager inte bytas parvis. Det är fullt tillräckligt och tryggt att enbart byta det lager som är slitet.' },
  { icon: GaugeIcon, title: 'Känsliga ABS-sensorer', text: 'Moderna lager har ofta magnetiska givarringar. Felaktig del eller ovarsam montering gör att ABS- och antisladdsystem slutar fungera och varnar.', flag: 'VIKTIGT' },
  { icon: AlertTriangleIcon, title: 'Undvik dyra följdskador', text: 'Att köra för länge med ett glappt lager riskerar att skada bromsskiva, bromsok eller hjulspindel på grund av kraftig värmeutveckling.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', `Boka enkelt tid online eller ring oss och lämna in bilen hos oss på ${BUSINESS.address.street} i ${BUSINESS.address.district}.`],
  ['02', 'Lokaliseringskontroll', 'Vi provkör, hissar upp bilen och känner mekaniskt efter glapp och missljud för att säkra vilket lager som felar.'],
  ['03', 'Demontering av broms & nav', 'Bromsok och skiva demonteras varsamt och det slitna lagret pressas ur eller navenheten skruvas loss.'],
  ['04', 'Montering med moment', 'Nytt kvalitetslager monteras med anpassade verktyg och dras åt till biltillverkarens exakta moment.'],
  ['05', 'Slutkontroll och provkörning', 'Vi provkör bilen, kontrollerar att missljudet är borta och att ABS- och antisladdsystem fungerar felfritt.'],
] as const

const faqs = [
  { question: 'Hur vet jag vilket hjullager som är trasigt?', answer: 'Det tydligaste tecknet är ett dovt, malande eller brummande ljud som ökar i takt med bilens hastighet och ändrar karaktär när du svänger. Svänger du vänster belastas höger sidas lager mer — om ljudet ökar då sitter felet ofta på höger sida. På verkstaden hissar vi upp bilen och snurrar samt vickar på hjulen för att fastställa exakt vilket lager som felar.' },
  { question: 'Kan jag fortsätta köra med ett dåligt hjullager?', answer: 'Ett lager som precis har börjat ge ifrån sig ett svagt brummande fungerar ofta att köra en kortare sträcka med, men det slits snabbare för varje mil. Det finns ingen garanti för hur länge det håller innan det skär eller överhettas. Boka tid så snart du hör ljudet för att undvika onödiga följdskador och säkerhetsrisker.' },
  { question: 'Måste jag byta hjullager på båda sidor samtidigt?', answer: 'Nej, till skillnad från stötdämpare, fjädrar eller bromsar behöver inte hjullager bytas parvis. Hjullager slits ofta oberoende av varandra beroende på vägbana, gropar och fukt. Visar det andra lagret inga tecken på missljud eller glapp räcker det utmärkt att byta det defekta lagret.' },
  { question: 'Vad är skillnaden mellan ett pressat lager och en navenhet?', answer: 'På äldre bilmodeller pressas ofta själva lagret ur och i hjulspindeln med en hydraulpress. På många moderna bilar säljs lagret som en komplett, bultad navenhet (hjulnav med förmonterat lager och integrerad ABS-givare), vilket möjliggör ett snabbare och mer precist byte.' },
  { question: 'Varför tänds ABS-lampan om hjullagret är dåligt?', answer: 'Många moderna hjullager har en inbyggd magnetisk remsa som ABS-sensorn läser av för att mäta hjulets rotationshastighet. Om lagret blir kraftigt glappt, överhettas eller ersätts med felaktig del kan sensorn inte läsa signalen, vilket gör att bilens antisladd- och ABS-system varnar.' },
  { question: 'Hur lång tid tar det att byta ett hjullager?', answer: 'Ett byte tar vanligtvis mellan 1 till 2 timmar per hjul, beroende på bilmodell och om lagret är en bultad enhet eller kräver demontering av spindel och pressning.' },
]

export default function HjullagerbytePage() {
  const { openBooking, bookingModal } = useBookingModal('Gäller hjullagerbyte')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="wheel-bearing-title"
          eyebrow="Chassi & hjulupphängning"
          title={<>Hjullagerbyte i <span className="bb-accent">Gävle</span></>}
          lead="Hjullagret bär upp bilens vikt och ser till att hjulen rullar mjukt och friktionsfritt. Upplever du ett brummande missljud eller vibrationer? Vi lokaliserar det slitna lagret och byter till kvalitetsdelar med rätt specifikation."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Ny navenhet med integrerat hjullager och hjulbultar på en arbetsbänk i verkstaden', lazy: true }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="wheel-bearing-intro-title"
          heading="Vad gör ett hjullager?"
          image={{ webp: componentsWebp, jpg: componentsJpg, alt: 'Hjullager, hjulnav, monteringsbultar och ABS-kontakt på arbetsbänk i verkstaden' }}
          caption="Minimal friktion, maximal driftsäkerhet."
        >
          <p>Hjullagret gör att hjulet kan snurra fritt med minimal friktion samtidigt som det bär upp bilens vikt. På moderna bilar är lagret en förseglad, underhållsfri enhet som roterar miljontals varv under hård belastning.</p>
          <GuideParts items={parts} />
          <Tip
            title="Orolig för ett brummande eller malande missljud?"
            text="Vi hissar upp bilen och kontrollerar mekaniskt vilket lager som orsakar ljudet."
            action={<button type="button" onClick={openBooking} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>}
          />
        </GuideIntro>

        <GuideImportance
          id="wheel-bearing-importance-title"
          heading="Varför är det viktigt att åtgärda i tid?"
          text="Ett dåligt hjullager påverkar inte bara komforten – det riskerar säkerheten och kan orsaka dyra följdskador."
          items={benefits}
        />

        <GuideSymptoms
          id="wheel-bearing-symptoms-title"
          heading="Tecken på ett slitet eller trasigt hjullager"
          text="Ett dåligt hjullager ger nästan alltid ifrån sig tydliga varningssignaler innan det havererar helt. Här är de vanligaste tecknen du bör vara uppmärksam på."
          items={symptoms}
          image={{ webp: inspectionWebp, jpg: inspectionJpg, alt: 'Mekaniker undersöker hjullager och glapp under lyft bil i verkstaden' }}
          caption="Säker gång och kontroll av glapp."
        >
          <Tip
            title="Bra att veta om missljud:"
            text="Ett hjullager som precis börjat ge missljud går ofta att köra en kortare sträcka med, men slitaget ökar snabbt. Eftersom det inte går att förutse exakt när lagret havererar helt rekommenderar vi att boka kontroll så snart missljudet uppstår."
          />
        </GuideSymptoms>

        <GuideServiceCard
          id="wheel-bearing-service-title"
          text="Vi felsöker, lokaliserar och byter slitna hjullager med rätt pressverktyg och kvalitetsdelar anpassade för din bils hjulupphängning och säkerhetssystem."
          items={serviceItems}
        />

        <GuideInfo
          id="wheel-bearing-guidance-title"
          heading="Viktig information om hjullager"
          text="Här är praktiska riktlinjer och fakta kring hjullagrets funktion och underhåll. Vi undersöker alltid bilens faktiska skick innan vi föreslår åtgärder."
          cards={infoCards}
          safety={<><strong>Säkerhetsnotis:</strong> Ett slitet hjullager är inte något att skjuta upp i onödan. Även om missljudet kan pågå en tid finns det en överhängande risk för överhettning eller att lagret skär, vilket i värsta fall kan leda till att hjulet låser sig i hög hastighet.</>}
        />

        <GuideProcess
          id="wheel-bearing-process-title"
          text="Att byta hjullager kräver fackmannamässiga verktyg, renhet och rätt åtdragningsmoment. Så här ser vår strukturerade process ut."
          steps={processSteps}
        />

        <BiltjansterFaq id="hjullager-faq" heading="Vanliga frågor om hjullagerbyte" items={faqs} />

        <GuideClosing
          id="wheel-bearing-booking-title"
          heading="Boka byte av hjullager"
          text={<>Priset för att byta hjullager varierar beroende på om din bil har en bultad komplett navenhet eller ett pressat lager, samt om det gäller fram- eller bakhjul. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift anpassad för din bilmodell.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
