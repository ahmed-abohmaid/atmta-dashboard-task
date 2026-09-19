"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateVendorInput } from "@/features/vendors/@types/vendor";
import { VENDORS_QUERY_KEYS } from "@/features/vendors/consts/queryKeys";
import { CATEGORIES_QUERY_KEYS } from "@/features/categories/consts/queryKeys";
import { createVendor } from "@/features/vendors/services/createVendor";

export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateVendorInput) => createVendor(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VENDORS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
}
