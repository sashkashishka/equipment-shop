import cn from 'classnames';

import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { HTMLParser } from '@/components/HTMLParser';

import { PhotoCarousel } from './components/PhotoCarousel';
import { Form } from './components/Form';
import { ServiceBlock } from './components/ServiceBlock';
import { SimilarProducts } from './components/SimilarProducts';

import styles from './Product.module.css';

interface iProps {
  id: number;
}
export async function Product({ id }: iProps) {
  const { title, bottomText, photos } = await getEquipmentContent(id);

  return (
    <div className={styles.container}>
      <h2 className={cn('h2Title', styles.title)}>{title}</h2>

      <div className={styles.topBlock}>
        <PhotoCarousel photos={photos} title={title} />
        <Form productName={title} />
      </div>

      {bottomText && <HTMLParser>{bottomText}</HTMLParser>}

      <div className={styles.blocks}>
      <ServiceBlock />

      <SimilarProducts id={id} />

      </div>
    </div>
  );
}
