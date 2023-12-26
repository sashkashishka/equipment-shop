import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { HTMLParser } from '@/components/HTMLParser';

import { PhotoCarousel } from './PhotoCarousel';
import { Form } from './Form';

import styles from './Product.module.css';

interface iProps {
  id: number;
}
export async function Product({ id }: iProps) {
  const { title, bottomText, photos } = await getEquipmentContent(id);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.topBlock}>
          <PhotoCarousel photos={photos} title={title} />
          <Form productName={title} />
        </div>

        {bottomText && <HTMLParser>{bottomText}</HTMLParser>}
      </div>

      <div className={styles.container}>service</div>

      <div className={styles.container}>similar goods</div>
    </>
  );
}
