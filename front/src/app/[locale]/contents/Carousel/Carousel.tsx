'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import { YoutubeVideo } from '@/components/YoutubeVideo';
import { iCarouselComponentContent } from '@/utils/strapi/getMainPageConfig';

import styles from './Carousel.module.css';

interface iProps {
  content: iCarouselComponentContent;
}

export function Carousel({ content }: iProps) {
  const { photos, videos } = content;

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      modules={[Navigation, Mousewheel, Keyboard]}
      slidesPerView={1}
      spaceBetween={16}
      className={styles.container}
    >
      {Boolean(photos?.length) &&
        photos.map((photo) => (
          <SwiperSlide key={photo.url}>
            <img className={styles.photo} src={photo.url} />
          </SwiperSlide>
        ))}
      {Boolean(videos?.length) &&
        videos.map((video) => (
          <SwiperSlide key={video.url}>
            <YoutubeVideo
              link={video.url}
              name={video.name}
              width="100%"
              height="100%"
              className={styles.videoThumb}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
