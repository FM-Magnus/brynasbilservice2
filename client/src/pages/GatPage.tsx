// GAT (German Automotive Technology): Brynäs Bilservice is an authorised reseller
// and uses the products in the workshop (Magnus, 2026-10-01). Built on the shared
// ServiceGuideTemplate like the other guides; copy is original Swedish, written
// from the three GAT posters on the workshop wall and general workshop knowledge.
// What the products do is attributed to the manufacturer on purpose.
// DRAFT GUIDANCE / FACT TO CONFIRM (Maher): which treatments the workshop sells
// as a service, prices, time per treatment, and whether private customers can
// buy the products over the counter. Nothing numeric is stated below.
import { useEffect } from 'react'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { GatSpotlight } from '../components/ui/GatSpotlight'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideQuickFacts, GuideRelated, GuideServiceCard, GuideTopic } from '../components/guide/ServiceGuideSections'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import heroWebp from '../assets/images/services/gat/gat-products-bench-hero.webp'
import engineFlushWebp640 from '../assets/images/services/gat/gat-spotlight-engine-flush-640.webp'
import engineFlushWebp1200 from '../assets/images/services/gat/gat-spotlight-engine-flush-1200.webp'
import dieselWebp640 from '../assets/images/services/gat/gat-spotlight-diesel-system-cleaner-640.webp'
import dieselWebp1200 from '../assets/images/services/gat/gat-spotlight-diesel-system-cleaner-1200.webp'
import fuelWebp640 from '../assets/images/services/gat/gat-spotlight-fuel-system-cleaner-640.webp'
import fuelWebp1200 from '../assets/images/services/gat/gat-spotlight-fuel-system-cleaner-1200.webp'
import '../styles/ServiceGuideTemplate.css'
import './GatPage.css'

const trustBadges = [
  { icon: CheckIcon, title: 'Auktoriserad återförsäljare', text: 'Vi säljer och använder GAT-produkterna i vår egen verkstad.' },
  { icon: WrenchIcon, title: 'Rätt produkt för din bil', text: 'Bensin, diesel eller motorns insida – vi väljer efter hur bilen används.' },
  { icon: ShieldIcon, title: 'Tydlig rådgivning', text: 'Vi säger också när en tillsats inte är lösningen.' },
] as const

const importance = [
  { title: 'Motorn får avlagringar med tiden', text: 'Slam, sot och förbränningsrester kan byggas upp inne i motorn, särskilt vid mycket kortkörning och långa serviceintervall. Det är en process som går långsamt och därför sällan märks förrän något börjar fungera sämre.' },
  { title: 'Bränslesystemet behöver hållas rent', text: 'Smuts och avlagringar kring insprutare och ventiler kan påverka hur bränslet förbränns. Det kan märkas som ojämn tomgång, ryckig gång eller högre förbrukning.' },
  { title: 'Förebyggande vård är billigare än reparation', text: 'En behandling i tid är en liten kostnad jämfört med att byta delar som slitits i onödan. Den ersätter dock aldrig vanlig service, och inte heller en felsökning när bilen faktiskt har ett fel.' },
] as const

const products = [
  { title: 'Engine Flush', text: 'är en invändig motorrengöring som används inför oljebyte. Enligt GAT är den avsedd att lösa upp slam och avlagringar så att de följer med den gamla oljan ut, och ge ny olja en renare motor att arbeta i.' },
  { title: 'Diesel System Cleaner Plus', text: 'är till för dieselbilar. Enligt GAT rengör den bränslesystemet och insprutningen och ger ett korrosionsskydd, vilket ska bidra till jämnare förbränning och lugnare tomgång.' },
  { title: 'Fuel System Cleaner Plus', text: 'är motsvarigheten för bensinbilar. Enligt GAT rengör den bränslesystemet och motorns insida kring förbränningen, med målet jämn gång, lägre förbrukning och bättre driftsäkerhet.' },
] as const

const includedItems = [
  'Samtal om bilen, hur den körs och vad du har märkt',
  'Val av rätt GAT-produkt för bensin, diesel eller motorns insida',
  'Behandling enligt tillverkarens anvisning för just den produkten',
  'Rådgivning om vad som lämpar sig att kombinera med oljebyte eller service',
  'Ett ärligt besked om en tillsats räcker eller om bilen behöver felsökas',
]

const infoCards = [
  { icon: GaugeIcon, title: 'När är det aktuellt?', text: 'Vanliga skäl är mycket kortkörning, lång tid sedan senaste rengöringen, ojämn tomgång eller att du vill ge en motor med många mil extra omtanke. Vi bedömer det tillsammans med dig.' },
  { icon: ShieldIcon, title: 'Alla märken och motorer', text: 'Produkterna finns för både bensin- och dieselmotorer. Vi väljer det som passar din bil och berättar vad vi rekommenderar och varför.' },
] as const

