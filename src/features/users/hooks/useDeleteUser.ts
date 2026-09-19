"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { deleteUser } from "@/features/users/services/deleteUser";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useCustomMutation<string, string>({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.all });
      queryClient.removeQueries({ queryKey: USERS_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });

      sileo.success({
        title: "حذف المستخدم",
        description: "تم حذف المستخدم بنجاح.",
      });
    },
  });
}
