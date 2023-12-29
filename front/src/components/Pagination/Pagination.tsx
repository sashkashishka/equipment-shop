import cn from 'classnames';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';

import ArrowDownIcon from '@/images/icons/arrow-down.svg';

import { getPageQuery, getSiblingPages } from './utils';

import styles from './Pagination.module.css';

interface iProps {
  current: string | undefined;
  limit: number;
  total: number;
  url: ROUTES;
  siblings?: number;
}

export function Pagination({
  url,
  current,
  total,
  limit,
  siblings = 1,
}: iProps) {
  if (total <= limit) return null;

  const currentPage = Number.isNaN(Number(current)) ? 1 : Number(current);

  const pages = getSiblingPages({
    current: currentPage,
    total,
    limit,
    siblings,
  });

  return (
    <div
      className={styles.container}
      style={{ '--pagination-qty': pages.length + 2 } as React.CSSProperties}
    >
      <Link href={`${url}?${getPageQuery(Math.max(1, currentPage - 1))}`}>
        <Button
          type="button"
          variant="tertiary"
          className={cn(styles.btn, styles.btnLeft)}
        >
          <ArrowDownIcon />
        </Button>
      </Link>

      {pages.map((p) => (
        <Link key={p} href={`${url}?${getPageQuery(p)}`}>
          <Button type="button" variant="tertiary" className={styles.btn}>
            {p}
          </Button>
        </Link>
      ))}

      <Link
        href={`${url}?${getPageQuery(
          Math.min(Math.ceil(total / limit), currentPage + 1),
        )}`}
      >
        <Button
          type="button"
          variant="tertiary"
          className={cn(styles.btn, styles.btnRight)}
        >
          <ArrowDownIcon />
        </Button>
      </Link>
    </div>
  );
}
