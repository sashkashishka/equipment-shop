'use client';

import NextLink, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import cn from 'classnames';

import styles from './Link.module.css';

interface iProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    LinkProps {}

export function Link({ className, href, ...props }: iProps) {
  const { locale } = useParams();

  let to = href;

  if (href?.toString?.()?.startsWith?.('/')) {
    to = `/${locale}${href}`;
  }

  return (
    <NextLink href={to} className={cn(styles.link, className)} {...props} />
  );
}
