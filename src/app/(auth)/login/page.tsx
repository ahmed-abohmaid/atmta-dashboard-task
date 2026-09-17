import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";

export const metadata: Metadata = {
  title: "تسجيل الدخول | منصة أتمتة",
  description: "تسجيل الدخول إلى لوحة تحكم منصة أتمتة الإدارية",
};

export default function LoginPage() {
  return <AuthCard />;
}
