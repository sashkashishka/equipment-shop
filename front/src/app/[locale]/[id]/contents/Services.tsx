import { Link } from '@/components/Link';
import { iServiceTypeContent } from '@/utils/strapi/getDynamicPageContent';

import styles from './Services.module.css';

interface iProps {
  content: iServiceTypeContent;
}

export async function ServicesContent({ content }: iProps) {
  const { link, icon, title, description } = content;

  return (
    <Link key={link} href={link}>
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
  );
}
