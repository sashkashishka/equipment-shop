import { t } from 'ttag';
import { Link } from '@/components/Link';
import { Logo } from '@/components/Logo';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.section}>
        <Logo />

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
