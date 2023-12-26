import { Link } from '@/components/Link';
import { OrderCallback } from '@/components/OrderCallback';
import { SiteSearch } from '@/components/SiteSearch';
import { Logo } from '@/components/Logo';
import { Sidebar } from '@/components/Navbar/components/Sidebar';
import { LanguageSwitcher } from '@/components/Navbar/components/LanguageSwitcher';
import { Links } from '@/components/Navbar/components/Links';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';

import styles from './Navbar.module.css';

export async function Navbar() {
  const { phone, languages, equipmentLinksTree, links } =
    await getCommonConfig();

  return (
    <header className={styles.container}>
      <div className={styles.mobile}>
        <div className={styles.topSection}>
          <Logo />

          <Link className={styles.phoneLink} href={`tel:${phone}`}>
            {phone}
          </Link>

          <Sidebar>
            <LanguageSwitcher languages={languages} />

            <Links links={links} equipmentLinksTree={equipmentLinksTree} />
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

          <Link className={styles.phoneLink} href={`tel:${phone}`}>
            {phone}
          </Link>

          <SiteSearch />

          <OrderCallback />

          <LanguageSwitcher languages={languages} />
        </div>

        <div className={styles.bottomSection}>
          <Links links={links} equipmentLinksTree={equipmentLinksTree} />
        </div>
      </div>
    </header>
  );
}
