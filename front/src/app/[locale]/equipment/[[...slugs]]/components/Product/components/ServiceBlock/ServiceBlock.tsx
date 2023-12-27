import cn from 'classnames';

import { Link } from '@/components/Link';
import { getEquipmentConfig } from '@/utils/strapi/getEquipmentConfig';

import styles from './ServiceBlock.module.css';

export async function ServiceBlock() {
  const { serviceTypes } = await getEquipmentConfig();

  return (
    <div className={cn('pageContent', styles.container)}>
      {serviceTypes.map(({ icon, link, title }) => (
        <div key={link} className={styles.card}>
          <Link href={link} className={styles.link}>
            <img
              src={icon[0].url}
              alt={title}
              width={75}
              height={75}
              className={styles.cardIcon}
            />

            <p className={styles.cardTitle}>{title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
