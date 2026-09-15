import { useState } from 'react'
import { KenBurnsSlideshow } from './KenBurnsSlideshow'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'

import thumbLifts from '../../assets/images/gallery/gallery_thumb_workshop_lifts.webp'
import thumbTiremachine from '../../assets/images/gallery/gallery_thumb_workshop_tiremachine.webp'
import thumbBenches from '../../assets/images/gallery/gallery_thumb_workshop_benches.webp'
import thumbCarLift from '../../assets/images/gallery/gallery_thumb_workshop_car_lift.webp'

const defaultSlides = [
  {
    image: thumbLifts,
    alt: 'Brynäs Bilservice verkstad med billyftar och däckställ',
  },
  {
    image: thumbTiremachine,
    alt: 'Däckmaskiner och balanseringsutrustning i verkstaden',
  },
  {
    image: thumbBenches,
    alt: 'Arbetsbänk med verktygstavlor och reparationsutrustning',
  },
  {
    image: thumbCarLift,
    alt: 'Bil upplyft på serviceplats i verkstaden',
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
