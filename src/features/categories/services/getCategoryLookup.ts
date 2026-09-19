import { CategorySelectOption } from "@/@types/category";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export interface CategoryLookupParams {
  excludeId?: string;
}

export async function getCategoryLookup(
  params?: CategoryLookupParams
): Promise<CategorySelectOption[]> {
  await delay(150);

  const { categories } = useMockStore.getState();

  const childrenByParent: Record<string, typeof categories> = {};
  for (const cat of categories) {
    const parentKey = cat.parentId ?? "root";
    (childrenByParent[parentKey] ??= []).push(cat);
  }

  const disabledIds = new Set<string>();
  if (params?.excludeId) {
    const targetId = params.excludeId;
    function markSubtree(id: string) {
      disabledIds.add(id);
      const children = childrenByParent[id] ?? [];
      for (const child of children) {
        markSubtree(child.id);
      }
    }
    markSubtree(targetId);
  }

  const options: CategorySelectOption[] = [];

  function walk(parentId: string | null, depth: number) {
    const items = childrenByParent[parentId ?? "root"] ?? [];
    for (const item of items) {
      options.push({
        id: item.id,
        label: item.name_ar,
        depth,
        disabled: disabledIds.has(item.id),
      });
      walk(item.id, depth + 1);
    }
  }

  walk(null, 0);
  return options;
}
