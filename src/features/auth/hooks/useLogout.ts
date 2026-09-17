import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { AUTH_QUERY_KEYS } from "@/features/auth/consts/queryKeys";
import { logout } from "@/features/auth/services/logout";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<void, void>({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, null);
      sileo.info({
        title: "تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      router.replace("/login");
    },
  });

  return mutation;
}
