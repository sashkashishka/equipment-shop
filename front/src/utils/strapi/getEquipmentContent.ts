import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { transformImages, iImage } from '@/utils/strapi/transformImages';
import { iEquipmentLink } from '@/utils/getLinksTree';
import { searchTree, includesSlug } from '@/utils/searchTree';
import { iEquipment, iStrapiResponse } from '@/types/strapi';
import { getCommonConfig } from './getCommonConfig';

export interface iEquipmentContent {
  id: iStrapiResponse<iEquipment>['id'];
  slug: iEquipment['slug'];
  title: iEquipment['title'];
  subtitle: iEquipment['subtitle'];
  photos: iImage[];
  topText: iEquipment['topText'];
  bottomText: iEquipment['bottomText'];
  type: iEquipment['type'];
  link: string;
  metatags: iEquipment['metatags'];
  children?: iEquipmentContent[];
}

function transform(
  data: iStrapiResponse<iEquipment>,
  equipmentLinksTree: iEquipmentLink[],
): iEquipmentContent {
  const { id, attributes } = data;

  const [link] = searchTree(
    equipmentLinksTree,
    includesSlug([attributes.slug]),
  );

  return {
    id,
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    photos: transformImages(attributes?.photos?.data),
    topText: attributes.topText,
    bottomText: attributes.bottomText,
    type: attributes.type,
    link: link.url,
    metatags: attributes.metatags,
    children: (attributes?.children?.data || []).map((item) =>
      transform(item, equipmentLinksTree),
    ),
  };
}

export async function getEquipmentContent(id: number) {
  const { equipmentLinksTree } = await getCommonConfig();
  const { data } = await getStrapi(API.EQUIPMENT_CATEGORY, {
    params: { id: String(id) },
  });

  return transform(data, equipmentLinksTree);
}
