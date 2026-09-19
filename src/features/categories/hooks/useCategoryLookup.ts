"use client";

import { CategorySelectOption } from "@/@types/category";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { getCategoryLookup } from "@/features/categories/services/getCategoryLookup";

export function useCategoryLookup(excludeId?: string) {
  return useCustomQuery<CategorySelectOption[]>({
    queryKey: CATEGORIES_QUERY_KEYS.lookup(excludeId),
    queryFn: () => getCategoryLookup({ excludeId }),
  });
}
