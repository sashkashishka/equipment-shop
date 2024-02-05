import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  iHtmlContent,
  iPage,
  iStrapiResponse,
  iServiceComponent,
  iServicesComponent,
  iContactsListComponent,
} from '@/types/strapi';
import { iImage, transformImages } from '@/utils/strapi/transformImages';

export interface iServiceComponentContent {
  title: iPage['linkName'];
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

export interface iContactsListTypeContent extends iContactsListComponent {}

export interface iDynamicPageContent {
  title: iPage['linkName'];
  slug: iPage['slug'];
  metatags: iPage['metatags'];
  content: Array<
    iServicesComponentContent | iHtmlTypeContent | iContactsListTypeContent
  >;
}

function transform(data: iStrapiResponse<iPage>[]): iDynamicPageContent[] {
  return data.map(({ attributes }) => {
    return {
      metatags: attributes.metatags,
      title: attributes.linkName,
      slug: attributes.slug,
      content: (attributes.content || []).map((content) => {
        switch (content.__component) {
          case 'services.services': {
            return {
              __component: content.__component,
              title: content.title,
              service: content.service.map((service) => ({
                title: service?.children?.data?.attributes?.linkName,
                link: `/${service?.children?.data?.attributes?.slug}`,
                photo: transformImages([service?.photo?.data]),
                description: service.description,
              })),
            };
          }

          case 'contacts.contacts-list': {
            return {
              __component: content.__component,
              contacts: content.contacts,
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

export function getDynamicPageContent(slug: string, locale: string) {
  return getStrapi(API.PAGE, { filters: { slug }, locale })
    .then(({ data }) => data)
    .then(transform)
    .then(([data]) => data);
}
