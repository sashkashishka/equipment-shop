import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  iHtmlContent,
  iPage,
  iStrapiResponse,
  iContactsContent,
  iServiceComponent,
  iServicesComponent,
} from '@/types/strapi';
import { iImage, transformImages } from '@/utils/strapi/transformImages';

export interface iServiceComponentContent {
  title: iPage['name'];
  link: string;
  photo: iImage[];
  description: iServiceComponent['description'];
}

export interface iServicesComponentContent
  extends Pick<iServicesComponent, '__component' | 'title'> {
  service: Array<iServiceComponentContent>;
}

export interface iHtmlTypeContent
  extends Pick<iHtmlContent, '__component' | 'html'> {}

export interface iContactsTypeContent
  extends Pick<
    iContactsContent,
    '__component' | 'email' | 'phone' | 'address'
  > {}

export interface iDynamicPageContent {
  title: iPage['name'];
  slug: iPage['slug'];
  metatags: iPage['metatags'];
  content: Array<
    iServicesComponentContent | iHtmlTypeContent | iContactsTypeContent
  >;
}

function transform(data: iStrapiResponse<iPage>[]): iDynamicPageContent[] {
  return data.map(({ attributes }) => {
    return {
      metatags: attributes.metatags,
      title: attributes.name,
      slug: attributes.slug,
      content: (attributes.content || []).map((content) => {
        switch (content.__component) {
          case 'services.services': {
            return {
              __component: content.__component,
              title: content.title,
              service: content.service.map((service) => ({
                title: service?.children?.data?.attributes?.name,
                link: `/${service?.children?.data?.attributes?.slug}`,
                photo: transformImages([service?.photo?.data]),
                description: service.description,
              })),
            };
          }

          case 'contacts.contacts': {
            return {
              __component: content.__component,
              email: content.email,
              phone: content.phone,
              address: content.address,
            };
          }

          case 'content.html':
          default: {
            return {
              __component: content.__component,
              html: content.html,
            };
          }
        }
      }),
    };
  });
}

export function getDynamicPageContent(slug: string) {
  return getStrapi(API.PAGE, { filters: { slug } })
    .then(({ data }) => data)
    .then(transform)
    .then(([data]) => data);
}
