import qs from 'qs';
import { getCurrentLocale } from '@/i18n/common';

export const STRAPI_HOST = process.env.STRAPI_HOST;
export const STRAPI_PREFIX = process.env.STRAPI_PREFIX;

export const AUTH_HEADER = {
  authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
};

export enum API {
  COMMON_CONFIG = `/api/common-config`,
  EQUIPMENT_CONFIG = `/api/equipment-config`,
  EQUIPMENT_CATEGORIES = `/api/equipment-categories`,
  EQUIPMENT_CATEGORY = `/api/equipment-categories/:id`,
  PAGE = `/api/pages`,
  BLOG = `/api/blogs`,
  MAIN_PAGE = `/api/main-page`,
}

export interface iQueryBuilderOptions {
  filters?: Record<string, any>;
  pagination?: {
    start: number;
    limit: number;
    withCount: boolean;
  };
  sort?: string[];
}

export const QUERIES = {
  [API.COMMON_CONFIG]() {
    return qs.stringify({
      locale: getCurrentLocale(),
      populate: {
        links: {
          fields: ['slug', 'name'],
        },
      },
    });
  },
  [API.EQUIPMENT_CONFIG]() {
    return qs.stringify({
      locale: getCurrentLocale(),
      populate: {
        services: {
          populate: ['title', 'description', 'photo', 'children'],
        },
      },
    });
  },
  [API.EQUIPMENT_CATEGORIES]() {
    return qs.stringify({
      locale: getCurrentLocale(),
      filters: {
        root: true,
      },
      populate: {
        children: {
          fields: ['slug', 'name', 'type'],
          populate: {
            children: {
              fields: ['slug', 'name', 'type'],
              populate: {
                children: {
                  fields: ['slug', 'name', 'type'],
                  populate: {
                    children: {
                      fields: ['slug', 'name', 'type'],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },
  [API.EQUIPMENT_CATEGORY]() {
    return qs.stringify({
      locale: getCurrentLocale(),
      populate: {
        photos: true,
        metatags: true,
        children: {
          populate: ['slug', 'name', 'title', 'subtitle', 'photos'],
        },
      },
    });
  },
  [API.PAGE]({ filters }: iQueryBuilderOptions = {}) {
    return qs.stringify({
      locale: getCurrentLocale(),
      filters,
      populate: {
        metatags: true,
        content: {
          on: {
            'content.html': {
              fields: ['html'],
            },
            'contacts.contacts': {
              fields: ['address', 'phone', 'email'],
            },
            'services.services': {
              populate: {
                service: {
                  populate: ['description', 'photo', 'children'],
                },
              },
            },
          },
        },
      },
    });
  },

  [API.BLOG]({ filters, pagination, sort }: iQueryBuilderOptions = {}) {
    return qs.stringify({
      locale: getCurrentLocale(),
      sort,
      filters,
      pagination,
      populate: ['photos'],
    });
  },

  [API.MAIN_PAGE]() {
    return qs.stringify({
      locale: getCurrentLocale(),
      populate: {
        metatags: true,
        content: {
          on: {
            'carousel.carousel': {
              populate: ['photos', 'videos'],
            },

            'services.services': {
              populate: {
                service: {
                  populate: ['photo', 'description', 'children']
                }
              },
            },
            'content.html': {
              fields: ['html', 'title'],
            },
            'youtube-video.videos': {
              fields: ['title', 'bottomText'],
              populate: ['videos'],
            },
            'callback-form.callback-form': {
              fields: ['title', 'subtitle'],
              populate: ['illustration'],
            },
            'main.equipment-block': {
              populate: {
                equipment: {
                  populate: ['photos']
                }
              },
            },
            'main.exhibitions': {
              populate: {
                exhibitions: {
                  populate: ['logo']
                }
              },
            },
          },
        },
      },
    });
  },
};
