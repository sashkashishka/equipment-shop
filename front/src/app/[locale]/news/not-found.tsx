import { t } from 'ttag';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants/routes';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{t`No such post found`}</p>

      <br />
      <br />

      <Link href={ROUTES.NEWS}>
        <Button type="button">{t`Go to news page`}</Button>
      </Link>
    </div>
  );
}
