import type { ReactNode } from 'react'
import { publicActionHref, publicActionLabel, requestBooking, usePublicAction } from '../../api/publicActions'
import type { PublicActionIntent } from '../../api/publicActions'

type Props = {
  intent: PublicActionIntent
  className?: string
  children: ReactNode
  comment?: string
  onBook?: () => void
}

/** Renders the right native control for the server-selected action kind. */
export function PublicAction({ intent, className, children, comment, onBook }: Props) {
  const kind = usePublicAction(intent)
  const content = kind === intent ? children : publicActionLabel[kind]
  if (kind === 'book') {
    return (
      <button type="button" className={className} onClick={onBook || (() => requestBooking(comment))}>
        {content}
      </button>
    )
  }
  const href = publicActionHref(kind, comment)
  const external = kind === 'directions'
  return (
    <a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {content}
    </a>
  )
}
