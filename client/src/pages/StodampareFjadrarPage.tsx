import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Stötdämpare', 'Kontrollerar fjäderns rörelse och dämpar svängningarna så att bilen inte fortsätter gunga eller studsa efter gupp.'],
  ['Fjädrar', 'Bär bilens totala vikt, bestämmer åkhöjden och tar upp stötar och ojämnheter direkt från vägbanan.'],
  ['Fjäderben & topplager', 'Samlar dämpare, fjäder och fjäderbenslager i en sammanhållen enhet på många bilars framvagn.'],
]

const benefits = [
  ['Kortare bromssträcka', 'Slitna stötdämpare kan förlänga bromssträckan med upp till 20 procent på ojämnt underlag då hjulen tappar kontakten med vägen.'],
  ['Bättre väggrepp', 'Minskar risken för vattenplaning och ger stabilare kontakt mellan däck och vägbana i kurvor och vid undanmanövrar.'],
  ['Jämnare däckslitage', 'En korrekt dämpad fjädring förhindrar att däcken nöts vågigt eller trappstegsformat, vilket sparar pengar över tid.'],
  ['Helhetsbedömning', 'Vi ser över dämparfästen, krängningshämmarlänkar och länkarmar samtidigt för att slippa framtida onödiga verkstadsbesök.'],
]

const symptoms = [
  ['Oljeläckage på dämparens kropp', 'Synlig hydraulolja på stötdämparen är det säkraste tecknet på att packboxen är trasig och dämparen slut.'],
  ['Bilen gungar eller vaggar överdrivet', 'Bilen fortsätter studsa efter väggupp eller känns gungig och svajig i högre hastigheter och kurvor.'],
  ['Fronten "nosar" vid inbromsning', 'Kraftig nigning vid inbromsning eller att bakänden lyfter vid gaspådrag tyder på trötta stötdämpare.'],
  ['Metalliskt klonkljud över gupp', 'Ett distinkt metalliskt klonkande ljud indikerar ofta en bruten fjäder eller ett glappande fjäderbenslager.'],
  ['Bilen lutar synligt åt ena sidan', 'Om bilen lutar när den står parkerad på plant underlag har oftast en fjäder gått av.'],
  ['Bilen drar snett och känns instabil', 'Försämrad kursstabilitet, vandrande köregenskaper eller ökade vibrationer genom ratten.'],
]

const serviceItems = [
  'Noggrann kontroll och bedömning av om det är stötdämpare, fjäder eller båda som felar.',
  'Byte av stötdämpare, fjädrar eller kompletta fjäderben anpassade för bilens chassi.',
  'Kontroll av dämparfästen, fjäderbenslager, dammskydd och krängningshämmarlänkar.',
  'Fjädrar byts alltid parvis per axel för att garantera jämn höjd och symmetrisk väghållning.',
  'Professionell hjulinställning efter monteringen då fjädringsarbeten påverkar hjulgeometrin.',
  'Funktionskontroll och provkörning innan bilen lämnas tillbaka.',
]

const guidance = [
  ['Gradvis slitage', 'Stötdämpare slits långsamt och smygande. Många förare vänjer sig vid en allt sämre väghållning utan att märka hur mycket bromssträckan förlängts.'],
  ['Parvis utbyte är ett krav', 'Fjädrar och stötdämpare byts alltid parvis per axel. Ensidigt byte ger olika fjäderstyvhet, sned bil och obalanserade köregenskaper.'],
  ['Helhetslösning sparar pengar', 'Eftersom fjäderbenet ändå demonteras lönar det sig ofta att byta slitna topplager och genomslagsgummin i samma moment.'],
  ['Hjulinställning behövs oftast', 'Arbeten i hjulupphängningen rubbar nästan alltid hjulvinklarna. En efterföljande hjulinställning skyddar däcken och garanterar bra styrrespons.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka tid online eller via telefon och lämna in bilen hos oss på Utmarksvägen i Brynäs.'],
  ['02', 'Chassi- & fjädringskontroll', 'Vi hissar upp bilen och undersöker dämpare, fjädrar, bussningar och leder.'],
  ['03', 'Demontering och komponentbyte', 'Slitna delar demonteras och nya kvalitetskomponenter monteras med rätt moment.'],
  ['04', 'Hjulinställning', 'Vi kontrollerar och justerar hjulvinklarna med precisionsmätning.'],
  ['05', 'Slutkontroll och provkörning', 'Vi provkör bilen och går igenom utfört arbete och protokoll med dig.'],
]

