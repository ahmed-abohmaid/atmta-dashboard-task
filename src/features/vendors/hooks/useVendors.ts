"use client";

import { useCustomQuery } from "@/hooks/useCustomQuery";
import { PaginatedVendorsResult, VendorFilterParams } from "@/features/vendors/@types/vendor";
import { VENDORS_QUERY_KEYS } from "@/features/vendors/consts/queryKeys";
import { getVendors } from "@/features/vendors/services/getVendors";

const EMPTY_VENDORS: PaginatedVendorsResult["items"] = [];

export function useVendors(filters?: VendorFilterParams) {
  const queryResult = useCustomQuery<PaginatedVendorsResult>({
    queryKey: VENDORS_QUERY_KEYS.list(filters),
    queryFn: () => getVendors(filters),
  });

  return {
    ...queryResult,
    vendors: queryResult.data?.items ?? EMPTY_VENDORS,
    total: queryResult.data?.total ?? 0,
    totalPages: queryResult.data?.totalPages ?? 1,
    page: queryResult.data?.page ?? 1,
    pageSize: queryResult.data?.pageSize ?? 10,
  };
}
