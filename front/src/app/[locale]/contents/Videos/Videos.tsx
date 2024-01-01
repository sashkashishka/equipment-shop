import { t } from 'ttag';
import { YoutubeThumb } from '@/components/YoutubeVideo';
import { Button } from '@/components/Button';
import { HTMLParser } from '@/components/HTMLParser';
import { iYoutubeVideosComponent } from '@/types/strapi';

import styles from './Videos.module.css';

interface iProps {
  content: iYoutubeVideosComponent;
}

export function Videos({ content }: iProps) {
  const { title, bottomText, videos } = content;

  return (
    <div className={styles.container}>
      <p className="h2Title">{title}</p>

      <div className={styles.cardsGrid}>
        {videos.map(({ url, name }) => (
          <div key={url} className={styles.card}>
            <YoutubeThumb
              className={styles.thumb}
              width="100%"
              height="100%"
              link={url}
              name={name}
              showYoutubeBtn={false}
            />

            <p className={styles.cardTitle}>{name}</p>

            <Button
              type="button"
              className={styles.cardButton}
            >{t`Watch`}</Button>
          </div>
        ))}
      </div>

      <HTMLParser>{bottomText}</HTMLParser>
    </div>
  );
}
