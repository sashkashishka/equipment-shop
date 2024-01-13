'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import type { iEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { Link } from '@/components/Link';

import styles from './Carousel.module.css';

interface iCardProps {
  product: iEquipmentContent;
}

function Card({ product }: iCardProps) {
  const { link, photos, title } = product;

  const [photo] = photos;

  return (
    <div className={styles.card}>
      <Link href={link} className={styles.cardContent}>
        <img className={styles.photo} src={photo?.url} alt={title} />

        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  );
}

interface iProductCarouselProps {
  products: iEquipmentContent[];
}

export function ProductCarousel({ products }: iProductCarouselProps) {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={16}
      className={styles.container}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Card product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
