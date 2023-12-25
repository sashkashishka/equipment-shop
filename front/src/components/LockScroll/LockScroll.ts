'use client';

import { useEffect } from 'react';

import styles from './LockScroll.module.css';

export function LockScroll() {
  useEffect(() => {
    document.body.classList.add(styles.lock);

    return () => {
      document.body.classList.remove(styles.lock);
    };
  }, []);

  return null;
}
