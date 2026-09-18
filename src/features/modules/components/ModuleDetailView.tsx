"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";
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
    <div className="flex flex-col gap-6 animate-in fade-in-50 duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/80 text-primary border border-border/50">
              <DynamicIcon
                name={(currentModule.icon as IconName) ?? "layout-grid"}
                className="size-5.5"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-foreground truncate">
                {currentModule.label.ar}
              </h1>
              {currentModule.description?.ar && (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl">
                  {currentModule.description.ar}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/modules"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-8.5 px-3.5 gap-2 text-xs rounded-lg shrink-0"
            )}
          >
            <span>دليل الوحدات</span>
            <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                الإجراءات المتاحة وحالة الصلاحيات
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              {currentModule.actions.length} إجراء
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {currentModule.actions.map((act) => {
              const hasPerm = can(act.id, currentModule.id);

              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-secondary/30"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground">
                      {act.label.ar}
                    </span>
                    {act.isCustom && (
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 h-4 border-primary/30 text-primary bg-primary/5"
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
                      <span className="inline-flex items-center gap-1 text-[11px] font-normal text-muted-foreground">
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
