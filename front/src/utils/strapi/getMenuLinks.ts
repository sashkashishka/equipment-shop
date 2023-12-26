import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getEquipmentMenuLinks } from '@/utils/getLinksTree';

export async function getMenuLinks() {
  const data = await getStrapi(API.EQUIPMENT_CATEGORIES);

  return getEquipmentMenuLinks(data);
}
