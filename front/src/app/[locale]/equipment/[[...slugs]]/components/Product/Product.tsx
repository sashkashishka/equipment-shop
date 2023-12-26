import cn from 'classnames';

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
      <div className={cn('pageContent', styles.container)}>
        <h2 className={cn('h2Title', styles.title)}>{title}</h2>

        <div className={styles.topBlock}>
          <PhotoCarousel photos={photos} title={title} />
          <Form productName={title} />
        </div>

        {bottomText && <HTMLParser>{bottomText}</HTMLParser>}
      </div>

      <div className={cn('pageContent', styles.container)}>service</div>

      <div className={cn('pageContent', styles.container)}>similar goods</div>
    </>
  );
}
