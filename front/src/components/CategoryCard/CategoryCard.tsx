import { iEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { Link } from '@/components/Link';

import styles from './CategoryCard.module.css';

interface iProps {
  category: Pick<iEquipmentContent, 'title' | 'link' | 'photos' | 'subtitle'>;
}

export function CategoryCard({ category }: iProps) {
  const { title, subtitle, photos, link } = category;

  const [photo] = photos;

  return (
    <div className={styles.card}>
      <Link href={link} className={styles.cardContent}>
        <img className={styles.photo} src={photo?.url} alt={title} />

        <p className={styles.title}>{title}</p>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Link>
    </div>
  );
}
