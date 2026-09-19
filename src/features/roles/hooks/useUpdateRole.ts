"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { RoleWithUserCount, UpdateRoleInput } from "@/@types/role";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { AUTH_QUERY_KEYS } from "@/features/auth/consts/queryKeys";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { updateRole } from "@/features/roles/services/updateRole";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<RoleWithUserCount, UpdateRoleInput>({
    mutationFn: (data: UpdateRoleInput) => updateRole(data),
    onSuccess: (updatedRole) => {
      queryClient.setQueryData<RoleWithUserCount[]>(ROLES_QUERY_KEYS.list(), (old) =>
        old ? old.map((r) => (r.id === updatedRole.id ? updatedRole : r)) : [updatedRole]
      );
      queryClient.setQueryData(ROLES_QUERY_KEYS.detail(updatedRole.id), updatedRole);
      // Invalidate me query in case current user's abilities changed
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });

      sileo.success({
        title: "تعديل الدور",
        description: `تم تحديث الدور "${updatedRole.name}" بنجاح.`,
      });
    },
  });

  return mutation;
}
