import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import heroJpg from '../assets/images/services/driveshaft/cv-joint-workbench.jpg'
import heroWebp from '../assets/images/services/driveshaft/cv-joint-workbench.webp'
import './DrivaxelDrivknutarPage.css'

const parts = [
  ['Drivaxel', 'Den solida axeln som överför motorns vridmoment från växellådan och differentialen ut till respektive drivhjul.'],
  ['Yttre drivknut (CV-knut)', 'Tillåter drivhjulet att svänga och fjädra samtidigt som rotationskraften överförs mjukt och med konstant hastighet.'],
  ['Inre drivknut', 'Tar upp axiella längdförändringar och vinkelskillnader när bilens hjulupphängning rör sig upp och ner över vägbanan.'],
  ['Gummidamasker', 'Håller kvar det livsviktiga smörjfettet och skyddar de precisionsslipade knutarna mot smuts, vatten och vägsalt.'],
]

const benefits = [
  ['Billigare åtgärd i tid', 'Ett damaskbyte innan knuten tagit skada av smuts eller fettbrist kostar en bråkdel av vad ett byte av drivknut eller hel drivaxel gör.'],
  ['Undviker följdskador', 'En drivknut med kraftigt glapp alstrar vibrationer som i förlängningen sliter på växellådans tätningar, differential och hjullager.'],
  ['Förhindrar stillestånd', 'Om en drivknut havererar helt förlorar bilen all drivning till hjulet omedelbart och blir stillastående längs vägen.'],
  ['Rätt åtgärd för bilen', 'Vi bedömer fackmannamässigt om det räcker med ny damask, separat yttre knut eller komplett drivaxel utan onödiga extrakostnader.'],
]

const symptoms = [
  ['Knäppande eller knackande ljud vid sväng', 'Ett rytmiskt klickande eller knackande missljud i skarpa kurvor i låg fart, särskilt vid kraftigt rattutslag, pekar på sliten yttre knut.'],
  ['Vibrationer vid acceleration', 'Skakningar i ratten eller bilens golv vid gaspådrag rakt fram indikerar ofta slitage eller glapp i en inre drivknut.'],
  ['Klonkande ljud vid gas eller motorbroms', 'Ett mekaniskt klonkljud när du trycker ner eller släpper gaspedalen kan tyda på rotationsglapp i drivlinan.'],
  ['Utslungat fett i hjulhus eller på fälg', 'Fettstänk på insidan av hjulet är ett säkert tecken på att en gummidamask spruckit, ofta innan knuten hunnit ta skada.'],
  ['Ryckig gång vid belastning', 'Bilen kan kännas ryckig, orolig eller svår att kontrollera vid hårt gaspådrag på grund av kärvande knutdelar.'],
  ['Styrdragning & märkbart spel', 'Bilen tenderar att dra snett vid acceleration eller uppvisar tydligt glapp när hjul och drivaxel rörs för hand.'],
]

const serviceItems = [
  'Noggrann kontroll av samtliga drivknutsdamasker, klämmor och fästen för att upptäcka tidiga sprickor.',
  'Rengöring och byte av enbart damask samt påfyllning av rätt fett när knuten fortfarande är oskadd.',
  'Byte av separat yttre drivknut när knuten är sliten men drivaxeln i övrigt är i gott skick.',
  'Byte av komplett drivaxel när den inre knuten är skadad eller vid integrerade axelkonstruktioner.',
  'Kontroll av hjullager, växellådspackboxar och kulleder i anslutning till drivaxeln.',
  'Funktionskontroll, föreskriven momentdragning av navmutter och provkörning innan leverans.',
]

