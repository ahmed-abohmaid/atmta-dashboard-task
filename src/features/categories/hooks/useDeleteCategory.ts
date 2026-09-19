"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/features/categories/services/deleteCategory";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEYS.all,
      });
    },
  });
}
