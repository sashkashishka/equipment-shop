import { iContactsTypeContent } from '@/utils/strapi/getDynamicPageContent';

interface iProps {
  content: iContactsTypeContent;
}
export function ContactsContent({ content }: iProps) {
  return JSON.stringify(content);
}
