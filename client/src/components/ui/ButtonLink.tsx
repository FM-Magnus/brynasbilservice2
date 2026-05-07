import type { AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ButtonLinkProps) {
  const classes = `btn btn--${variant}${className ? ` ${className}` : ''}`

  return <a className={classes} {...props} />
}
