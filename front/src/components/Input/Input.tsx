import React from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

interface iProps extends React.HTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: iProps) {
  return <input className={cn(styles.input, className)} {...props} />;
}
