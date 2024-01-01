import type { Metadata } from 'next';
import { getMainPageConfig } from '@/utils/strapi/getMainPageConfig';

import { Carousel } from './contents/Carousel';
import { CallbackForm } from './contents/CallbackForm';
import { Showcase } from './contents/Showcase';
import { Videos } from './contents/Videos';
import { ContentHtml } from './contents/ContentHtml';
import { Services } from './contents/Services';
import { Exhibitions } from './contents/Exhibitions';

import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const { metatags } = await getMainPageConfig();

  return metatags;
}

export default async function MainPage() {
  const { content } = await getMainPageConfig();

  return (
    <div className={styles.container}>
      {content.map((item, i) => {
        switch (item.__component) {
          case 'carousel.carousel': {
            return <Carousel key={i} content={item} />;
          }

          case 'callback-form.callback-form': {
            return <CallbackForm key={i} content={item} />;
          }

          case 'main.equipment-block': {
            return <Showcase key={i} content={item} />;
          }

          case 'youtube-video.videos': {
            return <Videos key={i} content={item} />;
          }

          case 'content.html': {
            return <ContentHtml key={i} content={item} />;
          }

          case 'services.services': {
            return <Services key={i} content={item} />;
          }

          case 'main.exhibitions': {
            return <Exhibitions key={i} content={item} />;
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
