"use client";

import { useCustomQuery } from "@/hooks/useCustomQuery";
import { VENDORS_QUERY_KEYS } from "@/features/vendors/consts/queryKeys";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { getVendorById } from "@/features/vendors/services/getVendorById";

export function useVendor(id: string) {
  const queryResult = useCustomQuery<VendorWithRelations | null>({
    queryKey: VENDORS_QUERY_KEYS.detail(id),
    queryFn: () => getVendorById(id),
    enabled: Boolean(id),
  });

  return {
    ...queryResult,
    vendor: queryResult.data ?? null,
  };
}
