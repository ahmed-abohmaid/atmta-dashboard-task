import { CategoryNode, CategoryWithRelations } from "@/@types/category";

export function buildCategoryTree(categories: CategoryWithRelations[]): CategoryNode[] {
  const childrenByParent: Record<string, CategoryWithRelations[]> = {};

  for (const cat of categories) {
    const parentKey = cat.parentId ?? "root";
    (childrenByParent[parentKey] ??= []).push(cat); // {parentid: categories[]}
  }

  function buildBranch(parentId: string | null, depth: number): CategoryNode[] {
    const items = childrenByParent[parentId ?? "root"] ?? [];

    return items.map((cat) => {
      const children = buildBranch(cat.id, depth + 1);
      return {
        ...cat,
        depth,
        childCount: children.length,
        children,
      };
    });
  }

  return buildBranch(null, 0);
}

export function filterCategoryTree(
  nodes: CategoryNode[],
  query: string
): { filtered: CategoryNode[]; matchIds: Set<string> } {
  const trimmed = query.trim().toLowerCase();
  const matchIds = new Set<string>();

  if (!trimmed) {
    return { filtered: nodes, matchIds };
  }

  function filterBranch(node: CategoryNode): CategoryNode | null {
    const isSelfMatch =
      node.name_ar.toLowerCase().includes(trimmed) || node.name_en.toLowerCase().includes(trimmed);

    if (isSelfMatch) {
      matchIds.add(node.id);
    }

    const filteredChildren: CategoryNode[] = [];
    for (const child of node.children) {
      const filteredChild = filterBranch(child);
      if (filteredChild) {
        filteredChildren.push(filteredChild);
      }
    }

    if (isSelfMatch || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  }

  const result: CategoryNode[] = [];
  for (const node of nodes) {
    const filteredNode = filterBranch(node);
    if (filteredNode) {
      result.push(filteredNode);
    }
  }

  return { filtered: result, matchIds };
}

export function collectExpandableIds(nodes: CategoryNode[]): Set<string> {
  const ids = new Set<string>();
  function traverse(list: CategoryNode[]) {
    for (const node of list) {
      if (node.children.length > 0) {
        ids.add(node.id);
        traverse(node.children);
      }
    }
  }
  traverse(nodes);
  return ids;
}
