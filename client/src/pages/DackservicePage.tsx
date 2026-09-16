import { useEffect, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { GoogleReviews } from '../components/GoogleReviews'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { UsersIcon } from '../components/icons/UsersIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import imgTyres from '../assets/images/services/tires/tire-storage-wheel.jpg'
import './DackservicePage.css'

type PriceEntry = { label?: string; prefix?: string; amount?: string; unit?: string; contactText?: string }
type ServiceCardProps = { title: string; description: string; priceData: PriceEntry[]; imagePlaceholder: string; onBookingClick: () => void }

const tyreServices: Omit<ServiceCardProps, 'onBookingClick'>[] = [
  { title: 'Hjulskifte', description: 'Dags att byta till sommar- eller vinterdäck? Vi ser till att bytet går snabbt, smidigt och säkert. Vi kontrollerar mönsterdjup, slitage och lufttryck samt ser över synliga bromskomponenter. Efterdragning av hjulbultarna efter cirka 10 mil ingår kostnadsfritt.', priceData: [{ label: 'Personbil', amount: '350 kr' }, { label: 'SUV & lätt lastbil', amount: '500 kr' }], imagePlaceholder: imgTyres },
  { title: 'Däckförvaring', description: 'Slipp tunga hjul och frigör plats hemma. Vi grovtvättar och kontrollerar hjulen vid inlämning, förvarar dem skyddade från UV-ljus och temperatursvängningar och kontaktar dig via SMS inför nästa säsongsskifte. Om däcken börjar bli slitna hör vi av oss i god tid.', priceData: [{ label: 'Personbil', amount: '890 kr' }, { label: 'SUV & lätt lastbil', amount: '990 kr' }], imagePlaceholder: imgTyres },
  { title: 'Omläggning av däck', description: 'När nya däck ska monteras på fälgarna utför vi omläggningen med precision, monterar nya ventiler och balanserar hjulen så att allt sitter rätt från första kilometern.', priceData: [{ prefix: 'Från', amount: '180 kr', unit: 'per däck' }], imagePlaceholder: imgTyres },
  { title: 'Hjulinställning', description: 'Rätt hjulinställning bidrar till jämnare däckslitage, stabilare vägegenskaper och lägre rullmotstånd. Vi utför fackmässig fyrhjulsinställning med modern utrustning.', priceData: [{ prefix: 'Från', amount: '1 495 kr' }], imagePlaceholder: imgTyres },
  { title: 'Däckbalansering', description: 'Vibrationer i ratten vid vissa hastigheter är ofta ett tecken på obalans. Vi mäter hjulen med precisionsutrustning och kompenserar obalansen med rätt vikter. Det ger lugnare körning och minskar onödigt slitage på däck, styrning, fjädring och chassikomponenter.', priceData: [{ contactText: 'Kontakta oss för pris' }], imagePlaceholder: imgTyres },
  { title: 'Punkteringslagning', description: 'Har du fått punktering? Vi inspekterar skadan och bedömer om däcket kan repareras säkert. När en fackmässig lagning är möjlig hjälper vi dig tillbaka på vägen utan onödigt dröjsmål.', priceData: [{ contactText: 'Kontakta oss för pris' }], imagePlaceholder: imgTyres },
]

const localValueProps = [
  { icon: UsersIcon, title: 'Personlig service', text: 'Du möter samma ansikten varje gång — ingen anonym kö eller nummerlapp.' },
  { icon: MapPinIcon, title: 'Din lokala verkstad', text: 'Vi finns på Utmarksvägen i Gävle och känner våra kunder och deras bilar.' },
  { icon: ClockIcon, title: 'Snabb hjälp inför säsong', text: 'Vi planerar för säsongstoppen så du slipper onödigt lång väntetid vid hjulskifte.' },
] as const

const storageBenefits = [
  ['Skyddad förvaring', 'Däcken förvaras inomhus, skyddade från UV-ljus och temperatursvängningar.'],
  ['Tvätt och kontroll', 'Vi grovtvättar och kontrollerar hjulen redan vid inlämning.'],
  ['Påminnelse via SMS', 'Vi hör av oss inför nästa säsongsskifte så du slipper hålla koll själv.'],
  ['Tidig varning vid slitage', 'Börjar däcken bli slitna säger vi till i god tid innan nästa byte.'],
] as const

const processSteps = [
  ['01', 'Bokning och inlämning', 'Du bokar en tid med oss och lämnar in bilen när det passar.'],
  ['02', 'Initial kontroll', 'Vi gör en första bedömning av bilens skick och servicebehov.'],
  ['03', 'Service enligt checklista', 'Mekanikern följer checklistan för den servicenivå som är aktuell.'],
  ['04', 'Godkännande vid extraarbete', 'Hittar vi något utanför checklistan kontaktar vi dig innan vi går vidare.'],
  ['05', 'Slutkontroll och rapport', 'När bilen är klar får du en genomgång och råd inför nästa service.'],
] as const

const faqs = [
  ['Hur lång tid tar ett hjulskifte?', 'Ett vanligt hjulskifte tar normalt 20–30 minuter. Vid högsäsong, när många byter samtidigt, kan väntetiden bli längre — boka gärna i god tid.'],
  ['Behövs hjulinställning efter ett däckbyte?', 'Inte alltid, men om bilen drar snett, om ratten vibrerar eller om du nyligen märkt av en gupp eller trottoarkant är det klokt att kontrollera hjulinställningen samtidigt.'],
  ['Vad är skillnaden mellan hjulskifte och omläggning av däck?', 'Ett hjulskifte innebär att färdigmonterade hjul (däck + fälg) byts som en enhet, till exempel sommar- mot vinterhjul. En omläggning innebär att nya däck monteras på dina befintliga fälgar.'],
  // FACT TO CONFIRM: Bekräfta med Johnny om Brynäs har utrustning för TPMS-avläsning/programmering innan detta utlovas som en konkret tjänst.
  ['Behöver jag tänka på däcktrycksövervakningen (TPMS)?', 'På bilar med TPMS varnar systemet när lufttrycket är för lågt. Efter ett hjulskifte kan systemet i vissa fall behöva kontrolleras eller återställas — fråga oss vid bokning så ser vi vad som gäller för din bil.'],
  ['Kan jag boka däckhotell utan att göra ett hjulskifte samtidigt?', 'Ja, du kan lämna in däcken för förvaring separat, men de flesta väljer att kombinera det med sitt hjulskifte för att slippa ett extra besök.'],
] as const

function ServiceCard({ title, description, priceData, imagePlaceholder, onBookingClick }: ServiceCardProps) {
  const isContactPrice = priceData.some((price) => price.contactText)
  return <article className="tyres-page__service-card" aria-labelledby={`service-${title}`}>
    <div className="tyres-page__service-image"><img src={imagePlaceholder} alt="Platshållarbild för däckservice" loading="lazy" /><span>Bild kommer</span></div>
    <div className="tyres-page__service-content"><h3 id={`service-${title}`}>{title}</h3><p>{description}</p>
      <div className="tyres-page__prices" aria-label={`Pris för ${title}`}>{priceData.map((price) => price.contactText ? <p className="tyres-page__contact-price" key={price.contactText}>{price.contactText}</p> : <div className="tyres-page__price-row" key={`${price.label}-${price.amount}`}>
        {price.label && <span className="tyres-page__price-label">{price.label}</span>}<span className="tyres-page__price-value">{price.prefix && <span>{price.prefix}</span>}<strong>{price.amount}</strong>{price.unit && <small>{price.unit}</small>}</span>
      </div>)}</div>
      <button type="button" className="tyres-page__card-cta" onClick={onBookingClick}>{isContactPrice ? 'Kontakta oss' : 'Boka tid'}<ArrowRightIcon aria-hidden="true" /></button>
    </div>
  </article>
}

export default function DackservicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return <><Header onBookingClick={openModal} /><main className="tyres-page">
    <section className="tyres-page__hero" aria-labelledby="tyres-hero-title"><div className="container tyres-page__container"><div className="tyres-page__hero-content"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Däckverkstad i Brynäs, Gävle</div><h1 id="tyres-hero-title">Däckservice &amp; <span className="title-accent">Hjulskifte</span> i Gävle</h1><p>Vi hjälper dig med hjulskifte, montering, balansering, hjulinställning, punkteringslagning och däckhotell — med omtanke om säkerhet, körkomfort och dina hjul.</p><div className="tyres-page__actions"><button type="button" className="tyres-page__button tyres-page__button--primary" onClick={openModal}>Boka tid</button><a className="tyres-page__button tyres-page__button--outline" href="tel:0705533395"><PhoneIcon />Ring oss: 070-553 33 95</a></div></div></div></section>

    <section className="tyres-page__value" aria-labelledby="tyres-value-title"><div className="container tyres-page__container"><header className="tyres-page__section-header"><h2 id="tyres-value-title">Varför välja din lokala däckverkstad?</h2></header><div className="tyres-page__value-grid">{localValueProps.map(({ icon: Icon, title, text }) => <article className="tyres-page__value-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="tyres-page__dates tyres-page__dates--compact" aria-labelledby="tyres-dates-title"><div className="container tyres-page__container"><div className="tyres-page__dates-compact"><h3 id="tyres-dates-title">Viktiga datum &amp; lagkrav för vinterdäck</h3><ul className="tyres-page__dates-pills"><li><strong>1 dec–31 mar</strong>Krav på vinterdäck</li><li><strong>1 okt–15 apr</strong>Dubbdäck tillåtet</li><li><strong>16 apr–30 sep</strong>Dubbdäck förbjudet</li><li><strong>3PMSF-märkning</strong>krävs för godkänt vinterdäck</li></ul></div></div></section>

    <section className="tyres-page__services" aria-labelledby="tyres-services-title"><div className="container tyres-page__container"><header className="tyres-page__section-header"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Våra däcktjänster</div><h2 id="tyres-services-title">Allt för dina <span className="title-accent">hjul</span></h2><p>Från säsongsskifte till kontroll och reparation — välj den hjälp som passar din bil. Oavsett om det är dags att byta till vinterhjul, om ratten vibrerar vid motorväg, om ett däck fått en punktering eller om du bara vill slippa släpa på hjulen mellan säsongerna, hjälper vi dig hela vägen. Nedan hittar du våra vanligaste däck- och hjultjänster med tydliga priser, så att du vet vad som ingår innan du bokar.</p><strong>Samtliga priser är inklusive moms.</strong></header><div className="tyres-page__service-grid">{tyreServices.map((service) => <ServiceCard {...service} key={service.title} onBookingClick={openModal} />)}</div></div></section>

    <section className="tyres-page__storage" aria-labelledby="tyres-storage-title"><div className="container tyres-page__container"><div className="tyres-page__storage-card"><div><h2 id="tyres-storage-title">Trångt i garaget? Låt oss förvara dina däck.</h2><p>Slipp bära och lagra tunga hjul hemma — vi tar hand om dem tryggt mellan säsongerna.</p></div><ul className="tyres-page__checklist">{storageBenefits.map(([title, text]) => <li key={title}><CheckIcon /><span><strong>{title}:</strong> {text}</span></li>)}</ul><div className="tyres-page__check-footer"><p>Från 890 kr för personbil, 990 kr för SUV &amp; lätt lastbil per säsong.</p><button type="button" className="tyres-page__button tyres-page__button--primary" onClick={openModal}>Boka däckhotellplats</button></div></div></div></section>

    <section className="tyres-page__legacy" aria-labelledby="tyres-legacy-title"><div className="container tyres-page__container"><article className="tyres-page__legacy-card"><img src={imgTyres} alt="Montering och balansering av däck i däckverkstad" loading="lazy" /><div><div className="section-eyebrow section-eyebrow--dark"><span className="eyebrow-line" aria-hidden="true" />Befintlig däckservice</div><h2 id="tyres-legacy-title">Mer om vår däckservice</h2><p>Utöver skifte och balansering hjälper vi till med hjulinställning och säsongsförvaring. Vi ser över mönsterdjup, lufttryck och synliga bromskomponenter så att du får en bra överblick över hjulens skick.</p><ul>{['Däckbyte & montering', 'Balansering av hjul', 'Hjulinställning', 'Däckhotell — förvaring & tvätt', 'Däcktryckskontroll'].map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul></div></article></div></section>

    <section className="tyres-page__advice" aria-labelledby="tyres-advice-title"><div className="container tyres-page__container"><div className="tyres-page__advice-grid"><div><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Råd till bilägaren</div><h2 id="tyres-advice-title">Så håller du koll på <span className="title-accent">däcken</span></h2></div><div><p>Kontrollera lufttrycket när däcken är kalla och jämför med bilens instruktionsbok. Som riktmärke är en kontroll varje månad en bra vana, och en extra kontroll inför längre resor eller säsongsskifte är klok. Rätt lufttryck ger bättre väggrepp, kortare bromssträcka, lägre bränsleförbrukning och jämnare slitage.</p><p>Lagen kräver ett minsta mönsterdjup på 1,6 mm för sommardäck och 3 mm vid vinterväglag. För verkligt säker körning rekommenderas dock byte i god tid innan gränsen nås — sommardäck bör bytas vid cirka 3 mm för att minimera risken för vattenplaning, och vinterdäck bör bytas vid cirka 3–5 mm (gärna minst 4 mm) för att behålla fästet på snö och modd.</p><p>Kontrollera även däckens ålder via den fyrsiffriga DOT-koden på däcksidan. De sista fyra siffrorna visar tillverkningsvecka och tillverkningsår — till exempel anger 2421 vecka 24 år 2021. Gummi är en färskvara som åldras och hårdnar med tiden. Däck äldre än 6–10 år bör bytas ut oavsett kvarvarande mönsterdjup, eftersom åldrat gummi förlorar sin elasticitet och inte längre greppar vägbanan säkert.</p><p>Gör det till en vana att regelbundet syna däcken efter sprickor, utbuktningar, ojämnt slitage och främmande föremål. Är du osäker på däckens skick eller ålder är du alltid välkommen in till oss på Brynäs Bilservice för en fackmässig bedömning.</p></div></div></div></section>

    <section className="services-page__process-section tyres-page__process" aria-labelledby="tyres-process-title"><div className="container"><div className="services-page__process-card"><div className="services-page__process-inner"><div className="services-page__process-text"><h2 className="services-page__process-heading" id="tyres-process-title">Så går det till <br /><span className="title-accent">hos oss</span></h2><p className="services-page__process-desc">Att förstå processen gör det enklare att veta vad som händer med bilen från bokning till klar service.</p><div className="services-page__process-action"><a href="tel:0705533395" className="services-page__process-cta"><PhoneIcon className="services-page__process-icon" /><span>Ring oss: 070-553 33 95</span></a></div></div><div className="services-page__process-steps"><div className="services-page__steps-list">{processSteps.map(([number, title, text]) => <div className="services-page__step" key={number}><div className="services-page__step-num" aria-hidden="true">{number}</div><div className="services-page__step-content"><h3 className="services-page__step-title">{title}</h3><p className="services-page__step-desc">{text}</p></div></div>)}</div></div></div></div></div></section>

    <section className="tyres-page__social" aria-labelledby="tyres-social-title"><div className="container tyres-page__container"><div className="tyres-page__social-grid"><div className="tyres-page__social-reviews"><h2 id="tyres-social-title">Vad våra kunder säger</h2><GoogleReviews /></div><div className="tyres-page__social-contact"><h3>Kontakta oss</h3><a className="tyres-page__contact-row" href="tel:0705533395"><PhoneIcon />070-553 33 95</a><div className="tyres-page__contact-row"><MapPinIcon />Utmarksvägen 21B, 802 91 Gävle</div><button type="button" onClick={openModal} className="tyres-page__button tyres-page__button--primary">Boka tid</button></div></div></div></section>

    <BiltjansterFaq id="dackservice-faq" heading="Vanliga frågor om däckservice" items={faqs.map(([question, answer]) => ({ question, answer }))} />

    <section className="tyres-page__closing" aria-labelledby="tyres-closing-title"><div className="container tyres-page__container"><div className="tyres-page__closing-card"><div className="tyres-page__closing-icon" aria-hidden="true"><ShieldHeartIcon /></div><div><h2 id="tyres-closing-title">Låt oss gå igenom dina hjul</h2><p>Vi hjälper dig att upptäcka skador, felaktigt lufttryck och slitage i tid.</p></div><div className="tyres-page__actions"><button type="button" className="tyres-page__button tyres-page__button--primary" onClick={openModal}>Boka tid</button><a className="tyres-page__button tyres-page__button--outline" href="tel:0705533395">Ring: 070-553 33 95</a></div></div></div></section>
  </main><BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /><Footer /></>
}
