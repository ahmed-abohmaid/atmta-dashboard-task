import Link from "next/link";
import { AppShell } from "@/components/layout/appShell";
import {
  UsersIcon,
  ShieldCheckIcon,
  FolderTreeIcon,
  Building2Icon,
  ArrowUpLeftIcon,
  LayersIcon,
} from "lucide-react";

export default function Home() {
  const modules = [
    {
      title: "المستخدمون",
      count: "4",
      description: "إدارة الحسابات وتحديد مستويات الوصول",
      href: "/users",
      icon: UsersIcon,
    },
    {
      title: "الأدوار والصلاحيات",
      count: "4",
      description: "تحديد الأدوار وقواعد الصلاحيات",
      href: "/roles",
      icon: ShieldCheckIcon,
    },
    {
      title: "التصنيفات",
      count: "8",
      description: "شجرة التصنيفات الهندسية والمعمارية",
      href: "/categories",
      icon: FolderTreeIcon,
    },
    {
      title: "الموردون",
      count: "12",
      description: "قائمة المقاولين والموردين المعتمدين",
      href: "/vendors",
      icon: Building2Icon,
    },
  ];

  return (
    <AppShell
      headerTitle="نظرة عامة"
      headerSubtitle="لوحة تحكم منصة أتمتة"
    >
      <div className="flex flex-col gap-6">
        <section className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/20">
                <LayersIcon className="size-5" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-medium text-foreground">
                  لوحة التحكم
                </h2>
                <p className="text-xs font-normal text-muted-foreground mt-0.5">
                  نظرة سريعة على أقسام النظام والمستخدمين والبيانات المتاحة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-normal text-secondary-foreground border border-border/50">
                بيانات تجريبية
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod) => (
            <Link
              key={mod.title}
              href={mod.href}
              className="group flex flex-col justify-between rounded-xl border border-border/70 bg-card p-5 shadow-xs transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-muted-foreground">
                  {mod.title}
                </span>
                <div className="flex size-8 items-center justify-center rounded-md bg-secondary/70 text-primary border border-border/40">
                  <mod.icon className="size-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-medium tracking-tight text-foreground">
                  {mod.count}
                </span>
                <span className="flex items-center gap-1 text-xs font-normal text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>عرض</span>
                  <ArrowUpLeftIcon className="size-3" />
                </span>
              </div>

              <p className="mt-2 text-xs font-normal text-muted-foreground/80 line-clamp-1">
                {mod.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
