"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { User } from "@/@types/user";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { AUTH_QUERY_KEYS } from "@/features/auth/consts/queryKeys";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { UpdateUserInput } from "@/features/users/@types/user";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { updateUser } from "@/features/users/services/updateUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useCustomMutation<User, UpdateUserInput>({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.detail(updatedUser.id) });
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });

      sileo.success({
        title: "تحديث المستخدم",
        description: `تم تحديث بيانات وصلاحيات "${updatedUser.name}" بنجاح.`,
      });
    },
  });
}
