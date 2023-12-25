import NextLink, { LinkProps } from 'next/link';
import cn from 'classnames';

import styles from './Link.module.css';

interface iProps extends React.HTMLAttributes<HTMLAnchorElement>, LinkProps {}

export function Link({ className, ...props }: iProps) {
  return <NextLink className={cn(styles.link, className)} {...props} />;
}
