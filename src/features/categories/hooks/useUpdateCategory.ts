"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCategoryInput } from "@/@types/category";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { updateCategory } from "@/features/categories/services/updateCategory";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCategoryInput) => updateCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEYS.all,
      });
    },
  });
}
