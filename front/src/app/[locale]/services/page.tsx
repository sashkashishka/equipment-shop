import { Link } from '@/components/Link';
import { getServicesPage } from '@/utils/strapi/getServicesPage';

import styles from './page.module.css';

export default async function Services() {
  const data = await getServicesPage();

  return (
    <div className="pageContent">
      <h2 className={styles.title}>{data.title}</h2>

      <div>
        {data.serviceTypes.map(({ slug, link, title, icon, description }) => (
          <Link key={slug} href={link}>
            <div className={styles.card}>
              <img
                src={icon[0].url}
                alt={title}
                width={75}
                height={75}
                className={styles.cardIcon}
              />

              <div>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardDescription}>{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
