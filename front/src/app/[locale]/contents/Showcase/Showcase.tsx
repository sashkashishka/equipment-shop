import { CategoryCard } from '@/components/CategoryCard';
import { iMainEquipmentComponentContent } from '@/utils/strapi/getMainPageConfig';

import styles from './Showcase.module.css';

interface iProps {
  content: iMainEquipmentComponentContent;
}

export function Showcase({ content }: iProps) {
  const { title, equipment } = content;

  return (
    <div className={styles.container}>
      <p className="h2Title">{title}</p>

      <div className={styles.cardsGrid}>
        {equipment.map((item) => (
          <CategoryCard key={item.link} category={{ ...item, subtitle: '' }} />
        ))}
      </div>
    </div>
  );
}
