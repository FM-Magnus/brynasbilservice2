import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Förseglat hjullager', 'En underhållsfri och förseglad enhet med livstidssmörjmedel som möjliggör fri rotation med minimal friktion under enorm belastning och miljontals varv.'],
  ['Komplett navenhet', 'På många moderna bilar sitter lagret integrerat i hjulnavet som en färdig modul, vilket ger hög stabilitet och byts som en hel enhet.'],
  ['Inbyggd ABS-sensor & givarring', 'Många hjullager har en integrerad magnetisk sensorring för ABS och antisladd (ESP). Rätt reservdel är avgörande för säkerhetssystemens funktion.'],
]

const benefits = [
  ['Säkerhet & trygghet', 'Ett dåligt hjullager kan i värsta fall skära eller överhettas, vilket riskerar att hjulet låser sig eller att styrförmågan försämras under körning.'],
  ['Skyddar kringliggande delar', 'Ett glappt lager belastar bromsskivor, bromsok och hjulupphängning onormalt, vilket snabbt kan leda till onödiga följdskador och dyrare reparationer.'],
  ['Praktisk tidsbesparing', 'Eftersom bromsskivor och ok demonteras vid lagerbytet passar vi alltid på att kontrollera bromsarnas skick utan extra arbetskostnad.'],
  ['Rätt del för rätt bil', 'Vi säkerställer att ersättningslagret matchar bilens specifikationer exakt, särskilt för bilar med ABS-integrerade magnetiska givarringar.'],
]

