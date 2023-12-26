import cn from 'classnames';

import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { HTMLParser } from '@/components/HTMLParser';
import { CategoryCard } from '../CategoryCard';

import styles from './Category.module.css';

interface iProps {
  id: number;
}

export async function Category({ id }: iProps) {
  const { title, topText, bottomText, children } =
    await getEquipmentContent(id);

  return (
    <div className="pageContent">
      <h2 className={cn('h2Title', styles.title)}>{title}</h2>
      {topText && <HTMLParser>{topText}</HTMLParser>}

      <div className={styles.cardGrid}>
        {children?.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
      {bottomText && <HTMLParser>{bottomText}</HTMLParser>}
    </div>
  );
}
