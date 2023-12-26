import { t } from 'ttag';

import { Link } from '@/components/Link';
import { Logo } from '@/components/Logo';
import { OrderCallback } from '@/components/OrderCallback';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';
import { getFooterLinks } from '@/utils/strapi/getFooterLinks';
import { ROUTES } from '@/constants/routes';

import styles from './Footer.module.css';

export async function Footer() {
  const commonConfig = await getCommonConfig();
  const equipmentFooterLinks = await getFooterLinks();

  return (
    <footer className={styles.container}>
      <div className={styles.section}>
        <div className={styles.column}>
          <Logo />

          <p className={styles.copyright}>
            {commonConfig.attributes.copyright} {new Date().getUTCFullYear()}
          </p>
        </div>

        <div className={styles.column}>
          {equipmentFooterLinks.map((link) => (
            <Link key={link.url} href={link.url}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.column}>
          <Link href={ROUTES.ABOUT_US}>{t`About company`}</Link>
          <Link href={ROUTES.CONTACTS}>{t`Contacts`}</Link>
          <Link href={ROUTES.SERVICES}>{t`Services`}</Link>
          <Link href={ROUTES.NEWS}>{t`News`}</Link>
          <Link
            href={ROUTES.BUSINESS_CONDITIONS}
          >{t`Business conditions`}</Link>
        </div>

        <div className={styles.column}>
          <Link
            className={styles.phoneLink}
            href={`tel:${commonConfig.attributes.phone}`}
          >
            {commonConfig.attributes.phone}
          </Link>

          <OrderCallback />
        </div>
      </div>
    </footer>
  );
}
