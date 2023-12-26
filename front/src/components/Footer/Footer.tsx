import { Link } from '@/components/Link';
import { Logo } from '@/components/Logo';
import { OrderCallback } from '@/components/OrderCallback';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';

import styles from './Footer.module.css';

export async function Footer() {
  const { copyright, phone, equipmentLinksFlatten, links } =
    await getCommonConfig();

  return (
    <footer className={styles.container}>
      <div className={styles.section}>
        <div className={styles.column}>
          <Logo />

          <p className={styles.copyright}>
            {copyright} {new Date().getUTCFullYear()}
          </p>
        </div>

        <div className={styles.column}>
          {equipmentLinksFlatten.map((link) => (
            <Link key={link.url} href={link.url}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.column}>
          {links.map(({ link, name }) => (
            <Link key={link} href={link}>
              {name}
            </Link>
          ))}
        </div>

        <div className={styles.column}>
          <Link className={styles.phoneLink} href={`tel:${phone}`}>
            {phone}
          </Link>

          <OrderCallback />
        </div>
      </div>
    </footer>
  );
}
