"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { VendorStatus } from "@/@types/vendor";
import { VendorFilterParams } from "@/features/vendors/@types/vendor";

export function useVendorFilters() {
  const [search, setSearchState] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [categoryId, setCategoryState] = useQueryState(
    "category",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [status, setStatusState] = useQueryState(
    "status",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );

  const [from, setFromState] = useQueryState(
    "from",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [to, setToState] = useQueryState(
    "to",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [page, setPageState] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );

  const [pageSize, setPageSizeState] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(10).withOptions({ shallow: true })
  );

  const setSearch = (val: string) => {
    setSearchState(val || null);
    setPageState(1);
  };

  const setCategory = (val: string | null) => {
    setCategoryState(val || null);
    setPageState(1);
  };

  const setStatus = (val: string) => {
    setStatusState(val === "all" ? null : val);
    setPageState(1);
  };

  const setDateRange = (range: { from?: string; to?: string }) => {
    setFromState(range.from || null);
    setToState(range.to || null);
    setPageState(1);
  };

  const setPage = (p: number) => {
    setPageState(p > 1 ? p : null);
  };

  const setPageSize = (ps: number) => {
    setPageSizeState(ps !== 10 ? ps : null);
    setPageState(1);
  };

  const resetFilters = () => {
    setSearchState(null);
    setCategoryState(null);
    setStatusState(null);
    setFromState(null);
    setToState(null);
    setPageState(null);
  };

  const hasActiveFilters = Boolean(
    search.trim() || categoryId.trim() || (status && status !== "all") || from || to
  );

  const filterParams: VendorFilterParams = {
    search: search.trim() || undefined,
    categoryId: categoryId.trim() || undefined,
    status: (status as VendorStatus | "all") || "all",
    from: from || undefined,
    to: to || undefined,
    page,
    pageSize,
  };

  return {
    filters: filterParams,
    search,
    categoryId,
    status,
    from,
    to,
    page,
    pageSize,
    hasActiveFilters,
    setSearch,
    setCategory,
    setStatus,
    setDateRange,
    setPage,
    setPageSize,
    resetFilters,
  };
}
