/**
 * Sections of the Guide family (Oljebyte, Kamrem, Koppling, Bromssystem,
 * Bilbatteri, Stötdämpare, Hjullager, Avgassystem, Drivaxel, Styrning).
 * Markup only: styles live in `styles/ServiceGuideTemplate.css`, which each
 * page imports. Pages keep their copy and data and compose these in order;
 * `children` carries what varies between guides (extra paragraphs, tips).
 */
import { useState } from 'react'
import type { ReactElement, ReactNode, SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../data/business'
import { TrustStrip } from '../ui/TrustStrip'
import { relatedServices } from '../../data/relatedServices'
import { AlertTriangleIcon } from '../icons/AlertTriangleIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { PhoneIcon } from '../icons/PhoneIcon'

export type GuideIcon = (props: SVGProps<SVGSVGElement>) => ReactElement | null

export interface GuideImage {
  webp: string
  jpg: string
  alt: string
}

interface GuideHeroImage extends GuideImage {
  /** `data-image-slot` marker used by the imagery docs and tests. */
  slot?: string
  lazy?: boolean
  /** Anchor the background photo left instead of centred. */
  alignLeft?: boolean
}

export interface GuideTextItem {
  title: string
  text: string
}

export interface GuideIconItem extends GuideTextItem {
  icon: GuideIcon
}

export interface GuideSymptom extends GuideIconItem {
  featured?: boolean
  urgent?: boolean
}

export interface GuideInfoCard extends GuideIconItem {
  /** Short label above the title, e.g. "VIKTIGT" or a value such as "3–5 år". */
  flag?: string
}

/** Below-the-fold photo: always lazy. */
function Picture({ image }: { image: GuideImage }) {
  return (
    <picture>
      <source srcSet={image.webp} type="image/webp" />
      <img src={image.jpg} alt={image.alt} loading="lazy" />
    </picture>
  )
}

function GuideActions({ onBooking, bookLabel }: { onBooking: () => void; bookLabel: string }) {
  return (
    <div className="service-guide__actions">
      <button type="button" onClick={onBooking} className="bb-btn bb-btn--teal service-guide__btn">{bookLabel}</button>
      <a href={BUSINESS.phone.href} className="bb-btn bb-btn--ember service-guide__btn"><PhoneIcon aria-hidden="true" />Ring {BUSINESS.phone.display}</a>
    </div>
  )
}

interface GuideHeroProps {
  id: string
  eyebrow: string
  title: ReactNode
  lead: ReactNode
  image: GuideHeroImage
  trustBadges: readonly GuideIconItem[]
  onBooking: () => void
  bookLabel?: string
}

export function GuideHero({ id, eyebrow, title, lead, image, trustBadges, onBooking, bookLabel = 'Boka tid' }: GuideHeroProps) {
  return (
    <>
      <section className="service-guide__hero" aria-labelledby={id}>
        <div className={`service-guide__hero-bg${image.alignLeft ? ' service-guide__hero-bg--pos-left' : ''}`}>
          <picture data-image-slot={image.slot}>
            <source srcSet={image.webp} type="image/webp" />
            <img src={image.jpg} alt={image.alt} loading={image.lazy ? 'lazy' : undefined} />
          </picture>
        </div>
        <div className="bb-wrap service-guide__container">
          <div className="service-guide__hero-inner">
            <div>
              <div className="bb-eyebrow bb-eyebrow--dark service-guide__eyebrow">{eyebrow}</div>
              <h1 className="bb-h1 service-guide__title" id={id}>{title}</h1>
              <p className="bb-lead bb-lead--dark service-guide__lead">{lead}</p>
              <GuideActions onBooking={onBooking} bookLabel={bookLabel} />
            </div>
          </div>
        </div>
      </section>
      <TrustStrip items={trustBadges} />
    </>
  )
}

interface GuideIntroProps {
  id: string
  heading: ReactNode
  image: GuideImage
  caption: string
  /** Everything under the heading: paragraphs, `GuideParts`, a `Tip`. */
  children: ReactNode
}

export function GuideIntro({ id, heading, image, caption, children }: GuideIntroProps) {
  return (
    <section className="service-guide__section" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container service-guide__intro-layout">
        <div className="service-guide__intro-media">
          <Picture image={image} />
          <p className="service-guide__intro-caption">{caption}</p>
        </div>
        <div className="service-guide__intro-content">
          <h2 id={id}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

/** Numbered list of a system's main parts, inside `GuideIntro`. */
export function GuideParts({ items }: { items: readonly GuideTextItem[] }) {
  return (
    <div className="service-guide__component-grid">
      {items.map((item, index) => (
        <div className="service-guide__component-item" key={item.title}>
          <span className="service-guide__component-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </div>
      ))}
    </div>
  )
}

/** Adds a full stop after a lead-in title unless it already ends a sentence. */
function leadIn(title: string) {
  return /[.?!:]$/.test(title) ? title : `${title}.`
}

interface GuideImportanceProps {
  id: string
  heading: ReactNode
  text: ReactNode
  /** Reasons, rendered as running prose with a bold lead-in each. */
  items: readonly GuideTextItem[]
}

export function GuideImportance({ id, heading, text, items }: GuideImportanceProps) {
  return (
    <section className="service-guide__section service-guide__section--tight" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container">
        <div className="service-guide__importance">
          <div>
            <h2 id={id}>{heading}</h2>
            <p>{text}</p>
          </div>
          <div className="service-guide__importance-prose">
            {items.map(({ title, text: itemText }) => (
              <p key={title}><strong>{leadIn(title)}</strong> {itemText}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Symptom rows; `urgent` wins over `featured`. */
function GuideSymptomList({ items }: { items: readonly GuideSymptom[] }) {
  return (
    <div className="service-guide__symptom-list">
      {items.map(({ icon: Icon, title, text, featured, urgent }) => (
        <article className={`service-guide__symptom-row${urgent ? ' service-guide__symptom-row--urgent' : featured ? ' service-guide__symptom-row--featured' : ''}`} key={title}>
          <span className="service-guide__symptom-icon"><Icon aria-hidden="true" /></span>
          <div><h3>{title}</h3><p>{text}</p></div>
        </article>
      ))}
    </div>
  )
}

interface GuideSymptomsProps {
  id: string
  heading: ReactNode
  text: ReactNode
  items: readonly GuideSymptom[]
  image: GuideImage
  caption: string
  /** Landscape crop for the photo column. */
  landscape?: boolean
  /** Less vertical padding, for a section that follows another one closely. */
  tight?: boolean
  /** Rendered after the list, e.g. a `Tip`. */
  children?: ReactNode
}

export function GuideSymptoms({ id, heading, text, items, image, caption, landscape, tight, children }: GuideSymptomsProps) {
  return (
    <section className={`service-guide__section${tight ? ' service-guide__section--tight' : ''}`} aria-labelledby={id}>
      <div className="bb-wrap service-guide__container service-guide__symptoms-layout">
        <div className="service-guide__symptoms-content">
          <h2 id={id}>{heading}</h2>
          <p>{text}</p>
          <GuideSymptomList items={items} />
          {children}
        </div>
        <div className={`service-guide__symptoms-media${landscape ? ' service-guide__symptoms-media--landscape' : ''}`}>
          <Picture image={image} />
          <p className="service-guide__symptoms-caption">{caption}</p>
        </div>
      </div>
    </section>
  )
}

interface GuideServiceCardProps {
  id: string
  heading: ReactNode
  text: ReactNode
  items: readonly string[]
}

export function GuideServiceCard({ id, heading, text, items }: GuideServiceCardProps) {
  return (
    <section className="service-guide__section service-guide__section--tight" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container">
        <div className="service-guide__service-card">
          <div>
            <h2 id={id}>{heading}</h2>
            <p>{text}</p>
          </div>
          <ul className="service-guide__service-checklist">
            {items.map(item => <li key={item}><CheckIcon aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

interface GuideInfoProps {
  id: string
  heading: ReactNode
  text: ReactNode
  cards: readonly GuideInfoCard[]
  /** Icon of the strip under the cards. */
  safetyIcon?: GuideIcon
  /** Content of the strip's paragraph, usually starting with a `<strong>` label. */
  safety: ReactNode
}

export function GuideInfo({ id, heading, text, cards, safetyIcon: SafetyIcon = AlertTriangleIcon, safety }: GuideInfoProps) {
  return (
    <section className="service-guide__section" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container">
        <div className="service-guide__info-heading">
          <h2 id={id}>{heading}</h2>
          <p>{text}</p>
        </div>
        <dl className="service-guide__info-ledger">
          {cards.map(({ icon: Icon, title, text: cardText, flag }) => (
            <div className="service-guide__info-row" key={title}>
              <dt>
                <Icon aria-hidden="true" />
                <span>{title}</span>
                {flag && <span className="service-guide__info-flag">{flag}</span>}
              </dt>
              <dd>{cardText}</dd>
            </div>
          ))}
        </dl>
        <div className="service-guide__safety-strip">
          <SafetyIcon aria-hidden="true" />
          <p>{safety}</p>
        </div>
      </div>
    </section>
  )
}

interface GuideTopicProps {
  id: string
  heading: ReactNode
  text?: ReactNode
  items: readonly GuideTextItem[]
  /** `prose`: heading beside running text, each item a paragraph opening with its title. */
  variant?: 'cards' | 'prose'
  columns?: 2 | 3 | 4
  /** Closing remark under the cards or prose. */
  note?: ReactNode
}

/** A heading with either a grid of text cards or running prose (Oljebyte's deep-dive blocks). */
export function GuideTopic({ id, heading, text, items, variant = 'cards', columns = 3, note }: GuideTopicProps) {
  if (variant === 'prose') {
    return (
      <section className="service-guide__section service-guide__section--tight" aria-labelledby={id}>
        <div className="bb-wrap service-guide__container service-guide__topic-prose">
          <h2 id={id}>{heading}</h2>
          <div>
            {text && <p>{text}</p>}
            {items.map(({ title, text: itemText }) => (
              <p key={title}><strong>{title}</strong> {itemText}</p>
            ))}
            {note && <p className="service-guide__topic-note">{note}</p>}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="service-guide__section service-guide__section--tight" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container">
        <div className="service-guide__topic-header">
          <h2 id={id}>{heading}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className={`service-guide__topic-grid service-guide__topic-grid--cols-${columns}`}>
          {items.map(({ title, text: itemText }) => (
            <article className="service-guide__topic-card" key={title}><h3>{title}</h3><p>{itemText}</p></article>
          ))}
        </div>
        {note && <p className="service-guide__topic-note">{note}</p>}
      </div>
    </section>
  )
}

interface GuideReadMoreProps {
  id: string
  label: string
  /** One or more `GuideTopic` sections (or similar prose blocks) to fold away. */
  children: ReactNode
}

/**
 * Folds deep-dive, photo-less material behind one "Läs mer" toggle below the
 * template's existing 900px one-column breakpoint (benchmark B4: guides run
 * 8,000-12,000px on mobile). Above 900px the content stays open and the
 * toggle is hidden — desktop's two-column prose layout already reads fine at
 * full length, so only the width that turns it into a single column also
 * turns on the fold. Content is always in the DOM (`hidden`, not unmounted),
 * so anything reading raw HTML still sees it. Same disclosure pattern as
 * `components/ui/BiltjansterFaq.tsx`: a button with a circular +/- symbol,
 * `aria-expanded`/`aria-controls`, motion-safe via the template's
 * `prefers-reduced-motion` rule.
 */
export function GuideReadMore({ id, label, children }: GuideReadMoreProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = `${id}-content`

  return (
    <div className="service-guide__read-more">
      <div className="bb-wrap service-guide__container service-guide__read-more-toggle-row">
        <button
          type="button"
          className="service-guide__read-more-toggle"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(open => !open)}
        >
          <span>{isOpen ? 'Visa mindre' : label}</span>
          <span className="service-guide__read-more-symbol" aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
      </div>
      <div id={contentId} className="service-guide__read-more-content" hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}

interface GuideClosingProps {
  id: string
  heading: ReactNode
  text: ReactNode
  onBooking: () => void
  bookLabel?: string
}

export function GuideClosing({ id, heading, text, onBooking, bookLabel = 'Boka tid' }: GuideClosingProps) {
  return (
    <section className="service-guide__section service-guide__section--tight" aria-labelledby={id}>
      <div className="bb-wrap service-guide__container">
        <div className="service-guide__closing">
          <div>
            <h2 id={id}>{heading}</h2>
            <p>{text}</p>
          </div>
          <GuideActions onBooking={onBooking} bookLabel={bookLabel} />
        </div>
      </div>
    </section>
  )
}

interface GuideQuickFactsProps {
  /** Typical workshop time, taken from the page's own FAQ answer. */
  time: string
}

/** Short summary right under the hero (benchmark B3): time, price promise, makes. */
export function GuideQuickFacts({ time }: GuideQuickFactsProps) {
  return (
    <section className="service-guide__quick-facts" aria-label="I korthet">
      <div className="bb-wrap service-guide__container">
        <dl className="service-guide__quick-facts-list">
          <div>
            <dt className="bb-eyebrow">Ungefärlig arbetstid</dt>
            <dd>{time}</dd>
          </div>
          <div>
            <dt className="bb-eyebrow">Pris</dt>
            <dd>Tydligt pris innan vi börjar</dd>
          </div>
          <div>
            <dt className="bb-eyebrow">Bilmärken</dt>
            <dd>Alla märken och modeller</dd>
          </div>
        </dl>
        <p className="service-guide__quick-facts-note">Tiden är ett riktvärde och beror på bilmodell.</p>
      </div>
    </section>
  )
}

/** "Fler tjänster": links to related guides before the closing call (benchmark B5). */
export function GuideRelated({ route }: { route: string }) {
  const links = relatedServices(route)
  if (links.length === 0) return null
  return (
    <nav className="service-guide__section service-guide__section--tight service-guide__related" aria-label="Fler tjänster">
      <div className="bb-wrap service-guide__container">
        <h2 className="service-guide__related-title">Fler tjänster</h2>
        <ul className="service-guide__related-list">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}<span aria-hidden="true"> →</span></Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
