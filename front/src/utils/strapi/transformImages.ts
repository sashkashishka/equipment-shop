import type { iMediaImage, iStrapiResponse } from '@/types/strapi';
import { STRAPI_PREFIX } from '@/constants/api';

function getImageUrl(url: string) {
  return `${STRAPI_PREFIX}${url}`;
}

export interface iImage {
  url: string;
}

export function transformImages(data: iStrapiResponse<iMediaImage>[]) {
  return (data || []).map((photo) => ({
    url: getImageUrl(photo.attributes.url),
  }));
}
