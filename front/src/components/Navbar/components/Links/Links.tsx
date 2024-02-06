import { Link } from '@/components/Link';
import { NestedMenu } from './NestedMenu';
import { iCommonConfigContent } from '@/utils/strapi/getCommonConfig';

import styles from './Links.module.css';

interface iProps
  extends Pick<iCommonConfigContent, 'equipmentLinksTree' | 'links'> {}

export async function Links({ equipmentLinksTree, links }: iProps) {
  return (
    <>
      <NestedMenu equipmentLinksTree={equipmentLinksTree} />
      {links.map(({ link, name }) => (
        <Link key={link} href={link} className={styles.uppercase}>
          {name}
        </Link>
      ))}
    </>
  );
}
