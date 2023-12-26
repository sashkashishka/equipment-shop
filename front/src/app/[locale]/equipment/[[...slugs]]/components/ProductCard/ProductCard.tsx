import { iEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { Link } from '@/components/Link';

import styles from './ProductCard.module.css';

interface iProps {
  category: iEquipmentContent;
}

export function ProductCard({ category }: iProps) {
  const { title, subtitle, photos, link } = category;

  const [photo] = photos;

  return (
    <div className={styles.card}>
      <Link href={link} className={styles.cardContent}>
        <img className={styles.photo} src={photo.url} alt={title} />

        <div>
          <p className={styles.title}>{title}</p>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </Link>
    </div>
  );
}
