import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import {
  iHtmlContent,
  iPage,
  iServiceContent,
  iStrapiResponse,
  iContactsContent,
} from '@/types/strapi';
import { iImage, transformImages } from '@/utils/strapi/transformImages';

export interface iServiceTypeContent
  extends Pick<iServiceContent, '__component' | 'description'> {
  title: iPage['name'];
  link: string;
  icon: iImage[];
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
  content: Array<iServiceTypeContent | iHtmlTypeContent | iContactsTypeContent>;
}

function transform(data: iStrapiResponse<iPage>[]): iDynamicPageContent[] {
  return data.map(({ attributes }) => {
    return {
      title: attributes.name,
      slug: attributes.slug,
      content: (attributes.content || []).map((content) => {
        switch (content.__component) {
          case 'service.service': {
            return {
              title: content?.children?.data?.[0]?.attributes?.name,
              link: `/${content?.children?.data?.[0]?.attributes?.slug}`,
              icon: transformImages(content?.icon?.data),
              description: content.description,
              __component: content.__component,
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
  return getStrapi(API.PAGE, { filter: { slug } })
    .then(transform)
    .then(([data]) => data);
}
