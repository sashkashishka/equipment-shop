import { API } from '@/constants/api';
import type {
  iEquipment,
  iMainPageConfig,
  iStrapiResponse,
} from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { iImage, transformImages } from '@/utils/strapi/transformImages';
import { iServiceTypeContent } from '@/utils/strapi/getDynamicPageContent';
import {
  getCommonConfig,
  iCommonConfigContent,
} from '@/utils/strapi/getCommonConfig';
import { includesSlug, searchTree } from '@/utils/searchTree';

export interface iMainPageConfigContent
  extends Pick<iMainPageConfig, 'aboutCompany' | 'videos'> {
  carousel: {
    videos: iMainPageConfig['carousel']['videos'];
    photos: iImage[];
  };
  equipment: Array<{
    link: string;
    photos: iImage[];
    title: iEquipment['title'];
  }>;
  services: iServiceTypeContent[];
}

function transform(
  mainPageConfig: iStrapiResponse<iMainPageConfig>,
  commonConfig: iCommonConfigContent,
): iMainPageConfigContent {
  const { attributes } = mainPageConfig;

  return {
    aboutCompany: attributes.aboutCompany,
    videos: attributes.videos,
    services: attributes?.services?.data?.attributes?.content?.reduce<
      iServiceTypeContent[]
    >((acc, content) => {
      if (content.__component !== 'services.services') return acc;

      return content.service.map((service) => ({
        title: service?.children?.data?.attributes?.name,
        link: `/${service?.children?.data?.attributes?.slug}`,
        photo: transformImages([service?.photo?.data]),
        description: service.description,
      }));
    }, []),
    carousel: {
      photos: transformImages(attributes?.carousel?.photos?.data),
      videos: attributes?.carousel?.videos,
    },
    equipment: attributes?.equipment?.data?.map((item) => {
      const { attributes: itemData } = item;

      const [link] = searchTree(
        commonConfig.equipmentLinksTree,
        includesSlug([itemData.slug]),
      );

      return {
        title: itemData.title,
        link: link.url,
        photos: transformImages(itemData.photos.data),
      };
    }),
  };
}

export async function getMainPageConfig() {
  const [{ data: mainPageConfig }, commonConfig] = await Promise.all([
    getStrapi(API.MAIN_PAGE),
    getCommonConfig(),
  ]);

  return transform(mainPageConfig, commonConfig);
}
