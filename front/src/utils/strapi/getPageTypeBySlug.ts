import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getPageTree, iPageTree } from '@/utils/getLinksTree';
import { findLinksInTree } from '@/utils/findLinksInTree';

export async function getPageTypeBySlug(slug: string) {
  const data = await getStrapi(API.EQUIPMENT_CATEGORIES);

  const pageTree = getPageTree(data);

  return findLinksInTree(pageTree, [slug]) as iPageTree[];
}
