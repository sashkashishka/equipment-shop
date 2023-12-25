import { API, AUTH_HEADER, QUERIES } from '@/constants/api';
import {
  iCommonConfig,
  iEquipmentCategory,
  iStrapiResponse,
} from '@/types/strapi';

interface iResponses {
  [API.COMMON_CONFIG]: iStrapiResponse<iCommonConfig>;
  [API.EQUIPMENT_CATEGORIES]: iStrapiResponse<iEquipmentCategory>[];
}

interface iOptions {
  enableTagCache?: boolean;
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
  { enableTagCache = true }: iOptions = {},
) {
  let url: string = endpoint;

  if (QUERIES[endpoint]) {
    url = `${url}?${new URLSearchParams(QUERIES[endpoint]())}`;
  }

  const response = await fetch(url, {
    headers: AUTH_HEADER,
    ...getTagCache(endpoint, enableTagCache),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${API.COMMON_CONFIG}`);
  }

  const { data } = await response.json();

  return data as iResponses[T];
}
