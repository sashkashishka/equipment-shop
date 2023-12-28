import qs from 'qs';
import { getCurrentLocale } from '@/i18n/common';

// TODO use env variable
const PREFIX = 'http://strapi:1337';

export const AUTH_HEADER = {
  authorization: `bearer ${process.env.API_TOKEN}`,
};

export enum API {
  COMMON_CONFIG = `${PREFIX}/api/common-config`,
  EQUIPMENT_CONFIG = `${PREFIX}/api/equipment-config`,
  EQUIPMENT_CATEGORIES = `${PREFIX}/api/equipment-categories`,
  EQUIPMENT_CATEGORY = `${PREFIX}/api/equipment-categories/:id`,
  PAGE = `${PREFIX}/api/pages`,
  BLOG = `${PREFIX}/api/blogs`,
}

export interface iQueryBuilderOptions {
  filters?: Record<string, any>;
  pagination?: {
    start: number;
    limit: number;
    withCount: boolean;
  };
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

  [API.BLOG]({ filters, pagination }: iQueryBuilderOptions = {}) {
    return qs.stringify({
      locale: getCurrentLocale(),
      filters,
      pagination,
      populate: ['photos'],
    });
  },
};
