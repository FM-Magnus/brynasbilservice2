import { useEffect, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { BiltjansterFaq } from '../components/ui/BiltjansterFaq'
import { CheckIcon } from '../components/icons/CheckIcon'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { WrenchIcon } from '../components/icons/WrenchIcon'

const includedItems = [
  'Dränering av den gamla oljan',
  'Byte av oljefilter',
  'Påfyllning av ny olja anpassad efter din bilmodell – rätt viskositet, rätt ACEA-klass och rätt tillverkargodkännande, inte bara "rätt siffra"',
  'Kontroll av oljenivån efter påfyllning',
  'En snabb koll av bilens övriga vätskenivåer samtidigt som vi ändå är där',
]

const benefits = [
  'Förlänger motorns livslängd',
  'Håller nere bränsleförbrukningen',
  'Minskar risken för dyra motorrelaterade reparationer',
  'Bidrar till att bilen presterar som den ska över tid',
]

const viscosityDetails = [
  {
    title: 'Siffran före W',
    text: 'anger flytförmågan vid kyla – ju lägre siffra, desto bättre kallstartsegenskaper. En 0W-olja flyter lättare vid minusgrader än en 10W-olja.',
  },
  {
    title: 'Siffran efter W',
    text: 'anger tjockleken vid motorns normala arbetstemperatur. En 5W-40 blir tjockare vid värme än en 5W-30, vilket ger tjockare oljefilm och något bättre skydd vid hög belastning – men bara om bilen faktiskt är konstruerad för det.',
  },
]

const oilStandards = [
  {
    title: 'ACEA A3/B4',
    text: 'robust olja med högre askhalt, vanlig i äldre bilar utan partikelfilter.',
  },
  {
    title: 'ACEA C1–C3',
    text: 'lågaskoljor ("Low SAPS"), framtagna för bilar med partikelfilter (DPF/OPF) och katalysator. Fyller du en sådan bil med en vanlig A3/B4-olja byggs aska upp i partikelfiltret snabbare än det ska.',
  },
  {
    title: 'Tillverkarspecifika godkännanden',
    text: 'som VW 504.00/507.00, BMW Longlife-04 eller MB 229.51 väger tyngst av allt – de är framtagna och testade specifikt för den motorfamiljen.',
  },
]

const oilTypes = [
  {
    title: 'Mineralolja (grupp I–II)',
    text: 'är rakt utvunnen och raffinerad från råolja, med störst molekylär ojämnhet. Billigast, men klarar sämre av temperatur- och belastningsvariationer.',
  },
  {
    title: 'Grupp III',
    text: 'är mineralolja som hydrocrackats – brutits ner kemiskt och byggts upp igen under högt tryck till en betydligt jämnare molekylstruktur. Här händer något som förvånar många: i Europa får grupp III-oljor marknadsföras och säljas som "helsyntetiska", trots att de i grunden är mineralbaserade. Det är inte marknadsföringsfusk – det är hur regelverket är utformat – men det förklarar varför två flaskor som båda säger "fullsyntetisk 5W-30" ändå kan prestera olika.',
  },
  {
    title: 'Grupp IV (PAO – poly-alfa-olefin)',
    text: 'är den "riktiga" kemiskt syntetiserade oljan, med en molekylstruktur som är jämn redan från start snarare än ombyggd. Den ger generellt bättre smörjande egenskaper än grupp III, oavsett vad viskositetsetiketten säger.',
  },
  {
    title: 'Halvsyntetisk olja',
    text: 'är en blandning av mineral- och syntetbaserad olja, ofta 10–70 % syntetinnehåll, som positionerar sig prismässigt och prestandamässigt mellan mineral- och helsyntetolja.',
  },
]

const oilAgeing = [
  {
    title: 'Tillsatserna förbrukas.',
    text: 'Additiven som håller nere korrosion, renar motorn och stabiliserar viskositeten bryts ner successivt och tappar effekt, oavsett hur få mil bilen gått.',
  },
  {
    title: 'Föroreningar byggs upp.',
    text: 'Sotpartiklar från förbränningen och små mängder obrända bränsleångor blandas in i oljan och späder ut dess skyddande egenskaper.',
  },
  {
    title: 'Kondens och fukt.',
    text: 'Särskilt vid mycket korta körsträckor hinner motorn aldrig bli riktigt varm, vilket gör att kondensvatten byggs upp i oljan istället för att kokas bort. Det är en av de vanligaste anledningarna till att kortkörningsbilar behöver tätare oljebyten än vad miltalet ensamt antyder.',
  },
]

const misconceptions = [
  {
    title: '"Mörk olja är dålig olja."',
    text: 'Fel – att oljan mörknar är ett tecken på att den gör sitt jobb och binder upp sot och föroreningar istället för att låta dem cirkulera fritt i motorn. Färgen ensam säger inte mycket om oljans faktiska skick.',
  },
  {
    title: '"Det räcker att fylla på om nivån sjunker."',
    text: 'Nej – påfyllning blandar bara ny olja med gammal, redan nedbruten olja. Det löser aldrig samma problem som ett fullständigt byte gör.',
  },
  {
    title: '"Dyrare olja är alltid bättre."',
    text: 'Inte nödvändigtvis. Det som spelar roll är att oljan uppfyller rätt ACEA-klass och tillverkarens specifika godkännande – en korrekt specificerad olja till lägre pris slår en dyr olja som inte matchar din motor.',
  },
  {
    title: '"Syntetisk olja behöver aldrig bytas lika ofta."',
    text: 'Delvis sant, men överdrivet – syntetolja tål mer innan den bryts ner, men additiven i den förbrukas ändå med tiden, och kortkörning eller tuff belastning äter upp fördelen snabbt.',
  },
  {
    title: '"Man kan inte blanda olika oljemärken eller typer."',
    text: 'I praktiken går det oftast bra rent tekniskt – oljor är i grunden kompatibla med varandra – men det är ingen genväg till rätt olja. Följer man inte specifikationen som gäller för just din bil spelar det ingen roll vilket märke som står på flaskan.',
  },
]

const faqs = [
  {
    question: 'Hur ofta behöver jag byta olja?',
    answer: 'Det varierar mellan bilmärken och modeller, men som tumregel rekommenderas ett oljebyte var 10 000–15 000 km, eller minst en gång om året – vad som än inträffar först. Kör du mycket kortkörning eller drar släp bör du räkna med tätare byten än vad instruktionsboken säger.',
  },
  {
    question: 'Ska jag lita på bilens serviceindikator eller intervallet i instruktionsboken?',
    answer: 'Se dem som en utgångspunkt, inte ett facit. Indikatorn räknar oftast utifrån idealiska förhållanden. Är din körning tuffare mot oljan – mycket stadskörning, kyla, korta resor – lönar det sig att byta tätare.',
  },
  {
    question: 'Är syntetisk olja alltid bättre än mineralolja?',
    answer: 'Generellt ja när det gäller smörjande egenskaper och temperaturtålighet, men det viktigaste är ändå att oljan uppfyller rätt specifikation för just din motor. En korrekt mineralolja för en äldre motor kan vara ett bättre val än fel typ av syntetolja.',
  },
  {
    question: 'Spelar det någon roll vilket oljemärke jag väljer?',
    answer: 'Mindre än många tror. Det avgörande är att oljan har rätt viskositet, rätt ACEA-klass och det godkännande din bil kräver – inte varumärket på flaskan.',
  },
  {
    question: 'Vad kostar ett oljebyte?',
    answer: 'Priset beror på bilmodell och vilken oljetyp som krävs. Ring oss så får du en tydlig prisuppgift innan vi sätter igång.',
  },
  {
    question: 'Kan jag byta olja själv?',
    answer: 'Ja, om du har rätt verktyg och kunskap går det att göra själv. Har du inte det sedan tidigare är det oftast både snabbare och säkrare att låta oss göra det – felaktig hantering av gammal olja är dessutom ett miljöproblem, inte bara ett tekniskt.',
  },
  {
    question: 'Hur lång tid tar det?',
    answer: 'Vanligtvis mellan 30 minuter och en timme, beroende på bilmodell och om något oväntat upptäcks under tiden.',
  },
  {
    question: 'Vad händer om jag skjuter upp oljebytet för länge?',
    answer: 'Gammal, uttjänt olja smörjer sämre och sämre ju längre den används. I värsta fall kan det leda till allvarliga motorskador och i förlängningen motorhaveri – en reparation som är betydligt dyrare än de oljebyten du skulle ha hunnit göra under tiden.',
  },
]

export default function OljebytePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={() => setIsModalOpen(true)} />

      <main className="services-page oil-page">
        <section className="services-page__hero oil-page__hero" aria-labelledby="oljebyte-title">
          <div className="container">
            <div className="services-page__hero-layout">
              <div className="services-page__hero-content">
                <h1 className="services-page__title" id="oljebyte-title">
                  Oljebyte <span className="title-accent">för en motor som mår bra</span>
                </h1>
                <p className="services-page__lead">
                  Ett oljebyte är ett av de mest grundläggande men samtidigt viktigaste underhållsmomenten på en bil. Motorns rörliga delar smörjs av oljan, som håller nere friktionen och skyddar motorn från onödigt slitage.
                </p>
                <div className="services-page__hero-actions">
                  <button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">
                    Boka oljebyte
                  </button>
                  <a href="tel:0705533395" className="services-page__btn services-page__btn--outline">
                    <PhoneIcon className="services-page__btn-icon" />
                    <span>Ring 070-553 33 95</span>
                  </a>
                </div>
              </div>

              <div className="services-page__image-placeholder oil-page__image-placeholder" role="img" aria-label="Platshållare för framtida bild från oljebyte i verkstaden">
                <WrenchIcon />
                <span>Oljebyte i verkstaden</span>
                <small>Bild kommer</small>
              </div>
            </div>
          </div>
        </section>

        <section className="oil-page__intro" aria-labelledby="oljebyte-intro-title">
          <div className="container oil-page__container">
            <div className="oil-page__intro-copy">
              <h2 id="oljebyte-intro-title">Vad är ett oljebyte?</h2>
              <p>
                Ett oljebyte är ett av de mest grundläggande men samtidigt viktigaste underhållsmomenten på en bil. Motorns rörliga delar smörjs av oljan, som håller nere friktionen och skyddar motorn från onödigt slitage.
              </p>
              <p>
                Med tiden bryts oljan ner, tappar sina smörjande egenskaper och samlar på sig sot och förbränningsrester. Ett oljebyte innebär att den gamla, uttjänta oljan dräneras ur motorn, oljefiltret byts ut, ny olja fylls på och nivån kontrolleras innan bilen lämnas tillbaka till dig.
              </p>
            </div>
            <aside className="oil-page__importance" aria-labelledby="oljebyte-importance-title">
              <h2 id="oljebyte-importance-title">Varför är oljebyte viktigt?</h2>
              <p>
                Olja som inte byts i tid tappar sin förmåga att smörja och kyla motorns delar effektivt. Det leder till ökad friktion mellan rörliga komponenter, vilket över tid sliter ner motorn snabbare än den annars skulle göra.
              </p>
              <p>
                En motor som går på ren, fräsch olja arbetar dessutom mer effektivt, vilket märks direkt på bränsleförbrukningen jämfört med en motor som får gå på gammal eller smutsig olja.
              </p>
            </aside>
          </div>
        </section>

        <section className="oil-page__more-info" aria-labelledby="oljebyte-more-info-title">
          <div className="container oil-page__container">
            <header className="oil-page__more-info-heading">
              <h2 id="oljebyte-more-info-title">Mer info</h2>
              <p>Här har vi samlat fördjupande information om motorolja, intervall och vanliga frågor kring oljebyten.</p>
            </header>
          </div>
        </section>

        <section className="oil-page__usage" aria-labelledby="oljebyte-ageing-title">
          <div className="container oil-page__container">
            <header className="oil-page__section-heading">
              <h2 id="oljebyte-ageing-title">Hur oljan blir sämre med tiden – även om bilen knappt körs</h2>
              <p>Olja som står oöppnad i en dunk åldras i praktiken inte. Det är först när den börjar arbeta i motorn som nedbrytningen startar, och det sker på flera sätt samtidigt:</p>
            </header>
            <div className="oil-page__ageing-grid">
              {oilAgeing.map(({ title, text }) => (
                <article className="oil-page__ageing-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <p className="oil-page__usage-summary">Det är alltså inte antalet körda mil som ensamt avgör oljans skick – tiden och körmönstret spelar minst lika stor roll.</p>

            <div className="oil-page__interval" aria-labelledby="oljebyte-interval-title">
              <h2 id="oljebyte-interval-title">Tillverkarens intervall kontra verkligheten</h2>
              <p>Många nyare bilar har långa rekommenderade serviceintervall – ibland 3 000 mil eller mer, så kallade "long life"-intervall. De är inte felaktiga, men de gäller under förutsättningar som sällan stämmer med hur bilen faktiskt används i vardagen: jämn landsvägskörning, motorvärmare vid kyla under +5 grader, och inga korta stadsturer. Kör bilen istället mycket kortkörning, mycket stillastående i kö, eller drar den ofta släp, bryts oljan ner snabbare än vad intervallet i boken räknar med – utan att bilens egen serviceindikator nödvändigtvis märker det i tid.</p>
              <p>Vår rekommendation är därför att se tillverkarens intervall som ett tak, inte ett golv. Är körmönstret tufft mot oljan – mycket kortkörning, tät stadstrafik, kyla utan motorvärmare, turboladdad eller direktinsprutad motor – lönar det sig att byta tätare än boken säger snarare än att vänta tills serviceindikatorn tvingar fram det.</p>
            </div>
          </div>
        </section>

        <section className="oil-page__guide" aria-labelledby="oljebyte-viscosity-title">
          <div className="container oil-page__container">
            <div className="oil-page__guide-layout">
              <div className="oil-page__guide-main">
                <header className="oil-page__section-heading">
                  <h2 id="oljebyte-viscosity-title">Vad betyder egentligen siffrorna på oljedunken?</h2>
                  <p>De flesta har sett beteckningar som 5W-30 eller 0W-20 utan att egentligen veta vad de betyder. Det är oljans viskositetsklass enligt SAE-systemet (Society of Automotive Engineers), och den beskriver hur trögflytande oljan är – inte hur bra kvalitet den håller.</p>
                </header>
                <div className="oil-page__detail-grid">
                  {viscosityDetails.map(({ title, text }) => (
                    <article className="oil-page__detail-card" key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <p className="oil-page__guide-note">Viskositeten är alltså bara en flödesegenskap, inte ett kvalitetsmått. Två oljor med exakt samma viskositetsbeteckning kan skilja sig kraftigt åt i hur väl de faktiskt skyddar motorn.</p>
              </div>
              <div className="oil-page__standards">
                <h2>API och ACEA – standarderna som faktiskt styr kvaliteten</h2>
                <p>Det som avgör om en olja verkligen passar din motor är inte viskositeten utan godkännandena bredvid den – API (amerikansk standard) och ACEA (europeisk standard). ACEA-klasserna är särskilt viktiga att förstå:</p>
                <div className="oil-page__standards-list">
                  {oilStandards.map(({ title, text }) => (
                    <article key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <p>Rätt ordning att välja olja i är: tillverkarens egen specifikation först, sedan ACEA-klass, och viskositet sist. En "rätt" viskositet med fel specifikation kan göra mer skada än nytta.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="oil-page__types" aria-labelledby="oljebyte-types-title">
          <div className="container oil-page__container">
            <header className="oil-page__section-heading oil-page__section-heading--light">
              <h2 id="oljebyte-types-title">Mineral-, halvsyntet- och helsyntetolja – vad är egentligen skillnaden?</h2>
              <p>Basoljan – den vätska additiven blandas i – delas in i grupper, och det är här den verkliga skillnaden mellan oljor ligger:</p>
            </header>
            <div className="oil-page__type-grid">
              {oilTypes.map(({ title, text }) => (
                <article className="oil-page__type-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <p className="oil-page__type-conclusion">Den praktiska slutsatsen: beteckningen "fullsyntetisk" på flaskan garanterar inte att två oljor är likvärdiga. Additivpaketet – rengörande, korrosionsskyddande och viskositetsstabiliserande tillsatser – väger minst lika tungt som basoljan, och det är just kombinationen av basolja och additivpaket som gör att pris och prestanda kan skilja sig kraftigt mellan oljor som ser identiska ut på pappret.</p>
          </div>
        </section>

        <section className="oil-page__included" aria-labelledby="oljebyte-included-title">
          <div className="container oil-page__container">
            <header className="oil-page__section-heading">
              <h2 id="oljebyte-included-title">Vad ingår i ett oljebyte hos oss?</h2>
              <p>Ett oljebyte hos Brynäs Bilservice omfattar:</p>
            </header>
            <div className="oil-page__included-grid">
              {includedItems.map((item, index) => (
                <article className="oil-page__included-card" key={item}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <CheckIcon />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="oil-page__benefits" aria-labelledby="oljebyte-benefits-title">
          <div className="container oil-page__container">
            <header className="oil-page__section-heading oil-page__section-heading--light">
              <h2 id="oljebyte-benefits-title">Fördelar med regelbundna <span className="title-accent">oljebyten</span></h2>
            </header>
            <div className="oil-page__benefit-grid">
              {benefits.map((benefit) => (
                <article className="oil-page__benefit-card" key={benefit}>
                  <CheckIcon />
                  <p>{benefit}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="oil-page__misconceptions" aria-labelledby="oljebyte-misconceptions-title">
          <div className="container oil-page__container">
            <header className="oil-page__section-heading">
              <h2 id="oljebyte-misconceptions-title">Vanliga missförstånd om motorolja</h2>
            </header>
            <div className="oil-page__misconception-grid">
              {misconceptions.map(({ title, text }) => (
                <article className="oil-page__misconception-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BiltjansterFaq
          id="oljebyte-faq"
          heading="Vanliga frågor om oljebyte"
          items={faqs}
        />

        <section className="services-page__pricing oil-page__booking" aria-labelledby="oljebyte-booking-title">
          <div className="container">
            <div className="services-page__pricing-card">
              <div>
                <h2 id="oljebyte-booking-title">Boka oljebyte</h2>
                <p>Ring oss så hjälper vi dig att hitta en tid som passar och ger en tydlig prisuppgift innan vi sätter igång.</p>
              </div>
              <div className="services-page__pricing-actions">
                <button type="button" onClick={() => setIsModalOpen(true)} className="services-page__btn services-page__btn--primary">Boka oljebyte</button>
                <a href="tel:0705533395" className="services-page__btn services-page__btn--outline">Ring 070-553 33 95</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  )
}
