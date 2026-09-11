import { useState } from 'react'
import omoss1 from '../../assets/images/OMOSS_KENBURNS1.jpg'
import omoss2 from '../../assets/images/OMOSS_KENBURNS2.jpg'
import omoss3 from '../../assets/images/OMOSS_KENBURNS3.jpg'
import { KenBurnsSlideshow } from '../ui/KenBurnsSlideshow'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { ChatDotsIcon } from '../icons/ChatDotsIcon'
import { ShieldHeartIcon } from '../icons/ShieldHeartIcon'

export function About() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="about" id="om-oss">
      <div className="container">
        <div className="about__inner">
          <div className="about__media">
            <div className="about__media-card">
              <KenBurnsSlideshow
                images={[omoss1, omoss2, omoss3]}
                alts={[
                  'Brynäs Bilservice verkstad med bilar och utrustning',
                  'Däckverkstad med däck och hjulutrustning',
                  'Kundmottagning och väntrum hos Brynäs Bilservice',
                ]}
                className="about__slideshow"
                onIndexChange={setActiveSlide}
              />
              <div className="about__badge">Grundat 2021</div>

              <div className="about__slide-tab" aria-label="Bildvisare" role="tablist">
                {[0, 1, 2].map(idx => (
                  <span
                    key={idx}
                    className={`about__slide-dot${idx === activeSlide ? ' about__slide-dot--active' : ''}`}
                    aria-label={`Bild ${idx + 1}`}
                    role="tab"
                    aria-selected={idx === activeSlide}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="about__content">
            <svg className="about__watermark" viewBox="0 0 320 320" fill="none" aria-hidden="true">
              <circle cx="280" cy="50" r="90" stroke="rgba(36, 150, 160, 0.16)" strokeWidth="1.5" />
              <circle cx="280" cy="50" r="130" stroke="rgba(36, 150, 160, 0.13)" strokeWidth="1.5" />
              <circle cx="280" cy="50" r="170" stroke="rgba(36, 150, 160, 0.10)" strokeWidth="1.5" />
              <circle cx="280" cy="50" r="210" stroke="rgba(36, 150, 160, 0.07)" strokeWidth="1.5" />
              <circle cx="280" cy="50" r="250" stroke="rgba(36, 150, 160, 0.04)" strokeWidth="1.5" />
            </svg>

            <div className="about__eyebrow">
              <span className="about__eyebrow-dash" aria-hidden="true" />
              <span>Om Brynäs Bilservice</span>
            </div>

            <h2 className="about__title">
              <span className="about__title-line">Lokal verkstad.</span>
              <span className="about__title-line about__title-accent">Personlig service.</span>
            </h2>

            <p className="about__lead">
              Brynäs Bilservice grundades 2021 och är din lokala, oberoende verkstad i Brynäs, Gävle. Vi brinner för bilar och för människorna som kör dem. Hos oss möts du av erfarenhet, noggrannhet och ett personligt bemötande – oavsett om det gäller en enkel service eller en mer omfattande reparation.
            </p>

            <p className="about__sub">
              Vi servar alla bilmärken. Hittar vi något extra under arbetet kontaktar vi alltid dig först – inga överraskningar på fakturan.
            </p>

            <div className="about__action">
              <a href="/om-oss" className="about__cta-btn">
                <span>Läs mer om oss</span>
                <ArrowRightIcon className="about__cta-icon" />
              </a>
            </div>

            <div className="about__cards">
              <div className="about__card">
                <div className="about__card-icon-wrap">
                  <ChatDotsIcon className="about__card-icon" />
                </div>
                <div className="about__card-body">
                  <h3 className="about__card-title">Tydlig kommunikation</h3>
                  <p className="about__card-desc">
                    Vi förklarar vad som behöver göras och håller dig uppdaterad genom hela processen.
                  </p>
                </div>
              </div>

              <div className="about__card">
                <div className="about__card-icon-wrap">
                  <ShieldHeartIcon className="about__card-icon" />
                </div>
                <div className="about__card-body">
                  <h3 className="about__card-title">Omsorg om din bil</h3>
                  <p className="about__card-desc">
                    Vi tar hand om din bil som om det vore vår egen – med noggrannhet och rätt kunskap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
