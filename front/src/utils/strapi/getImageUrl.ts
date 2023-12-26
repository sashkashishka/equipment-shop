// TODO move default values to env file
const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';

export function getImageUrl(url: string) {
  return `${STRAPI_HOST}${url}`;
}
