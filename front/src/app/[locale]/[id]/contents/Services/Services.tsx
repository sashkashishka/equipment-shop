import { Link } from '@/components/Link';
import { iServicesTypeContent } from '@/utils/strapi/getDynamicPageContent';

import styles from './Services.module.css';

interface iProps {
  content: iServicesTypeContent;
}

export async function ServicesContent({ content }: iProps) {
  const { service } = content;

  return (
    <div className={styles.container}>
      {service.map(({ link, photo, title, description }) => (
        <Link key={link} href={link}>
          <div className={styles.card}>
            <img src={photo[0].url} alt={title} className={styles.cardIcon} />

            <div>
              <p className={styles.cardTitle}>{title}</p>
              <p className={styles.cardDescription}>{description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
