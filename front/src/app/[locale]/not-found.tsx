import { t } from 'ttag';
import { Link } from '@/components/Link';
import { ROUTES } from '@/constants/routes';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{t`Page not found`}</p>

      <br />
      <br />

      <Link href={ROUTES.MAIN}>{t`Go to main page`}</Link>
    </div>
  );
}
