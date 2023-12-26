interface iTreeStructure {
  children?: iTreeStructure[];
  [key: string]: any;
}

export function findLinksInTree(tree: iTreeStructure[], predicates: string[]) {
  const links: Omit<iTreeStructure, 'children'>[] = [];

  function walk(tree: iTreeStructure[]) {
    return tree.forEach(({ children, ...rest }) => {
      if (predicates.includes(rest.slug)) {
        links.push(rest);
      }

      if (children) {
        walk(children);
      }
    });
  }

  walk(tree);

  return links;
}
