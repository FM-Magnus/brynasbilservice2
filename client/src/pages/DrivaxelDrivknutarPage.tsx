// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Final Guide Sibling: 10 of 10).
// Achieves 100% completion of the Guide Family on ServiceGuideTemplate.css without inventing a new CSS file.
// Zero dependency on index.css; inherits Level 0 tokens and shared-elements.
import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/business'
import '../styles/design-tokens.css'
import '../styles/shared-elements.css'
import '../styles/ServiceGuideTemplate.css'
import { PublicHeader } from '../components/layout/PublicHeader'
import { PublicFooter } from '../components/layout/PublicFooter'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { ShieldIcon } from '../components/icons/ShieldIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon'
import { ThumbsUpIcon } from '../components/icons/ThumbsUpIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
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

interface SymptomItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
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

interface InfoCardItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  flag?: string
}

const infoCards: readonly InfoCardItem[] = [
  { icon: AlertTriangleIcon, title: 'Fettet måste stanna inuti knuten', text: 'Smörjfettet är specialanpassat för knutens höga belastning. Fett som läckt ut kan aldrig "fyllas på" utifrån — en läckande damask måste alltid bytas och åtgärdas.', flag: 'VIKTIGT' },
  { icon: ClockIcon, title: 'Knackande skada är permanent', text: 'Har knuten väl börjat knacka eller klicka vid sväng är slitaget på kulor och banor permanent. Det går inte att rädda med nytt fett, utan knuten måste bytas.' },
  { icon: WrenchIcon, title: 'Yttre kontra inre knut', text: 'Yttre drivknutar slits oftast först och går på många bilar att byta separat. Inre knutar säljs däremot sällan lösa utan kräver oftast byte av komplett drivaxel.' },
  { icon: ThumbsUpIcon, title: 'Fånga felet i tid och spara tusenlappar', text: 'Kostnadsskillnaden mellan att byta en sprucken damask i tid jämfört med att vänta tills knuten rasar kan vara flera tusen kronor.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', `Boka tid smidigt online eller ring oss på ${BUSINESS.phone.display} och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.`],
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="driveshaft-title">
          <div className="service-guide__hero-bg">
            <picture data-image-slot="driveshaft-hero">
              <source srcSet={heroWebp} type="image/webp" />
              <img src={heroJpg} alt="Drivaxel med CV-knut på arbetsbänk i verkstaden" />
            </picture>
          </div>
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Drivlina &amp; kraftöverföring</div>
                <h1 className="bb-h1 service-guide__title" id="driveshaft-title">
                  Drivaxel &amp; drivknutar i <span className="bb-accent">Gävle</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Drivaxeln överför motorkraften från växellådan till drivhjulen via rörliga drivknutar (CV-knutar). Vi inspekterar damasker, åtgärdar fettläckage och byter slitna knutar eller kompletta drivaxlar.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
                </div>
                <div className="bb-trust-row">
                  {trustBadges.map(({ icon: Icon, title, text }) => (
                    <div className="bb-trust-row__item" key={title}>
                      <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
                      <span className="bb-trust-row__text">
                        <b>{title}</b>
                        <small>{text}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad gör drivaxeln och drivknutarna? */}
        <section className="service-guide__section" aria-labelledby="driveshaft-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <picture>
                <source srcSet={componentsWebp} type="image/webp" />
                <img
                  src={componentsJpg}
                  alt="Komplett drivaxel med drivknutar, gummidamasker och metallklämmor på verkstadsbänk"
                  loading="lazy"
                />
              </picture>
              <p className="service-guide__intro-caption">Kraftöverföring med konstant hastighet.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="driveshaft-intro-title">Vad gör drivaxeln och drivknutarna?</h2>
              <p>Drivaxeln för kraften från växellådan ut till hjulen, och i varje ände sitter en drivknut som klarar av att vinklas när hjulen styrs eller fjädrar. Runt varje knut sitter en gummidamask som håller kvar smörjfettet och stänger ute smuts och väta — damasken är systemets svagaste länk, och upptäcks en spricka i tid räcker det oftast med att byta enbart den.</p>
              <div className="service-guide__component-grid">
                {parts.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="bb-tip">
                <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
                <div className="bb-tip__body">
                  <span className="bb-eyebrow">Tips</span>
                  <strong className="bb-tip__title">Misstänker du knäppande ljud eller trasig damask?</strong>
                  <span className="bb-tip__text">Vi hissar upp bilen och kontrollerar damasker, fett och mekaniskt glapp.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att åtgärda i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="driveshaft-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="driveshaft-importance-title">Varför är det viktigt att åtgärda i tid?</h2>
                <p>Ett snabbt ingrepp vid en sprucken damask sparar tusenlappar och förhindrar plötsligt stillestånd.</p>
              </div>
              <div className="service-guide__importance-grid">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div className="service-guide__importance-card" key={title}>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tecken på sliten drivknut eller trasig damask */}
        <section className="service-guide__section" aria-labelledby="driveshaft-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="driveshaft-symptoms-title">Tecken på sliten drivknut eller trasig damask</h2>
              <p>Slitna drivknutar och spruckna damasker ger tydliga varningssignaler vid kurvtagning och acceleration. Här är de vanligaste signalerna du bör vara vaksam på.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className="bb-tip">
                <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
                <div className="bb-tip__body">
                  <span className="bb-eyebrow">Tips</span>
                  <strong className="bb-tip__title">Viktigt om sprucken damask:</strong>
                  <span className="bb-tip__text">Upptäcker du fettstänk eller en spräckt damask innan knuten börjat låta är det goda nyheter. Då räcker det i regel med att rengöra och byta enbart damasken med nytt specialfett, vilket sparar tusentals kronor jämfört med ett fullständigt knutbyte.</span>
                </div>
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <picture>
                <source srcSet={inspectionWebp} type="image/webp" />
                <img
                  src={inspectionJpg}
                  alt="Närbild på mekaniker som inspekterar sprucken drivaxeldamask och fettläckage under bil"
                  loading="lazy"
                />
              </picture>
              <p className="service-guide__symptoms-caption">Tidigt damaskbyte skyddar knuten.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="driveshaft-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="driveshaft-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi undersöker drivlinan och byter skadade damasker, yttre drivknutar eller kompletta drivaxlar med kvalitetskomponenter anpassade för din bil.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Viktig information om drivaxlar */}
        <section className="service-guide__section" aria-labelledby="driveshaft-guidance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="driveshaft-guidance-title">Viktig information om drivaxlar</h2>
              <p>Här är praktiska fakta och råd kring drivaxlar och knutar. Vi gör alltid en fackmannamässig bedömning av komponenternas skick innan vi föreslår åtgärd.</p>
            </div>
            <div className="service-guide__info-grid">
              {infoCards.map(({ icon: Icon, title, text, flag }) => (
                <div className="service-guide__info-card" key={title}>
                  <span className="service-guide__info-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    {flag && <span className="service-guide__info-flag" aria-hidden="true">{flag}</span>}
                    <h3>{title}</h3><p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-guide__safety-strip">
              <AlertTriangleIcon aria-hidden="true" />
              <p><strong>Säkerhetsnotis:</strong> En drivknut med hörbart glapp ska inte köras med längre än nödvändigt. Det självläker aldrig och risken för följdskador på växellådan ökar. Om knuten havererar helt tappar bilen omedelbart all drivning.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="driveshaft-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="driveshaft-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att byta damasker eller drivaxlar kräver noggrannhet, rätt fettmängd och föreskrivna åtdragningsmoment. Så här ser vår process ut.</p>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--teal service-guide__btn"><PhoneIcon aria-hidden="true" />Ring oss: {BUSINESS.phone.display}</a>
              </div>
              <div className="service-guide__process-steps">
                {processSteps.map(([num, title, text]) => (
                  <div className="service-guide__process-step" key={num}>
                    <span className="service-guide__process-num" aria-hidden="true">{num}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BiltjansterFaq id="drivaxel-faq" heading="Vanliga frågor om drivaxel och drivknutar" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="driveshaft-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="driveshaft-booking-title">Boka kontroll eller byte av drivaxel</h2>
                <p>Priset beror på om det räcker med ett damaskbyte, om det är en yttre drivknut som byts separat eller om en hel drivaxel behöver ersättas. Ring oss på {BUSINESS.phone.display} så ger vi dig ett tydligt och transparent kostnadsförslag anpassat för din bilmodell.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller drivaxel och drivknutar" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
