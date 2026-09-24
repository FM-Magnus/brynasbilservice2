import type { ReactNode } from 'react'
import { LightbulbIcon } from '../icons/LightbulbIcon'

interface TipProps {
  title: ReactNode
  text: ReactNode
  /** Optional button or link on the right (below the text on phones). */
  action?: ReactNode
}

/** The shared `.bb-tip` callout (styles in `shared-elements.css`). */
export function Tip({ title, text, action }: TipProps) {
  return (
    <div className="bb-tip">
      <span className="bb-icon-badge"><LightbulbIcon aria-hidden="true" /></span>
      <div className="bb-tip__body">
        <span className="bb-eyebrow">Tips</span>
        <strong className="bb-tip__title">{title}</strong>
        <span className="bb-tip__text">{text}</span>
      </div>
      {action}
    </div>
  )
}
