// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Rebuild).
// Proves template reusability for /hjullagerbyte without inventing a new CSS file.
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

interface SymptomItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
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

interface InfoCardItem {
  icon: (props: { className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }) => React.ReactElement | null
  title: string
  text: string
  flag?: string
}

const infoCards: readonly InfoCardItem[] = [
  { icon: ClockIcon, title: 'Livslängd och intervall', text: 'Hjullager håller normalt 80 000–200 000 km beroende på körstil, fukt, salt och väglag. Framhjulslager slits ofta snabbare då de bär mer tyngd och styrkrafter.' },
  { icon: ThumbsUpIcon, title: 'Behöver inte bytas i par', text: 'Till skillnad från stötdämpare och bromsar behöver hjullager inte bytas parvis. Det är fullt tillräckligt och tryggt att enbart byta det lager som är slitet.' },
  { icon: GaugeIcon, title: 'Känsliga ABS-sensorer', text: 'Moderna lager har ofta magnetiska givarringar. Felaktig del eller ovarsam montering gör att ABS- och antisladdsystem slutar fungera och varnar.', flag: 'VIKTIGT' },
  { icon: AlertTriangleIcon, title: 'Undvik dyra följdskador', text: 'Att köra för länge med ett glappt lager riskerar att skada bromsskiva, bromsok eller hjulspindel på grund av kraftig värmeutveckling.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka enkelt tid online eller ring oss och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.'],
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

function MediaPlaceholder({ label, note, light }: { label: string; note: string; light?: boolean }) {
  return (
    <div className={`service-guide__placeholder${light ? ' service-guide__placeholder--light' : ''}`} role="img" aria-label={`Platshållare för framtida bild: ${label}`}>
      <WrenchIcon aria-hidden="true" />
      <span>{label}</span>
      <small>{note}</small>
    </div>
  )
}

export default function HjullagerbytePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="wheel-bearing-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Chassi &amp; hjulupphängning</div>
                <h1 className="bb-h1 service-guide__title" id="wheel-bearing-title">
                  Hjullagerbyte i <span className="bb-accent">Gävle</span>
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Hjullagret bär upp bilens vikt och ser till att hjulen rullar mjukt och friktionsfritt. Upplever du ett brummande missljud eller vibrationer? Vi lokaliserar det slitna lagret och byter till kvalitetsdelar med rätt specifikation.
                </p>
                <div className="service-guide__actions">
                  <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                  <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
                </div>
                <div className="service-guide__trust-row">
                  {trustBadges.map(({ icon: Icon, title, text }) => (
                    <div className="service-guide__trust-item" key={title}>
                      <Icon className="bb-icon-bare service-guide__trust-icon" aria-hidden="true" />
                      <div><h3>{title}</h3><p>{text}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="service-guide__hero-media">
                <MediaPlaceholder label="Hjullagerarbete i verkstaden" note="Bild kommer" />
                <div className="service-guide__hero-badge">
                  <span className="service-guide__hero-badge-icon"><WrenchIcon aria-hidden="true" /></span>
                  <div><h3>Hjullagerbyte i vår verkstad i Gävle</h3><p>Kvalitetsdelar, modellanpassade verktyg och noggrannhet.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad gör ett hjullager? */}
        <section className="service-guide__section" aria-labelledby="wheel-bearing-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <MediaPlaceholder label="Hjullagrets komponenter &amp; nav" note="Bild kommer" light />
              <p className="service-guide__intro-caption">Minimal friktion, maximal driftsäkerhet.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="wheel-bearing-intro-title">Vad gör ett hjullager?</h2>
              <p>Hjullagret gör att hjulet kan snurra fritt med minimal friktion samtidigt som det bär upp bilens vikt. På moderna bilar är lagret en förseglad, underhållsfri enhet som roterar miljontals varv under hård belastning.</p>
              <div className="service-guide__component-grid">
                {parts.map((item, index) => (
                  <div className="service-guide__component-item" key={item.title}>
                    <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="service-guide__tip-strip">
                <span className="service-guide__tip-icon"><LightbulbIcon aria-hidden="true" /></span>
                <div className="service-guide__tip-text">
                  <strong>Orolig för ett brummande eller malande missljud?</strong>
                  <span>Vi hissar upp bilen och kontrollerar mekaniskt vilket lager som orsakar ljudet.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka kontroll<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att åtgärda i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="wheel-bearing-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="wheel-bearing-importance-title">Varför är det viktigt att åtgärda i tid?</h2>
                <p>Ett dåligt hjullager påverkar inte bara komforten – det riskerar säkerheten och kan orsaka dyra följdskador.</p>
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

        {/* Tecken på ett slitet eller trasigt hjullager */}
        <section className="service-guide__section" aria-labelledby="wheel-bearing-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="wheel-bearing-symptoms-title">Tecken på ett slitet eller trasigt hjullager</h2>
              <p>Ett dåligt hjullager ger nästan alltid ifrån sig tydliga varningssignaler innan det havererar helt. Här är de vanligaste tecknen du bör vara uppmärksam på.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className="service-guide__tip-strip">
                <span className="service-guide__tip-icon"><LightbulbIcon aria-hidden="true" /></span>
                <div className="service-guide__tip-text">
                  <strong>Bra att veta om missljud:</strong>
                  <span>Ett hjullager som precis börjat ge missljud går ofta att köra en kortare sträcka med, men slitaget ökar snabbt. Eftersom det inte går att förutse exakt när lagret havererar helt rekommenderar vi att boka kontroll så snart missljudet uppstår.</span>
                </div>
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <MediaPlaceholder label="Inspektion och kontroll av hjullager" note="Bild kommer" light />
              <p className="service-guide__symptoms-caption">Säker gång och kontroll av glapp.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="wheel-bearing-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="wheel-bearing-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi felsöker, lokaliserar och byter slitna hjullager med rätt pressverktyg och kvalitetsdelar anpassade för din bils hjulupphängning och säkerhetssystem.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Viktig information om hjullager */}
        <section className="service-guide__section" aria-labelledby="wheel-bearing-guidance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="wheel-bearing-guidance-title">Viktig information om hjullager</h2>
              <p>Här är praktiska riktlinjer och fakta kring hjullagrets funktion och underhåll. Vi undersöker alltid bilens faktiska skick innan vi föreslår åtgärder.</p>
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
              <p><strong>Säkerhetsnotis:</strong> Ett slitet hjullager är inte något att skjuta upp i onödan. Även om missljudet kan pågå en tid finns det en överhängande risk för överhettning eller att lagret skär, vilket i värsta fall kan leda till att hjulet låser sig i hög hastighet.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="wheel-bearing-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="wheel-bearing-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att byta hjullager kräver fackmannamässiga verktyg, renhet och rätt åtdragningsmoment. Så här ser vår strukturerade process ut.</p>
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

        <BiltjansterFaq id="hjullager-faq" heading="Vanliga frågor om hjullagerbyte" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="wheel-bearing-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="wheel-bearing-booking-title">Boka byte av hjullager</h2>
                <p>Priset för att byta hjullager varierar beroende på om din bil har en bultad komplett navenhet eller ett pressat lager, samt om det gäller fram- eller bakhjul. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift anpassad för din bilmodell.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller hjullagerbyte" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
