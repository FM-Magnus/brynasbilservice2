// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Scaling).
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
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { LightbulbIcon } from '../components/icons/LightbulbIcon'
import { BoltIcon } from '../components/icons/BoltIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import { WavesIcon } from '../components/icons/WavesIcon'
import heroJpg from '../assets/images/services/battery/battery-terminal-bolt-tightening.jpg'
import heroWebp from '../assets/images/services/battery/battery-terminal-bolt-tightening.webp'
import introJpg from '../assets/images/services/battery/battery-multimeter-test-workshop.jpg'
import introWebp from '../assets/images/services/battery/battery-multimeter-test-workshop.webp'
import serviceJpg from '../assets/images/services/battery/battery-terminal-voltage-closeup.jpg'
import serviceWebp from '../assets/images/services/battery/battery-terminal-voltage-closeup.webp'

const trustBadges = [
  { icon: ShieldIcon, title: 'Rätt batteri & teknik', text: 'Vi matchar alltid AGM, EFB eller blysyrabatteri mot din bil.' },
  { icon: WrenchIcon, title: 'Kodning & diagnostik', text: 'Korrekt registrering i bilens BMS-system för optimal livslängd.' },
  { icon: ClockIcon, title: 'Snabbt & smidigt', text: 'Konditionstest och byte utförs normalt inom 30–60 minuter.' },
] as const

const parts = [
  { title: 'Konventionellt blysyrabatteri', text: 'Vanligast på äldre bilar utan start-stopp-teknik.' },
  { title: 'EFB (Enhanced Flooded Battery)', text: 'Konstruerat för bilar med enklare start-stopp-system.' },
  { title: 'AGM (Absorbent Glass Mat)', text: 'För bilar med avancerad start-stopp och kraftig elektrisk belastning, t.ex. bromsenergiåtervinning.' },
] as const

const benefits = [
  { icon: ShieldIcon, title: 'Undviker att bli stående', text: 'Ett batteri som ger upp gör det ofta utan förvarning, särskilt en kall vintermorgon.' },
  { icon: GaugeIcon, title: 'Rätt typ för din bil', text: 'Vi matchar batteriet mot bilens faktiska utrustning, inte bara fysisk storlek och pris.' },
  { icon: WrenchIcon, title: 'Korrekt kodning & registrering', text: 'Många moderna bilar kräver att det nya batteriet registreras i bilens styrsystem för att laddas optimalt och hålla full livslängd.' },
  { icon: ThumbsUpIcon, title: 'Skyddar generatorn', text: 'Ett kraftigt försvagat batteri belastar generatorn onödigt hårt, vilket i värsta fall kan leda till följdskador i laddsystemet.' },
] as const

interface SymptomItem {
  icon: (props: { className?: string }) => React.ReactElement | null
  title: string
  text: string
  featured?: boolean
  urgent?: boolean
}

const symptoms: readonly SymptomItem[] = [
  { icon: GaugeIcon, title: 'Motorn går runt trögt eller startar inte', text: 'Ofta det första och tydligaste tecknet, särskilt märkbart på morgonen eller i minusgrader.', featured: true },
  { icon: Volume2Icon, title: 'Klickljud vid startförsök', text: 'Startmotorn klickar men orkar inte dra runt motorn på grund av för låg spänning.' },
  { icon: BoltIcon, title: 'Svaga strålkastare eller instrumentpanel', text: 'Belysningen tappar styrka eller flimrar när motorn startas eller går på tomgång.' },
  { icon: WavesIcon, title: 'Elektronik som beter sig konstigt', text: 'Fönsterhissar, radio eller displayer som startar om eller fungerar oregelbundet.' },
  { icon: ClockIcon, title: 'Start-stopp slutar fungera', text: 'Systemet stänger av funktionen automatiskt när batteriets laddningsgrad understiger säkerhetsgränsen.' },
  { icon: AlertTriangleIcon, title: 'Svavellukt eller svullet batterihus', text: 'Allvarligt tecken på överladdning eller intern skada. Kräver omedelbart byte.', urgent: true },
  { icon: WrenchIcon, title: 'Korrosion runt batteripolerna', text: 'Vita eller blåaktiga avlagringar som försämrar kontakten och laddningsförmågan.' },
]

const serviceItems = [
  'Test av batteriets faktiska kondition, spänning och startkapacitet med digital belastningsprovare.',
  'Demontering av gammalt batteri och miljösäker återvinning.',
  'Montering av rätt batterityp (konventionellt, EFB eller AGM) anpassat för bilens utrustning.',
  'Rengöring och infettning av poler och kabelskor för optimal kontakt.',
  'Kodning och registrering av det nya batteriet i bilens styrdon där det föreskrivs.',
  'Kontrollmätning av generatorns laddspänning under belastning.',
]

interface InfoCardItem {
  icon: (props: { className?: string }) => React.ReactElement | null
  title: string
  value: string
  text: string
}

