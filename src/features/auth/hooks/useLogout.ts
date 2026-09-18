import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { logout } from "@/features/auth/services/logout";
import { removeSessionCookie } from "@/features/auth/utils/sessionCookie";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useCustomMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeSessionCookie();
      queryClient.clear();
      sileo.info({
        title: "تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      router.replace("/login");
    },
  });

  return mutation;
}
