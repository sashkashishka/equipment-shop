import type { Metadata } from 'next';
import { getMainPageConfig } from '@/utils/strapi/getMainPageConfig';
import { Carousel } from './components/Carousel';

import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const { metatags } = await getMainPageConfig();

  return metatags;
}

export default async function MainPage() {
  const { carousel } = await getMainPageConfig();

  return (
    <div className={styles.container}>
      <Carousel carousel={carousel} />
    </div>
  );
}
