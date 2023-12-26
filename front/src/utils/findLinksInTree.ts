import type { iEquipmentMenuLink } from './getLinksTree';

export function findLinksInTree(
  tree: iEquipmentMenuLink[],
  predicates: string[],
) {
  const links: Omit<iEquipmentMenuLink, 'children'>[] = [];

  function walk(tree: iEquipmentMenuLink[]) {
    return tree.forEach(({ slug, label, url, children }) => {
      if (predicates.includes(slug)) {
        links.push({ label, url, slug });
      }

      if (children) {
        walk(children);
      }
    });
  }

  walk(tree);

  return links;
}
