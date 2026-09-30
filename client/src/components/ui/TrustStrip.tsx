import type { ReactElement, SVGProps } from 'react'

type TrustIcon = (props: SVGProps<SVGSVGElement>) => ReactElement | null

export interface TrustStripItem {
  icon: TrustIcon
  title: string
  text: string
}

interface TrustStripProps {
  items: readonly TrustStripItem[]
  /** Accessible name of the list. */
  label?: string
}

/** The shared trust row: one flush row directly under a hero (styles in `shared-elements.css`, `.bb-trust-strip`). */
export function TrustStrip({ items, label = 'Därför välja Brynäs Bilservice' }: TrustStripProps) {
  return (
    <div className="bb-trust-strip">
      <div className="bb-wrap">
        <ul className="bb-trust-row" aria-label={label}>
          {items.map(({ icon: Icon, title, text }) => (
            <li className="bb-trust-row__item" key={title}>
              <span className="bb-icon-bare"><Icon aria-hidden="true" /></span>
              <span className="bb-trust-row__text">
                <b>{title}</b>
                <small>{text}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
