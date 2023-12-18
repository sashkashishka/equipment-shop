import { t } from 'ttag';
import { Link } from '@/components/Link';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.section}>
        <Link href="/" className={styles.logoContainer}>
          <img
            src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689652.jpg"
            width={24}
            height={24}
            alt="logo"
          />

          <span className={styles.logoTitle}>Packing Group</span>
        </Link>

        <div className={styles.linksContainer}>
          <Link className={styles.link} href="/about-us">
            {t`About us`}
          </Link>
          <Link className={styles.link} href="/contacts">
            {t`Contacts`}
          </Link>
          <Link className={styles.link} href="/service">
            {t`Service`}
          </Link>
        </div>
      </div>
    </footer>
  );
}
