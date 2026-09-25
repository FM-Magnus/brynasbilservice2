// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, First Sibling Proof).
// Proves template reusability for /kamrem without inventing a new CSS file.
// Zero dependency on index.css; inherits Level 0 tokens and shared-elements.
import { useEffect } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/ServiceGuideTemplate.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { Tip } from '../components/ui/Tip'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideParts, GuideServiceCard, GuideSymptoms } from '../components/guide/ServiceGuideSections'
import type { GuideInfoCard, GuideSymptom } from '../components/guide/ServiceGuideSections'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import { WavesIcon } from '../components/icons/WavesIcon'
import timingBeltJpg from '../assets/images/services/timing-belt/timing-belt-in-hand.jpg'
import timingBeltWebp from '../assets/images/services/timing-belt/timing-belt-in-hand.webp'
import timingBeltKitJpg from '../assets/images/services/timing-belt/timing-belt-kit-workbench.jpg'
import timingBeltKitWebp from '../assets/images/services/timing-belt/timing-belt-kit-workbench.webp'
import timingBeltInspectionJpg from '../assets/images/services/timing-belt/timing-belt-worn-belt-inspection.jpg'
import timingBeltInspectionWebp from '../assets/images/services/timing-belt/timing-belt-worn-belt-inspection.webp'

const trustBadges = [
  { icon: ShieldIcon, title: 'Förebygg motorhaveri', text: 'Ett kamremsbyte i tid skyddar motorn mot totalhaveri.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Exakt nollställning och låsning med modellanpassade specialverktyg.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Vi kontrollerar intervall via reg.nr och ger fast prisuppgift.' },
] as const

const parts = [
  { title: 'Kamrem & spännrullar', text: 'Driver kamaxeln och ser till att motorns ventiler öppnas och stängs i exakt synk med kolvarnas rörelse.' },
  { title: 'Kamkedja', text: 'Alternativ konstruktion i metall på vissa motorer. Den har ofta inget fast bytesintervall, men kan också slitas och ska bedömas om motorn låter eller visar fel.' },
  { title: 'Vattenpump', text: 'Drivs ofta av kamremmen och kontrolleras eller byts normalt samtidigt för att undvika framtida haveri och dubbel arbetskostnad.' },
] as const

