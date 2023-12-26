import type { iMediaImage, iStrapiResponse } from '@/types/strapi';

// TODO move default values to env file
const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';

// TODO make photo transform utility
function getImageUrl(url: string) {
  return `${STRAPI_HOST}${url}`;
}

export interface iImage {
  url: string;
}

export function transformImages(data: iStrapiResponse<iMediaImage>[]) {
  return (data || []).map((photo) => ({
    url: getImageUrl(photo.attributes.url),
  }));
}
