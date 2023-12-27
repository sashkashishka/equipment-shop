'use client';

import { t } from 'ttag';

import { Button } from '@/components/Button';

import styles from './service-pages.module.css';

export default function GlobalError() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{t`Something went wrong`}</p>

      <br />
      <br />

      <Button
        type="button"
        className={styles.reloadButton}
        onClick={() => window.location.reload()}
      >{t`Please reload page`}</Button>
    </div>
  );
}
