import cn from 'classnames';

import styles from './HTMLParser.module.css';

interface iProps {
  className?: string;
  children: string;
}

export function HTMLParser({ children, className, ...props }: iProps) {
  return (
    <div
      {...props}
      className={cn(styles.content, className)}
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
}
