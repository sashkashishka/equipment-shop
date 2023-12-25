import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './Select.module.css';

interface iOption {
  id: number;
  value: string | number;
  label: string | number | ReactNode;
}

interface iProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items: iOption[];
}

export function Select({ className, items, ...props }: iProps) {
  return (
    <div className={cn(styles.container, className)}>
      <select className={styles.select} {...props}>
        {items.map((v) => (
          <option key={v.id} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>

      <div className={styles.chevron}>
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          tabIndex={-1}
        >
          <path
            d="M6 10l6 6 6-6"
            stroke="#8cabca"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  );
}
