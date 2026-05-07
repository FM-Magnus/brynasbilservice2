declare module '../ui/Button' {
  import React from 'react';

  type ButtonProps = {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    className?: string;
    target?: string;
    rel?: string;
  };

  export function Button({ href, children, variant, className, target, rel }: ButtonProps): JSX.Element;
}