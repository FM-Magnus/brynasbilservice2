// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Rebuild).
// Proves template reusability for /stodampare-fjadrar without inventing a new CSS file.
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
import heroJpg from '../assets/images/services/suspension/suspension-mechanic-wrench-workshop-hero.jpg'
import heroWebp from '../assets/images/services/suspension/suspension-mechanic-wrench-workshop-hero.webp'
import inspectionJpg from '../assets/images/services/suspension/suspension-mechanic-strut-inspection-portrait.jpg'
import inspectionWebp from '../assets/images/services/suspension/suspension-mechanic-strut-inspection-portrait.webp'
import comparisonJpg from '../assets/images/services/suspension/suspension-strut-new-vs-old-comparison.jpg'
import comparisonWebp from '../assets/images/services/suspension/suspension-strut-new-vs-old-comparison.webp'

const trustBadges = [
  { icon: ShieldIcon, title: 'Stabil väghållning', text: 'Vi säkerställer optimal kontakt mellan däck och väg.' },
  { icon: WrenchIcon, title: 'Erfarna mekaniker', text: 'Korrekt montering och precisionshjulinställning.' },
  { icon: ClockIcon, title: 'Tydlig rådgivning', text: 'Ärlig bedömning om vad som faktiskt behöver bytas.' },
] as const

const parts = [
  { title: 'Stötdämpare', text: 'Kontrollerar fjäderns rörelse och dämpar svängningarna så att bilen inte fortsätter gunga eller studsa efter gupp.' },
  { title: 'Fjädrar', text: 'Bär bilens totala vikt, bestämmer åkhöjden och tar upp stötar och ojämnheter direkt från vägbanan.' },
  { title: 'Fjäderben & topplager', text: 'Samlar dämpare, fjäder och fjäderbenslager i en sammanhållen enhet på många bilars framvagn.' },
] as const

const benefits = [
  { icon: AlertTriangleIcon, title: 'Kortare bromssträcka', text: 'Slitna stötdämpare kan förlänga bromssträckan med upp till 20 procent på ojämnt underlag då hjulen tappar kontakten med vägen. Detta är ett branschmässigt riktvärde, inte en Brynäs-specifik mätning.' },
  { icon: GaugeIcon, title: 'Bättre väggrepp', text: 'Minskar risken för vattenplaning och ger stabilare kontakt mellan däck och vägbana i kurvor och vid undanmanövrar.' },
  { icon: SlidersIcon, title: 'Jämnare däckslitage', text: 'En korrekt dämpad fjädring förhindrar att däcken nöts vågigt eller trappstegsformat, vilket sparar pengar över tid.' },
  { icon: ThumbsUpIcon, title: 'Helhetsbedömning', text: 'Vi ser över dämparfästen, krängningshämmarlänkar och länkarmar samtidigt för att slippa framtida onödiga verkstadsbesök.' },
] as const

interface SymptomItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
  { icon: AlertTriangleIcon, title: 'Oljeläckage på dämparens kropp', text: 'Synlig hydraulolja på stötdämparen är det säkraste tecknet på att packboxen är trasig och dämparen slut.', urgent: true },
  { icon: WavesIcon, title: 'Bilen gungar eller vaggar överdrivet', text: 'Bilen fortsätter studsa efter väggupp eller känns gungig och svajig i högre hastigheter och kurvor.', featured: true },
  { icon: GaugeIcon, title: 'Fronten "nosar" vid inbromsning', text: 'Kraftig nigning vid inbromsning eller att bakänden lyfter vid gaspådrag tyder på trötta stötdämpare.' },
  { icon: Volume2Icon, title: 'Metalliskt klonkljud över gupp', text: 'Ett distinkt metalliskt klonkande ljud indikerar ofta en bruten fjäder eller ett glappande fjäderbenslager.', urgent: true },
  { icon: SlidersIcon, title: 'Bilen lutar synligt åt ena sidan', text: 'Om bilen lutar när den står parkerad på plant underlag har oftast en fjäder gått av.' },
  { icon: WrenchIcon, title: 'Bilen drar snett och känns instabil', text: 'Försämrad kursstabilitet, vandrande köregenskaper eller ökade vibrationer genom ratten.' },
]

