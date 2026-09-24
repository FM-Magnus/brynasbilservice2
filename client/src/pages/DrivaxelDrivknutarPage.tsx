// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Final Guide Sibling: 10 of 10).
// Achieves 100% completion of the Guide Family on ServiceGuideTemplate.css without inventing a new CSS file.
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
import heroJpg from '../assets/images/services/driveshaft/cv-joint-workbench.jpg'
import heroWebp from '../assets/images/services/driveshaft/cv-joint-workbench.webp'
import componentsJpg from '../assets/images/services/driveshaft/driveshaft-components-workbench.jpg'
import componentsWebp from '../assets/images/services/driveshaft/driveshaft-components-workbench.webp'
import inspectionJpg from '../assets/images/services/driveshaft/driveshaft-torn-boot-inspection-portrait.jpg'
import inspectionWebp from '../assets/images/services/driveshaft/driveshaft-torn-boot-inspection-portrait.webp'

const trustBadges = [
  { icon: ShieldIcon, title: 'Vibrationsfri gång', text: 'Vi åtgärdar obalans och glapp i drivlinan.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Korrekt damaskbyte och fackmannamässig momentdragning.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Ärlig bedömning om det räcker med damask eller knutbyte.' },
] as const

const parts = [
  { title: 'Drivaxel', text: 'Den solida axeln som överför motorns vridmoment från växellådan och differentialen ut till respektive drivhjul.' },
  { title: 'Yttre drivknut (CV-knut)', text: 'Tillåter drivhjulet att svänga och fjädra samtidigt som rotationskraften överförs mjukt och med konstant hastighet.' },
  { title: 'Inre drivknut', text: 'Tar upp axiella längdförändringar och vinkelskillnader när bilens hjulupphängning rör sig upp och ner över vägbanan.' },
  { title: 'Gummidamasker', text: 'Håller kvar det livsviktiga smörjfettet och skyddar de precisionsslipade knutarna mot smuts, vatten och vägsalt.' },
] as const

const benefits = [
  { icon: AlertTriangleIcon, title: 'Billigare åtgärd i tid', text: 'Ett damaskbyte innan knuten tagit skada av smuts eller fettbrist kostar en bråkdel av vad ett byte av drivknut eller hel drivaxel gör.' },
  { icon: ShieldIcon, title: 'Undviker följdskador', text: 'En drivknut med kraftigt glapp alstrar vibrationer som i förlängningen sliter på växellådans tätningar, differential och hjullager.' },
  { icon: ClockIcon, title: 'Förhindrar stillestånd', text: 'Om en drivknut havererar helt förlorar bilen all drivning till hjulet omedelbart och blir stillastående längs vägen.' },
  { icon: ThumbsUpIcon, title: 'Rätt åtgärd för bilen', text: 'Vi bedömer fackmannamässigt om det räcker med ny damask, separat yttre knut eller komplett drivaxel utan onödiga extrakostnader.' },
] as const

const symptoms: readonly GuideSymptom[] = [
  { icon: Volume2Icon, title: 'Knäppande eller knackande ljud vid sväng', text: 'Ett rytmiskt klickande eller knackande missljud i skarpa kurvor i låg fart, särskilt vid kraftigt rattutslag, pekar på sliten yttre knut.', featured: true },
  { icon: WavesIcon, title: 'Vibrationer vid acceleration', text: 'Skakningar i ratten eller bilens golv vid gaspådrag rakt fram indikerar ofta slitage eller glapp i en inre drivknut.' },
  { icon: SlidersIcon, title: 'Klonkande ljud vid gas eller motorbroms', text: 'Ett mekaniskt klonkljud när du trycker ner eller släpper gaspedalen kan tyda på rotationsglapp i drivlinan.' },
  { icon: AlertTriangleIcon, title: 'Utslungat fett i hjulhus eller på fälg', text: 'Fettstänk på insidan av hjulet är ett säkert tecken på att en gummidamask spruckit, ofta innan knuten hunnit ta skada.', urgent: true },
  { icon: GaugeIcon, title: 'Ryckig gång vid belastning', text: 'Bilen kan kännas ryckig, orolig eller svår att kontrollera vid hårt gaspådrag på grund av kärvande knutdelar.' },
  { icon: WrenchIcon, title: 'Styrdragning & märkbart spel', text: 'Bilen tenderar att dra snett vid acceleration eller uppvisar tydligt glapp när hjul och drivaxel rörs för hand.', urgent: true },
]

