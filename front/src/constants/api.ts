import qs from 'qs';
import { getCurrentLocale } from '@/i18n/common';

// TODO use env variable
const PREFIX = 'http://strapi:1337';

export const AUTH_HEADER = {
  authorization: `bearer ${process.env.API_TOKEN}`,
};

export enum API {
  COMMON_CONFIG = `${PREFIX}/api/common-config`,
  EQUIPMENT_CATEGORIES = `${PREFIX}/api/equipment-categories`,
  EQUIPMENT_CATEGORY = `${PREFIX}/api/equipment-categories/:id`,
  PAGE = `${PREFIX}/api/pages`,
}

export const QUERIES = {
  [API.COMMON_CONFIG]() {
    return qs.stringify({
      locale: getCurrentLocale(),
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
  [API.PAGE](filters?: Record<string, string>) {
    return qs.stringify({
      locale: getCurrentLocale(),
      filters,
      populate: {
        content: {
          populate: ['title', 'description', 'icon', 'children'],
        },
      },
    });
  },
};
