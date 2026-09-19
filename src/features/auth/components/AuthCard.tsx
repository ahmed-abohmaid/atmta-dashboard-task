import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function AuthCard() {
  return (
    <div className="border-border/70 bg-card w-full max-w-lg rounded-2xl border p-6 shadow-xs sm:p-8 md:max-w-xl md:p-9">
      <div className="mb-6 flex flex-col items-center text-center">
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
        <h1 className="text-foreground text-xl font-bold tracking-tight">تسجيل الدخول</h1>
        <p className="text-muted-foreground mt-1.5 text-xs font-normal sm:text-sm">
          أدخل بيانات حسابك للوصول إلى لوحة تحكم منصة أتمتة
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
