import { API } from '@/constants/api';
import type {
  iEquipment,
  iCarouselComponent,
  iHtmlContent,
  iMainPageConfig,
  iStrapiResponse,
  iYoutubeVideosComponent,
  iCallbackFormComponent,
  iMainEquipmentComponent,
  iExhibitionsComponent,
  iExhibitionComponent,
} from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { iImage, transformImages } from '@/utils/strapi/transformImages';
import { iServicesComponentContent } from '@/utils/strapi/getDynamicPageContent';
import {
  getCommonConfig,
  iCommonConfigContent,
} from '@/utils/strapi/getCommonConfig';
import { includesSlug, searchTree } from '@/utils/searchTree';

export interface iMainEquipmentComponentContent
  extends Pick<iMainEquipmentComponent, 'title' | '__component'> {
  equipment: Array<{
    link: string;
    photos: iImage[];
    title: iEquipment['title'];
  }>;
}

export interface iCarouselComponentContent
  extends Pick<iCarouselComponent, '__component' | 'videos'> {
  photos: iImage[];
}

export interface iExhibitionsComponentContent
  extends Pick<iExhibitionsComponent, 'bottomText' | 'title' | '__component'> {
  exhibitions: Array<{
    name: iExhibitionComponent['name'];
    link: iExhibitionComponent['link'];
    logo: iImage;
  }>;
}

export interface iCallbackFormComponentContent
  extends Omit<iCallbackFormComponent, 'illustration'> {
  illustration: iImage;
}

export interface iMainPageConfigContent
  extends Pick<iMainPageConfig, 'metatags'> {
  content: Array<
    | iHtmlContent
    | iCarouselComponentContent
    | iYoutubeVideosComponent
    | iServicesComponentContent
    | iCallbackFormComponentContent
    | iMainEquipmentComponentContent
    | iExhibitionsComponentContent
  >;
}

function transform(
  mainPageConfig: iStrapiResponse<iMainPageConfig>,
  commonConfig: iCommonConfigContent,
): iMainPageConfigContent {
  const { attributes } = mainPageConfig;

  return {
    metatags: attributes.metatags,
    content: attributes.content.map((content) => {
      switch (content.__component) {
        case 'content.html':
        case 'youtube-video.videos': {
          return content;
        }

        case 'callback-form.callback-form': {
          const [photo] = transformImages([content.illustration.data]);

          return {
            title: content.title,
            subtitle: content.subtitle,
            __component: content.__component,
            illustration: photo,
          };
        }

        case 'carousel.carousel': {
          return {
            photos: transformImages(content?.photos?.data || []),
            videos: content.videos,
            __component: content.__component,
          };
        }

        case 'services.services': {
          return {
            title: content.title,
            service: content.service.map((service) => ({
              title: service?.children?.data?.attributes?.name,
              link: `/${service?.children?.data?.attributes?.slug}`,
              photo: transformImages([service?.photo?.data]),
              description: service.description,
            })),
            __component: content.__component,
          };
        }

        case 'main.equipment-block': {
          return {
            title: content.title,
            equipment: content.equipment?.data?.map((item) => {
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
            __component: content.__component,
          };
        }

        case 'main.exhibitions': {
          return {
            title: content.title,
            bottomText: content.bottomText,
            exhibitions: content.exhibitions?.map(({ link, name, logo }) => {
              const [photo] = transformImages([logo.data]);

              return {
                name,
                link,
                logo: photo,
              };
            }),
            __component: content.__component,
          };
        }
      }
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
