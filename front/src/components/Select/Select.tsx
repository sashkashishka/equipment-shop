import React, { ReactNode } from 'react';
import cn from 'classnames';

import ArrowDownIcon from '@/images/icons/arrow-down.svg';

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
        <ArrowDownIcon />
      </div>
    </div>
  );
}
