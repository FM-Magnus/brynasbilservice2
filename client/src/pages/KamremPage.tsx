import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Kamrem & spännrullar', 'Driver kamaxeln och ser till att motorns ventiler öppnas och stängs i exakt synk med kolvarnas rörelse.'],
  ['Kamkedja', 'Alternativ konstruktion i metall på vissa motorer som normalt håller bilens livslängd utan schemalagt byte.'],
  ['Vattenpump', 'Drivs ofta av kamremmen och kontrolleras eller byts normalt samtidigt för att undvika framtida haveri och dubbel arbetskostnad.'],
]

const benefits = [
  ['Förebygger katastrofal motorskada', 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motor kostar att reparera eller byta efter ett rembrott.'],
  ['Rätt intervall för just din motor', 'Vi identifierar bytesintervallet utifrån bilens specifika motor, inte bara modellnamnet, eftersom det kan skilja mellan varianter.'],
  ['Helhetsbedömning', 'Eftersom motorn ändå är demonterad kontrollerar vi relaterade delar som vattenpump och spännrullar som annars kräver ett eget, dyrare ingrepp.'],
  ['Trygghet & andrahandsvärde', 'Ett dokumenterat kamremsbyte i serviceboken är en av de viktigaste trygghetsfaktorerna vid bilägande och försäljning.'],
]

const symptoms = [
  ['Missljud från motorns framsida', 'Kan tyda på slitage i remmen eller på en spännrulle, men förekommer långt ifrån alltid innan ett haveri.'],
  ['Oljeläckage nära kamremskåpan', 'Olja eller kylarvätska som når remmen påskyndar nedbrytningen av gummimaterialet kraftigt.'],
  ['Ojämn motorgång eller startproblem', 'Kan i vissa fall bero på att remmen kuggat över och att motorns ventiltajming därmed rubbats.'],
  ['Passerat tids- eller milintervall', 'Har bilen nått sitt intervall är risken för plötsligt rembrott verklig – även om motorn går helt ljudlöst och normalt.'],
]

const serviceItems = [
  'Byte av kamremmen enligt biltillverkarens föreskrifter för bilens specifika motor.',
  'Kontroll och normalt byte av vattenpump, spännrullar och löphjul i en komplett sats.',
  'Nollställning och låsning av motorns axlar till exakta tajmingsmärken med specialverktyg.',
  'Kontroll av aggregatrem / poly-v-rem och dess spännare om de demonteras under arbetet.',
  'Påfyllning och avluftning av kylsystemet om vattenpumpen bytts.',
  'Noggrann funktionskontroll och provstart innan bilen lämnas ut.',
]

const guidance = [
  ['Bytesintervall i mil och år', 'Kamremmen bör normalt bytas efter 60 000–100 000 km eller vart 6:e år (vissa moderna bilar har längre intervall). Intervallet avgörs alltid av motorkod och tillverkarens data.'],
  ['Kontrollera alltid via registreringsnummer', 'Exakt intervall måste alltid kontrolleras mot bilens registreringsnummer eller chassinummer, inte gissas utifrån modellnamnet — samma modell kan ha olika motorer.'],
  ['Arbetstid i verkstaden', 'Ett kamremsbyte tar normalt 2–6 timmars arbetstid beroende på bilmodell och hur trångt motorutrymmet är. Detta är ett branschmässigt riktvärde.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
]

const faqs = [
  ['Hur vet jag om min bil har kamrem eller kamkedja?', 'Det beror på motorn, inte bara bilmodellen – samma modell kan ha kamrem på en motorvariant och kamkedja på en annan. Vi slår gärna upp vad som gäller för just din bil via registreringsnumret.'],
  ['Får jag någon varning innan kamremmen går sönder?', 'Sällan en tillförlitlig sådan. Vissa tecken som missljud eller oljeläckage kan förekomma, men en kamrem kan också gå av helt utan förvarning. Det är därför bytesintervallet ska följas strikt oavsett hur bra bilen känns.'],
  ['Vad händer om kamremmen går sönder under körning?', 'På motorer med interferenskonstruktion (vanligast idag) slår kolvarna rakt in i de öppna ventilerna. Detta leder till böjda ventiler, skadade kolvar och ofta totalt motorhaveri. Misstänker du att det har hänt – försök absolut inte starta om motorn.'],
  ['Varför byts vattenpumpen ofta samtidigt som kamremmen?', 'Eftersom vattenpumpen på många motorer drivs av kamremmen och kräver samma demontering, är det ekonomiskt fördelaktigt att byta den samtidigt. Om en gammal vattenpump skär kort efter kamremsbytet kan det orsaka ett nytt rembrott.'],
  ['Vad kostar ett kamremsbyte jämfört med en motorskada?', 'Ett förebyggande kamremsbyte kostar en bråkdel av vad en motorrenovering eller motorbyte kostar efter ett haveri, där notan snabbt kan överstiga bilens restvärde.'],
  ['Hur lång tid tar ett kamremsbyte?', 'Normalt tar arbetet 2–6 timmar beroende på bilmodell och hur trångt motorutrymmet är. Ring oss så ger vi en specifik tidsuppskattning för din bil.'],
]

export default function KamremPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page kamrem-page">
        <section className="services-page__hero" aria-labelledby="kamrem-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="kamrem-page-title">Kamrem <span className="title-accent">när motorns tajming är avgörande</span></h1>
              <p className="services-page__lead">Kamremmen synkroniserar motorns vevaxel och kamaxel så att kolvar och ventiler rör sig i exakt rätt takt. Det är en av bilens mest kritiska delar där ett missat byte kan leda till totalt motorhaveri.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av kamremsarbete i verkstaden"><WrenchIcon aria-hidden="true" /><span>Kamremsarbete i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide kamrem-page__intro" aria-labelledby="kamrem-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="kamrem-intro-title">Vad är en kamrem?</h2><p>Värt att veta innan man läser vidare: inte alla bilar har kamrem. Vissa motorer har istället kamkedja i metall som normalt håller bilens livslängd utan schemalagt byte. Eftersom samma bilmodell kan ha kamrem på en motorvariant och kamkedja på en annan räcker inte modellnamnet ensamt för att veta vad som gäller din bil.</p></div>
          <div className="kamrem-page__parts-grid">{parts.map(([title, text]) => <article className="kamrem-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro kamrem-page__section-gap"><h2>Varför är det viktigt att byta i tid?</h2></div>
          <div className="services-page__benefit-grid kamrem-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="kamrem-page__symptoms" aria-labelledby="kamrem-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="kamrem-symptoms-title">Varningstecken och när kamremmen ska bytas</h2><p>Till skillnad från de flesta andra delar på bilen ger kamremmen sällan någon tillförlitlig förvarning innan den går sönder. Vissa tecken kan förekomma, men de ska aldrig tolkas som att det finns gott om tid.</p></div><div className="kamrem-page__symptom-grid">{symptoms.map(([title, text]) => <article className="kamrem-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="kamrem-page__service" aria-labelledby="kamrem-service-title"><div className="container"><div className="kamrem-page__service-card"><div><h2 id="kamrem-service-title">Det här kan vi hjälpa dig med</h2><p>Vi utför kompletta kamremsbyten med kvalitetsdelar anpassade för just din motors specifikation och nollställer motorn med specialverktyg.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="kamrem-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="kamrem-page__guidance" aria-labelledby="kamrem-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="kamrem-guidance-title">Mer info om intervall och säkerhet</h2><p>Här finns generella riktlinjer och fakta kring kamremsintervall och motorkonstruktion. Vi kontrollerar alltid vad som gäller specifikt för din bil.</p></div><div className="kamrem-page__guidance-grid">{guidance.map(([title, text]) => <article className="kamrem-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="kamrem-page__safety-note"><strong>Säkerhetsnotis:</strong> De flesta moderna motorer är interferensmotorer, vilket innebär att kolvar och ventiler kolliderar om remmen brister med totalt motorhaveri som följd. Misstänker du att kamremmen har gått av under färd – gör inga försök att starta motorn igen.</aside></div></section>

        <section className="services-page__process-section kamrem-page__process" aria-labelledby="kamrem-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="kamrem-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att förstå processen gör det enklare och tryggare att lämna in bilen för ett avancerat motorarbete.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="kamrem-faq" heading="Vanliga frågor om kamrem" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing kamrem-page__booking" aria-labelledby="kamrem-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="kamrem-booking-title">Boka kamremsbyte</h2><p>Priset beror på bilmodell, motortyp och om vattenpump samt spännrullar ingår i bytet. Ring oss på 070-553 33 95 för en tydlig och fast prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
