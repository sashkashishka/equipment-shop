import {
  API,
  AUTH_HEADER,
  QUERIES,
  iQueryBuilderOptions,
} from '@/constants/api';
import type {
  iCommonConfig,
  iEquipment,
  iStrapiResponse,
  iPage,
  iEquipmentConfig,
  iBlogPost,
} from '@/types/strapi';
import { generatePath, PathParam } from '@/utils/generatePath';

interface iResponses {
  [API.COMMON_CONFIG]: iStrapiResponse<iCommonConfig>;
  [API.EQUIPMENT_CATEGORIES]: iStrapiResponse<iEquipment>[];
  [API.EQUIPMENT_CATEGORY]: iStrapiResponse<iEquipment>;
  [API.PAGE]: iStrapiResponse<iPage>[];
  [API.EQUIPMENT_CONFIG]: iStrapiResponse<iEquipmentConfig>;
  [API.BLOG]: iStrapiResponse<iBlogPost>[];
}

interface iOptions<T extends API> extends iQueryBuilderOptions {
  enableTagCache?: boolean;
  params?: {
    [key in PathParam<T>]: string | null;
  };
}

function getTagCache(tag: string, enabled: boolean) {
  if (process.env.NODE_ENV === 'development' || !enabled) {
    return {
      cache: 'no-store',
    } as const;
  }

  return {
    next: { tags: [tag] },
  };
}

export async function getStrapi<T extends API>(
  endpoint: T,
  { enableTagCache = true, params, filters, pagination }: iOptions<T> = {},
) {
  let url: string = generatePath(endpoint, params);

  if (QUERIES[endpoint]) {
    url = `${url}?${new URLSearchParams(
      QUERIES[endpoint]({ filters, pagination }),
    )}`;
  }

  const response = await fetch(url, {
    headers: AUTH_HEADER,
    ...getTagCache(url, enableTagCache),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${API.COMMON_CONFIG}`);
  }

  const { data } = await response.json();

  return data as iResponses[T];
}
