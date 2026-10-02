import type { ReactNode } from 'react'
import { usePublicAction } from '../../api/publicActions'
import { PublicAction } from './PublicAction'

type Props = {
  className: string
  isSubmitting: boolean
  children: ReactNode
}

/** The contact-submit policy boundary shared by both public forms. */
export function ContactSubmitAction({ className, isSubmitting, children }: Props) {
  const kind = usePublicAction('contact')
  if (kind === 'contact') {
    return <button className={className} type="submit" disabled={isSubmitting}>{children}</button>
  }
  return <PublicAction intent="contact" className={className}>{children}</PublicAction>
}
