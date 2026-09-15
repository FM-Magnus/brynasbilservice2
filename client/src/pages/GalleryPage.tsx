import { useEffect, useRef, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { BookingFormModal } from '../components/BookingForm'
import { PhoneIcon } from '../components/icons/PhoneIcon'
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon'

import workbenchWebp from '../assets/images/gallery/workshop/workshop-workbench-and-tire-machines.webp'
import workbenchJpg from '../assets/images/gallery/workshop/workshop-workbench-and-tire-machines.jpg'
import workbenchThumbWebp from '../assets/images/gallery/workshop/workshop-workbench-and-tire-machines-thumb.webp'
import workbenchThumbJpg from '../assets/images/gallery/workshop/workshop-workbench-and-tire-machines-thumb.jpg'
import openHoodWebp from '../assets/images/gallery/workshop/workshop-car-open-hood.webp'
import openHoodJpg from '../assets/images/gallery/workshop/workshop-car-open-hood.jpg'
import openHoodThumbWebp from '../assets/images/gallery/workshop/workshop-car-open-hood-thumb.webp'
import openHoodThumbJpg from '../assets/images/gallery/workshop/workshop-car-open-hood-thumb.jpg'
import liftsWebp from '../assets/images/gallery/workshop/workshop-lifts-and-tire-racks.webp'
import liftsJpg from '../assets/images/gallery/workshop/workshop-lifts-and-tire-racks.jpg'
import liftsThumbWebp from '../assets/images/gallery/workshop/workshop-lifts-and-tire-racks-thumb.webp'
import liftsThumbJpg from '../assets/images/gallery/workshop/workshop-lifts-and-tire-racks-thumb.jpg'
import carBayWebp from '../assets/images/gallery/workshop/workshop-car-bay-and-tire-racks.webp'
import carBayJpg from '../assets/images/gallery/workshop/workshop-car-bay-and-tire-racks.jpg'
import carBayThumbWebp from '../assets/images/gallery/workshop/workshop-car-bay-and-tire-racks-thumb.webp'
import carBayThumbJpg from '../assets/images/gallery/workshop/workshop-car-bay-and-tire-racks-thumb.jpg'
import emptyLiftsWebp from '../assets/images/gallery/workshop/workshop-empty-lifts.webp'
import emptyLiftsJpg from '../assets/images/gallery/workshop/workshop-empty-lifts.jpg'
import emptyLiftsThumbWebp from '../assets/images/gallery/workshop/workshop-empty-lifts-thumb.webp'
import emptyLiftsThumbJpg from '../assets/images/gallery/workshop/workshop-empty-lifts-thumb.jpg'
import overheadStorageWebp from '../assets/images/gallery/workshop/workshop-overhead-tire-storage.webp'
import overheadStorageJpg from '../assets/images/gallery/workshop/workshop-overhead-tire-storage.jpg'
import overheadStorageThumbWebp from '../assets/images/gallery/workshop/workshop-overhead-tire-storage-thumb.webp'
import overheadStorageThumbJpg from '../assets/images/gallery/workshop/workshop-overhead-tire-storage-thumb.jpg'
import tireMachineWebp from '../assets/images/gallery/workshop/workshop-tire-machine-and-tools.webp'
import tireMachineJpg from '../assets/images/gallery/workshop/workshop-tire-machine-and-tools.jpg'
import tireMachineThumbWebp from '../assets/images/gallery/workshop/workshop-tire-machine-and-tools-thumb.webp'
import tireMachineThumbJpg from '../assets/images/gallery/workshop/workshop-tire-machine-and-tools-thumb.jpg'
import tireRacksWebp from '../assets/images/gallery/workshop/workshop-tire-racks-and-rims.webp'
import tireRacksJpg from '../assets/images/gallery/workshop/workshop-tire-racks-and-rims.jpg'
import tireRacksThumbWebp from '../assets/images/gallery/workshop/workshop-tire-racks-and-rims-thumb.webp'
import tireRacksThumbJpg from '../assets/images/gallery/workshop/workshop-tire-racks-and-rims-thumb.jpg'
import carLiftWebp from '../assets/images/gallery/workshop/workshop-car-on-lift.webp'
import carLiftJpg from '../assets/images/gallery/workshop/workshop-car-on-lift.jpg'
import carLiftThumbWebp from '../assets/images/gallery/workshop/workshop-car-on-lift-thumb.webp'
import carLiftThumbJpg from '../assets/images/gallery/workshop/workshop-car-on-lift-thumb.jpg'
import overheadBayWebp from '../assets/images/gallery/workshop/workshop-overhead-car-bay.webp'
import overheadBayJpg from '../assets/images/gallery/workshop/workshop-overhead-car-bay.jpg'
import overheadBayThumbWebp from '../assets/images/gallery/workshop/workshop-overhead-car-bay-thumb.webp'
import overheadBayThumbJpg from '../assets/images/gallery/workshop/workshop-overhead-car-bay-thumb.jpg'
import serviceAisleWebp from '../assets/images/gallery/workshop/workshop-service-aisle.webp'
import serviceAisleJpg from '../assets/images/gallery/workshop/workshop-service-aisle.jpg'
import serviceAisleThumbWebp from '../assets/images/gallery/workshop/workshop-service-aisle-thumb.webp'
import serviceAisleThumbJpg from '../assets/images/gallery/workshop/workshop-service-aisle-thumb.jpg'

interface GalleryItem {
  id: string
  imageWebp: string
  imageJpg: string
  thumbnailWebp: string
  thumbnailJpg: string
  alt: string
  category: string
  title: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'arbetsbank-och-dackmaskiner',
    imageWebp: workbenchWebp,
    imageJpg: workbenchJpg,
    thumbnailWebp: workbenchThumbWebp,
    thumbnailJpg: workbenchThumbJpg,
    alt: 'Arbetsbänk, verktyg och däckmaskiner i Brynäs Bilservice verkstad',
    category: 'Verkstadsutrustning',
    title: 'Arbetsbänk och däckmaskiner',
    description: 'En arbetsstation med verktyg, förvaring och utrustning för hjularbete.'
  },
  {
    id: 'bil-med-oppen-motorhuv',
    imageWebp: openHoodWebp,
    imageJpg: openHoodJpg,
    thumbnailWebp: openHoodThumbWebp,
    thumbnailJpg: openHoodThumbJpg,
    alt: 'Bil med öppen motorhuv på verkstadsgolvet',
    category: 'Verkstad',
    title: 'Bil på verkstadsgolvet',
    description: 'En vy från verkstaden med arbetsplats och däckförvaring i bakgrunden.'
  },
  {
    id: 'billyftar-och-dackstall',
    imageWebp: liftsWebp,
    imageJpg: liftsJpg,
    thumbnailWebp: liftsThumbWebp,
    thumbnailJpg: liftsThumbJpg,
    alt: 'Tomma billyftar med däckställ i verkstaden',
    category: 'Verkstad',
    title: 'Lyftplatser och däckställ',
    description: 'En öppen verkstadsvy med lyftar, verktyg och förvaring.'
  },
  {
    id: 'bilplats-vid-dackstall',
    imageWebp: carBayWebp,
    imageJpg: carBayJpg,
    thumbnailWebp: carBayThumbWebp,
    thumbnailJpg: carBayThumbJpg,
    alt: 'Bilplats med däckställ och verktyg i verkstaden',
    category: 'Verkstad',
    title: 'Bilplats vid däckställen',
    description: 'En verkstadsvy från serviceytan med däck- och fälgförvaring.'
  },
  {
    id: 'bortre-billyftar',
    imageWebp: emptyLiftsWebp,
    imageJpg: emptyLiftsJpg,
    thumbnailWebp: emptyLiftsThumbWebp,
    thumbnailJpg: emptyLiftsThumbJpg,
    alt: 'Tomma billyftar och arbetsyta i verkstaden',
    category: 'Verkstad',
    title: 'Öppen yta vid lyftarna',
    description: 'En vy mot verkstadens lyftplatser och däckförvaring.'
  },
  {
    id: 'bred-oversikt-fran-lyft',
    imageWebp: overheadStorageWebp,
    imageJpg: overheadStorageJpg,
    thumbnailWebp: overheadStorageThumbWebp,
    thumbnailJpg: overheadStorageThumbJpg,
    alt: 'Överblick över verkstaden med däckställ och bil på golvet',
    category: 'Verkstad',
    title: 'Överblick från lyften',
    description: 'En bred vy över förvaring, arbetsytor och verkstadsgolvet.'
  },
  {
    id: 'dackmaskiner-och-verktyg',
    imageWebp: tireMachineWebp,
    imageJpg: tireMachineJpg,
    thumbnailWebp: tireMachineThumbWebp,
    thumbnailJpg: tireMachineThumbJpg,
    alt: 'Däckmaskiner och verktyg vid en arbetsstation i verkstaden',
    category: 'Däck & hjulservice',
    title: 'Däckmaskiner och verktyg',
    description: 'En arbetsstation med utrustning och förvaring för hjularbete.'
  },
  {
    id: 'dackstall-och-falgar',
    imageWebp: tireRacksWebp,
    imageJpg: tireRacksJpg,
    thumbnailWebp: tireRacksThumbWebp,
    thumbnailJpg: tireRacksThumbJpg,
    alt: 'Däckställ med däck och fälgar i verkstaden',
    category: 'Däck & hjulservice',
    title: 'Däckställ och fälgar',
    description: 'En vy längs däckförvaringen med verkstadens arbetsutrustning.'
  },
  {
    id: 'honda-pa-billyft',
    imageWebp: carLiftWebp,
    imageJpg: carLiftJpg,
    thumbnailWebp: carLiftThumbWebp,
    thumbnailJpg: carLiftThumbJpg,
    alt: 'Bil på en lyftplats i verkstaden',
    category: 'Verkstad',
    title: 'Bil vid lyftplatsen',
    description: 'En bild från verkstadsgolvet med arbetsyta och billyft.'
  },
  {
    id: 'oversikt-fran-lyft',
    imageWebp: overheadBayWebp,
    imageJpg: overheadBayJpg,
    thumbnailWebp: overheadBayThumbWebp,
    thumbnailJpg: overheadBayThumbJpg,
    alt: 'Verkstadsöversikt sedd från en lyft med bil och däckställ',
    category: 'Verkstad',
    title: 'Verkstadsöversikt från lyften',
    description: 'En vy över arbetsplatser, bil och däckförvaring från ovan.'
  },
  {
    id: 'servicegang-mot-kontor',
    imageWebp: serviceAisleWebp,
    imageJpg: serviceAisleJpg,
    thumbnailWebp: serviceAisleThumbWebp,
    thumbnailJpg: serviceAisleThumbJpg,
    alt: 'Servicegång i verkstaden med utrustning och däckställ',
    category: 'Verkstad',
    title: 'Servicegången i verkstaden',
    description: 'En lång vy genom verkstadens arbetsyta och utrustning.'
  }
]

