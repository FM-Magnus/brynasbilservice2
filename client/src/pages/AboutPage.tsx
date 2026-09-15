import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'
import { ChatDotsIcon } from '../components/icons/ChatDotsIcon'
import { ShieldHeartIcon } from '../components/icons/ShieldHeartIcon'

import imgWorkshop1Webp from '../assets/images/gallery/workshop/workshop-car-open-hood.webp'
import imgWorkshop1Jpg from '../assets/images/gallery/workshop/workshop-car-open-hood.jpg'
import imgMaherWebp from '../assets/images/people/maher-basher-portrait.webp'
import imgMaherJpg from '../assets/images/people/maher-basher-portrait.jpg'

const steps = [
  {
    step: '01',
    title: 'Du berättar om bilen',
    description: 'Du bokar via formuläret eller slår en signal till verkstaden. Berätta vad du upplever för symptom, missljud eller vilken serviceintervall bilen har nått.'
  },
  {
    step: '02',
    title: 'Vi undersöker och återkopplar',
    description: 'Vi gör en fackmannamässig undersökning och provkörning. Innan vi gör några åtgärder eller byter slitagedelar får du ett fast och tydligt kostnadsförslag.'
  },
  {
    step: '03',
    title: 'Du godkänner innan vi börjar',
    description: 'Inga överraskningar på fakturan. Vi påbörjar arbetet först när du gett ditt godkännande och meddelar så fort bilen är provkörd, kontrollerad och klar.'
  }
]

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="about-page" id="main-content">
        {/* Hero section */}
        <section className="about-page__hero" aria-labelledby="about-hero-title">
          <div className="container">
            <div className="about-page__hero-grid">
              <div className="about-page__hero-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Om Brynäs Bilservice
                </div>
                <h1 className="about-page__hero-title" id="about-hero-title">
                  Din lokala och personliga bilverkstad i Brynäs
                </h1>
                <p className="about-page__hero-lead">
                  Sedan starten 2021 har vi drivit en oberoende bilverkstad på Utmarksvägen i Gävle med ett enkelt mål: att ge bilägare personlig service, fackmannamässigt utfört arbete och raka besked utan krångel.
                </p>
                <p className="about-page__hero-sub">
                  Hos oss pratar du direkt med mekanikern som arbetar med din bil. Vi servar och reparerar alla bilmärken enligt tillverkarens rekommendationer och lämnar alltid tydliga kostnadsförslag innan vi påbörjar något arbete.
                </p>
                <div className="about-page__hero-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="about-page__btn about-page__btn--primary"
                  >
                    <span>Boka tid</span>
                    <span className="about-page__btn-arrow" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href="tel:0705533395"
                    className="about-page__btn about-page__btn--outline"
                  >
                    <PhoneIcon className="w-4 h-4 text-teal-400" />
                    <span>Ring: 070-553 33 95</span>
                  </a>
                </div>
              </div>
              <div className="about-page__hero-visual">
                <div className="about-page__hero-card">
                  <picture>
                    <source srcSet={imgWorkshop1Webp} type="image/webp" />
                    <img
                      src={imgWorkshop1Jpg}
                      alt="Brynäs Bilservice verkstad med bilar och utrustning"
                      className="about-page__hero-img"
                    />
                  </picture>
                  <div className="about-page__hero-badge">Grundat 2021</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local workshop & facts section */}
        <section className="about-page__local" aria-labelledby="local-title">
          <div className="container">
            <div className="about-page__local-grid">
              <div className="about-page__local-text">
                <div className="section-eyebrow section-eyebrow--dark">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Självständig & lokal
                </div>
                <h2 className="about-page__section-title" id="local-title">
                  En fristående verkstad med hjärtat i Gävle
                </h2>
                <p className="about-page__text-lead">
                  Brynäs Bilservice drivs av Maher Basher, som vuxit upp med bilar och motorer som en livslång passion, gick fordonsprogrammet på gymnasiet och arbetade sedan som mekaniker innan han startade eget. Han drev tidigare en verkstad som gick under smeknamnet Shomaher — ett skämtsamt spel på hans eget namn och F1-föraren Schumacher — och namnet lever kvar än idag. Som Shomaher är han något av en lokalkändis bland mekaniker och bilentusiaster i Gävle, vilket syns tydligt bland recensionerna på Google Maps. Hos oss är det alltid Maher eller någon i teamet du pratar med, aldrig en anonym kundtjänst.
                </p>

                {/* TODO CONTENT: HÄR BORDE DET FINNAS EN SEKTION OM PERSONALEN.
                Ska presentera övriga medarbetare (namn, roll, ungefär hur länge de jobbat med bilar) med samma personliga ton som Maher-stycket ovan.
                Väntar på uppgifter från kund. */}

                <p className="about-page__text-lead">
                  Vi är en oberoende bilverkstad, vilket innebär att vi inte är styrda av någon enskild biltillverkares kedja. Det gör att vi kan ge ärliga och anpassade rekommendationer utifrån vad som är bäst och mest ekonomiskt för just din bil.
                </p>
                <p className="about-page__text-body">
                  Vi använder reservdelar av originalkvalitet med full garanti och följer tillverkarnas officiella serviceprotokoll. Därför gäller din nybilsgaranti och stämpel i serviceboken precis som hos märkesverkstaden.
                </p>
                <p className="about-page__text-body">
                  Vi tror mer på bevis än på löften. Skulle vi hitta ett slitet bromsbelägg eller en läckande stötdämpare vid en rutinservice, kontaktar vi dig alltid med ett specificerat pris innan vi rör bilen vidare — och håller oss till svensk konsumenttjänstlag, som säger att en ungefärlig prisuppgift normalt inte får överskridas med mer än 15 procent. Du bestämmer, inte vi.
                </p>

                <div className="about-page__reassurance-list">
                  <div className="about-page__reassurance-item">
                    <div className="about-page__reassurance-icon" aria-hidden="true">
                      <ChatDotsIcon />
                    </div>
                    <div>
                      <h3 className="about-page__reassurance-heading">Tydlig kommunikation</h3>
                      <p className="about-page__reassurance-desc">
                        Vi förklarar vad som behöver göras, visar utbytta delar vid önskemål och håller dig uppdaterad genom hela processen.
                      </p>
                    </div>
                  </div>

                  <div className="about-page__reassurance-item">
                    <div className="about-page__reassurance-icon" aria-hidden="true">
                      <ShieldHeartIcon />
                    </div>
                    <div>
                      <h3 className="about-page__reassurance-heading">Omsorg om din bil</h3>
                      <p className="about-page__reassurance-desc">
                        Vi tar hand om din bil som om det vore vår egen – med noggrannhet, rätt moment och godkända vätskor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-page__local-aside">
                <div className="about-page__maher-card">
                  <picture>
                    <source srcSet={imgMaherWebp} type="image/webp" />
                    <img
                      src={imgMaherJpg}
                      alt="Maher Basher i verkstaden hos Brynäs Bilservice"
                      className="about-page__maher-img"
                      loading="lazy"
                    />
                  </picture>
                  <div className="about-page__maher-badge">
                    <span className="about-page__maher-name">Maher Basher</span>
                    <span className="about-page__maher-divider" aria-hidden="true">·</span>
                    <span className="about-page__maher-role">Grundare &amp; mekaniker</span>
                  </div>
                </div>

                <div className="about-page__facts-card">
                  <div className="about-page__facts-header">
                    <div className="about-page__facts-eyebrow">Information</div>
                    <h3 className="about-page__facts-title">Företagsfakta & kontakt</h3>
                  </div>

                  <div className="about-page__facts-body">
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">Juridiskt namn:</span>
                      <span className="about-page__fact-val">Brynäs Bilservice AB</span>
                    </div>
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">Organisationsnr:</span>
                      <span className="about-page__fact-val font-mono">559343-5307</span>
                    </div>
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">Verksamhetsstart:</span>
                      <span className="about-page__fact-val">Grundat 2021</span>
                    </div>
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">Verkstad:</span>
                      <a
                        href="https://maps.google.com/?q=Utmarksvägen+21B,+802+91+Gävle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-page__fact-link"
                      >
                        Utmarksvägen 21B, 802 91 Gävle
                      </a>
                    </div>
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">Telefon:</span>
                      <a href="tel:0705533395" className="about-page__fact-link">
                        070-553 33 95
                      </a>
                    </div>
                    <div className="about-page__fact-row">
                      <span className="about-page__fact-label">E-post:</span>
                      <a href="mailto:info@brynasbilservice.se" className="about-page__fact-link">
                        info@brynasbilservice.se
                      </a>
                    </div>

                    <div className="about-page__facts-divider" aria-hidden="true" />

                    <div className="about-page__hours-block">
                      <span className="about-page__hours-title">Öppettider:</span>
                      <div className="about-page__hours-list">
                        <div className="about-page__hours-row">
                          <span>Måndag – Fredag:</span>
                          <span className="font-semibold text-white">08:00 – 17:00</span>
                        </div>
                        <div className="about-page__hours-row">
                          <span>Lördag:</span>
                          <span className="font-medium text-teal-300">Förfrågan</span>
                        </div>
                        <div className="about-page__hours-row">
                          <span>Söndag:</span>
                          <span className="text-gray-400">Stängt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How we work section */}
        <section className="about-page__process" aria-labelledby="process-title">
          <div className="container">
            <div className="about-page__process-card">
              <div className="about-page__process-intro">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Transparent process
                </div>
                <h2 className="about-page__process-title" id="process-title">
                  Från inlämning till färdig bil
                </h2>
                <p className="about-page__process-lead">
                  Du ska alltid veta vad som händer med din bil och vad det kommer att kosta. Så här går det till när du lämnar in bilen hos oss.
                </p>
              </div>

              <div className="about-page__process-steps">
                {steps.map((item) => (
                  <div key={item.step} className="about-page__step-card">
                    <div className="about-page__step-badge">{item.step}</div>
                    <h3 className="about-page__step-title">{item.title}</h3>
                    <p className="about-page__step-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workshop gallery teaser CTA */}
        <section className="about-page__gallery-cta" aria-label="Bildgalleri">
          <div className="container">
            <div className="about-page__gallery-cta-inner">
              <a href="/galleri" className="about-page__gallery-cta-btn">
                <span>Ta en titt bakom garageportarna – välkommen in i vårt bildgalleri</span>
                <span className="about-page__btn-arrow" aria-hidden="true">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="about-page__cta" aria-labelledby="cta-title">
          <div className="container">
            <div className="about-page__cta-card">
              <div className="about-page__cta-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Välkommen till oss
                </div>
                <h2 className="about-page__cta-title" id="cta-title">
                  Redo att boka service eller reparation?
                </h2>
                <p className="about-page__cta-desc">
                  Har du frågor om din bil eller vill du boka tid? Skicka en förfrågan via formuläret eller ring direkt till verkstaden på Utmarksvägen.
                </p>
                <div className="about-page__cta-actions">
                  <button
                    type="button"
                    onClick={openModal}
                    className="about-page__btn about-page__btn--primary"
                  >
                    <span>Boka tid nu</span>
                    <span className="about-page__btn-arrow" aria-hidden="true">
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href="/tjanster"
                    className="about-page__btn about-page__btn--secondary"
                  >
                    <span>Se alla tjänster</span>
                  </a>
                  <a
                    href="tel:0705533395"
                    className="about-page__btn about-page__btn--outline"
                  >
                    <PhoneIcon className="w-4 h-4 text-teal-400" />
                    <span>Ring: 070-553 33 95</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  )
}
