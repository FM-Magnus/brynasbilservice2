interface IconProps { className?: string }

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 9 5.7a2 2 0 0 0 2 0L22 7"/>
    </svg>
  )
}
