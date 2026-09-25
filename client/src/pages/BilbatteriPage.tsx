// Rebuilt 2026-09-19 on the shared ServiceGuideTemplate (Step 5, Guide Family Scaling).
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
import { InfoIcon } from '../components/icons/InfoIcon'
import { GaugeIcon } from '../components/icons/GaugeIcon'
import { BoltIcon } from '../components/icons/BoltIcon'
import { Volume2Icon } from '../components/icons/Volume2Icon'
import { WavesIcon } from '../components/icons/WavesIcon'
import heroJpg from '../assets/images/services/battery/battery-jump-start-hero.jpg'
import heroWebp from '../assets/images/services/battery/battery-jump-start-hero.webp'
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

const symptoms: readonly GuideSymptom[] = [
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

const guidance: readonly GuideInfoCard[] = [
  { icon: ClockIcon, title: 'Batteriers livslängd', flag: '3–6 år', text: 'Bilbatterier håller normalt 3–6 år beroende på typ (konventionella 3–4 år, EFB 4–6 år, AGM 5–7 år). Riktvärden kan variera med körmönster.' },
  { icon: AlertTriangleIcon, title: 'Kyla halverar kapaciteten', flag: '−50%', text: 'Vid minusgrader kan batteriets effektiva startkraft minska med upp till 50 % samtidigt som motorn kräver mer kraft att dra igång.' },
  { icon: GaugeIcon, title: 'Kortkörning sliter', flag: '<15 min', text: 'Körsträckor under 15 minuter hinner sällan återställa den ström som gick åt vid startögonblicket.' },
  { icon: InfoIcon, title: 'Djupurladdning ger permanenta skador', flag: 'Permanent', text: 'Ett helt urladdat batteri kan drabbas av sulfatering som gör att det aldrig återfår sin ursprungliga kapacitet.' },
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
  const { openBooking, bookingModal } = useBookingModal('Gäller bilbatteri')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <PublicHeader onBookingClick={openBooking} variant="overlay" />
      <main className="service-guide">
        <GuideHero
          id="battery-title"
          eyebrow="Elsystem & startkraft"
          title={<>Bilbatteri &amp; <span className="bb-accent">Batteribyte</span> i Gävle</>}
          lead="Bilbatteriet driver startmotorn och håller igång bilens elsystem — från belysning till infotainment och start-stopp-funktion. Vi testar, byter och kodar rätt batterityp för din bil."
          image={{ webp: heroWebp, jpg: heroJpg, alt: 'Startkablar anslutna till ett bilbatteri i motorrummet', slot: 'battery-hero' }}
          trustBadges={trustBadges}
          onBooking={openBooking}
        />

        <GuideIntro
          id="battery-intro-title"
          heading="Vad gör bilbatteriet?"
          image={{ webp: introWebp, jpg: introJpg, alt: 'Mekaniker testar batteriets spänning med en multimeter i verkstaden' }}
          caption="Noggrann mätning och konditionstest."
        >
          <p>Bilbatteriet driver startmotorn och strömförsörjer bilens elsystem. Till skillnad från de flesta andra slitdelarna på bilen ger batteriet ofta bara en kort varningsperiod innan det slutar fungera helt, särskilt vid kyla. Att montera fel typ — till exempel ett standardbatteri i en bil som kräver AGM — ger kortare livslängd och sämre funktion.</p>
          <GuideParts items={parts} />
          <Tip
            title="Osäker på vilken batterityp din bil behöver?"
            text="Vi kontrollerar alltid biltillverkarens krav för AGM, EFB eller blysyrabatteri utifrån ditt registreringsnummer."
            action={<button type="button" onClick={openBooking} className="bb-btn bb-btn--teal service-guide__btn">Fråga oss<ArrowRightIcon aria-hidden="true" /></button>}
          />
        </GuideIntro>

        <GuideImportance
          id="battery-importance-title"
          heading="Varför är det viktigt att byta i tid?"
          text="Ett svagt batteri riskerar inte bara att lämna dig strandsatt, utan kan även skada generator och känslig elektronik."
          items={benefits}
        />

        <GuideSymptoms
          id="battery-symptoms-title"
          heading="Varningstecken på svagt eller dåligt batteri"
          text="Batteriet ger ofta subtila ledtrådar innan det lägger av helt. Känner du igen något av följande symptom är det klokt att låta oss testa batteriets hälsa innan kylan slår till."
          items={symptoms}
          image={{ webp: serviceWebp, jpg: serviceJpg, alt: 'Mekaniker mäter batterispänningen med en multimeter, 12,6 volt' }}
          caption="Konditionstest före byte – inga onödiga kostnader."
        />

        <GuideServiceCard
          id="battery-service-title"
          text="Vi testar bilens laddsystem och monterar ett kvalitetsbatteri med exakt rätt specifikation och teknik för just din bil."
          items={serviceItems}
        />

        <GuideInfo
          id="battery-guidance-title"
          heading="Mer info om batterier och underhåll"
          text="Här är branschmässiga riktlinjer och fakta kring batterityper, temperaturpåverkan och körmönster. Vi kontrollerar alltid vad som passar din bil bäst."
          cards={guidance}
          safetyIcon={InfoIcon}
          safety={<><strong>Underhållsråd:</strong> Kör du mestadels korta sträckor rekommenderar vi att ansluta en modern underhållsladdare några gånger under vinterhalvåret för att maximera batteriets livslängd.</>}
        />

        <GuideProcess
          id="battery-process-title"
          text="Att byta batteri hos oss går snabbt och smidigt, med noggrann diagnostik så att du vet att hela laddsystemet mår bra."
          steps={processSteps}
        />

        <BiltjansterFaq id="bilbatteri-faq" heading="Vanliga frågor om bilbatteri" items={faqs} />

        <GuideClosing
          id="battery-booking-title"
          heading="Boka batteribyte"
          text={<>Priset beror på vilken batterityp och kapacitet din bil kräver — AGM kostar mer än ett konventionellt batteri, men är nödvändigt för moderna elsystem. Ring oss på {BUSINESS.phone.display} för en tydlig prisuppgift innan vi sätter igång.</>}
          onBooking={openBooking}
        />
      </main>
      {bookingModal}
      <PublicFooter onBookingClick={openBooking} />
    </>
  )
}
