import { API } from '@/constants/api';
import type { iBlogPost, iStrapiResponse } from '@/types/strapi';
import { getStrapi } from '@/utils/strapi/getStrapi';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { transformImages, iImage } from './transformImages';

export interface iBlogPostContent
  extends Pick<iBlogPost, 'slug' | 'title' | 'content' | 'publishedAt'> {
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
    };
  });
}

export async function getBlogPosts(page: string = '1') {
  const data = await getStrapi(API.BLOG, {
    enableTagCache: false,
    pagination: getPaginationParams(Number(page)),
  });

  return transform(data);
}
