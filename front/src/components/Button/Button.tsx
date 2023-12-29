import React from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface iProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'tertiary';
}

export function Button({ className, variant, ...props }: iProps) {
  return (
    <button
      className={cn(
        styles.button,
        variant === 'tertiary' && styles.buttonTertiary,
        className,
      )}
      {...props}
    />
  );
}
