"use client";

import { useMemo } from "react";
import { CategoryWithRelations } from "@/@types/category";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { getCategories } from "@/features/categories/services/getCategories";
import { buildCategoryTree } from "@/features/categories/utils/tree";

export function useCategories() {
  const queryResult = useCustomQuery<CategoryWithRelations[]>({
    queryKey: CATEGORIES_QUERY_KEYS.list(),
    queryFn: () => getCategories(),
  });

  const categories = useMemo(() => queryResult.data ?? [], [queryResult.data]);

  const tree = useMemo(() => {
    return buildCategoryTree(categories);
  }, [categories]);

  const stats = useMemo(() => {
    const total = categories.length;
    const rootCount = tree.length;
    return {
      total,
      rootCount,
      subCount: total - rootCount,
    };
  }, [categories.length, tree.length]);

  return {
    ...queryResult,
    categories,
    tree,
    stats,
  };
}
