// Rebuilt 2026-09-16 on the shared ServiceGuideTemplate (see KopplingPage.tsx
// and AvgassystemPage.tsx). No dependency on any page-specific rule in
// index.css. This page is content-heavier than the first two templates —
// it adds a new reusable "topic block" pattern to ServiceGuideTemplate.css
// for the deep-dive viscosity/standards/oil-type/ageing/misconception
// material, since nothing in Koppling or Avgassystem needed that shape.
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { useBookingModal } from '../hooks/useBookingModal'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { Tip } from '../components/ui/Tip'
import { GuideClosing, GuideHero, GuideImportance, GuideInfo, GuideIntro, GuideServiceCard, GuideSymptoms, GuideTopic } from '../components/guide/ServiceGuideSections'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { InfoIcon } from '../components/icons/InfoIcon'
import { HourglassIcon } from '../components/icons/HourglassIcon'
import heroJpg from '../assets/images/services/oil/oil-filter-workbench-hero.jpg'
import heroWebp from '../assets/images/services/oil/oil-filter-workbench-hero.webp'
import funnelJpg from '../assets/images/services/oil/oil-poured-into-funnel.jpg'
import funnelWebp from '../assets/images/services/oil/oil-poured-into-funnel.webp'
import drainJpg from '../assets/images/services/oil/oil-drain-under-car.jpg'
import drainWebp from '../assets/images/services/oil/oil-drain-under-car.webp'
import '../styles/ServiceGuideTemplate.css'

const trustBadges = [
  { icon: WrenchIcon, title: 'Rätt olja för din bil', text: 'Vi väljer viskositet och ACEA-klass som matchar din motor.' },
  { icon: ClockIcon, title: 'Snabb service', text: 'Klart inom en timme i de flesta fall.' },
  { icon: ShieldIcon, title: 'Tydlig rådgivning', text: 'Du får en ärlig bedömning och tydligt prisuppgift.' },
] as const

const importance = [
  { title: 'Skyddar motorns rörliga delar', text: 'Olja som inte byts i tid tappar sin förmåga att smörja och kyla, och ökad friktion sliter ner motorn snabbare än den annars skulle göra.' },
  { title: 'Minskar risken för dyra motorrelaterade reparationer', text: 'Ett oljebyte kostar lite jämfört med en reparation av en motor som har gått på uttjänt olja.' },
  { title: 'Ger en chans att upptäcka annat i tid', text: 'När bilen står på lyften syns läckage, fuktiga packningar och låg nivå på andra vätskor lättare än i vardagen.' },
] as const

const includedItems = [
  'Dränering av den gamla oljan',
  'Byte av oljefilter',
  'Påfyllning av ny olja anpassad efter din bilmodell – rätt viskositet, rätt ACEA-klass och rätt tillverkargodkännande, inte bara "rätt siffra"',
  'Kontroll av oljenivån efter påfyllning',
  'En snabb koll av bilens övriga vätskenivåer samtidigt som vi ändå är där',
]

const oilAgeing = [
  { icon: HourglassIcon, title: 'Tillsatserna förbrukas', text: 'Additiven som håller nere korrosion, renar motorn och stabiliserar viskositeten bryts ner successivt och tappar effekt, oavsett hur få mil bilen gått.' },
  { icon: ShieldIcon, title: 'Föroreningar byggs upp', text: 'Sotpartiklar från förbränningen och små mängder obrända bränsleångor blandas in i oljan och späder ut dess skyddande egenskaper.' },
  { icon: GaugeIcon, title: 'Kondens och fukt', text: 'Särskilt vid mycket korta körsträckor hinner motorn aldrig bli riktigt varm, vilket gör att kondensvatten byggs upp i oljan istället för att kokas bort. Det är en av de vanligaste anledningarna till att kortkörningsbilar behöver tätare oljebyten än vad miltalet ensamt antyder.' },
] as const

const viscosityDetails = [
  { title: 'Siffran före W', text: 'anger flytförmågan vid kyla – ju lägre siffra, desto bättre kallstartsegenskaper. En 0W-olja flyter lättare vid minusgrader än en 10W-olja.' },
  { title: 'Siffran efter W', text: 'anger tjockleken vid motorns normala arbetstemperatur. En 5W-40 blir tjockare vid värme än en 5W-30, vilket ger tjockare oljefilm och något bättre skydd vid hög belastning – men bara om bilen faktiskt är konstruerad för det.' },
]

