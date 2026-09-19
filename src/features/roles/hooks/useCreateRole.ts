"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { CreateRoleInput, RoleWithUserCount } from "@/@types/role";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { createRole } from "@/features/roles/services/createRole";

export function useCreateRole() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<RoleWithUserCount, CreateRoleInput>({
    mutationFn: (data: CreateRoleInput) => createRole(data),
    onSuccess: (newRole) => {
      queryClient.setQueryData<RoleWithUserCount[]>(ROLES_QUERY_KEYS.list(), (old) =>
        old ? [...old, newRole] : [newRole]
      );

      sileo.success({
        title: "إضافة دور",
        description: `تم إنشاء الدور "${newRole.name}" بنجاح.`,
      });
    },
  });

  return mutation;
}
