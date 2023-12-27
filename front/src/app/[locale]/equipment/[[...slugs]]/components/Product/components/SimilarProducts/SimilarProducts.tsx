import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';
import { getEquipmentSimilarProducts } from '@/utils/strapi/getEquipmentSimilarProducts';
import { ProductCarousel } from './Carousel';

interface iProps {
  id: number;
}

export async function SimilarProducts({ id }: iProps) {
  const products = await getEquipmentSimilarProducts(id);

  if (!products) return null;

  return (
    <div className="pageContent">
      <ProductCarousel products={products} />
    </div>
  );
}