const oilStandards = [
  { title: 'ACEA A3/B4', text: 'är en robust olja med högre askhalt, vanlig i äldre bilar utan partikelfilter.' },
  { title: 'ACEA C1–C3', text: 'är lågaskoljor ("Low SAPS"), framtagna för bilar med partikelfilter (DPF/OPF) och katalysator. Fyller du en sådan bil med en vanlig A3/B4-olja byggs aska upp i partikelfiltret snabbare än det ska.' },
  { title: 'Tillverkarspecifika godkännanden', text: 'som VW 504.00/507.00, BMW Longlife-04 eller MB 229.51 väger tyngst av allt – de är framtagna och testade specifikt för den motorfamiljen.' },
]

const oilTypes = [
  { title: 'Mineralolja (grupp I–II)', text: 'är rakt utvunnen och raffinerad från råolja, med störst molekylär ojämnhet. Billigast, men klarar sämre av temperatur- och belastningsvariationer.' },
  { title: 'Grupp III', text: 'är mineralolja som hydrocrackats – brutits ner kemiskt och byggts upp igen under högt tryck till en betydligt jämnare molekylstruktur. Här händer något som förvånar många: i Europa får grupp III-oljor marknadsföras och säljas som "helsyntetiska", trots att de i grunden är mineralbaserade. Det är inte marknadsföringsfusk – det är hur regelverket är utformat – men det förklarar varför två flaskor som båda säger "fullsyntetisk 5W-30" ändå kan prestera olika.' },
  { title: 'Grupp IV (PAO – poly-alfa-olefin)', text: 'är den "riktiga" kemiskt syntetiserade oljan, med en molekylstruktur som är jämn redan från start snarare än ombyggd. Den ger generellt bättre smörjande egenskaper än grupp III, oavsett vad viskositetsetiketten säger.' },
  { title: 'Halvsyntetisk olja', text: 'är en blandning av mineral- och syntetbaserad olja, ofta 10–70 % syntetinnehåll, som positionerar sig prismässigt och prestandamässigt mellan mineral- och helsyntetolja.' },
]

const misconceptions = [
  { title: '"Mörk olja är dålig olja."', text: 'Fel – att oljan mörknar är ett tecken på att den gör sitt jobb och binder upp sot och föroreningar istället för att låta dem cirkulera fritt i motorn. Färgen ensam säger inte mycket om oljans faktiska skick.' },
  { title: '"Det räcker att fylla på om nivån sjunker."', text: 'Nej – påfyllning blandar bara ny olja med gammal, redan nedbruten olja. Det löser aldrig samma problem som ett fullständigt byte gör.' },
  { title: '"Dyrare olja är alltid bättre."', text: 'Inte nödvändigtvis. Det som spelar roll är att oljan uppfyller rätt ACEA-klass och tillverkarens specifika godkännande – en korrekt specificerad olja till lägre pris slår en dyr olja som inte matchar din motor.' },
  { title: '"Syntetisk olja behöver aldrig bytas lika ofta."', text: 'Delvis sant, men överdrivet – syntetolja tål mer innan den bryts ner, men additiven i den förbrukas ändå med tiden, och kortkörning eller tuff belastning äter upp fördelen snabbt.' },
  { title: '"Man kan inte blanda olika oljemärken eller typer."', text: 'I praktiken går det oftast bra rent tekniskt – oljor är i grunden kompatibla med varandra – men det är ingen genväg till rätt olja. Följer man inte specifikationen som gäller för just din bil spelar det ingen roll vilket märke som står på flaskan.' },
]

const faqs = [
  { question: 'Hur ofta behöver jag byta olja?', answer: 'Det varierar mellan bilmärken och modeller, men som tumregel rekommenderas ett oljebyte var 10 000–15 000 km, eller minst en gång om året – vad som än inträffar först. Kör du mycket kortkörning eller drar släp bör du räkna med tätare byten än vad instruktionsboken säger.' },
  { question: 'Ska jag lita på bilens serviceindikator eller intervallet i instruktionsboken?', answer: 'Se dem som en utgångspunkt, inte ett facit. Indikatorn räknar oftast utifrån idealiska förhållanden. Är din körning tuffare mot oljan – mycket stadskörning, kyla, korta resor – lönar det sig att byta tätare.' },
  { question: 'Är syntetisk olja alltid bättre än mineralolja?', answer: 'Generellt ja när det gäller smörjande egenskaper och temperaturtålighet, men det viktigaste är ändå att oljan uppfyller rätt specifikation för just din motor. En korrekt mineralolja för en äldre motor kan vara ett bättre val än fel typ av syntetolja.' },
  { question: 'Spelar det någon roll vilket oljemärke jag väljer?', answer: 'Mindre än många tror. Det avgörande är att oljan har rätt viskositet, rätt ACEA-klass och det godkännande din bil kräver – inte varumärket på flaskan.' },
  { question: 'Vad kostar ett oljebyte?', answer: 'Priset beror på bilmodell och vilken oljetyp som krävs. Ring oss så får du en tydlig prisuppgift innan vi sätter igång.' },
  { question: 'Kan jag byta olja själv?', answer: 'Ja, om du har rätt verktyg och kunskap går det att göra själv. Har du inte det sedan tidigare är det oftast både snabbare och säkrare att låta oss göra det – felaktig hantering av gammal olja är dessutom ett miljöproblem, inte bara ett tekniskt.' },
  { question: 'Hur lång tid tar det?', answer: 'Vanligtvis mellan 30 minuter och en timme, beroende på bilmodell och om något oväntat upptäcks under tiden.' },
  { question: 'Vad händer om jag skjuter upp oljebytet för länge?', answer: 'Gammal, uttjänt olja smörjer sämre och sämre ju längre den används. I värsta fall kan det leda till allvarliga motorskador och i förlängningen motorhaveri – en reparation som är betydligt dyrare än de oljebyten du skulle ha hunnit göra under tiden.' },
]

