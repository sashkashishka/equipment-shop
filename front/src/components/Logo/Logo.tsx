import { Link } from '@/components/Link';
import { ROUTES } from '@/constants/routes';
import LogoIcon from '@/images/icons/logo.svg';

import styles from './Logo.module.css';

export function Logo() {
  return (
    <Link href={ROUTES.MAIN}>
      <LogoIcon width={24} height={24} />

      <span className={styles.logoTitle}>Packing Group</span>
    </Link>
  );
}