const serviceItems = [
  'Noggrann kontroll och bedömning av om det är stötdämpare, fjäder eller båda som felar.',
  'Byte av stötdämpare, fjädrar eller kompletta fjäderben anpassade för bilens chassi.',
  'Kontroll av dämparfästen, fjäderbenslager, dammskydd och krängningshämmarlänkar.',
  'Fjädrar byts alltid parvis per axel för att garantera jämn höjd och symmetrisk väghållning.',
  'Professionell hjulinställning efter monteringen då fjädringsarbeten påverkar hjulgeometrin.',
  'Funktionskontroll och provkörning innan bilen lämnas tillbaka.',
]

interface InfoCardItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  flag?: string
}

const infoCards: readonly InfoCardItem[] = [
  { icon: ClockIcon, title: 'Gradvis slitage', text: 'Stötdämpare slits långsamt och smygande. Många förare vänjer sig vid en allt sämre väghållning utan att märka hur mycket bromssträckan förlängts.' },
  { icon: AlertTriangleIcon, title: 'Parvis utbyte är ett krav', text: 'Fjädrar och stötdämpare byts alltid parvis per axel. Ensidigt byte ger olika fjäderstyvhet, sned bil och obalanserade köregenskaper.', flag: 'VIKTIGT' },
  { icon: ThumbsUpIcon, title: 'Helhetslösning sparar pengar', text: 'Eftersom fjäderbenet ändå demonteras lönar det sig ofta att byta slitna topplager och genomslagsgummin i samma moment.' },
  { icon: GaugeIcon, title: 'Hjulinställning behövs oftast', text: 'Arbeten i hjulupphängningen rubbar nästan alltid hjulvinklarna. En efterföljande hjulinställning skyddar däcken och garanterar bra styrrespons.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka tid online eller via telefon och lämna in bilen hos oss på Utmarksvägen i Brynäs.'],
  ['02', 'Chassi- & fjädringskontroll', 'Vi hissar upp bilen och undersöker dämpare, fjädrar, bussningar och leder.'],
  ['03', 'Demontering och komponentbyte', 'Slitna delar demonteras och nya kvalitetskomponenter monteras med rätt moment.'],
  ['04', 'Hjulinställning', 'Vi kontrollerar och justerar hjulvinklarna med precisionsmätning.'],
  ['05', 'Slutkontroll och provkörning', 'Vi provkör bilen och går igenom utfört arbete och protokoll med dig.'],
] as const

const faqs = [
  { question: 'Hur vet jag om det är dämparna eller fjädrarna som är trasiga?', answer: 'Slitna dämpare märks oftast som en gungig, ostabil körkänsla som kommer smygande över tid. En trasig fjäder ger istället ofta ett tydligt, metalliskt "klonk"-ljud över gupp och kan göra att bilen lutar synligt. Är du osäker gör vi en snabb och säker bedömning åt dig.' },
  { question: 'Måste jag byta både dämpare och fjädrar samtidigt?', answer: 'Inte nödvändigtvis — det beror på vilken komponent som faktiskt är sliten eller trasig. Eftersom de på många bilar sitter ihop i ett fjäderben är det dock ofta arbetsmässigt och ekonomiskt klokt att se över båda delarna i samma ingrepp.' },
  { question: 'Varför måste fjädrar bytas i par?', answer: 'Ett ensidigt fjäderbyte ger olika fjäderkonstanter mellan höger och vänster sida. Det leder till att bilen står snett och uppträder instabilt i kurvor och vid panikinbromsningar, även om den andra fjädern fortfarande är hel.' },
  { question: 'Kan jag köra med en trasig fjäder tills jag hinner boka tid?', answer: 'Vi avråder starkt från det. En bruten fjäder gör bilen instabil, förlänger bromssträckan och den vassa brottytan riskerar att skära sönder däck eller bromsslangar under färd.' },
  { question: 'Behöver jag göra en hjulinställning efter bytet?', answer: 'Ja, i de allra flesta fall. All demontering och montering i fram- och bakvagn påverkar hjulens vinklar och geometri. Utan hjulinställning riskerar däcken att snedslitas på nolltid.' },
  { question: 'Hur lång tid tar ett byte av stötdämpare eller fjädrar?', answer: 'Vanligtvis 1–3 timmar per axel, beroende på bilmodell, om det är enkla dämpare eller kompletta fjäderben, och om ytterligare stag eller bussningar behöver bytas samtidigt. Detta är ett branschmässigt riktvärde, inte en fast Brynäs-policy eller -pris.' },
]

