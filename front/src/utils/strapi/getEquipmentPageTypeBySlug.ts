import { getCommonConfig } from '@/utils/strapi/getCommonConfig';
import { findLinksInTree } from '@/utils/findLinksInTree';

export async function getEquipmentPageTypeBySlug(slug: string) {
  const { equipmentLinksTree } = await getCommonConfig();

  return findLinksInTree(equipmentLinksTree, [slug]);
}
