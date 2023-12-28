import { t } from 'ttag';
import { getBlogPosts } from '@/utils/strapi/getBlogPosts';

import { BlogPostCard } from './components/BlogPostCard';

import styles from './page.module.css';

interface iProps {
  searchParams: { page?: string };
}

export default async function NewsPage({ searchParams }: iProps) {
  const data = await getBlogPosts(searchParams.page);

  return (
    <div>
      <h2 className="h2Title">{t`News`}</h2>

      <div className={styles.postGrid}>
        {data.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      pagination
    </div>
  );
}
