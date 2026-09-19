"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "cn";
import { ArrowRightIcon, CheckCircle2Icon, ShieldCheckIcon, XCircleIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayoutSkeleton } from "@/components/layout/DashboardLayoutSkeleton";
import { useModule } from "@/features/modules/hooks/useModule";
import { usePermission } from "@/features/permissions/hooks/usePermission";

interface ModuleDetailViewProps {
  moduleId: string;
}

export function ModuleDetailView({ moduleId }: ModuleDetailViewProps) {
  const { module: currentModule, isLoading: isModuleLoading } = useModule(moduleId);
  const { can, isLoading: isPermLoading } = usePermission();

  if (isModuleLoading || isPermLoading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="animate-in fade-in-50 flex flex-col gap-6 duration-200">
      <div className="border-border/60 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="bg-secondary/80 text-primary border-border/50 flex size-11 shrink-0 items-center justify-center rounded-xl border">
            <DynamicIcon
              name={(currentModule.icon as IconName) ?? "layout-grid"}
              className="size-5.5"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <h1 className="text-foreground truncate text-xl font-bold tracking-tight">
              {currentModule.label.ar}
            </h1>
            {currentModule.description?.ar && (
              <p className="text-muted-foreground mt-1 max-w-xl text-xs leading-relaxed">
                {currentModule.description.ar}
              </p>
            )}
          </div>
        </div>

        <Link
          href="/modules"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-8.5 shrink-0 gap-2 rounded-lg px-3.5 text-xs"
          )}
        >
          <span>دليل الوحدات</span>
          <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
        </Link>
      </div>

      <div className="border-border/70 bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-xs">
        <div className="border-border/50 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="text-primary size-4" />
            <span className="text-foreground text-xs font-semibold">
              الإجراءات المتاحة وحالة الصلاحيات
            </span>
          </div>
          <span className="text-muted-foreground font-mono text-[11px]">
            {currentModule.actions.length} إجراء
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentModule.actions.map((act) => {
            const hasPerm = can(act.id, currentModule.id);

            return (
              <div
                key={act.id}
                className="border-border/60 bg-secondary/30 flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-foreground text-xs font-medium">{act.label.ar}</span>
                  {act.isCustom && (
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary bg-primary/5 h-4 px-1.5 py-0 text-[9px]"
                    >
                      مخصص
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {hasPerm ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                      <CheckCircle2Icon className="size-3.5" />
                      <span>متاح</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground inline-flex items-center gap-1 text-[11px] font-normal">
                      <XCircleIcon className="size-3.5" />
                      <span>محجوب</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
