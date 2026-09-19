"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategoryInput } from "@/@types/category";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { createCategory } from "@/features/categories/services/createCategory";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEYS.all,
      });
    },
  });
}
