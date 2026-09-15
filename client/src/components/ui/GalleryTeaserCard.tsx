import { useState } from 'react'
import { KenBurnsSlideshow } from './KenBurnsSlideshow'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'

import cardLifts from '../../assets/images/gallery/workshop/workshop-lifts-and-tire-racks-card.webp'
import cardCarLift from '../../assets/images/gallery/workshop/workshop-car-on-lift-card.webp'
import cardOpenHood from '../../assets/images/gallery/workshop/workshop-car-open-hood-card.webp'
import cardEmptyLifts from '../../assets/images/gallery/workshop/workshop-empty-lifts-card.webp'
import cardOverheadBay from '../../assets/images/gallery/workshop/workshop-overhead-car-bay-card.webp'
import cardServiceAisle from '../../assets/images/gallery/workshop/workshop-service-aisle-card.webp'

const defaultSlides = [
  // These 1280px card exports stay sharp in the large square, animated landing-page frame.
  // `-thumb` files are intentionally reserved for the compact /galleri carousel.
  {
    image: cardOpenHood,
    alt: 'Bil med öppen motorhuv på verkstadsgolvet hos Brynäs Bilservice',
  },
  {
    image: cardEmptyLifts,
    alt: 'Öppen verkstadsyta med lyftplatser och däckförvaring',
  },
  {
    image: cardOverheadBay,
    alt: 'Överblick över verkstadens bilplats och däckställ',
  },
  {
    image: cardServiceAisle,
    alt: 'Servicegång genom verkstaden med arbetsutrustning och däckställ',
  },
  {
    image: cardCarLift,
    alt: 'Bil vid lyftplatsen i Brynäs Bilservice verkstad',
  },
  {
    image: cardLifts,
    alt: 'Verkstadsöversikt med billyftar och däckställ',
  },
]

export interface GalleryTeaserCardProps {
  className?: string
  badgeText?: string
  href?: string
  ariaLabel?: string
}

export function GalleryTeaserCard({
  className = '',
  badgeText = 'Grundat 2021',
  href = '/galleri',
  ariaLabel = 'Gå till bildgalleriet – se bilder från vår verkstad',
}: GalleryTeaserCardProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <a
      href={href}
      className={`gallery-teaser-card ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="gallery-teaser-card__media">
        <KenBurnsSlideshow
          images={defaultSlides.map((s) => s.image)}
          alts={defaultSlides.map((s) => s.alt)}
          className="gallery-teaser-card__slideshow"
          onIndexChange={setActiveSlide}
        />

        {badgeText && (
          <div className="gallery-teaser-card__badge">{badgeText}</div>
        )}

        {/* Bottom-right cutout: TILL GALLERIET with slide indicators and arrow */}
        <div className="gallery-teaser-card__cutout">
          <div className="gallery-teaser-card__dots" aria-hidden="true">
            {defaultSlides.map((_, idx) => (
              <span
                key={idx}
                className={`gallery-teaser-card__dot${
                  idx === activeSlide ? ' gallery-teaser-card__dot--active' : ''
                }`}
              />
            ))}
          </div>
          <span className="gallery-teaser-card__label">Till galleriet</span>
          <span className="gallery-teaser-card__arrow" aria-hidden="true">
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  )
}
