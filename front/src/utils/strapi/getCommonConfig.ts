import { t } from 'ttag';
import { API } from '@/constants/api';
import type {
  iCommonConfig,
  iEquipment,
  iStrapiResponse,
} from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  getEquipmentLinksTree,
  getEquipmentLinksFlatten,
  iEquipmentLink,
} from '@/utils/getLinksTree';
import { ROUTES } from '@/constants/routes';

interface iLinksContent {
  name: string;
  link: string;
}

export interface iCommonConfigContent
  extends Pick<iCommonConfig, 'phone' | 'locales' | 'copyright'> {
  links: Array<iLinksContent>;
  equipmentLinksTree: iEquipmentLink[];
  equipmentLinksFlatten: Omit<iEquipmentLink, 'children'>[];
}

function transform(
  config: iStrapiResponse<iCommonConfig>,
  equipmentLinks: iStrapiResponse<iEquipment>[],
): iCommonConfigContent {
  const { attributes } = config;
  const staticLinks = [{ name: t`News`, link: ROUTES.NEWS }];

  const links = attributes.links.data.map((l) => ({
    name: l.attributes.linkName,
    link: `/${l.attributes.slug}`,
  }));

  staticLinks.forEach((l) => links.unshift(l));

  return {
    phone: attributes.phone,
    copyright: attributes.copyright,
    locales: attributes.locales,
    links,
    equipmentLinksTree: getEquipmentLinksTree(equipmentLinks),
    equipmentLinksFlatten: getEquipmentLinksFlatten(equipmentLinks),
  };
}

export async function getCommonConfig(locale: string) {
  const [{ data: commonConfig }, { data: equipmentLinks }] = await Promise.all([
    getStrapi(API.COMMON_CONFIG, { locale }),
    getStrapi(API.EQUIPMENT_CATEGORIES, { locale }),
  ]);

  return transform(commonConfig, equipmentLinks);
}