const infoCards = [
  { icon: ClockIcon, title: 'Bytesintervall', text: 'Vanligtvis var 10 000–15 000 km eller minst en gång per år – vad som än inträffar först. Mycket kortkörning eller tuff belastning motiverar tätare byten. Detta är ett branschmässigt riktvärde.' },
  { icon: HourglassIcon, title: 'Tidsåtgång', text: 'Ett oljebyte med dränering, filterbyte och nivåkontroll tar vanligtvis mellan 30 minuter och en timme i vår verkstad.' },
] as const

export default function OljebytePage() {
  const { openBooking, bookingModal } = useBookingModal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="oljebyte-title"
          eyebrow="Motorolja & motorunderhåll"
          title={<>Oljebyte<br />för en motor<br />som <span className="bb-accent">mår bra</span></>}
          lead="Ett oljebyte är ett av de mest grundläggande men samtidigt viktigaste underhållsmomenten på en bil. Motorns rörliga delar smörjs av oljan, som håller nere friktionen och skyddar motorn från onödigt slitage."
          image={{ webp: heroWebp, jpg: heroJpg, alt: '', lazy: true }}
          trustBadges={trustBadges}
          onBooking={openBooking}
          bookLabel="Boka oljebyte"
        />

        <GuideIntro
          id="oljebyte-intro-title"
          heading="Vad är ett oljebyte?"
          image={{ webp: funnelWebp, jpg: funnelJpg, alt: 'Ny motorolja hälls i en tratt i motorrummet' }}
          caption="Rätt olja. Rätt mängd. Varje gång."
        >
          <p>Med tiden bryts oljan ner, tappar sina smörjande egenskaper och samlar på sig sot och förbränningsrester. Ett oljebyte innebär att den gamla, uttjänta oljan dräneras ur motorn, oljefiltret byts ut, ny olja fylls på och nivån kontrolleras innan bilen lämnas tillbaka till dig.</p>

          <Tip
            title="Osäker på vilken olja din bil behöver?"
            text="Vi läser av tillverkarens specifikation och väljer rätt viskositet och ACEA-klass åt dig."
            action={<Link to="/felsokning" className="bb-btn bb-btn--teal service-guide__btn">Boka en felsökning<ArrowRightIcon aria-hidden="true" /></Link>}
          />
        </GuideIntro>

        <GuideImportance
          id="oljebyte-importance-title"
          heading="Fördelar med regelbundna oljebyten"
          text="Ett regelbundet oljebyte är en liten kostnad jämfört med vad ett försummat sådant kan leda till."
          items={importance}
        />

        <GuideServiceCard
          id="oljebyte-service-title"
          heading="Vad ingår i ett oljebyte hos oss?"
          text="Ett oljebyte hos Brynäs Bilservice omfattar:"
          items={includedItems}
        />

        <GuideInfo
          id="oljebyte-info-title"
          heading="Riktvärden för motorolja"
          text="Här har vi samlat riktvärden och viktig information om motorolja, intervall och vanliga frågor kring oljebyten."
          cards={infoCards}
          safetyIcon={InfoIcon}
          safety={<><strong>Viktigt om oljekvalitet:</strong> Att enbart fylla på olja när nivån sjunker ersätter aldrig ett fullständigt byte av olja och filter. Gammal olja tappar sina smörjande tillsatser och binder sot och förbränningsrester som sliter på motorns rörliga delar.</>}
        />

        <GuideSymptoms
          id="oljebyte-ageing-title"
          heading="Hur oljan blir sämre med tiden – även om bilen knappt körs"
          text="Olja som står oöppnad i en dunk åldras i praktiken inte. Det är först när den börjar arbeta i motorn som nedbrytningen startar, och det sker på flera sätt samtidigt:"
          items={oilAgeing}
          image={{ webp: drainWebp, jpg: drainJpg, alt: 'Mekaniker skruvar loss oljefiltret under en lyft bil och låter gammal motorolja dräneras' }}
          caption="Gammal olja och föroreningar dräneras ut."
          tight
        />

        {/* Intervall kontra verkligheten */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="oljebyte-interval-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__prose-card">
              <h3 id="oljebyte-interval-title">Tillverkarens intervall kontra verkligheten</h3>
              <p>Många nyare bilar har långa rekommenderade serviceintervall – ibland 3 000 mil eller mer, så kallade "long life"-intervall. De är inte felaktiga, men de gäller under förutsättningar som sällan stämmer med hur bilen faktiskt används i vardagen: jämn landsvägskörning, motorvärmare vid kyla under +5 grader, och inga korta stadsturer. Kör bilen istället mycket kortkörning, mycket stillastående i kö, eller drar den ofta släp, bryts oljan ner snabbare än vad intervallet i boken räknar med – utan att bilens egen serviceindikator nödvändigtvis märker det i tid.</p>
              <p>Vår rekommendation är därför att se tillverkarens intervall som ett tak, inte ett golv. Är körmönstret tufft mot oljan – mycket kortkörning, tät stadstrafik, kyla utan motorvärmare, turboladdad eller direktinsprutad motor – lönar det sig att byta tätare än boken säger snarare än att vänta tills serviceindikatorn tvingar fram det.</p>
            </div>
            <p className="service-guide__topic-note">Det är alltså inte antalet körda mil som ensamt avgör oljans skick – tiden och körmönstret spelar minst lika stor roll.</p>
          </div>
        </section>

        <GuideTopic
          id="oljebyte-viscosity-title"
          heading="Vad betyder egentligen siffrorna på oljedunken?"
          text="De flesta har sett beteckningar som 5W-30 eller 0W-20 utan att egentligen veta vad de betyder. Det är oljans viskositetsklass enligt SAE-systemet (Society of Automotive Engineers), och den beskriver hur trögflytande oljan är – inte hur bra kvalitet den håller."
          items={viscosityDetails}
          variant="prose"
          note="Viskositeten är alltså bara en flödesegenskap, inte ett kvalitetsmått. Två oljor med exakt samma viskositetsbeteckning kan skilja sig kraftigt åt i hur väl de faktiskt skyddar motorn."
        />

        <GuideTopic
          id="oljebyte-standards-title"
          heading="API och ACEA – standarderna som faktiskt styr kvaliteten"
          text="Det som avgör om en olja verkligen passar din motor är inte viskositeten utan godkännandena bredvid den – API (amerikansk standard) och ACEA (europeisk standard). ACEA-klasserna är särskilt viktiga att förstå:"
          items={oilStandards}
          variant="prose"
          note={<>Rätt ordning att välja olja i är: tillverkarens egen specifikation först, sedan ACEA-klass, och viskositet sist. En "rätt" viskositet med fel specifikation kan göra mer skada än nytta.</>}
        />

        <GuideTopic
          id="oljebyte-types-title"
          heading="Mineral-, halvsyntet- och helsyntetolja – vad är egentligen skillnaden?"
          text="Basoljan – den vätska additiven blandas i – delas in i grupper, och det är här den verkliga skillnaden mellan oljor ligger:"
          items={oilTypes}
          variant="prose"
          note={<>Den praktiska slutsatsen: beteckningen "fullsyntetisk" på flaskan garanterar inte att två oljor är likvärdiga. Additivpaketet – rengörande, korrosionsskyddande och viskositetsstabiliserande tillsatser – väger minst lika tungt som basoljan, och det är just kombinationen av basolja och additivpaket som gör att pris och prestanda kan skilja sig kraftigt mellan oljor som ser identiska ut på pappret.</>}
        />

        <GuideTopic
          id="oljebyte-misconceptions-title"
          heading="Vanliga missförstånd om motorolja"
          items={misconceptions}
          columns={3}
        />

        <BiltjansterFaq id="oljebyte-faq" heading="Vanliga frågor om oljebyte" items={faqs} />

        <GuideClosing
          id="oljebyte-booking-title"
          heading="Boka oljebyte"
          text="Ring oss så hjälper vi dig att hitta en tid som passar och ger en tydlig prisuppgift innan vi sätter igång."
          onBooking={openBooking}
          bookLabel="Boka oljebyte"
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
