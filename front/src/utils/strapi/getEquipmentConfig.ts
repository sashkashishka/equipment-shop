import { API } from '@/constants/api';
import type { iEquipmentConfig, iStrapiResponse } from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { transformImages } from '@/utils/strapi/transformImages';

function transform(config: iStrapiResponse<iEquipmentConfig>) {
  const { attributes } = config;

  return {
    serviceTypes: attributes.services.map((content) => {
      return {
        icon: transformImages(content?.icon?.data),
        title: content?.children?.data?.[0]?.attributes?.name,
        link: `/${content?.children?.data?.[0]?.attributes?.slug}`,
      };
    }),
  };
}

export async function getEquipmentConfig() {
  const config = await getStrapi(API.EQUIPMENT_CONFIG);

  return transform(config);
}
