"use client";

import { parseAsString, useQueryState } from "nuqs";
import { UserStatus } from "@/@types/user";
import { UserFilters } from "@/features/users/@types/user";

export function useUserFilters() {
  const [search, setSearchState] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [role, setRoleState] = useQueryState(
    "role",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );

  const [status, setStatusState] = useQueryState(
    "status",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );

  const setSearch = (val: string) => setSearchState(val || null);

  const setRole = (val: string | null) => setRoleState(val || null);

  const setStatus = (val: string | null) => setStatusState(val === "all" || !val ? null : val);

  const resetFilters = () => {
    setSearchState(null);
    setRoleState(null);
    setStatusState(null);
  };

  const hasActiveFilters = Boolean(search.trim() || role !== "all" || status !== "all");

  const filters: UserFilters = {
    search: search.trim() || undefined,
    role: role !== "all" ? role : undefined,
    status: (status !== "all" ? status : undefined) as UserStatus | undefined,
  };

  return {
    filters,
    search,
    role,
    status,
    hasActiveFilters,
    setSearch,
    setRole,
    setStatus,
    resetFilters,
  };
}
