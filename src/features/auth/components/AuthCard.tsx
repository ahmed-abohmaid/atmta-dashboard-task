import { LayersIcon } from "lucide-react";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function AuthCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/25 mb-3">
          <LayersIcon className="size-6" />
        </div>
        <h1 className="text-lg font-semibold text-foreground">
          تسجيل الدخول
        </h1>
        <p className="text-xs font-normal text-muted-foreground mt-1">
          أدخل بيانات حسابك للوصول إلى لوحة تحكم منصة أتمتة
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