const guidance = [
  ['Fettet måste stanna inuti knuten', 'Smörjfettet är specialanpassat för knutens höga belastning. Fett som läckt ut kan aldrig "fyllas på" utifrån — en läckande damask måste alltid bytas och åtgärdas.'],
  ['Knackande skada är permanent', 'Har knuten väl börjat knacka eller klicka vid sväng är slitaget på kulor och banor permanent. Det går inte att rädda med nytt fett, utan knuten måste bytas.'],
  ['Yttre kontra inre knut', 'Yttre drivknutar slits oftast först och går på många bilar att byta separat. Inre knutar säljs däremot sällan lösa utan kräver oftast byte av komplett drivaxel.'],
  ['Fånga felet i tid och spara tusenlappar', 'Kostnadsskillnaden mellan att byta en sprucken damask i tid jämfört med att vänta tills knuten rasar kan vara flera tusen kronor.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka tid smidigt online eller ring oss på 070-553 33 95 och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.'],
  ['02', 'Lyft & damaskkontroll', 'Vi hissar upp bilen och inspekterar alla fyra damasker efter sprickor och fettläckage samt känner mekaniskt efter glapp.'],
  ['03', 'Fastställande av åtgärd', 'Vi bedömer om det räcker med ett damaskbyte, byte av yttre drivknut eller om hela drivaxeln behöver bytas ut.'],
  ['04', 'Demontering & montering', 'Komponenterna demonteras fackmannamässigt och ersätts med nya kvalitetsdelar, specialfett och nya låsklämmor.'],
  ['05', 'Momentdragning & provkörning', 'Navmuttrar dras med rätt moment och vi provkör bilen med fullt rattutslag för att verifiera tyst och vibrationsfri gång.'],
]

const faqs = [
  ['Hur vet jag om det är den inre eller yttre drivknuten som är dålig?', 'Ett knäppande eller knackande ljud vid skarpa svängar i låg fart pekar nästan alltid på den yttre drivknuten. Vibrationer och skakningar vid gaspådrag rakt fram tyder istället oftast på glapp i den inre knuten närmast växellådan. Är du osäker gör vi en snabb och noggrann bedömning.'],
  ['Räcker det att byta damasken eller måste hela knuten bytas?', 'Om damasken nyligen spruckit och knuten ännu inte börjat föra oväsen räcker det oftast utmärkt med ett damaskbyte och nytt fett. Har knuten däremot redan börjat knacka eller klicka är slitaget permanent och knuten eller hela drivaxeln måste bytas.'],
  ['Kan jag köra vidare om drivknuten har börjat knacka?', 'Kortsiktigt går det att köra en kortare sträcka till verkstaden, men det bör åtgärdas omgående. Ett knuthaveri innebär att hjulet helt tappar drivning och bilen blir stående. Dessutom riskerar vibrationerna att slita på växellådans tätningar och lager.'],
  ['Varför räcker det inte att bara fylla på fett i en läckande damask?', 'Fett som slungats ut kan inte återföras till knuten utifrån, och genom sprickan fortsätter smuts och fukt att tränga in. Det enda sättet att skydda knuten är att demontera, tvätta rent och montera en ny tät damask med rätt mängd specialfett.'],
  ['Går det alltid att byta enbart den yttre drivknuten?', 'På många bilar går den yttre knuten att köpa och byta separat. Den inre knuten säljs däremot mer sällan separat, vilket gör att man vid fel på den inre knuten oftast byter hela drivaxeln som en komplett enhet.'],
  ['Hur lång tid tar ett byte av drivknut eller drivaxel?', 'Ett damaskbyte eller byte av en komplett drivaxel tar vanligtvis mellan 1 till 2 timmar per sida, beroende på bilmodell och hur lätt axeln lossnar från hjulnavet och växellådan.'],
]

