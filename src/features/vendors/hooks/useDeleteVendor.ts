"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { VENDORS_QUERY_KEYS } from "@/features/vendors/consts/queryKeys";
import { deleteVendor } from "@/features/vendors/services/deleteVendor";

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VENDORS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
}
