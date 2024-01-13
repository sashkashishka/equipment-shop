import { t } from 'ttag';
import { ROUTES } from '@/constants/routes';
import { getBlogPosts } from '@/utils/strapi/getBlogPosts';
import { Pagination } from '@/components/Pagination';

import { BlogPostCard } from './components/BlogPostCard';

import styles from './page.module.css';

interface iProps {
  params: { locale: string };
  searchParams: { page?: string };
}

export default async function NewsPage({ searchParams, params }: iProps) {
  const { posts, pagination } = await getBlogPosts(
    searchParams.page,
    params.locale,
  );

  return (
    <div>
      <h2 className="h2Title">{t`News`}</h2>

      <div className={styles.postGrid}>
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} locale={params.locale} />
        ))}
      </div>

      <Pagination
        current={searchParams.page}
        total={pagination.total}
        limit={pagination.limit}
        url={ROUTES.NEWS}
      />
    </div>
  );
}
