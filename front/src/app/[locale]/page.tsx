import { getMainPageConfig } from '@/utils/strapi/getMainPageConfig';
import { Carousel } from './components/Carousel';

import styles from './page.module.css';

export default async function MainPage() {
  const { carousel } = await getMainPageConfig();

  return (
    <div className={styles.container}>
      <Carousel carousel={carousel} />
    </div>
  );
}
