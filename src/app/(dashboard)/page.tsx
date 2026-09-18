"use client";

import { UserIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HomeSkeleton } from "@/components/dashboard/HomeSkeleton";
import { useMe } from "@/features/auth/hooks/useMe";

export default function HomePage() {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-card via-card to-secondary/20 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            أهلاً بك، {user?.name}
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            مرحباً بك في لوحة تحكم منصة أتمتة. يمكنك الوصول إلى الأقسام
            والعمليات المتاحة لحسابك عبر القائمة الجانبية وفق الصلاحيات الممنوحة
            لك.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3.5 rounded-xl border border-border/60 bg-card p-4 shadow-2xs">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary border border-border/40">
            <UserIcon className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-muted-foreground font-normal">
              حالة الحساب
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge
                variant={user?.status === "active" ? "default" : "secondary"}
                className="text-[11px] h-5"
              >
                {user?.status === "active" ? "نشط" : "معطل"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-border/60 bg-card p-4 shadow-2xs">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary border border-border/40">
            <MailIcon className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-muted-foreground font-normal">
              البريد الإلكتروني
            </span>
            <span
              className="truncate text-xs font-medium text-foreground mt-0.5"
              dir="ltr"
            >
              {user?.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-border/60 bg-card p-4 shadow-2xs">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary border border-border/40">
            <PhoneIcon className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-muted-foreground font-normal">
              رقم الهاتف
            </span>
            <span
              className="truncate text-xs font-medium text-foreground mt-0.5"
              dir="ltr"
            >
              {user?.phone}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
