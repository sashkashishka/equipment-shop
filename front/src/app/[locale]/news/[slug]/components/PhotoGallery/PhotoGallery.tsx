'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Thumbs } from 'swiper/modules';
import { iImage } from '@/utils/strapi/transformImages';

import styles from './PhotoGallery.module.css';

interface iProps {
  photos: iImage[];
}

export function PhotoGallery({ photos }: iProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={styles.container}>
      <Swiper
        cssMode={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Mousewheel, Keyboard, Thumbs]}
        slidesPerView={1}
        spaceBetween={16}
        className={styles.gallery}
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.url}>
            <img className={styles.galleryImg} src={photo.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        navigation={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Mousewheel, Keyboard, Thumbs]}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          425: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: Math.min(5, photos.length),
          },
        }}
        spaceBetween={16}
        className={styles.thumbs}
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.url}>
            <img className={styles.thumbImg} src={photo.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
