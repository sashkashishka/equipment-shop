import { Link } from '@/components/Link';

import styles from './Logo.module.css';

export function Logo() {
  return (
    <Link href="/">
      <img
        src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689652.jpg"
        width={24}
        height={24}
        alt="logo"
      />

      <span className={styles.logoTitle}>Packing Group</span>
    </Link>
  );
}