const guidance: readonly InfoCardItem[] = [
  { icon: ClockIcon, title: 'Batteriers livslängd', value: '3–6 år', text: 'Bilbatterier håller normalt 3–6 år beroende på typ (konventionella 3–4 år, EFB 4–6 år, AGM 5–7 år). Riktvärden kan variera med körmönster.' },
  { icon: AlertTriangleIcon, title: 'Kyla halverar kapaciteten', value: '−50%', text: 'Vid minusgrader kan batteriets effektiva startkraft minska med upp till 50 % samtidigt som motorn kräver mer kraft att dra igång.' },
  { icon: GaugeIcon, title: 'Kortkörning sliter', value: '<15 min', text: 'Körsträckor under 15 minuter hinner sällan återställa den ström som gick åt vid startögonblicket.' },
  { icon: InfoIcon, title: 'Djupurladdning ger permanenta skador', value: 'Permanent', text: 'Ett helt urladdat batteri kan drabbas av sulfatering som gör att det aldrig återfår sin ursprungliga kapacitet.' },
]

const processSteps = [
  ['01', 'Bokning och inlämning', 'Boka tid via webb eller telefon och lämna in bilen hos oss på Utmarksvägen.'],
  ['02', 'Batteritest', 'Vi mäter batteriets hälsa, kapacitet och bilens laddsystem innan vi dömer ut batteriet.'],
  ['03', 'Byte och polvård', 'Vi monterar ett batteri av exakt rätt specifikation och rengör polanslutningarna.'],
  ['04', 'Registrering & kodning', 'På bilar med batteriövervakning (BMS) nollställer vi laddcykeln i systemet.'],
  ['05', 'Slutkontroll och rapport', 'Vi bekräftar felfri laddning och provstart innan bilen lämnas tillbaka.'],
] as const

const faqs = [
  { question: 'Hur länge håller ett bilbatteri?', answer: 'Normalt 3–6 år beroende på batterityp och körmönster. Mycket kortkörning och sträng kyla förkortar livslängden oavsett märke.' },
  { question: 'Spelar det roll vilken typ av batteri jag väljer?', answer: 'Ja, det är helt avgörande. Bilar med start-stopp och bromsenergiåtervinning kräver i regel AGM. Ett standardbatteri i en sådan bil riskerar att haverera inom några månader.' },
  { question: 'Måste ett nytt batteri kodas in i bilen?', answer: 'På många moderna bilar, ja. Bilen måste få veta att batteriet är nytt för att anpassa laddstyrkan. Missas detta laddar generatorn ofta för hårt, vilket förkortar batteriets livslängd.' },
  { question: 'Varför slutade bilen starta helt utan förvarning?', answer: 'Batterier ger ofta bara subtila varningar. När kylan slår till eller en cell i batteriet kollapsar kan spänningen falla under startmotorns tröskelvärde över en enda natt.' },
  { question: 'Går det inte att ladda upp ett urladdat batteri istället för att byta?', answer: 'Det beror på skicket. Har batteriet stått urladdat har det ofta tagit permanent skada av sulfatering. Vi testar alltid batteriets kondition först så att du slipper köpa ett nytt i onödan.' },
  { question: 'Hur lång tid tar ett batteribyte?', answer: 'Normalt tar arbetet 30–60 minuter, inklusive provning och eventuell kodning i bilens styrsystem.' },
]

