import { ReactNode } from 'react';

import styles from './FloatingTitle.module.css';

interface iProps {
  children: ReactNode;
}

export function FloatingTitle({ children }: iProps) {
  return <div className={styles.container}>{children}</div>;
}