const serviceItems = [
  'Noggrann kontroll av samtliga drivknutsdamasker, klämmor och fästen för att upptäcka tidiga sprickor.',
  'Rengöring och byte av enbart damask samt påfyllning av rätt fett när knuten fortfarande är oskadd.',
  'Byte av separat yttre drivknut när knuten är sliten men drivaxeln i övrigt är i gott skick.',
  'Byte av komplett drivaxel när den inre knuten är skadad eller vid integrerade axelkonstruktioner.',
  'Kontroll av hjullager, växellådspackboxar och kulleder i anslutning till drivaxeln.',
  'Funktionskontroll, föreskriven momentdragning av navmutter och provkörning innan leverans.',
]

const infoCards: readonly GuideInfoCard[] = [
  { icon: AlertTriangleIcon, title: 'Fettet måste stanna inuti knuten', text: 'Smörjfettet är specialanpassat för knutens höga belastning. Fett som läckt ut kan aldrig "fyllas på" utifrån — en läckande damask måste alltid bytas och åtgärdas.', flag: 'VIKTIGT' },
  { icon: ClockIcon, title: 'Knackande skada är permanent', text: 'Har knuten väl börjat knacka eller klicka vid sväng är slitaget på kulor och banor permanent. Det går inte att rädda med nytt fett, utan knuten måste bytas.' },
  { icon: WrenchIcon, title: 'Yttre kontra inre knut', text: 'Yttre drivknutar slits oftast först och går på många bilar att byta separat. Inre knutar säljs däremot sällan lösa utan kräver oftast byte av komplett drivaxel.' },
  { icon: ThumbsUpIcon, title: 'Fånga felet i tid och spara tusenlappar', text: 'Kostnadsskillnaden mellan att byta en sprucken damask i tid jämfört med att vänta tills knuten rasar kan vara flera tusen kronor.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', `Boka tid smidigt online eller ring oss på ${BUSINESS.phone.display} och lämna in bilen hos oss på ${BUSINESS.address.street} i ${BUSINESS.address.district}.`],
  ['02', 'Lyft & damaskkontroll', 'Vi hissar upp bilen och inspekterar alla fyra damasker efter sprickor och fettläckage samt känner mekaniskt efter glapp.'],
  ['03', 'Fastställande av åtgärd', 'Vi bedömer om det räcker med ett damaskbyte, byte av yttre drivknut eller om hela drivaxeln behöver bytas ut.'],
  ['04', 'Demontering & montering', 'Komponenterna demonteras fackmannamässigt och ersätts med nya kvalitetsdelar, specialfett och nya låsklämmor.'],
  ['05', 'Momentdragning & provkörning', 'Navmuttrar dras med rätt moment och vi provkör bilen med fullt rattutslag för att verifiera tyst och vibrationsfri gång.'],
] as const

const faqs = [
  { question: 'Hur vet jag om det är den inre eller yttre drivknuten som är dålig?', answer: 'Ett knäppande eller knackande ljud vid skarpa svängar i låg fart pekar nästan alltid på den yttre drivknuten. Vibrationer och skakningar vid gaspådrag rakt fram tyder istället oftast på glapp i den inre knuten närmast växellådan. Är du osäker gör vi en snabb och noggrann bedömning.' },
  { question: 'Räcker det att byta damasken eller måste hela knuten bytas?', answer: 'Om damasken nyligen spruckit och knuten ännu inte börjat föra oväsen räcker det oftast utmärkt med ett damaskbyte och nytt fett. Har knuten däremot redan börjat knacka eller klicka är slitaget permanent och knuten eller hela drivaxeln måste bytas.' },
  { question: 'Kan jag köra vidare om drivknuten har börjat knacka?', answer: 'Kortsiktigt går det att köra en kortare sträcka till verkstaden, men det bör åtgärdas omgående. Ett knuthaveri innebär att hjulet helt tappar drivning och bilen blir stående. Dessutom riskerar vibrationerna att slita på växellådans tätningar och lager.' },
  { question: 'Varför räcker det inte att bara fylla på fett i en läckande damask?', answer: 'Fett som slungats ut kan inte återföras till knuten utifrån, och genom sprickan fortsätter smuts och fukt att tränga in. Det enda sättet att skydda knuten är att demontera, tvätta rent och montera en ny tät damask med rätt mängd specialfett.' },
  { question: 'Går det alltid att byta enbart den yttre drivknuten?', answer: 'På många bilar går den yttre knuten att köpa och byta separat. Den inre knuten säljs däremot mer sällan separat, vilket gör att man vid fel på den inre knuten oftast byter hela drivaxeln som en komplett enhet.' },
  { question: 'Hur lång tid tar ett byte av drivknut eller drivaxel?', answer: 'Ett damaskbyte eller byte av en komplett drivaxel tar vanligtvis mellan 1 till 2 timmar per sida, beroende på bilmodell och hur lätt axeln lossnar från hjulnavet och växellådan.' },
]

