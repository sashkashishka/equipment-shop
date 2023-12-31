import { getCommonConfig } from '@/utils/strapi/getCommonConfig';
import { searchTree, includesSlug } from '@/utils/searchTree';

export async function getEquipmentPageTypeBySlug(slugs: string[]) {
  const [slug] = slugs.slice(-1);
  const { equipmentLinksTree } = await getCommonConfig();

  return searchTree(equipmentLinksTree, includesSlug([slug]));
}
