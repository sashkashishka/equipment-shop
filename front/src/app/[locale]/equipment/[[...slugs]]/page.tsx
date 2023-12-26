import { notFound } from 'next/navigation';

import { getPageTypeBySlug } from '@/utils/strapi/getPageTypeBySlug';

import { Category } from './components/Category';
import { ProductList } from './components/ProductList';
import { Product } from './components/Product/Product';

interface iProps {
  params: { locale: string; slugs: string[] };
}

export default async function Equipment({ params }: iProps) {
  const [slug] = params.slugs.slice(-1);
  const [page] = await getPageTypeBySlug(slug);

  if (!page) {
    notFound();
  }

  switch (page.type) {
    case 'category': {
      return <Category id={page.id} />;
    }

    case 'productList': {
      return <ProductList id={page.id} />;
    }

    default: {
      return <Product id={page.id} />;
    }
  }
}
