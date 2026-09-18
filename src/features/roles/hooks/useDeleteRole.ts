"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { RoleWithUserCount } from "@/@types/role";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { deleteRole } from "@/features/roles/services/deleteRole";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<void, string>({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<RoleWithUserCount[]>(
        ROLES_QUERY_KEYS.list(),
        (old) => (old ? old.filter((r) => r.id !== id) : [])
      );

      sileo.success({
        title: "حذف الدور",
        description: "تم حذف الدور بنجاح من النظام.",
      });
    },
  });

  return mutation;
}
