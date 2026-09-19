import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function AuthCard() {
  return (
    <div className="w-full max-w-lg md:max-w-xl rounded-2xl border border-border/70 bg-card p-6 sm:p-8 md:p-9 shadow-xs">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="mb-5">
          <Image
            src="/logo/atmta-logo.png"
            alt="شعار منصة أتمتة"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          تسجيل الدخول
        </h1>
        <p className="text-xs sm:text-sm font-normal text-muted-foreground mt-1.5">
          أدخل بيانات حسابك للوصول إلى لوحة تحكم منصة أتمتة
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
