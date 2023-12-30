import {
  API,
  AUTH_HEADER,
  QUERIES,
  STRAPI_PREFIX,
  STRAPI_HOST,
  iQueryBuilderOptions,
} from '@/constants/api';
import type {
  iCommonConfig,
  iEquipment,
  iStrapiResponse,
  iPage,
  iEquipmentConfig,
  iBlogPost,
  iStrapiMeta,
  iMainPageConfig,
} from '@/types/strapi';
import { generatePath, PathParam } from '@/utils/generatePath';

interface iResponses {
  [API.COMMON_CONFIG]: iStrapiResponse<iCommonConfig>;
  [API.EQUIPMENT_CATEGORIES]: iStrapiResponse<iEquipment>[];
  [API.EQUIPMENT_CATEGORY]: iStrapiResponse<iEquipment>;
  [API.PAGE]: iStrapiResponse<iPage>[];
  [API.EQUIPMENT_CONFIG]: iStrapiResponse<iEquipmentConfig>;
  [API.BLOG]: iStrapiResponse<iBlogPost>[];
  [API.MAIN_PAGE]: iStrapiResponse<iMainPageConfig>;
}

interface iOptions<T extends API> extends iQueryBuilderOptions {
  enableTagCache?: boolean;
  params?: {
    [key in PathParam<T>]: string | null;
  };
}

// TODO adapt cache policy
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
  {
    enableTagCache = true,
    params,
    filters,
    pagination,
    sort,
  }: iOptions<T> = {},
) {
  let url: string = generatePath(endpoint, params);

  if (QUERIES[endpoint]) {
    url = `${STRAPI_HOST}${url}?${new URLSearchParams(
      QUERIES[endpoint]({ filters, pagination, sort }),
    )}`;
  }

  const response = await fetch(url, {
    headers: AUTH_HEADER,
    ...getTagCache(url, enableTagCache),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${API.COMMON_CONFIG}`);
  }

  const { data, meta } = await response.json();

  return {
    data: data as iResponses[T],
    meta: meta as iStrapiMeta,
  };
}
