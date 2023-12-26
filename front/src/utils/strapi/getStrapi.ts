import { API, AUTH_HEADER, QUERIES } from '@/constants/api';
import type {
  iCommonConfig,
  iEquipment,
  iStrapiResponse,
} from '@/types/strapi';
import { generatePath, PathParam } from '@/utils/generatePath';

interface iResponses {
  [API.COMMON_CONFIG]: iStrapiResponse<iCommonConfig>;
  [API.EQUIPMENT_CATEGORIES]: iStrapiResponse<iEquipment>[];
  [API.EQUIPMENT_CATEGORY]: iStrapiResponse<iEquipment>;
}

interface iOptions<T extends API> {
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
  { enableTagCache = true, params }: iOptions<T> = {},
) {
  let url: string = generatePath(endpoint, params);

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
