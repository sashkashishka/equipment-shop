import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  getEquipmentMenuLinks,
  getEquipmentSidebarLinks,
} from '@/utils/getLinksTree';

export async function getMenuAndSidebarLinks() {
  const data = await getStrapi(API.EQUIPMENT_CATEGORIES);

  const menuLinks = getEquipmentMenuLinks(data);

  return {
    menuLinks,
    sidebarLinks: getEquipmentSidebarLinks(menuLinks),
  };
}
