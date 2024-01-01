import { HTMLParser } from '@/components/HTMLParser';
import { iHtmlContent } from '@/types/strapi';

import styles from './ContentHtml.module.css';

interface iProps {
  content: iHtmlContent;
}

export function ContentHtml({ content }: iProps) {
  const { title, html } = content;

  return (
    <div className={styles.container}>
      <p className="h2Title">{title}</p>

      <HTMLParser>{html}</HTMLParser>
    </div>
  );
}
