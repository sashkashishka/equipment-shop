import { API } from '@/constants/api';
import type { iEquipmentConfig, iStrapiResponse } from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { transformImages } from '@/utils/strapi/transformImages';

function transform(config: iStrapiResponse<iEquipmentConfig>) {
  const { attributes } = config;

  return {
    serviceTypes: attributes.services.map((content) => ({
      photo: transformImages([content?.photo?.data]),
      title: content?.children?.data?.attributes?.linkName,
      link: `/${content?.children?.data?.attributes?.slug}`,
    })),
  };
}

export async function getEquipmentConfig(locale: string) {
  const { data: config } = await getStrapi(API.EQUIPMENT_CONFIG, { locale });

  return transform(config);
}
