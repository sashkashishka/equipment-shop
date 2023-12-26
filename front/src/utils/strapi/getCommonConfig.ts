import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';

export function getCommonConfig() {
  return getStrapi(API.COMMON_CONFIG);
}
