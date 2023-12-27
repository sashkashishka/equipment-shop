import { getCommonConfig } from '@/utils/strapi/getCommonConfig';
import { searchTree, includesSlug } from '@/utils/searchTree';

export async function getEquipmentPageTypeBySlug(slug: string) {
  const { equipmentLinksTree } = await getCommonConfig();

  return searchTree(equipmentLinksTree, includesSlug([slug]));
}
