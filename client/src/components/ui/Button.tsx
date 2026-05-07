import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  onClick?: () => void; // Added onClick prop
};

export function Button({ href, children, variant = 'primary', className, onClick }: ButtonProps) {
  const buttonClass = classNames('btn', {
    'btn--primary': variant === 'primary',
    'btn--outline': variant === 'outline',
  }, className);

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}