const spotlightSlides = [
  { label: 'Engine Flush', alt: 'GAT Engine Flush: Fräsch olja förtjänar en ren motor. Rengör motorn invändigt före oljebyte och löser upp avlagringar som följer med den gamla oljan ut. Rengör oljekanaler och kolvringar, löser upp oljeslam och avlagringar, ger den nya oljan en renare start. Finns hos Brynäs Bilservice.', webp640: engineFlushWebp640, webp1200: engineFlushWebp1200 },
  { label: 'Diesel System Cleaner', alt: 'GAT Diesel System Cleaner: Låt dieselmotorn arbeta renare. Löser upp avlagringar i dieselsystemet och hjälper till att hålla insprutningen ren. Rengör från tank till förbränningsrum, binder fukt i bränslesystemet, hjälper till att skydda mot korrosion. Finns hos Brynäs Bilservice.', webp640: dieselWebp640, webp1200: dieselWebp1200 },
  { label: 'Fuel System Cleaner', alt: 'GAT Fuel System Cleaner: Ge bensinmotorn en renare start. Löser upp avlagringar i bränslesystemet och hjälper till att hålla insprutningen ren. Rengör från tank till förbränningsrum, bidrar till effektivare förbränning, hjälper till att skydda mot korrosion. Finns hos Brynäs Bilservice.', webp640: fuelWebp640, webp1200: fuelWebp1200 },
] as const

const faqs = [
  { question: 'Är ni auktoriserade återförsäljare av GAT?', answer: 'Ja. Vi använder GAT-produkterna i vår egen verkstad och är auktoriserad återförsäljare.' },
  { question: 'Vad kostar en GAT-behandling?', answer: 'Priset beror på produkt och bil. Ring oss så får du en tydlig prisuppgift innan vi sätter igång.' },
  { question: 'Ersätter en GAT-behandling oljebyte eller service?', answer: 'Nej. Engine Flush är till exempel avsedd att användas inför ett oljebyte, inte i stället för det. Behandlingarna är ett komplement till vanlig service.' },
  { question: 'Hur vet jag vilken produkt min bil behöver?', answer: 'Det avgörande är om bilen går på bensin eller diesel och hur den har körts. Beskriv bilen när du ringer eller bokar, så rekommenderar vi rätt produkt.' },
  { question: 'Kan det här laga ett fel på bilen?', answer: 'En rengöring kan ge en jämnare gång, men den är inte en reparation. Har bilen en varningslampa eller ett tydligt fel börjar vi med en felsökning.' },
]

export default function GatPage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide gat-page">
        <GuideHero
          id="gat-title"
          eyebrow="Motor- & bränslesystemvård"
          title={<>GAT-vård<br />för en <span className="bb-accent">renare</span><br />motor</>}
          lead="Vi är auktoriserad återförsäljare av GAT och använder produkterna i vår egen verkstad. Med rätt tillsats kan motorns insida och bränslesystemet hållas rena, som ett komplement till oljebyte och service."
          image={{ webp: heroWebp, alt: '' }}
          trustBadges={trustBadges}
          onBooking={openBooking}
          bookLabel="Boka GAT-behandling"
        />

        <GuideQuickFacts time="Beror på behandling" />

        <GuideIntro
          id="gat-intro-title"
          heading="Vad är GAT?"
          media={<GatSpotlight slides={spotlightSlides} />}
        >
          <p>GAT, German Automotive Technology, är ett tyskt märke för vård av motor och bränslesystem. Produkterna tillsätts i oljan eller i bränslet och är framtagna för att hålla motorns insida och insprutningen rena. Enligt tillverkaren är kvaliteten TÜV-certifierad.</p>
          <p>Hos oss är GAT inget vi bara säljer över disk. Vi använder dem själva, och vi hjälper dig välja rätt produkt och rätt tillfälle, så att du inte köper något din bil inte behöver.</p>
        </GuideIntro>

        <GuideImportance
          id="gat-importance-title"
          heading="Därför kan motorvård vara värt det"
          text="En motor och ett bränslesystem som hålls rena arbetar jämnare. Det handlar om att förebygga, inte att laga."
          items={importance}
        />

        <GuideTopic
          id="gat-products-title"
          heading="Produkterna vi arbetar med"
          text="Tre produkter täcker det vanligaste behovet. Vad de gör beskriver vi som GAT själva gör, och vi säger det rakt när en tillsats inte är rätt väg."
          items={products}
          columns={3}
        />

        <GuideServiceCard
          id="gat-service-title"
          heading="Så går det till hos oss"
          text="En GAT-behandling hos Brynäs Bilservice omfattar:"
          items={includedItems}
        />

        <GuideInfo
          id="gat-info-title"
          heading="Bra att veta"
          text="Några saker som hjälper dig avgöra om en GAT-behandling passar din bil."
          cards={infoCards}
          safetyIcon={InfoIcon}
          safety={<><strong>Viktigt:</strong> En tillsats ersätter aldrig service, oljebyte eller felsökning. Lyser en varningslampa, eller går bilen tydligt sämre, rekommenderar vi att vi först tar reda på orsaken.</>}
        />

        <BiltjansterFaq id="gat-faq" heading="Vanliga frågor om GAT" items={faqs} />

        <GuideRelated route="/gat" />

        <GuideClosing
          id="gat-booking-title"
          heading="Boka GAT-behandling"
          text="Ring oss eller boka en tid, så hjälper vi dig välja rätt produkt och ger en tydlig prisuppgift innan vi sätter igång."
          onBooking={openBooking}
          bookLabel="Boka GAT-behandling"
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
