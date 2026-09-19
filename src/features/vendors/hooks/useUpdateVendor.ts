"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { UpdateVendorInput } from "@/features/vendors/@types/vendor";
import { VENDORS_QUERY_KEYS } from "@/features/vendors/consts/queryKeys";
import { updateVendor } from "@/features/vendors/services/updateVendor";

export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateVendorInput) => updateVendor(input),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: VENDORS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: VENDORS_QUERY_KEYS.detail(updated.id) });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
}
