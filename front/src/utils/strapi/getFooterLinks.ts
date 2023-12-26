import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getEquipmentFooterLinks } from '@/utils/getLinksTree';

export async function getFooterLinks() {
  const data = await getStrapi(API.EQUIPMENT_CATEGORIES);

  return getEquipmentFooterLinks(data);
}