const faqs = [
  ['Hur vet jag om det är dämparna eller fjädrarna som är trasiga?', 'Slitna dämpare märks oftast som en gungig, ostabil körkänsla som kommer smygande över tid. En trasig fjäder ger istället ofta ett tydligt, metalliskt "klonk"-ljud över gupp och kan göra att bilen lutar synligt. Är du osäker gör vi en snabb och säker bedömning åt dig.'],
  ['Måste jag byta både dämpare och fjädrar samtidigt?', 'Inte nödvändigtvis — det beror på vilken komponent som faktiskt är sliten eller trasig. Eftersom de på många bilar sitter ihop i ett fjäderben är det dock ofta arbetsmässigt och ekonomiskt klokt att se över båda delarna i samma ingrepp.'],
  ['Varför måste fjädrar bytas i par?', 'Ett ensidigt fjäderbyte ger olika fjäderkonstanter mellan höger och vänster sida. Det leder till att bilen står snett och uppträder instabilt i kurvor och vid panikinbromsningar, även om den andra fjädern fortfarande är hel.'],
  ['Kan jag köra med en trasig fjäder tills jag hinner boka tid?', 'Vi avråder starkt från det. En bruten fjäder gör bilen instabil, förlänger bromssträckan och den vassa brottytan riskerar att skära sönder däck eller bromsslangar under färd.'],
  ['Behöver jag göra en hjulinställning efter bytet?', 'Ja, i de allra flesta fall. All demontering och montering i fram- och bakvagn påverkar hjulens vinklar och geometri. Utan hjulinställning riskerar däcken att snedslitas på nolltid.'],
  ['Hur lång tid tar ett byte av stötdämpare eller fjädrar?', 'Vanligtvis 1–3 timmar per axel, beroende på bilmodell, om det är enkla dämpare eller kompletta fjäderben, och om ytterligare stag eller bussningar behöver bytas samtidigt.'],
]

export default function StodampareFjadrarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page suspension-page">
        <section className="services-page__hero" aria-labelledby="suspension-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="suspension-page-title">Stötdämpare & fjädrar <span className="title-accent">när väghållningen måste vara stabil</span></h1>
              <p className="services-page__lead">Stötdämpare och fjädrar samverkar för att hålla hjulen i kontakt med vägen och ge en stabil, säker och kontrollerad körning. Vi inspekterar, byter och utför korrekt hjulinställning.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av fjädringsarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Fjädringsarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide suspension-page__intro" aria-labelledby="suspension-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="suspension-intro-title">Vad gör stötdämpare och fjädrar?</h2><p>Fjädern bär bilens vikt och tar upp stötar från vägbanan, medan stötdämparen dämpar fjäderns svängningar så att hjulen behåller markkontakt. På många bilar är dämpare, fjäder och topplager samlade i ett fjäderben, vilket gör att arbete och åtkomst ofta sker i samma moment.</p></div>
          <div className="suspension-page__parts-grid">{parts.map(([title, text]) => <article className="suspension-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro suspension-page__section-gap"><h2>Varför är det viktigt att byta i tid?</h2></div>
          <div className="services-page__benefit-grid suspension-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="suspension-page__symptoms" aria-labelledby="suspension-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="suspension-symptoms-title">Tecken på slitna dämpare eller trasiga fjädrar</h2><p>Medan stötdämpare slits smygande och gradvis, ger en bruten fjäder ofta ett plötsligt metalliskt missljud eller en synlig lutning på bilen. Här är de vanligaste signalerna på att fjädringen behöver ses över.</p></div><div className="suspension-page__symptom-grid">{symptoms.map(([title, text]) => <article className="suspension-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="suspension-page__test-tip"><strong>Enkelt eget gungtest:</strong> Tryck bestämt ner ett hörn av bilen med kroppsvikten och släpp snabbt. Reser sig bilen och stabiliseras direkt är dämparna troligen i bra skick — fortsätter bilen gunga eller studsa är dämparen slut.</div></div></section>

        <section className="suspension-page__service" aria-labelledby="suspension-service-title"><div className="container"><div className="suspension-page__service-card"><div><h2 id="suspension-service-title">Det här kan vi hjälpa dig med</h2><p>Vi gör en helhetsbedömning av hjulupphängningen och byter slitna fjädrar och dämpare med kvalitetsdelar anpassade för din bils chassiversion.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="suspension-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="suspension-page__guidance" aria-labelledby="suspension-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="suspension-guidance-title">Mer info om väghållning och chassi</h2><p>Här är viktiga riktlinjer och fakta kring komponenternas samverkan i hjulupphängningen. Vi undersöker alltid bilens faktiska skick innan vi föreslår åtgärder.</p></div><div className="suspension-page__guidance-grid">{guidance.map(([title, text]) => <article className="suspension-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="suspension-page__safety-note"><strong>Säkerhetsnotis:</strong> En bruten fjäder är en allvarlig säkerhetsrisk som inte bör köras vidare på. Bilen blir instabil, bromssträckan ökar kraftigt och fjäderbrottet riskerar att skada däck eller bromsslangar med haveri som följd.</aside></div></section>

        <section className="services-page__process-section suspension-page__process" aria-labelledby="suspension-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="suspension-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att byta stötdämpare och fjädrar kräver precision och rätt chassiverktyg. Så här ser vårt strukturerade arbetssätt ut.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="stodampare-faq" heading="Vanliga frågor om stötdämpare och fjädrar" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing suspension-page__booking" aria-labelledby="suspension-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="suspension-booking-title">Boka stötdämpar- eller fjäderbyte</h2><p>Priset beror på om det gäller fram- eller bakvagn, om det är enkla dämpare eller kompletta fjäderben, samt om kringliggande stag eller topplager behöver bytas samtidigt. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
