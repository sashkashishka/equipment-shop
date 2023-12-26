import styles from './HTMLParser.module.css';

interface iProps {
  children: string;
}

export function HTMLParser({ children, ...props }: iProps) {
  return (
    <div
      {...props}
      className={styles.content}
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    />
  );
}
