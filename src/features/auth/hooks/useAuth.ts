import { useCustomQuery } from "@/hooks/useCustomQuery";
import { AUTH_QUERY_KEYS } from "@/features/auth/consts/queryKeys";
import { getCurrentSessionUser } from "@/features/auth/services/getCurrentSessionUser";
import { User } from "@/@types/user";

export function useAuth() {
  const queryResult = useCustomQuery<User | null>({
    queryKey: AUTH_QUERY_KEYS.me,
    queryFn: () => getCurrentSessionUser(),
    staleTime: Infinity,
  });

  return {
    ...queryResult,
    user: queryResult.data ?? null,
    isAuthenticated: !!queryResult.data,
  };
}
