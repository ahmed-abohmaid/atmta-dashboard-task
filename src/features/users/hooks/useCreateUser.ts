"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { User } from "@/@types/user";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { ROLES_QUERY_KEYS } from "@/features/roles/consts/queryKeys";
import { CreateUserInput } from "@/features/users/@types/user";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { createUser } from "@/features/users/services/createUser";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useCustomMutation<User, CreateUserInput>({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });

      sileo.success({
        title: "إضافة مستخدم",
        description: `تم إنشاء المستخدم "${newUser.name}" بنجاح.`,
      });
    },
  });
}
