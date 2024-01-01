import { Link } from '@/components/Link';
import { iServicesComponentContent } from '@/utils/strapi/getDynamicPageContent';

import styles from './Services.module.css';

interface iProps {
  content: iServicesComponentContent;
}

export function Services({ content }: iProps) {
  const { title, service } = content;

  return (
    <div className={styles.container}>
      <p className="h2Title">{title}</p>

      <div className={styles.cardsGrid}>
        {service.map(({ link, photo, title }) => (
          <Link key={link} href={link}>
            <div className={styles.card}>
              <img src={photo[0].url} alt={title} className={styles.cardIcon} />

              <p className={styles.cardTitle}>{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
