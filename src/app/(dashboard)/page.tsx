"use client";

import { MailIcon, PhoneIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HomeSkeleton } from "@/components/dashboard/HomeSkeleton";
import { useMe } from "@/features/auth/hooks/useMe";
import { ModuleCard } from "@/features/modules/components/ModuleCard";
import { useModules } from "@/features/modules/hooks/useModules";
import { usePermission } from "@/features/permissions/hooks/usePermission";

export default function HomePage() {
  const { user, isLoading: isUserLoading } = useMe();
  const { modules, isLoading: isModulesLoading } = useModules();
  const { can, isLoading: isPermLoading } = usePermission();

  if (isUserLoading || isModulesLoading || isPermLoading) {
    return <HomeSkeleton />;
  }

  const accessibleModules = modules.filter((mod) => can("read", mod.id));

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border/70 from-card via-card to-secondary/20 relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
            أهلاً بك، {user?.name}
          </h1>

          <p className="text-muted-foreground max-w-xl text-xs leading-relaxed sm:text-sm">
            مرحباً بك في لوحة تحكم منصة أتمتة. يمكنك الوصول إلى الأقسام والعمليات المتاحة لحسابك عبر
            القائمة الجانبية أو من خلال بطاقات الوحدات أدناه وفق الصلاحيات الممنوحة لك.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border-border/60 bg-card flex items-center gap-3.5 rounded-xl border p-4 shadow-2xs">
          <div className="bg-secondary text-primary border-border/40 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <UserIcon className="size-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-muted-foreground text-[11px] font-normal">حالة الحساب</span>
            <div className="mt-0.5 flex items-center gap-1.5">
              <Badge
                variant={user?.status === "active" ? "default" : "secondary"}
                className="h-5 text-[11px]"
              >
                {user?.status === "active" ? "نشط" : "معطل"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-border/60 bg-card flex items-center gap-3.5 rounded-xl border p-4 shadow-2xs">
          <div className="bg-secondary text-primary border-border/40 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <MailIcon className="size-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-muted-foreground text-[11px] font-normal">البريد الإلكتروني</span>
            <span className="text-foreground mt-0.5 truncate text-xs font-medium" dir="ltr">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="border-border/60 bg-card flex items-center gap-3.5 rounded-xl border p-4 shadow-2xs">
          <div className="bg-secondary text-primary border-border/40 flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <PhoneIcon className="size-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-muted-foreground text-[11px] font-normal">رقم الهاتف</span>
            <span className="text-foreground mt-0.5 truncate text-xs font-medium" dir="ltr">
              {user?.phone}
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="border-border/60 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="text-primary size-4" />
            <h2 className="text-foreground text-sm font-semibold sm:text-base">
              وحدات النظام المتاحة
            </h2>
          </div>
          <span className="text-muted-foreground font-mono text-xs">
            {accessibleModules.length} من {modules.length} وحدة متاحة
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accessibleModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </section>
    </div>
  );
}
