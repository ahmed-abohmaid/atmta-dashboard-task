import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { AuthResponse, LoginCredentials } from "@/features/auth/@types/auth";
import { AUTH_QUERY_KEYS } from "@/features/auth/consts/queryKeys";
import { login } from "@/features/auth/services/login";
import { setSessionCookie } from "@/features/auth/utils/sessionCookie";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<AuthResponse, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    disableDefaultErrorToast: true,
    onSuccess: (data) => {
      setSessionCookie(data.session);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, data.user);
      sileo.success({
        title: "تسجيل الدخول",
        description: `أهلاً بك، ${data.user.name}`,
      });
      const raw = searchParams.get("redirect") || "/";
      const redirectPath = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/"; // Prevent open redirect attacks
      router.replace(redirectPath);
    },
  });

  return mutation;
}
