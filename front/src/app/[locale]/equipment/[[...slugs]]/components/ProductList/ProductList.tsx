import cn from 'classnames';

import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { HTMLParser } from '@/components/HTMLParser';
import { ProductCard } from '../ProductCard';

import styles from './ProductList.module.css';

interface iProps {
  id: number;
}

export async function ProductList({ id }: iProps) {
  const { title, topText, bottomText, children } =
    await getEquipmentContent(id);

  return (
    <>
      <h2 className={cn('h2Title', styles.title)}>{title}</h2>
      {topText && <HTMLParser className={styles.section}>{topText}</HTMLParser>}

      <div className={cn(styles.cardGrid, styles.section)}>
        {children?.map((category) => (
          <ProductCard key={category.slug} category={category} />
        ))}
      </div>
      {bottomText && (
        <HTMLParser className={styles.section}>{bottomText}</HTMLParser>
      )}
    </>
  );
}
