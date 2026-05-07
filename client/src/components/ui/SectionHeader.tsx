import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  titleId?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`section-header${className ? ` ${className}` : ''}`}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title" id={titleId}>{title}</h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </div>
  )
}
