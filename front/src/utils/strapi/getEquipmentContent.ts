import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getMenuLinks } from '@/utils/strapi/getMenuLinks';
import { getImageUrl } from '@/utils/strapi/getImageUrl';
import { iEquipmentMenuLink } from '@/utils/getLinksTree';
import { findLinksInTree } from '@/utils/findLinksInTree';
import { iEquipment, iStrapiResponse } from '@/types/strapi';

export interface iEquipmentContent {
  slug: iEquipment['slug'];
  title: iEquipment['title'];
  subtitle: iEquipment['subtitle'];
  photos: { url: string }[];
  topText: iEquipment['topText'];
  bottomText: iEquipment['bottomText'];
  type: iEquipment['type'];
  link: string;
  children?: iEquipmentContent[];
}

function transform(
  data: iStrapiResponse<iEquipment>,
  menuLinks: iEquipmentMenuLink[],
): iEquipmentContent {
  const { attributes } = data;

  const [link] = findLinksInTree(menuLinks, [attributes.slug]);

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    photos: (attributes?.photos?.data || []).map((photo) => ({
      url: getImageUrl(photo.attributes.url),
    })),
    topText: attributes.topText,
    bottomText: attributes.bottomText,
    type: attributes.type,
    link: link.url,
    children: (attributes?.children?.data || []).map((item) =>
      transform(item, menuLinks),
    ),
  };
}

export async function getEquipmentContent(id: number) {
  const data = await getStrapi(API.EQUIPMENT_CATEGORY, {
    params: { id: String(id) },
  });
  const menuLinks = await getMenuLinks();

  return transform(data, menuLinks);
}
