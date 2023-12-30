import { getCommonConfig } from '@/utils/strapi/getCommonConfig';
import { searchTree, searchParent } from '@/utils/searchTree';
import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';

export async function getEquipmentSimilarProducts(id: number) {
  try {
    const { equipmentLinksTree } = await getCommonConfig();

    const [parent] = searchTree(equipmentLinksTree, searchParent(id));
    const { children } = await getEquipmentContent(parent.id);

    return children!.filter((item) => item.id !== id);
  } catch (e) {
    console.error(e);
  }
}
