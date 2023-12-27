interface iTreeStructure {
  children?: iTreeStructure[];
  [key: string]: any;
}

interface iCondition {
  (...args: any[]): boolean;
}

export function includesSlug(slugs: string[]): iCondition {
  return function condition(obj: Record<string, any>) {
    return slugs.includes(obj.slug);
  };
}

export function searchParent(id: number): iCondition {
  return function condition(obj: Record<string, any>) {
    if (!obj.children) return false;

    return obj.children.some((o: Record<string, any>) => o.id === id);
  };
}

export function searchTree(tree: iTreeStructure[], condition: iCondition) {
  const result: Omit<iTreeStructure, 'children'>[] = [];

  function walk(tree: iTreeStructure[]) {
    return tree.forEach((obj) => {
      const { children, ...rest } = obj;

      if (condition(obj)) {
        result.push(rest);
      }

      if (children) {
        walk(children);
      }
    });
  }

  walk(tree);

  return result;
}