export default function DrivaxelDrivknutarPage() {
  const { openBooking, bookingModal } = useBookingModal('Gäller drivaxel och drivknutar')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="driveshaft-title"
          eyebrow="Drivlina & kraftöverföring"
          title={<>Drivaxel &amp; drivknutar i <span className="bb-accent">Gävle</span></>}
          lead="Drivaxeln överför motorkraften från växellådan till drivhjulen via rörliga drivknutar (CV-knutar). Vi inspekterar damasker, åtgärdar fettläckage och byter slitna knutar eller kompletta drivaxlar."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Drivaxel med CV-knut på arbetsbänk i verkstaden', slot: 'driveshaft-hero' }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="driveshaft-intro-title"
          heading="Vad gör drivaxeln och drivknutarna?"
          image={{ webp: componentsWebp, jpg: componentsJpg, alt: 'Komplett drivaxel med drivknutar, gummidamasker och metallklämmor på verkstadsbänk' }}
          caption="Kraftöverföring med konstant hastighet."
        >
          <p>Drivaxeln för kraften från växellådan ut till hjulen, och i varje ände sitter en drivknut som klarar av att vinklas när hjulen styrs eller fjädrar. Runt varje knut sitter en gummidamask som håller kvar smörjfettet och stänger ute smuts och väta — damasken är systemets svagaste länk, och upptäcks en spricka i tid räcker det oftast med att byta enbart den.</p>
          <GuideParts items={parts} />
          <Tip
            title="Misstänker du knäppande ljud eller trasig damask?"
            text="Vi hissar upp bilen och kontrollerar damasker, fett och mekaniskt glapp."
            action={<button type="button" onClick={openBooking} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>}
          />
        </GuideIntro>

        <GuideImportance
          id="driveshaft-importance-title"
          heading="Varför är det viktigt att åtgärda i tid?"
          text="Ett snabbt ingrepp vid en sprucken damask sparar tusenlappar och förhindrar plötsligt stillestånd."
          items={benefits}
        />

        <GuideSymptoms
          id="driveshaft-symptoms-title"
          heading="Tecken på sliten drivknut eller trasig damask"
          text="Slitna drivknutar och spruckna damasker ger tydliga varningssignaler vid kurvtagning och acceleration. Här är de vanligaste signalerna du bör vara vaksam på."
          items={symptoms}
          image={{ webp: inspectionWebp, jpg: inspectionJpg, alt: 'Närbild på mekaniker som inspekterar sprucken drivaxeldamask och fettläckage under bil' }}
          caption="Tidigt damaskbyte skyddar knuten."
        >
          <Tip
            title="Viktigt om sprucken damask:"
            text="Upptäcker du fettstänk eller en spräckt damask innan knuten börjat låta är det goda nyheter. Då räcker det i regel med att rengöra och byta enbart damasken med nytt specialfett, vilket sparar tusentals kronor jämfört med ett fullständigt knutbyte."
          />
        </GuideSymptoms>

        <GuideServiceCard
          id="driveshaft-service-title"
          text="Vi undersöker drivlinan och byter skadade damasker, yttre drivknutar eller kompletta drivaxlar med kvalitetskomponenter anpassade för din bil."
          items={serviceItems}
        />

        <GuideInfo
          id="driveshaft-guidance-title"
          heading="Viktig information om drivaxlar"
          text="Här är praktiska fakta och råd kring drivaxlar och knutar. Vi gör alltid en fackmannamässig bedömning av komponenternas skick innan vi föreslår åtgärd."
          cards={infoCards}
          safety={<><strong>Säkerhetsnotis:</strong> En drivknut med hörbart glapp ska inte köras med längre än nödvändigt. Det självläker aldrig och risken för följdskador på växellådan ökar. Om knuten havererar helt tappar bilen omedelbart all drivning.</>}
        />

        <GuideProcess
          id="driveshaft-process-title"
          text="Att byta damasker eller drivaxlar kräver noggrannhet, rätt fettmängd och föreskrivna åtdragningsmoment. Så här ser vår process ut."
          steps={processSteps}
        />

        <BiltjansterFaq id="drivaxel-faq" heading="Vanliga frågor om drivaxel och drivknutar" items={faqs} />

        <GuideClosing
          id="driveshaft-booking-title"
          heading="Boka kontroll eller byte av drivaxel"
          text={<>Priset beror på om det räcker med ett damaskbyte, om det är en yttre drivknut som byts separat eller om en hel drivaxel behöver ersättas. Ring oss på {BUSINESS.phone.display} så ger vi dig ett tydligt och transparent kostnadsförslag anpassat för din bilmodell.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
