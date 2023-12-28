import { t } from 'ttag';
import { Link } from '@/components/Link';
import { FloatingTitle } from '@/components/FloatingTitle';
import { getEquipmentConfig } from '@/utils/strapi/getEquipmentConfig';

import styles from './ServiceBlock.module.css';

export async function ServiceBlock() {
  const { serviceTypes } = await getEquipmentConfig();

  return (
    <div className={styles.wrapper}>
      <FloatingTitle>{t`Services`}</FloatingTitle>

      <div className={styles.container}>
        {serviceTypes.map(({ photo, link, title }) => (
          <div key={link} className={styles.card}>
            <Link href={link} className={styles.link}>
              <img src={photo[0].url} alt={title} className={styles.cardIcon} />

              <p className={styles.cardTitle}>{title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
