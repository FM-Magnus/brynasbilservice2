import { useEffect, useId, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { GoogleReviews } from '../components/GoogleReviews'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'
import { DollarIcon } from '../components/icons/DollarIcon'
import { MapPinIcon } from '../components/icons/MapPinIcon'
import './AcServicePage.css'

type PricingCardProps = { title: string; price: string; items: string[]; note?: string; onBook: () => void }

const valueProps = [
  { icon: DollarIcon, title: 'Fasta priser', text: 'Du vet priset innan vi sätter igång — inga överraskningar på fakturan.' },
  { icon: ShieldHeartIcon, title: 'Bibehållen nybilsgaranti', text: 'Vi följer tillverkarens föreskrifter, så nybilsgarantin påverkas inte av att vi utför servicen.' },
  { icon: MapPinIcon, title: 'Din lokala verkstad', text: 'Vi finns på Utmarksvägen i Gävle och känner våra kunder och deras bilar.' },
] as const

const symptoms = [
  {
    question: 'Dålig kyla eller imma på rutorna?',
    advice: 'AC-service',
    description: 'Tyder oftast på låg nivå av köldmedium, en igensatt kondensor eller en fläkt som inte kyler som den ska.',
  },
  {
    question: 'Unken lukt ur fläktutblåsen?',
    advice: 'AC-rengöring och kontroll av kupéfilter',
    description: 'Beror på fukt och beläggningar i förångaren – det är därför separat AC-rengöring behövs för att få bort lukten.',
  },
  {
    question: 'Missljud när AC:n slås på?',
    advice: 'Felsökning',
    description: 'Kan orsakas av slitna lager, en kompressorkoppling som kärvar eller felaktigt tryck i systemet.',
  },
] as const

const tips = [
  { title: 'R134a eller R1234yf?', text: 'Köldmediet står på en märkning i motorrummet. Bilar äldre än cirka 2017 har oftast R134a, nyare har vanligen R1234yf — vi kontrollerar alltid vilket som gäller för din bil.' },
  { title: 'Hur ofta bör AC:n servas?', text: 'En enklare kontroll årligen räcker för de flesta bilar. En fullständig AC-service med läckagesökning och kompressorolja behövs normalt vartannat år.' },
  { title: 'Kör AC:n även på vintern', text: 'Att köra AC:n en stund varje månad, även när det är kallt, håller kompressorn smord och packningarna täta — annars torkar de och risken för läckage ökar.' },
] as const

const faqs = [
  ['Vad händer om systemet läcker?', 'En identifierad läcka behöver undersökas och repareras innan köldmedium fylls på. Vi lämnar alltid ett prisförslag innan ytterligare arbete utförs.'],
  ['Hur vet jag vilken gas min bil har?', 'Köldmediet står normalt på en märkning i motorrummet. R1234yf är vanligt i nyare bilar.'],
  ['Hur lång tid tar servicen?', 'En AC-service tar normalt cirka 45–60 minuter. Du kan vanligtvis vänta på plats.'],
  ['Vad är skillnaden mellan AC-service och AC-reparation?', 'AC-service är en proaktiv kontroll och påfyllning som görs innan problem uppstår. AC-reparation är när en specifik del, till exempel kompressor eller kondensor, behöver bytas efter ett fel. Vi berättar alltid vilket som gäller för din bil innan vi går vidare.'],
  ['Behåller jag min nybilsgaranti om jag servar AC:n hos er?', 'Ja. Vi utför servicen enligt tillverkarens föreskrivna intervall och metoder, så nybilsgarantin påverkas inte.'],
] as const

function PricingCard({ title, price, items, note, onBook }: PricingCardProps) {
  return <article className="ac-page__price-card"><h3>{title}</h3><p className="ac-page__price">{price}</p><ul>{items.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>{note && <p className="ac-page__note">{note}</p>}<button type="button" onClick={onBook} className="ac-page__button ac-page__button--primary">Boka tid</button></article>
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  return <div className="ac-page__faq-list">{faqs.map(([question, answer], index) => { const id = `${baseId}-${index}`; const expanded = open === index; return <article className="ac-page__faq-item" key={question}><h3><button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setOpen(expanded ? null : index)}>{question}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h3>{expanded && <div id={id} role="region" aria-label={question}><p>{answer}</p></div>}</article> })}</div>
}

export default function AcServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registration, setRegistration] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const bookingNote = [registration.trim() && `Registreringsnummer: ${registration.trim().toUpperCase()}`, recommendation && `Önskad hjälp: ${recommendation}`].filter(Boolean).join('\n')
  const openBooking = () => setIsModalOpen(true)
  const goToBooking = () => document.getElementById('boka')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return <><Header onBookingClick={openBooking} /><main className="ac-page">
    <section className="ac-page__hero" aria-labelledby="ac-hero-title"><div className="container ac-page__container"><div className="ac-page__hero-copy"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />AC &amp; klimatanläggning</div><h1 id="ac-hero-title">AC-service &amp; <span>Klimatrengöring</span> i Gävle</h1><p>En välfungerande AC ger behaglig kupétemperatur, hjälper rutorna att hålla sig klara under höst och vinter och är värd att underhålla innan problemen kommer. Ett system med för lite köldmedium smörjs sämre – att ignorera det kan förvandla en enkel påfyllning till en betydligt dyrare kompressorreparation.</p><ul className="ac-page__badges"><li>Bibehållen nybilsgaranti</li><li>Certifierad kylkompetens</li><li>Fasta priser</li></ul><label htmlFor="ac-registration">Registreringsnummer <span>valfritt</span></label><div className="ac-page__registration"><input id="ac-registration" value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder="ABC123" autoCapitalize="characters" /><button type="button" onClick={goToBooking} className="ac-page__button ac-page__button--primary">Boka tid</button></div><a className="ac-page__phone" href="tel:0705533395"><PhoneIcon />Ring oss: 070-553 33 95</a></div></div></section>

    <section className="ac-page__section ac-page__value" aria-labelledby="ac-value-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Varför välja oss</div><h2 id="ac-value-title">Varför boka AC-service hos oss?</h2></div><div className="ac-page__value-grid">{valueProps.map(({ icon: Icon, title, text }) => <article className="ac-page__value-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="ac-page__section ac-page__symptoms" aria-labelledby="ac-symptoms-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Hitta rätt hjälp</div><h2 id="ac-symptoms-title">Känner du igen något av detta?</h2></div><div className="ac-page__symptom-grid">{symptoms.map(({ question, advice, description }) => <button type="button" className={recommendation === advice ? 'is-selected' : ''} key={question} onClick={() => setRecommendation(advice)} aria-pressed={recommendation === advice}><strong>{question}</strong><p>{description}</p><span>{recommendation === advice ? `Rekommendation: ${advice}` : 'Välj för rekommendation'}</span></button>)}</div>{recommendation && <p className="ac-page__recommendation" role="status">Vi föreslår: <strong>{recommendation}</strong>. Det följer med till bokningsformulärets kommentar.</p>}</div></section>

    <section className="ac-page__section" aria-labelledby="ac-prices-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Tydliga priser</div><h2 id="ac-prices-title">Service för renare och svalare kupé</h2>{/* DRAFT GUIDANCE: Branschmässigt riktvärde (enklare årlig kontroll, full service ca vartannat år), ej bekräftad fast Brynäs-policy. */}<p className="ac-page__guidance">En enklare kontroll årligen räcker för de flesta bilar, medan en fullständig AC-service med läckagesökning och kompressorolja normalt behövs vartannat år.</p><p>Samtliga priser är inklusive moms.</p></div><div className="ac-page__price-grid"><PricingCard title="AC-service" price="1 495 kr" items={['Tömning', 'Vakuumsugning för fuktborttagning', 'Läckagekontroll/vakuumtest', 'Påfyllning av R134a-köldmedium', 'Kompressorolja, PAG', 'Prestandatest med utblåstemperatur']} onBook={openBooking} /><PricingCard title="AC-rengöring" price="800 kr arbetskostnad" items={['Antibakteriell rengöring av luftkanaler/förångare', 'Arbete för byte av kupéfilter']} note="OBS! Materialkostnad för kupéfilter tillkommer och varierar per bilmodell." onBook={openBooking} /><PricingCard title="OBD-diagnostik & felsökning" price="500 kr" items={['Avläsning av felkoder', 'Kontroll av relevanta tryckgivare vid elfel eller utebliven funktion']} onBook={openBooking} /></div><aside className="ac-page__repair-note"><strong>Service eller reparation?</strong> En AC-service är en proaktiv kontroll och påfyllning. Misstänker du istället en läcka, en trasig kompressor eller ett annat fel är det en AC-reparation — då gör vi alltid en felsökning och lämnar ett prisförslag innan vi går vidare.</aside>{/* FACT TO CONFIRM: Om Brynäs har utrustning för båda köldmedietyperna (R134a och R1234yf) – den befintliga texten hänvisar redan till kontakt för R1234yf. */}<p className="ac-page__refrigerant-note">Priset 1 495 kr gäller bilar med köldmedium R134a. För nyare bilar med R1234yf, vanligt efter cirka 2017, kontakta oss för prisuppgift.</p></div></section>

    <section className="ac-page__section ac-page__process" aria-labelledby="ac-process-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Så går det till</div><h2 id="ac-process-title">Från kontroll till komfort</h2></div><ol>{['Provtryckning och visuell inspektion', 'Vakuumsugning och täthetstest', 'Fyllning enligt fordonsspecifikation', 'Prestandamätning i kupéutblås'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></div></section>

    <section className="ac-page__section ac-page__trust" aria-labelledby="ac-trust-title"><div className="container ac-page__container"><div className="ac-page__trust-card"><ShieldHeartIcon /><div><h2 id="ac-trust-title">Omsorg om systemet och bilen</h2><p>Vi hanterar AC-system och köldmedier professionellt och går igenom vad vi hittar innan mer arbete påbörjas. Precis som vid övrig service följer vi tillverkarens föreskrifter så att nybilsgarantin kan behållas.</p></div></div></div></section>

    <section className="ac-page__section ac-page__tips" aria-labelledby="ac-tips-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Bra att veta</div><h2 id="ac-tips-title">Så håller du koll på AC:n mellan servicarna</h2></div><div className="ac-page__tips-grid">{tips.map(({ title, text }) => <article className="ac-page__tip-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="ac-page__section ac-page__social" aria-labelledby="ac-social-title"><div className="container ac-page__container"><div className="ac-page__social-grid"><div className="ac-page__social-reviews"><h2 id="ac-social-title">Vad våra kunder säger</h2><GoogleReviews /></div><div className="ac-page__social-contact"><h3>Kontakta oss</h3><a className="ac-page__contact-row" href="tel:0705533395"><PhoneIcon />070-553 33 95</a><div className="ac-page__contact-row"><MapPinIcon />Utmarksvägen 21B, 802 91 Gävle</div><button type="button" onClick={openBooking} className="ac-page__button ac-page__button--primary">Boka tid</button></div></div></div></section>

    <section className="ac-page__section" aria-labelledby="ac-faq-title"><div className="container ac-page__container"><div className="ac-page__section-heading"><div className="section-eyebrow"><span className="eyebrow-line" aria-hidden="true" />Vanliga frågor</div><h2 id="ac-faq-title">Bra att veta om AC-service</h2></div><FaqAccordion /></div></section>

    <section id="boka" className="ac-page__booking" aria-labelledby="ac-booking-title"><div className="container ac-page__container"><div><h2 id="ac-booking-title">Boka AC-service</h2><p>{bookingNote ? 'Ditt registreringsnummer och önskemål följer med till kommentarsfältet i bokningen.' : 'Välj datum, tid och tjänst i vårt befintliga bokningsformulär.'}</p></div><button type="button" onClick={openBooking} className="ac-page__button ac-page__button--primary">Öppna bokning</button></div></section>
  </main><BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment={bookingNote} /><Footer /></>
}