const benefits = [
  { title: 'Förebygger katastrofal motorskada', text: 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motor kostar att reparera eller byta efter ett rembrott.' },
  { title: 'Rätt intervall för just din motor', text: 'Vi identifierar bytesintervallet utifrån bilens specifika motor, inte bara modellnamnet, eftersom det kan skilja mellan varianter.' },
  { title: 'Helhetsbedömning', text: 'Eftersom motorn ändå är demonterad kontrollerar vi relaterade delar som vattenpump och spännrullar som annars kräver ett eget, dyrare ingrepp.' },
  { title: 'Trygghet & andrahandsvärde', text: 'Ett dokumenterat kamremsbyte i serviceboken är en av de viktigaste trygghetsfaktorerna vid bilägande och försäljning.' },
] as const

const symptoms: readonly GuideSymptom[] = [
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

const infoCards: readonly GuideInfoCard[] = [
  { icon: InfoIcon, title: 'Fråga vad offerten omfattar', text: 'På många motorer driver kamremmen även vattenpumpen, och tillverkare av reservdelar rekommenderar då att pumpen, spännrullarna och styrrullarna byts samtidigt. Be därför om en offert som visar vilka delar som ingår, så att du kan jämföra priser på lika villkor.' },
  { icon: InfoIcon, title: 'Kontrollera alltid via registreringsnummer', text: 'Bytesintervallet anges av biltillverkaren i tid och körsträcka för varje motor och kan skilja mycket, även inom samma modell. Det ska kontrolleras mot bilens registreringsnummer eller chassinummer, inte gissas utifrån modellnamnet eller en allmän tumregel.', flag: 'VIKTIGT' },
  { icon: GaugeIcon, title: 'Arbetstid i verkstaden', text: 'Ett kamremsbyte tar normalt 2–6 timmars arbetstid beroende på bilmodell och hur trångt motorutrymmet är. Detta är ett branschmässigt riktvärde.' },
]

const faqs = [
  { question: 'Hur vet jag om min bil har kamrem eller kamkedja?', answer: 'Det beror på motorn, inte bara bilmodellen – samma modell kan ha kamrem på en motorvariant och kamkedja på en annan. Vi slår gärna upp vad som gäller för just din bil via registreringsnumret.' },
  { question: 'Får jag någon varning innan kamremmen går sönder?', answer: 'Sällan en tillförlitlig sådan. Vissa tecken som missljud eller oljeläckage kan förekomma, men en kamrem kan också gå av helt utan förvarning. Det är därför bytesintervallet ska följas strikt oavsett hur bra bilen känns.' },
  { question: 'Vad händer om kamremmen går sönder under körning?', answer: 'På motorer med interferenskonstruktion (vanligast idag) slår kolvarna rakt in i de öppna ventilerna. Detta leder till böjda ventiler, skadade kolvar och ofta totalt motorhaveri. Misstänker du att det har hänt – försök absolut inte starta om motorn.' },
  { question: 'Varför byts vattenpumpen ofta samtidigt som kamremmen?', answer: 'Eftersom vattenpumpen på många motorer drivs av kamremmen och kräver samma demontering, är det ekonomiskt fördelaktigt att byta den samtidigt. Om en gammal vattenpump skär kort efter kamremsbytet kan det orsaka ett nytt rembrott.' },
  { question: 'Vad kostar ett kamremsbyte jämfört med en motorskada?', answer: 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motorrenovering eller motorbyte kostar efter ett haveri, där notan snabbt kan överstiga bilens restvärde.' },
  { question: 'Hur lång tid tar ett kamremsbyte?', answer: 'Normalt tar arbetet 2–6 timmar beroende på bilmodell och hur trångt motorutrymmet är. Ring oss så ger vi en specifik tidsuppskattning för din bil.' },
]

export default function KamremPage() {
  const { openBooking, bookingModal } = useBookingModal('Gäller kamremsbyte')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="kamrem-title"
          eyebrow="Förebyggande motorskydd"
          title={<>Kamremsbyte i <span className="bb-accent">Gävle</span></>}
          lead="Kamremmen synkroniserar motorns vevaxel och kamaxel så att kolvar och ventiler rör sig i exakt rätt takt. Det är en av bilens mest kritiska delar där ett missat byte kan leda till totalt motorhaveri."
          image={{ webp: timingBeltWebp, jpg: timingBeltJpg, alt: 'Kamrem som hålls upp vid ett motorarbete', slot: 'timing-belt-hero' }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="kamrem-intro-title"
          heading="Vad är en kamrem?"
          image={{ webp: timingBeltKitWebp, jpg: timingBeltKitJpg, alt: 'Ny kamrem, spännrullar och vattenpump på en verkstadsbänk' }}
          caption="Precision, synk och driftsäkerhet."
        >
          <p>Värt att veta innan man läser vidare: inte alla bilar har kamrem. Vissa motorer har istället kamkedja i metall, som ofta saknar fast bytesintervall. Eftersom samma bilmodell kan ha kamrem på en motorvariant och kamkedja på en annan räcker inte modellnamnet ensamt för att veta vad som gäller din bil.</p>
          <GuideParts items={parts} />
          <Tip
            title="Osäker på om din bil har rem eller kedja?"
            text="Vi slår upp exakta uppgifter i biltillverkarens databas utifrån ditt registreringsnummer."
            action={<button type="button" onClick={openBooking} className="bb-btn bb-btn--teal service-guide__btn">Fråga oss<ArrowRightIcon aria-hidden="true" /></button>}
          />
        </GuideIntro>

        <GuideImportance
          id="kamrem-importance-title"
          heading="Varför är det viktigt att byta i tid?"
          text="Ett förebyggande kamremsbyte kostar en bråkdel av vad en motor kostar att reparera efter ett haveri."
          items={benefits}
        />

        <GuideSymptoms
          id="kamrem-symptoms-title"
          heading="Varningstecken och när kamremmen ska bytas"
          text="Till skillnad från de flesta andra delar på bilen ger kamremmen sällan någon tillförlitlig förvarning innan den går sönder. Vissa tecken kan förekomma, men de ska aldrig tolkas som att det finns gott om tid."
          items={symptoms}
          image={{ webp: timingBeltInspectionWebp, jpg: timingBeltInspectionJpg, alt: 'Hand som inspekterar en kamrem intill motorns remhjul' }}
          caption="Rätt intervall och åtgärd i tid."
          landscape
        />

        <GuideServiceCard
          id="kamrem-service-title"
          heading="Det här ingår i ett kamremsbyte"
          text="Vi utför kompletta kamremsbyten med kvalitetsdelar anpassade för just din motors specifikation och nollställer motorn med specialverktyg."
          items={serviceItems}
        />

        <GuideInfo
          id="kamrem-info-title"
          heading="Intervall och säkerhet"
          text="Här finns generella riktlinjer och fakta kring kamremsintervall och motorkonstruktion. Vi kontrollerar alltid vad som gäller specifikt för din bil."
          cards={infoCards}
          safety={<><strong>Säkerhetsnotis:</strong> De flesta moderna motorer är interferensmotorer, vilket innebär att kolvar och ventiler kolliderar om remmen brister med totalt motorhaveri som följd. Misstänker du att kamremmen har gått av under färd – gör inga försök att starta motorn igen.</>}
        />

        <BiltjansterFaq id="kamrem-faq" heading="Vanliga frågor om kamrem" items={faqs} />

        <GuideClosing
          id="kamrem-booking-title"
          heading="Boka kamremsbyte"
          text={<>Priset beror på bilmodell, motortyp och om vattenpump samt spännrullar ingår i bytet. Ring oss på {BUSINESS.phone.display} för en tydlig och fast prisuppgift innan vi sätter igång.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
