import type { iQueryBuilderOptions } from '@/constants/api';

export function getPaginationParams(
  page: number,
  qty = 10,
): iQueryBuilderOptions['pagination'] {
  return {
    start: Math.max(page - 1, 0) * qty,
    limit: qty,
    withCount: true,
  };
}
