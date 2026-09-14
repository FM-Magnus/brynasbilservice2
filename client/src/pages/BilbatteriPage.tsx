import { useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { BoltIcon } from '../components/icons/BoltIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'

const parts = [
  ['Konventionellt blysyrabatteri', 'Vanligast på äldre bilar utan start-stopp-teknik.'],
  ['EFB (Enhanced Flooded Battery)', 'Konstruerat för bilar med enklare start-stopp-system.'],
  ['AGM (Absorbent Glass Mat)', 'För bilar med avancerad start-stopp och kraftig elektrisk belastning, t.ex. bromsenergiåtervinning.'],
]

const benefits = [
  ['Undviker att bli stående', 'Ett batteri som ger upp gör det ofta utan förvarning, särskilt en kall vintermorgon.'],
  ['Rätt typ för din bil', 'Vi matchar batteriet mot bilens faktiska utrustning, inte bara fysisk storlek och pris.'],
  ['Korrekt kodning & registrering', 'Många moderna bilar kräver att det nya batteriet registreras i bilens styrsystem för att laddas optimalt och hålla full livslängd.'],
  ['Skyddar generatorn', 'Ett kraftigt försvagat batteri belastar generatorn onödigt hårt, vilket i värsta fall kan leda till följdskador i laddsystemet.'],
]

const symptoms = [
  ['Motorn går runt trögt eller startar inte', 'Ofta det första och tydligaste tecknet, särskilt märkbart på morgonen eller i minusgrader.'],
  ['Klickljud vid startförsök', 'Startmotorn klickar men orkar inte dra runt motorn på grund av för låg spänning.'],
  ['Svaga strålkastare eller instrumentpanel', 'Belysningen tappar styrka eller flimrar när motorn startas eller går på tomgång.'],
  ['Elektronik som beter sig konstigt', 'Fönsterhissar, radio eller displayer som startar om eller fungerar oregelbundet.'],
  ['Start-stopp slutar fungera', 'Systemet stänger av funktionen automatiskt när batteriets laddningsgrad understiger säkerhetsgränsen.'],
  ['Svavellukt eller svullet batterihus', 'Allvarligt tecken på överladdning eller intern skada. Kräver omedelbart byte.'],
  ['Korrosion runt batteripolerna', 'Vita eller blåaktiga avlagringar som försämrar kontakten och laddningsförmågan.'],
]

const serviceItems = [
  'Test av batteriets faktiska kondition, spänning och startkapacitet med digital belastningsprovare.',
  'Demontering av gammalt batteri och miljösäker återvinning.',
  'Montering av rätt batterityp (konventionellt, EFB eller AGM) anpassat för bilens utrustning.',
  'Rengöring och infettning av poler och kabelskor för optimal kontakt.',
  'Kodning och registrering av det nya batteriet i bilens styrdon där det föreskrivs.',
  'Kontrollmätning av generatorns laddspänning under belastning.',
]

const guidance = [
  ['Batteriers livslängd', 'Bilbatterier håller normalt 3–6 år beroende på typ (konventionella 3–4 år, EFB 4–6 år, AGM 5–7 år). Riktvärden kan variera med körmönster.'],
  ['Kyla halverar kapaciteten', 'Vid minusgrader kan batteriets effektiva startkraft minska med upp till 50 % samtidigt som motorn kräver mer kraft att dra igång.'],
  ['Kortkörning sliter', 'Körsträckor under 15 minuter hinner sällan återställa den ström som gick åt vid startögonblicket.'],
  ['Djupurladdning ger permanenta skador', 'Ett helt urladdat batteri kan drabbas av sulfatering som gör att det aldrig återfår sin ursprungliga kapacitet.'],
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka tid via webb eller telefon och lämna in bilen hos oss på Utmarksvägen.'],
  ['02', 'Batteritest', 'Vi mäter batteriets hälsa, kapacitet och bilens laddsystem innan vi dömer ut batteriet.'],
  ['03', 'Byte och polvård', 'Vi monterar ett batteri av exakt rätt specifikation och rengör polanslutningarna.'],
  ['04', 'Registrering & kodning', 'På bilar med batteriövervakning (BMS) nollställer vi laddcykeln i systemet.'],
  ['05', 'Slutkontroll och rapport', 'Vi bekräftar felfri laddning och provstart innan bilen lämnas tillbaka.'],
]

const faqs = [
  ['Hur länge håller ett bilbatteri?', 'Normalt 3–6 år beroende på batterityp och körmönster. Mycket kortkörning och sträng kyla förkortar livslängden oavsett märke.'],
  ['Spelar det roll vilken typ av batteri jag väljer?', 'Ja, det är helt avgörande. Bilar med start-stopp och bromsenergiåtervinning kräver i regel AGM. Ett standardbatteri i en sådan bil riskerar att haverera inom några månader.'],
  ['Måste ett nytt batteri kodas in i bilen?', 'På många moderna bilar, ja. Bilen måste få veta att batteriet är nytt för att anpassa laddstyrkan. Missas detta laddar generatorn ofta för hårt, vilket förkortar batteriets livslängd.'],
  ['Varför slutade bilen starta helt utan förvarning?', 'Batterier ger ofta bara subtila varningar. När kylan slår till eller en cell i batteriet kollapsar kan spänningen falla under startmotorns tröskelvärde över en enda natt.'],
  ['Går det inte att ladda upp ett urladdat batteri istället för att byta?', 'Det beror på skicket. Har batteriet stått urladdat har det ofta tagit permanent skada av sulfatering. Vi testar alltid batteriets kondition först så att du slipper köpa ett nytt i onödan.'],
  ['Hur lång tid tar ett batteribyte?', 'Normalt tar arbetet 30–60 minuter, inklusive provning och eventuell kodning i bilens styrsystem.'],
]

export default function BilbatteriPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />
      <main className="services-page battery-page">
        <section className="services-page__hero" aria-labelledby="battery-page-title">
          <div className="container"><div className="services-page__hero-layout">
            <div className="services-page__hero-content">
              <h1 className="services-page__title" id="battery-page-title">Bilbatteri <span className="title-accent">när du behöver säker startkraft</span></h1>
              <p className="services-page__lead">Bilbatteriet driver startmotorn och håller igång bilens elsystem — från belysning till infotainment och start-stopp-funktion. Vi testar, byter och kodar rätt batterityp för din bil.</p>
              <div className="services-page__hero-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline"><PhoneIcon className="services-page__btn-icon" /><span>Ring 070-553 33 95</span></a></div>
            </div>
            <div className="services-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild av batteriservice i verkstaden"><BoltIcon aria-hidden="true" /><span>Batteriservice i verkstaden</span><small>Bild kommer</small></div>
          </div></div>
        </section>

        <section className="services-page__guide battery-page__intro" aria-labelledby="battery-intro-title"><div className="container">
          <div className="services-page__guide-intro"><h2 id="battery-intro-title">Vad gör bilbatteriet?</h2><p>Bilbatteriet driver startmotorn och strömförsörjer bilens elsystem. Till skillnad från de flesta andra slitdelarna på bilen ger batteriet ofta bara en kort varningsperiod innan det slutar fungera helt, särskilt vid kyla. Att montera fel typ — till exempel ett standardbatteri i en bil som kräver AGM — ger kortare livslängd och sämre funktion.</p></div>
          <div className="battery-page__parts-grid">{parts.map(([title, text]) => <article className="battery-page__part-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="services-page__guide-intro battery-page__section-gap"><h2>Varför är det viktigt att byta i tid?</h2></div>
          <div className="services-page__benefit-grid battery-page__benefit-grid">{benefits.map(([title, text]) => <article className="services-page__benefit-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="battery-page__symptoms" aria-labelledby="battery-symptoms-title"><div className="container"><div className="services-page__guide-intro"><h2 id="battery-symptoms-title">Varningstecken på svagt eller dåligt batteri</h2><p>Batteriet ger ofta subtila ledtrådar innan det lägger av helt. Känner du igen något av följande symptom är det klokt att låta oss testa batteriets hälsa innan kylan slår till.</p></div><div className="battery-page__symptom-grid">{symptoms.map(([title, text]) => <article className="battery-page__symptom-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="battery-page__service" aria-labelledby="battery-service-title"><div className="container"><div className="battery-page__service-card"><div><h2 id="battery-service-title">Det här kan vi hjälpa dig med</h2><p>Vi testar bilens laddsystem och monterar ett kvalitetsbatteri med exakt rätt specifikation och teknik för just din bil.</p></div><ul>{serviceItems.map(item => <li key={item}><CheckIcon className="battery-page__service-check" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

        <section className="battery-page__guidance" aria-labelledby="battery-guidance-title"><div className="container"><div className="services-page__guide-intro"><h2 id="battery-guidance-title">Mer info om batterier och underhåll</h2><p>Här är branschmässiga riktlinjer och fakta kring batterityper, temperaturpåverkan och körmönster. Vi kontrollerar alltid vad som passar din bil bäst.</p></div><div className="battery-page__guidance-grid">{guidance.map(([title, text]) => <article className="battery-page__guidance-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><aside className="battery-page__advice-note"><strong>Underhållsråd:</strong> Kör du mestadels korta sträckor rekommenderar vi att ansluta en modern underhållsladdare några gånger under vinterhalvåret för att maximera batteriets livslängd.</aside></div></section>

        <section className="services-page__process-section battery-page__process" aria-labelledby="battery-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="battery-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att byta batteri hos oss går snabbt och smidigt, med noggrann diagnostik så att du vet att hela laddsystemet mår bra.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

        <BiltjansterFaq id="bilbatteri-faq" heading="Vanliga frågor om bilbatteri" items={faqs.map(([question, answer]) => ({ question, answer }))} />

        <section className="services-page__pricing battery-page__booking" aria-labelledby="battery-booking-title"><div className="container"><div className="services-page__pricing-card"><div><h2 id="battery-booking-title">Boka batteribyte</h2><p>Priset beror på vilken batterityp och kapacitet din bil kräver — AGM kostar mer än ett konventionellt batteri, men är nödvändigt för moderna elsystem. Ring oss på 070-553 33 95 för en tydlig prisuppgift innan vi sätter igång.</p></div><div className="services-page__pricing-actions"><button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka tid</button><a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a></div></div></div></section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
