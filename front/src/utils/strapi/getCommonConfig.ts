import { t } from 'ttag';
import { API } from '@/constants/api';
import type {
  iCommonConfig,
  iEquipment,
  iLinks,
  iStrapiResponse,
} from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  getEquipmentLinksTree,
  getEquipmentLinksFlatten,
  iEquipmentLink,
} from '@/utils/getLinksTree';
import { ROUTES } from '@/constants/routes';

interface iLinksContent extends Pick<iLinks, 'name'> {
  link: string;
}

export interface iCommonConfigContent
  extends Pick<iCommonConfig, 'phone' | 'languages' | 'copyright'> {
  links: Array<iLinksContent>;
  equipmentLinksTree: iEquipmentLink[];
  equipmentLinksFlatten: Omit<iEquipmentLink, 'children'>[];
}

const staticLinks = [{ name: t`News`, link: ROUTES.NEWS }];

function transform(
  config: iStrapiResponse<iCommonConfig>,
  equipmentLinks: iStrapiResponse<iEquipment>[],
): iCommonConfigContent {
  const { attributes } = config;

  const links = attributes.links.data.map((l) => ({
    name: l.attributes.name,
    link: `/${l.attributes.slug}`,
  }));

  staticLinks.forEach((l) => links.unshift(l));

  return {
    phone: attributes.phone,
    copyright: attributes.copyright,
    languages: attributes.languages,
    links,
    equipmentLinksTree: getEquipmentLinksTree(equipmentLinks),
    equipmentLinksFlatten: getEquipmentLinksFlatten(equipmentLinks),
  };
}

export async function getCommonConfig() {
  const [commonConfig, equipmentLinks] = await Promise.all([
    getStrapi(API.COMMON_CONFIG),
    getStrapi(API.EQUIPMENT_CATEGORIES),
  ]);

  return transform(commonConfig, equipmentLinks);
}
