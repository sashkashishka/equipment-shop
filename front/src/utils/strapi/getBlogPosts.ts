import { API } from '@/constants/api';
import type { iBlogPost, iStrapiResponse } from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { transformImages, iImage } from './transformImages';

export interface iBlogPostContent
  extends Pick<
    iBlogPost,
    'slug' | 'title' | 'content' | 'publishedAt' | 'metatags'
  > {
  id: iStrapiResponse<iBlogPost>['id'];
  photos: iImage[];
}

function transform(posts: iStrapiResponse<iBlogPost>[]): iBlogPostContent[] {
  return posts.map((post) => {
    const { id, attributes } = post;

    return {
      id,
      slug: attributes.slug,
      title: attributes.title,
      photos: transformImages(attributes.photos.data),
      content: attributes.content,
      publishedAt: attributes.publishedAt,
      metatags: attributes.metatags,
    };
  });
}

export async function getBlogPosts(page: string = '1', locale: string) {
  const { data, meta } = await getStrapi(API.BLOG, {
    locale,
    sort: ['publishedAt:desc'],
    pagination: getPaginationParams(Number(page), 10),
  });

  return {
    posts: transform(data),
    pagination: meta.pagination,
  };
}

export async function getBlogPostBySlug(slug: string, locale: string) {
  try {
    const { data } = await getStrapi(API.BLOG, {
      locale,
      filters: { slug },
    });

    const [post] = transform(data);

    return post;
  } catch (e) {
    console.error(e);
  }
}
