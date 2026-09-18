"use client";

import { RoleWithUserCount } from "@/@types/role";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { getRoleById } from "@/features/roles/services/getRoleById";

export function useRole(id: string) {
  const queryResult = useCustomQuery<RoleWithUserCount>({
    queryKey: ROLES_QUERY_KEYS.detail(id),
    queryFn: () => getRoleById(id),
    enabled: Boolean(id),
  });

  return {
    ...queryResult,
    role: queryResult.data,
  };
}
