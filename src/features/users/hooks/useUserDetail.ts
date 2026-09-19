"use client";

import { useCustomQuery } from "@/hooks/useCustomQuery";
import { UserDetailData } from "@/features/users/@types/user";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { getUserById } from "@/features/users/services/getUserById";

export function useUserDetail(id: string) {
  const queryResult = useCustomQuery<UserDetailData | null>({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });

  return {
    ...queryResult,
    userDetail: queryResult.data ?? null,
  };
}
