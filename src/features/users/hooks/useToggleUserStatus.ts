"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { User, UserStatus } from "@/@types/user";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { UserDetailData, UserWithRelations } from "@/features/users/@types/user";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { toggleUserStatus } from "@/features/users/services/toggleUserStatus";

interface ToggleStatusInput {
  id: string;
  status: UserStatus;
}

interface ToggleStatusContext {
  previousLists?: [readonly unknown[], UserWithRelations[] | undefined][];
  previousDetail?: UserDetailData;
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useCustomMutation<User, ToggleStatusInput, ToggleStatusContext>({
    mutationFn: ({ id, status }: ToggleStatusInput) => toggleUserStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEYS.all });

      const previousLists = queryClient.getQueriesData<UserWithRelations[]>({
        queryKey: ["users", "list"],
      });
      const previousDetail = queryClient.getQueryData<UserDetailData>(USERS_QUERY_KEYS.detail(id));

      queryClient.setQueriesData<UserWithRelations[]>({ queryKey: ["users", "list"] }, (old) => {
        if (!old) return old;
        return old.map((u) => (u.id === id ? { ...u, status } : u));
      });

      if (previousDetail) {
        queryClient.setQueryData<UserDetailData>(USERS_QUERY_KEYS.detail(id), {
          ...previousDetail,
          user: {
            ...previousDetail.user,
            status,
          },
        });
      }

      return { previousLists, previousDetail };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(USERS_QUERY_KEYS.detail(id), context.previousDetail);
      }
    },
    onSuccess: (updatedUser) => {
      sileo.success({
        title: "تغيير حالة المستخدم",
        description:
          updatedUser.status === "active"
            ? `تم تفعيل حساب "${updatedUser.name}" بنجاح.`
            : `تم تعطيل حساب "${updatedUser.name}".`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.all });
    },
  });
}
