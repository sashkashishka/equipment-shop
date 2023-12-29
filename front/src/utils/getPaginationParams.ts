import type { iQueryBuilderOptions } from '@/constants/api';

export function getPaginationParams(
  page: number,
  limit = 10,
): iQueryBuilderOptions['pagination'] {
  return {
    start: Math.max(page - 1, 0) * limit,
    limit,
    withCount: true,
  };
}
