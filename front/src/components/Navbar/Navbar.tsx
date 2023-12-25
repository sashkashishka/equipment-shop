import { Link } from '@/components/Link';
import { OrderCallback } from '@/components/OrderCallback';
import { SiteSearch } from '@/components/SiteSearch';
import { Logo } from '@/components/Logo';
import { Sidebar } from '@/components/Navbar/components/Sidebar';
import { LanguageSwitcher } from '@/components/Navbar/components/LanguageSwitcher';
import { Links } from '@/components/Navbar/components/Links';
import { getStrapi } from '@/utils/getStrapi';
import { API } from '@/constants/api';

import styles from './Navbar.module.css';

export async function Navbar() {
  const data = await getStrapi(API.COMMON_CONFIG);

  return (
    <header className={styles.container}>
      <div className={styles.mobile}>
        <div className={styles.topSection}>
          <Logo />

          <Link
            className={styles.phoneLink}
            href={`tel:${data.attributes.phone}`}
          >
            {data.attributes.phone}
          </Link>

          <Sidebar>
            <LanguageSwitcher languages={data.attributes.languages} />

            <Links />
          </Sidebar>
        </div>

        <div className={styles.bottomSection}>
          <SiteSearch />
          <OrderCallback />
        </div>
      </div>

      <div className={styles.desktop}>
        <div className={styles.topSection}>
          <Logo />

          <Link
            className={styles.phoneLink}
            href={`tel:${data.attributes.phone}`}
          >
            {data.attributes.phone}
          </Link>

          <SiteSearch />

          <OrderCallback />

          <LanguageSwitcher languages={data.attributes.languages} />
        </div>

        <div className={styles.bottomSection}>
          <Links />
        </div>
      </div>
    </header>
  );
}