export default function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([])
  const dragState = useRef({ pointerId: null as number | null, startX: 0, startScrollLeft: 0, didDrag: false })

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const selectImage = (index: number, moveFocus = false) => {
    const nextIndex = (index + galleryItems.length) % galleryItems.length
    setSelectedIndex(nextIndex)

    window.requestAnimationFrame(() => {
      const thumbnail = thumbnailRefs.current[nextIndex]
      thumbnail?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      if (moveFocus) thumbnail?.focus()
    })
  }

  const moveSelection = (direction: number, moveFocus = false) => {
    // The viewer wraps intentionally, so the gallery can be explored continuously.
    selectImage(selectedIndex + direction, moveFocus)
  }

  const selectedItem = galleryItems[selectedIndex]

  return (
    <>
      <Header onBookingClick={openModal} />

      <main className="about-page" id="main-content">
        {/* Hero section */}
        <section className="about-page__hero" aria-labelledby="gallery-hero-title">
          <div className="container">
            <div className="about-page__hero-grid">
              <div className="about-page__hero-content">
                <div className="section-eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  Bilder &amp; Verkstadsmiljö
                </div>
                <h1 className="about-page__hero-title" id="gallery-hero-title">
                  Bilder från Brynäs Bilservice
                </h1>
                <p className="about-page__hero-lead">
                  Ta en titt in i vår verkstad och däckavdelning på Utmarksvägen i Brynäs. Här ser du lokalerna, utrustningen och miljön där vi tar hand om din bil.
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
                    <source srcSet={workbenchWebp} type="image/webp" />
                    <img
                      src={workbenchJpg}
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

        {/* Workshop gallery section */}
        <section className="about-page__gallery" aria-labelledby="gallery-title">
          <div className="container">
            <div className="about-page__gallery-intro">
              <div className="section-eyebrow section-eyebrow--dark">
                <span className="eyebrow-line" aria-hidden="true" />
                Vår verkstad i bilder
              </div>
              <h2 className="about-page__section-title" id="gallery-title">
                Ta en titt inne hos oss
              </h2>
              <p className="about-page__gallery-lead">
                Utforska verkstadsmiljön i din egen takt. Välj en bild eller dra i bildremsan för att se mer.
              </p>
            </div>

            <div className="gallery-viewer">
              <div className="gallery-viewer__main" aria-live="polite">
                <picture>
                  <source srcSet={selectedItem.imageWebp} type="image/webp" />
                  <img src={selectedItem.imageJpg} alt={selectedItem.alt} className="gallery-viewer__image" />
                </picture>
                <div className="gallery-viewer__meta">
                  <span>{selectedItem.category}</span>
                  <strong>{selectedItem.title}</strong>
                  <p>{selectedItem.description}</p>
                </div>
                <span className="gallery-viewer__count" aria-label={`Bild ${selectedIndex + 1} av ${galleryItems.length}`}>
                  {String(selectedIndex + 1).padStart(2, '0')} <i aria-hidden="true" /> {String(galleryItems.length).padStart(2, '0')}
                </span>
              </div>

              <div className="gallery-viewer__controls" aria-label="Navigera i bildgalleriet">
                <button type="button" className="gallery-viewer__arrow" onClick={() => moveSelection(-1, true)} aria-label="Visa föregående bild">
                  <span aria-hidden="true">←</span>
                </button>
                <div
                  ref={carouselRef}
                  className={`gallery-viewer__carousel${isDragging ? ' is-dragging' : ''}`}
                  role="region"
                  aria-label="Bildminiatyrer. Använd vänster och höger piltangent för att byta bild."
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') { event.preventDefault(); moveSelection(-1, true) }
                    if (event.key === 'ArrowRight') { event.preventDefault(); moveSelection(1, true) }
                  }}
                  onWheel={(event) => {
                    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                      event.currentTarget.scrollLeft += event.deltaY
                      event.preventDefault()
                    }
                  }}
                  onPointerDown={(event) => {
                    // Thumbnail buttons keep their native click/tap behaviour; drag the track between them.
                    if ((event.target as HTMLElement).closest('button')) return
                    const carousel = event.currentTarget
                    carousel.setPointerCapture(event.pointerId)
                    dragState.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: carousel.scrollLeft, didDrag: false }
                    setIsDragging(true)
                  }}
                  onPointerMove={(event) => {
                    const drag = dragState.current
                    if (drag.pointerId !== event.pointerId) return
                    const distance = event.clientX - drag.startX
                    if (Math.abs(distance) > 5) drag.didDrag = true
                    event.currentTarget.scrollLeft = drag.startScrollLeft - distance
                  }}
                  onPointerUp={(event) => {
                    const drag = dragState.current
                    if (drag.pointerId !== event.pointerId) return
                    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
                    dragState.current.pointerId = null
                    setIsDragging(false)
                  }}
                  onPointerCancel={() => { dragState.current.pointerId = null; setIsDragging(false) }}
                >
                  {galleryItems.map((item, index) => (
                    <button
                      ref={(element) => { thumbnailRefs.current[index] = element }}
                      type="button"
                      key={item.id}
                      className={`gallery-viewer__thumbnail${selectedIndex === index ? ' is-active' : ''}`}
                      onClick={() => selectImage(index)}
                      aria-label={`Visa bild ${index + 1}: ${item.title}`}
                      aria-pressed={selectedIndex === index}
                    >
                      <picture>
                        <source srcSet={item.thumbnailWebp} type="image/webp" />
                        <img src={item.thumbnailJpg} alt="" />
                      </picture>
                    </button>
                  ))}
                </div>
                <button type="button" className="gallery-viewer__arrow" onClick={() => moveSelection(1, true)} aria-label="Visa nästa bild">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
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
