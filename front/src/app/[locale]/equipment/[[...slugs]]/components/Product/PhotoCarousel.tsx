'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { iEquipmentContent } from '@/utils/strapi/getEquipmentContent';

import styles from './PhotoCarousel.module.css';

interface iProps extends Pick<iEquipmentContent, 'photos' | 'title'> {}

export function PhotoCarousel({ photos, title }: iProps) {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={styles.container}
    >
      {photos.map((photo) => (
        <SwiperSlide key={photo.url}>
          <img
            key={photo.url}
            className={styles.slide}
            src={photo.url}
            alt={`${title}-1`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
