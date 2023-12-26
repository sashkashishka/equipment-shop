import React from 'react';

import styles from './layout.module.css';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function ServicesLayout({ children }: iProps) {
  return <div className={styles.layout}>{children}</div>;
}