const symptoms = [
  ['Mullrande eller brummande ljud', 'Ett dovt, malande eller brummande ljud som ökar med hastigheten är det vanligaste och tydligaste tecknet på ett slitet lager.'],
  ['Ljudet ändras vid kurvtagning', 'Brummar det mer när du svänger åt ena hållet och tystnar åt det andra pekar det oftast ut vilken sida lagret sitter på.'],
  ['Vibrationer i ratt eller golv', 'Skakningar och vibrationer som tilltar i högre hastigheter och följer samma mönster och frekvens som missljudet.'],
  ['Märkbart glapp vid hjulvickning', 'Om hjulet vickas för hand när bilen är upphissad och det känns glappt är lagret redan kraftigt slitet och måste åtgärdas.'],
  ['Oprecis väghållning i kurvor', 'Bilen kan kännas instabil, spårkänslig eller svävande vid kurvtagning på grund av det ökade spelet i hjulnavet.'],
  ['Varmt hjulnav efter körning', 'Ökad friktion i ett defekt lager alstrar kraftig värme som sprider sig till fälgen och navet, ibland med lukt av bränt fett.'],
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

const guidance = [
  ['Livslängd och intervall', 'Hjullager håller normalt 80 000–200 000 km beroende på körstil, fukt, salt och väglag. Framhjulslager slits ofta snabbare då de bär mer tyngd och styrkrafter.'],
  ['Behöver inte bytas i par', 'Till skillnad från stötdämpare och bromsar behöver hjullager inte bytas parvis. Det är fullt tillräckligt och tryggt att enbart byta det lager som är slitet.'],
  ['Känsliga ABS-sensorer', 'Moderna lager har ofta magnetiska givarringar. Felaktig del eller ovarsam montering gör att ABS- och antisladdsystem slutar fungera och varnar.'],
  ['Undvik dyra följdskador', 'Att köra för länge med ett glappt lager riskerar att skada bromsskiva, bromsok eller hjulspindel på grund av kraftig värmeutveckling.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka enkelt tid online eller ring oss och lämna in bilen hos oss på Utmarksvägen 21B i Brynäs.'],
  ['02', 'Lokaliseringskontroll', 'Vi provkör, hissar upp bilen och känner mekaniskt efter glapp och missljud för att säkra vilket lager som felar.'],
  ['03', 'Demontering av broms & nav', 'Bromsok och skiva demonteras varsamt och det slitna lagret pressas ur eller navenheten skruvas loss.'],
  ['04', 'Montering med moment', 'Nytt kvalitetslager monteras med anpassade verktyg och dras åt till biltillverkarens exakta moment.'],
  ['05', 'Slutkontroll och provkörning', 'Vi provkör bilen, kontrollerar att missljudet är borta och att ABS- och antisladdsystem fungerar felfritt.'],
]

const faqs = [
  ['Hur vet jag vilket hjullager som är trasigt?', 'Det tydligaste tecknet är ett dovt, malande eller brummande ljud som ökar i takt med bilens hastighet och ändrar karaktär när du svänger. Svänger du vänster belastas höger sidas lager mer — om ljudet ökar då sitter felet ofta på höger sida. På verkstaden hissar vi upp bilen och snurrar samt vickar på hjulen för att fastställa exakt vilket lager som felar.'],
  ['Kan jag fortsätta köra med ett dåligt hjullager?', 'Ett lager som precis har börjat ge ifrån sig ett svagt brummande fungerar ofta att köra en kortare sträcka med, men det slits snabbare för varje mil. Det finns ingen garanti för hur länge det håller innan det skär eller överhettas. Boka tid så snart du hör ljudet för att undvika onödiga följdskador och säkerhetsrisker.'],
  ['Måste jag byta hjullager på båda sidor samtidigt?', 'Nej, till skillnad från stötdämpare, fjädrar eller bromsar behöver inte hjullager bytas parvis. Hjullager slits ofta oberoende av varandra beroende på vägbana, gropar och fukt. Visar det andra lagret inga tecken på missljud eller glapp räcker det utmärkt att byta det defekta lagret.'],
  ['Vad är skillnaden mellan ett pressat lager och en navenhet?', 'På äldre bilmodeller pressas ofta själva lagret ur och i hjulspindeln med en hydraulpress. På många moderna bilar säljs lagret som en komplett, bultad navenhet (hjulnav med förmonterat lager och integrerad ABS-givare), vilket möjliggör ett snabbare och mer precist byte.'],
  ['Varför tänds ABS-lampan om hjullagret är dåligt?', 'Många moderna hjullager har en inbyggd magnetisk remsa som ABS-sensorn läser av för att mäta hjulets rotationshastighet. Om lagret blir kraftigt glappt, överhettas eller ersätts med felaktig del kan sensorn inte läsa signalen, vilket gör att bilens antisladd- och ABS-system varnar.'],
  ['Hur lång tid tar det att byta ett hjullager?', 'Ett byte tar vanligtvis mellan 1 till 2 timmar per hjul, beroende på bilmodell och om lagret är en bultad enhet eller kräver demontering av spindel och pressning.'],
]

export default function HjullagerbytePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page wheel-bearing-page">
        <section className="services-page__hero" aria-labelledby="wheel-bearing-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="wheel-bearing-page-title">Hjullagerbyte <span className="title-accent">för tyst och säker gång</span></h1>
              <p className="services-page__lead">Hjullagret bär upp bilens vikt och ser till att hjulen rullar mjukt och friktionsfritt. Upplever du ett brummande missljud eller vibrationer? Vi lokaliserar det slitna lagret och byter till kvalitetsdelar med rätt specifikation.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av hjullagerarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Hjullagerarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide wheel-bearing-page__intro" aria-labelledby="wheel-bearing-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="wheel-bearing-intro-title">Vad gör ett hjullager?</h2><p>Hjullagret gör att hjulet kan snurra fritt med minimal friktion samtidigt som det bär upp bilens vikt. På moderna bilar är lagret en förseglad, underhållsfri enhet som roterar miljontals varv under hård belastning.</p></div>
          <div className="wheel-bearing-page__parts-grid">{parts.map(([title, text]) => <article className="wheel-bearing-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro wheel-bearing-page__section-gap"><h2>Varför är det viktigt att åtgärda i tid?</h2></div>
          <div className="services-page__benefit-grid wheel-bearing-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="wheel-bearing-page__symptoms" aria-labelledby="wheel-bearing-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="wheel-bearing-symptoms-title">Tecken på ett slitet eller trasigt hjullager</h2><p>Ett dåligt hjullager ger nästan alltid ifrån sig tydliga varningssignaler innan det havererar helt. Här är de vanligaste tecknen du bör vara uppmärksam på.</p></div><div className="wheel-bearing-page__symptom-grid">{symptoms.map(([title, text]) => <article className="wheel-bearing-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="wheel-bearing-page__test-tip"><strong>Bra att veta om missljud:</strong> Ett hjullager som precis börjat ge missljud går ofta att köra en kortare sträcka med, men slitaget ökar snabbt. Eftersom det inte går att förutse exakt när lagret havererar helt rekommenderar vi att boka kontroll så snart missljudet uppstår.</div></div></section>

        <section className="wheel-bearing-page__service" aria-labelledby="wheel-bearing-service-title"><div className="container"><div className="wheel-bearing-page__service-card"><div><h2 id="wheel-bearing-service-title">Det här kan vi hjälpa dig med</h2><p>Vi felsöker, lokaliserar och byter slitna hjullager med rätt pressverktyg och kvalitetsdelar anpassade för din bils hjulupphängning och säkerhetssystem.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="wheel-bearing-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="wheel-bearing-page__guidance" aria-labelledby="wheel-bearing-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="wheel-bearing-guidance-title">Viktig information om hjullager</h2><p>Här är praktiska riktlinjer och fakta kring hjullagrets funktion och underhåll. Vi undersöker alltid bilens faktiska skick innan vi föreslår åtgärder.</p></div><div className="wheel-bearing-page__guidance-grid">{guidance.map(([title, text]) => <article className="wheel-bearing-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="wheel-bearing-page__safety-note"><strong>Säkerhetsnotis:</strong> Ett slitet hjullager är inte något att skjuta upp i onödan. Även om missljudet kan pågå en tid finns det en överhängande risk för överhettning eller att lagret skär, vilket i värsta fall kan leda till att hjulet låser sig i hög hastighet.</aside></div></section>

        <section className="services-page__process-section wheel-bearing-page__process" aria-labelledby="wheel-bearing-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="wheel-bearing-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att byta hjullager kräver fackmannamässiga verktyg, renhet och rätt åtdragningsmoment. Så här ser vår strukturerade process ut.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="hjullager-faq" heading="Vanliga frågor om hjullagerbyte" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing wheel-bearing-page__booking" aria-labelledby="wheel-bearing-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="wheel-bearing-booking-title">Boka byte av hjullager</h2><p>Priset för att byta hjullager varierar beroende på om din bil har en bultad komplett navenhet eller ett pressat lager, samt om det gäller fram- eller bakhjul. Ring oss på 070-553 33 95 för en tydlig prisuppgift anpassad för din bilmodell.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
