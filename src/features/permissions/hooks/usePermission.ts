"use client";

import { useMemo } from "react";
import { AppAction, AppSubject } from "@/@types/permission";
import { Role } from "@/@types/role";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { useMe } from "@/features/auth/hooks/useMe";
import { PERMISSIONS_QUERY_KEYS } from "@/features/permissions/consts/queryKeys";
import { defineAbilityForUser } from "@/features/permissions/utils/defineAbility";
import { getRoles } from "@/features/roles/services/getRoles";

export function usePermission() {
  const { user, isLoading: isAuthLoading } = useMe();

  const {
    data: roles,
    isLoading: isRolesLoading,
    error: rolesError,
  } = useCustomQuery<Role[]>({
    queryKey: PERMISSIONS_QUERY_KEYS.roles,
    queryFn: () => getRoles(),
    staleTime: Infinity,
  });

  const ability = useMemo(
    () => defineAbilityForUser(user, roles ?? []),
    [user, roles]
  );

  return {
    ability,
    can: (action: AppAction, subject: AppSubject) =>
      Boolean(ability?.can(action, subject)),
    cannot: (action: AppAction, subject: AppSubject) =>
      Boolean(ability?.cannot(action, subject)),
    roles: roles ?? [],
    isSuperAdmin: Boolean(ability?.can("manage", "all")),
    isLoading: isAuthLoading || isRolesLoading,
    error: rolesError,
  };
}
