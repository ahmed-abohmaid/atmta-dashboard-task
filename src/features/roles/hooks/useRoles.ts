"use client";

import { RoleWithUserCount } from "@/@types/role";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { getRoles } from "@/features/roles/services/getRoles";

export function useRoles() {
  const queryResult = useCustomQuery<RoleWithUserCount[]>({
    queryKey: ROLES_QUERY_KEYS.list(),
    queryFn: () => getRoles(),
    staleTime: 60 * 1000,
  });

  return {
    ...queryResult,
    roles: queryResult.data ?? [],
  };
}
