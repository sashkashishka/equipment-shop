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
        videos: true,
        carousel: {
          populate: ['photos', 'videos'],
        },
        equipment: {
          fields: ['id', 'slug', 'name'],
          populate: ['photos'],
        },
        services: {
          populate: {
            content: {
              on: {
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
        },
      },
    });
  },
};
