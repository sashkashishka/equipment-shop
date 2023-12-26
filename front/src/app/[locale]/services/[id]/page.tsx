import { HTMLParser } from '@/components/HTMLParser';
import { getServiceTypePage } from '@/utils/strapi/getServiceTypePage';

interface iProps {
  params: { id: string };
}
export default async function ServiceType({ params }: iProps) {
  const data = await getServiceTypePage(params.id);

  return (
    <div className="pageContent">
      <h2 className="h2Title">{data.title}</h2>
      <HTMLParser>{data.content}</HTMLParser>
    </div>
  );
}
