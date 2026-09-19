"use client";

import { useCustomQuery } from "@/hooks/useCustomQuery";
import { UserFilters, UserWithRelations } from "@/features/users/@types/user";
import { USERS_QUERY_KEYS } from "@/features/users/consts/queryKeys";
import { getUsers } from "@/features/users/services/getUsers";

const EMPTY_USERS: UserWithRelations[] = [];

export function useUsers(filters?: UserFilters) {
  const queryResult = useCustomQuery<UserWithRelations[]>({
    queryKey: USERS_QUERY_KEYS.list(filters),
    queryFn: () => getUsers(filters),
  });

  return {
    ...queryResult,
    users: queryResult.data ?? EMPTY_USERS,
  };
}
