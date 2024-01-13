import { ROUTES } from '@/constants/routes';
import type { iEquipment, iStrapiResponse } from '@/types/strapi';

export interface iEquipmentLink {
  id: number;
  type: iEquipment['type'];
  label: iEquipment['linkName'];
  url: string;
  slug: iEquipment['slug'];
  children?: iEquipmentLink[];
}

export function getEquipmentLinksTree(
  data: iStrapiResponse<iEquipment>[],
  prefix: string = ROUTES.EQUIPMENT,
): iEquipmentLink[] {
  return data.map<iEquipmentLink>((v) => {
    const id = v.id;
    const type = v.attributes.type;
    const label = v.attributes.linkName;
    const slug = v.attributes.slug;
    const url = `${prefix}/${v.attributes.slug}`;

    if (!v?.attributes?.children?.data?.length) {
      return {
        id,
        type,
        label,
        url,
        slug,
      };
    }

    return {
      id,
      type,
      label,
      url,
      slug,
      children: getEquipmentLinksTree(v?.attributes?.children?.data, url),
    };
  });
}

export function getEquipmentLinksFlatten(
  data: iStrapiResponse<iEquipment>[],
  prefix: string = ROUTES.EQUIPMENT,
  depth = 1,
): Omit<iEquipmentLink, 'children'>[] {
  const tree = getEquipmentLinksTree(data, prefix);

  function flatten(links: typeof tree, d = depth) {
    return links.reduce<Omit<iEquipmentLink, 'children'>[]>(
      (acc, { children, ...rest }) => {
        acc.push(rest);

        if (children && d > 0) {
          acc = acc.concat(flatten(children, d - 1));
        }

        return acc;
      },
      [],
    );
  }

  return flatten(tree);
}