export default function BilbatteriPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openModal} variant="overlay" />
      <main className="service-guide">
        {/* Hero */}
        <section className="service-guide__hero" aria-labelledby="battery-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__hero-inner">
              <div>
                <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">Elsystem &amp; startkraft</div>
                <h1 className="bb-h1 service-guide__title" id="battery-title">
                  Bilbatteri &amp; <span className="bb-accent">Batteribyte</span> i Gävle
                </h1>
                <p className="bb-lead bb-lead--dark service-guide__lead">
                  Bilbatteriet driver startmotorn och håller igång bilens elsystem — från belysning till infotainment och start-stopp-funktion. Vi testar, byter och kodar rätt batterityp för din bil.
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

              <div className="service-guide__hero-media">
                <picture data-image-slot="battery-hero">
                  <source srcSet={heroWebp} type="image/webp" />
                  <img src={heroJpg} alt="Mekaniker som drar åt polbult på bilbatteri" />
                </picture>
                <div className="service-guide__hero-badge">
                  <span className="service-guide__hero-badge-icon"><BoltIcon aria-hidden="true" /></span>
                  <div><h3>Batteribyte i vår verkstad i Gävle</h3><p>Rätt batterityp, professionell testning och BMS-kodning.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vad gör bilbatteriet? */}
        <section className="service-guide__section" aria-labelledby="battery-intro-title">
          <div className="bb-wrap service-guide__container service-guide__intro-layout">
            <div className="service-guide__intro-media">
              <picture>
                <source srcSet={introWebp} type="image/webp" />
                <img src={introJpg} alt="Mekaniker testar batteriets spänning med en multimeter i verkstaden" loading="lazy" />
              </picture>
              <p className="service-guide__intro-caption">Noggrann mätning och konditionstest.</p>
            </div>
            <div className="service-guide__intro-content">
              <h2 id="battery-intro-title">Vad gör bilbatteriet?</h2>
              <p>Bilbatteriet driver startmotorn och strömförsörjer bilens elsystem. Till skillnad från de flesta andra slitdelarna på bilen ger batteriet ofta bara en kort varningsperiod innan det slutar fungera helt, särskilt vid kyla. Att montera fel typ — till exempel ett standardbatteri i en bil som kräver AGM — ger kortare livslängd och sämre funktion.</p>
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
                  <strong>Osäker på vilken batterityp din bil behöver?</strong>
                  <span>Vi kontrollerar alltid biltillverkarens krav för AGM, EFB eller blysyrabatteri utifrån ditt registreringsnummer.</span>
                </div>
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Fråga oss<ArrowRightIcon aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Varför är det viktigt att byta i tid? */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="battery-importance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__importance">
              <div>
                <h2 id="battery-importance-title">Varför är det viktigt att byta i tid?</h2>
                <p>Ett svagt batteri riskerar inte bara att lämna dig strandsatt, utan kan även skada generator och känslig elektronik.</p>
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

        {/* Varningstecken på svagt eller dåligt batteri */}
        <section className="service-guide__section" aria-labelledby="battery-symptoms-title">
          <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
            <div className="service-guide__symptoms-content">
              <h2 id="battery-symptoms-title">Varningstecken på svagt eller dåligt batteri</h2>
              <p>Batteriet ger ofta subtila ledtrådar innan det lägger av helt. Känner du igen något av följande symptom är det klokt att låta oss testa batteriets hälsa innan kylan slår till.</p>
              <div className="service-guide__symptom-list">
                {symptoms.map(({ icon: Icon, title, text, featured, urgent }) => (
                  <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
                    <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="service-guide__symptoms-media">
              <picture>
                <source srcSet={serviceWebp} type="image/webp" />
                <img src={serviceJpg} alt="Mekaniker mäter batterispänningen med en multimeter, 12,6 volt" loading="lazy" />
              </picture>
              <p className="service-guide__symptoms-caption">Konditionstest före byte – inga onödiga kostnader.</p>
            </div>
          </div>
        </section>

        {/* Det här kan vi hjälpa dig med */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="battery-service-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__service-card">
              <div>
                <h2 id="battery-service-title">Det här kan vi hjälpa dig med</h2>
                <p>Vi testar bilens laddsystem och monterar ett kvalitetsbatteri med exakt rätt specifikation och teknik för just din bil.</p>
              </div>
              <ul className="service-guide__service-checklist">
                {serviceItems.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Mer info om batterier och underhåll */}
        <section className="service-guide__section" aria-labelledby="battery-guidance-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__info-heading">
              <h2 id="battery-guidance-title">Mer info om batterier och underhåll</h2>
              <p>Här är branschmässiga riktlinjer och fakta kring batterityper, temperaturpåverkan och körmönster. Vi kontrollerar alltid vad som passar din bil bäst.</p>
            </div>
            <div className="service-guide__info-grid">
              {guidance.map(({ icon: Icon, title, value, text }) => (
                <div className="service-guide__info-card" key={title}>
                  <span className="service-guide__info-icon"><Icon aria-hidden="true" /></span>
                  <div>
                    <span className="service-guide__info-flag" aria-hidden="true">{value}</span>
                    <h3>{title}</h3><p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="service-guide__safety-strip">
              <InfoIcon aria-hidden="true" />
              <p><strong>Underhållsråd:</strong> Kör du mestadels korta sträckor rekommenderar vi att ansluta en modern underhållsladdare några gånger under vinterhalvåret för att maximera batteriets livslängd.</p>
            </div>
          </div>
        </section>

        {/* Så går det till hos oss */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="battery-process-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__process">
              <div className="service-guide__process-text">
                <h2 id="battery-process-title">Så går det till<br /><span className="bb-accent">hos oss</span></h2>
                <p>Att byta batteri hos oss går snabbt och smidigt, med noggrann diagnostik så att du vet att hela laddsystemet mår bra.</p>
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

        <BiltjansterFaq id="bilbatteri-faq" heading="Vanliga frågor om bilbatteri" items={faqs} />

        {/* Closing CTA */}
        <section className="service-guide__section service-guide__section--tight" aria-labelledby="battery-booking-title">
          <div className="bb-wrap service-guide__container">
            <div className="service-guide__closing">
              <div>
                <h2 id="battery-booking-title">Boka batteribyte</h2>
                <p>Priset beror på vilken batterityp och kapacitet din bil kräver — AGM kostar mer än ett konventionellt batteri, men är nödvändigt för moderna elsystem. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="service-guide__actions">
                <button type="button" onClick={openModal} className="bb-btn bb-btn--teal service-guide__btn">Boka tid</button>
                <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller bilbatteri" />
      <PublicFooter onBookingClick={openModal} />
    </>
  )
}
