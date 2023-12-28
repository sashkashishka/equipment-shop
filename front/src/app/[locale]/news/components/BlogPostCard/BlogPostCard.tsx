import { Link } from '@/components/Link';
import { HTMLParser } from '@/components/HTMLParser';
import { iBlogPostContent } from '@/utils/strapi/getBlogPosts';
import { generatePath } from '@/utils/generatePath';
import { ROUTES } from '@/constants/routes';

import styles from './BlogPostCard.module.css';
import { formatDate } from '@/utils/formatDate';

interface iProps {
  post: iBlogPostContent;
}

export function BlogPostCard({ post }: iProps) {
  const { photos, title, slug, content, publishedAt } = post;

  return (
    <div className={styles.card}>
      <Link
        href={generatePath(ROUTES.NEWS_POST, { slug })}
        className={styles.cardContent}
      >
        {Boolean(photos[0]) && (
          <img className={styles.photo} src={photos[0].url} alt={title} />
        )}

        <p className={styles.title}>{title}</p>

        <div className={styles.briefInfo}>
          <HTMLParser>{content}</HTMLParser>
        </div>

        <p className={styles.time}>{formatDate(publishedAt)}</p>
      </Link>
    </div>
  );
}