export default function DrivaxelDrivknutarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page driveshaft-page">
        <section className="services-page__hero" aria-labelledby="driveshaft-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="driveshaft-page-title">Drivaxel & drivknutar <span className="title-accent">för säker och vibrationsfri drivning</span></h1>
              <p className="services-page__lead">Drivaxeln överför motorkraften från växellådan till drivhjulen via rörliga drivknutar (CV-knutar). Vi inspekterar damasker, åtgärdar fettläckage och byter slitna knutar eller kompletta drivaxlar.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="driveshaft-page__hero-image"><picture><source srcSet={heroWebp} type="image/webp" /><img src={heroJpg} alt="Drivaxel med CV-knut på arbetsbänk i verkstaden" loading="lazy" /></picture></div>
          </div></div>
        </section>

        <section className="services-page__guide driveshaft-page__intro" aria-labelledby="driveshaft-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="driveshaft-intro-title">Vad gör drivaxeln och drivknutarna?</h2><p>Drivaxeln för kraften från växellådan ut till hjulen, och i varje ände sitter en drivknut som klarar av att vinklas när hjulen styrs eller fjädrar. Runt varje knut sitter en gummidamask som håller kvar smörjfettet och stänger ute smuts och väta — damasken är systemets svagaste länk, och upptäcks en spricka i tid räcker det oftast med att byta enbart den.</p></div>
          <div className="driveshaft-page__parts-grid">{parts.map(([title, text]) => <article className="driveshaft-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro driveshaft-page__section-gap"><h2>Varför är det viktigt att åtgärda i tid?</h2></div>
          <div className="services-page__benefit-grid driveshaft-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="driveshaft-page__symptoms" aria-labelledby="driveshaft-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="driveshaft-symptoms-title">Tecken på sliten drivknut eller trasig damask</h2><p>Slitna drivknutar och spruckna damasker ger tydliga varningssignaler vid kurvtagning och acceleration. Här är de vanligaste signalerna du bör vara vaksam på.</p></div><div className="driveshaft-page__symptom-grid">{symptoms.map(([title, text]) => <article className="driveshaft-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="driveshaft-page__test-tip"><strong>Viktigt om sprucken damask:</strong> Upptäcker du fettstänk eller en spräckt damask innan knuten börjat låta är det goda nyheter. Då räcker det i regel med att rengöra och byta enbart damasken med nytt specialfett, vilket sparar tusentals kronor jämfört med ett fullständigt knutbyte.</div></div></section>

        <section className="driveshaft-page__service" aria-labelledby="driveshaft-service-title"><div className="container"><div className="driveshaft-page__service-card"><div><h2 id="driveshaft-service-title">Det här kan vi hjälpa dig med</h2><p>Vi undersöker drivlinan och byter skadade damasker, yttre drivknutar eller kompletta drivaxlar med kvalitetskomponenter anpassade för din bil.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="driveshaft-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="driveshaft-page__guidance" aria-labelledby="driveshaft-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="driveshaft-guidance-title">Viktig information om drivaxlar</h2><p>Här är praktiska fakta och råd kring drivaxlar och knutar. Vi gör alltid en fackmannamässig bedömning av komponenternas skick innan vi föreslår åtgärd.</p></div><div className="driveshaft-page__guidance-grid">{guidance.map(([title, text]) => <article className="driveshaft-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="driveshaft-page__safety-note"><strong>Säkerhetsnotis:</strong> En drivknut med hörbart glapp ska inte köras med längre än nödvändigt. Det självläker aldrig och risken för följdskador på växellådan ökar. Om knuten havererar helt tappar bilen omedelbart all drivning.</aside></div></section>

        <section className="services-page__process-section driveshaft-page__process" aria-labelledby="driveshaft-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="driveshaft-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att byta damasker eller drivaxlar kräver noggrannhet, rätt fettmängd och föreskrivna åtdragningsmoment. Så här ser vår process ut.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="drivaxel-faq" heading="Vanliga frågor om drivaxel och drivknutar" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing driveshaft-page__booking" aria-labelledby="driveshaft-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="driveshaft-booking-title">Boka kontroll eller byte av drivaxel</h2><p>Priset beror på om det räcker med ett damaskbyte, om det är en yttre drivknut som byts separat eller om en hel drivaxel behöver ersättas. Ring oss på 070-553 33 95 så ger vi dig ett tydligt och transparent kostnadsförslag anpassat för din bilmodell.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
