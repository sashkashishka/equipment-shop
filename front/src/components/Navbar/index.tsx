import { t } from 'ttag';
import { Link } from '@/components/Link';
import { Sidebar } from '@/components/Navbar/Sidebar';

import styles from './Navbar.module.css';

function Links() {
  return (
    <>
      <Link className="navbar-link" href="/about-us">
        {t`About us`}
      </Link>
      <Link className="navbar-link" href="/contacts">
        {t`Contacts`}
      </Link>
      <Link className="navbar-link" href="/service">
        {t`Service`}
      </Link>
    </>
  );
}

export function NavigationBar() {
  return (
    <header className={styles.container}>
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

        <Sidebar>
          <Links />
        </Sidebar>

        <div className={styles.linksContainer}>
          <Links />
        </div>
      </div>
    </header>
  );
}
