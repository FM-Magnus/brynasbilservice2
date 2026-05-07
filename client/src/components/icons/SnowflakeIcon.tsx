interface IconProps { className?: string }

export function SnowflakeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93M8 2l4 4 4-4M8 22l4-4 4 4M2 8l4 4-4 4M22 8l-4 4 4 4"/>
    </svg>
  )
}
