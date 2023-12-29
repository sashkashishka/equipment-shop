export function getPageQuery(page: number) {
  if (page === 1) return '';

  return new URLSearchParams({ page: String(page) });
}

interface iOptions {
  current: number;
  limit: number;
  total: number;
  siblings: number;
}

export function getSiblingPages({
  current,
  limit,
  total,
  siblings = 2,
}: iOptions) {
  const last = Math.ceil(total / limit);
  const pages = [current];

  let count = 0;

  while (count !== siblings) {
    const prev = current - (count + 1);
    const next = current + (count + 1);

    pages.unshift(prev);
    pages.push(next);

    count += 1;
  }

  if (pages[0] < 1) {
    return pages.map((p) => p + 1 - pages[0]).filter((p) => p <= last);
  }

  if (pages[pages.length - 1] > last) {
    return pages
      .map((p) => p + (last - pages[pages.length - 1]))
      .filter((p) => p >= 1);
  }

  return pages;
}
