import { t } from 'ttag';
import { getEquipmentSimilarProducts } from '@/utils/strapi/getEquipmentSimilarProducts';
import { FloatingTitle } from '@/components/FloatingTitle';
import { ProductCarousel } from './Carousel';

import styles from './SimilarProducts.module.css';

interface iProps {
  id: number;
  locale: string;
}

export async function SimilarProducts({ id, locale }: iProps) {
  const products = await getEquipmentSimilarProducts(id, locale);

  if (!products) return null;

  return (
    <div className={styles.container}>
      <FloatingTitle>{t`Similar products`}</FloatingTitle>
      <div className={styles.carousel}>
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}