export default function StodampareFjadrarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="suspension-title">
          <div className="service-guide__hero-bg service-guide__hero-bg--pos-left">
            <picture><source srcSet={heroWebp} type="image/webp" /><img src={heroJpg} alt="Mekaniker arbetar med fjäderben och stötdämpare på en lyft bil i verkstaden" loading="lazy" /></picture>
          </div>
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Chassi &amp; fjädring</div>
                <h1 className="bb-h1 service-guide__title" id="suspension-title">
                  Stötdämpare &amp; fjädrar i <span className="bb-accent">Gävle</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Stötdämpare och fjädrar samverkar för att hålla hjulen i kontakt med vägen och ge en stabil, säker och kontrollerad körning. Vi inspekterar, byter och utför korrekt hjulinställning.
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

        {/* Vad gör stötdämpare och fjädrar? */}
        <section className="service-guide__section" aria-labelledby="suspension-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <picture><source srcSet={comparisonWebp} type="image/webp" /><img src={comparisonJpg} alt="Ny stötdämpare med fjäderben jämfört med en sliten, rostig stötdämpare" loading="lazy" /></picture>
              <p className="service-guide__intro-caption">Stabilitet, komfort och säkerhet.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="suspension-intro-title">Vad gör stötdämpare och fjädrar?</h2>
              <p>Fjädern bär bilens vikt och tar upp stötar från vägbanan, medan stötdämparen dämpar fjäderns svängningar så att hjulen behåller markkontakt. På många bilar är dämpare, fjäder och topplager samlade i ett fjäderben, vilket gör att arbete och åtkomst ofta sker i samma moment.</p>
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
                  <strong className="bb-tip__title">Misstänker du slitage eller missljud från chassit?</strong>
                  <span className="bb-tip__text">Vi hissar upp bilen och kontrollerar dämpare, fjädrar, bussningar och topplager – snabbt och noggrant.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att byta i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="suspension-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="suspension-importance-title">Varför är det viktigt att byta i tid?</h2>
                <p>Ett skadat eller utslitet chassi påverkar trafiksäkerhet, däckslitage och bilens köregenskaper markant.</p>
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

        {/* Tecken på slitna dämpare eller trasiga fjädrar */}
        <section className="service-guide__section" aria-labelledby="suspension-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="suspension-symptoms-title">Tecken på slitna dämpare eller trasiga fjädrar</h2>
              <p>Medan stötdämpare slits smygande och gradvis, ger en bruten fjäder ofta ett plötsligt metalliskt missljud eller en synlig lutning på bilen. Här är de vanligaste signalerna på att fjädringen behöver ses över.</p>
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
                  <strong className="bb-tip__title">Enkelt eget gungtest:</strong>
                  <span className="bb-tip__text">Tryck bestämt ner ett hörn av bilen med kroppsvikten och släpp snabbt. Reser sig bilen och stabiliseras direkt är dämparna troligen i bra skick — fortsätter bilen gunga eller studsa är dämparen slut.</span>
                </div>
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <picture><source srcSet={inspectionWebp} type="image/webp" /><img src={inspectionJpg} alt="Mekaniker inspekterar stötdämpare och fjäder på en lyft bil" loading="lazy" /></picture>
              <p className="service-guide__symptoms-caption">Säker väghållning börjar under bilen.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="suspension-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="suspension-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi gör en helhetsbedömning av hjulupphängningen och byter slitna fjädrar och dämpare med kvalitetsdelar anpassade för din bils chassiversion.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info om väghållning och chassi */}
        <section className="service-guide__section" aria-labelledby="suspension-guidance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="suspension-guidance-title">Mer info om väghållning och chassi</h2>
              <p>Här är viktiga riktlinjer och fakta kring komponenternas samverkan i hjulupphängningen. Vi undersöker alltid bilens faktiska skick innan vi föreslår åtgärder.</p>
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
              <p><strong>Säkerhetsnotis:</strong> En bruten fjäder är en allvarlig säkerhetsrisk som inte bör köras vidare på. Bilen blir instabil, bromssträckan ökar kraftigt och fjäderbrottet riskerar att skada däck eller bromsslangar med haveri som följd.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="suspension-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="suspension-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att byta stötdämpare och fjädrar kräver precision och rätt chassiverktyg. Så här ser vårt strukturerade arbetssätt ut.</p>
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

        <BiltjansterFaq id="stodampare-faq" heading="Vanliga frågor om stötdämpare och fjädrar" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="suspension-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="suspension-booking-title">Boka stötdämpar- eller fjäderbyte</h2>
                <p>Priset beror på om det gäller fram- eller bakvagn, om det är enkla dämpare eller kompletta fjäderben, samt om kringliggande stag eller topplager behöver bytas samtidigt. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller stötdämpare och fjädrar" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
