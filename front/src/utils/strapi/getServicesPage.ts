import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { iPage, iServiceContent, iStrapiResponse } from '@/types/strapi';
import { getImageUrl } from '@/utils/strapi/getImageUrl';

interface iServiceTypeContent {
  title: iPage['name'];
  slug: iPage['slug'];
  link: string;
  icon: { url: string }[];
  description: iServiceContent['description'];
}

export interface iServicesContent {
  title: iPage['name'];
  slug: iPage['slug'];
  serviceTypes: Array<iServiceTypeContent>;
}

function transform(data: iStrapiResponse<iPage>[]): iServicesContent[] {
  return data.map(({ attributes }) => {
    return {
      title: attributes.name,
      slug: attributes.slug,
      serviceTypes: (attributes.content || [])
        .map((content) => {
          if (content.__component !== 'service.service') return undefined;

          const slug = content?.children?.data?.[0]?.attributes?.slug;

          return {
            title: content?.children?.data?.[0]?.attributes?.name,
            slug,
            link: `/${attributes.slug}/${slug}`,
            icon: (content?.icon?.data || []).map((photo) => ({
              url: getImageUrl(photo.attributes.url),
            })),
            description: content.description,
          };
        })
        .filter((v): v is iServiceTypeContent => v !== undefined),
    };
  });
}

export async function getServicesPage() {
  const data = await getStrapi(API.PAGE, { filter: { slug: 'services' } });

  const [config] = transform(data);

  return config;
}
