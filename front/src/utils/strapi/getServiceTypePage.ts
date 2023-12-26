import { API } from '@/constants/api';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { iHtmlContent, iPage, iStrapiResponse } from '@/types/strapi';

interface iServiceTypePageContent {
  title: iPage['name'];
  content: iHtmlContent['html'];
}

function transform(data: iStrapiResponse<iPage>[]): iServiceTypePageContent[] {
  return data.map(({ attributes }) => {
    const [content] = (attributes.content || [])
      .map((content) => {
        if (content.__component !== 'content.html') return undefined;

        return content.html;
      })
      .filter((v): v is string => v !== undefined);

    return {
      title: attributes.name,
      content,
    };
  });
}

export async function getServiceTypePage(slug: string) {
  const data = await getStrapi(API.PAGE, { filter: { slug } });

  const [config] = transform(data);

  return config;
}
