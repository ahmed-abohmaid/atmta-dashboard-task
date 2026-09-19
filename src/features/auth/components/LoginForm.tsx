"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/fields/InputField";
import { LoginCredentials } from "@/features/auth/@types/auth";
import { AuthError } from "@/features/auth/components/AuthError";
import { TestAccountsPicker } from "@/features/auth/components/TestAccountsPicker";
import { useLogin } from "@/features/auth/hooks/useLogin";

const loginSchema = z.object({
  email: z.email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values as LoginCredentials);
  };

  const handleSelectAccount = (email: string, password: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-5">
      {loginMutation.error && <AuthError message={loginMutation.error.message} />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="email"
          label="البريد الإلكتروني"
          type="email"
          placeholder="name@atmta.test"
          className="h-10"
          disabled={loginMutation.isPending}
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          id="password"
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="h-10"
          disabled={loginMutation.isPending}
          error={errors.password?.message}
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loginMutation.isPending}
              className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title={showPassword ? "إخفاء كلمة المرور" : "عرض كلمة المرور"}
            >
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          }
          {...register("password")}
        />

        <Button
          type="submit"
          size="lg"
          isLoading={loginMutation.isPending}
          className="mt-2 h-10 w-full text-sm font-medium"
        >
          <LogInIcon className="size-4" />
          <span>تسجيل الدخول</span>
        </Button>
      </form>

      <TestAccountsPicker
        onSelectAccount={handleSelectAccount}
        disabled={loginMutation.isPending}
      />
    </div>
  );
}
