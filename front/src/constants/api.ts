import qs from 'qs';
import { getCurrentLocale } from '@/i18n/common';

const PREFIX = 'http://strapi:1337';

export const AUTH_HEADER = {
  authorization: `bearer ${process.env.API_TOKEN}`,
};

export enum API {
  COMMON_CONFIG = `${PREFIX}/api/common-config`,
  EQUIPMENT_CATEGORIES = `${PREFIX}/api/equipment-categories`,
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
        products: {
          fields: ['slug', 'name'],
        },
        children: {
          fields: ['slug', 'name'],
          populate: {
            products: {
              fields: ['slug', 'name'],
            },

            children: {
              fields: ['slug', 'name'],
              populate: {
                products: {
                  fields: ['slug', 'name'],
                },

                children: {
                  fields: ['slug', 'name'],
                  populate: {
                    products: {
                      fields: ['slug', 'name'],
                    },

                    children: {
                      fields: ['slug', 'name'],
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
