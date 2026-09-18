import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthSkeleton } from "@/features/auth/components/AuthSkeleton";

export const metadata: Metadata = {
  title: "تسجيل الدخول | منصة أتمتة",
  description: "تسجيل الدخول إلى لوحة تحكم منصة أتمتة الإدارية",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthCard />
    </Suspense>
  );
}
