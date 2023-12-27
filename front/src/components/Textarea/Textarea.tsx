import React from 'react';
import cn from 'classnames';

import styles from './Textarea.module.css';

interface iProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: iProps) {
  return <textarea className={cn(styles.textarea, className)} {...props} />;
}
