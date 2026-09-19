"use client";

import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Module } from "@/@types/module";
import { Badge } from "@/components/ui/badge";
import { TruncatedText } from "@/components/ui/truncatedText";
import { usePermission } from "@/features/permissions/hooks/usePermission";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const { can } = usePermission();
  const canRead = can("read", module.id);
  const targetHref = module.path ?? `/modules/${module.id}`;

  const customActions = module.actions.filter((a) => a.isCustom);
  const standardActions = module.actions.filter((a) => !a.isCustom);

  return (
    <div className="group border-border/70 bg-card hover:bg-secondary/15 relative flex flex-col justify-between rounded-xl border p-5 transition-colors duration-150">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={targetHref}
            className="group/title flex min-w-0 cursor-pointer items-center gap-3"
          >
            <div className="border-border/40 bg-secondary/80 text-primary group-hover/title:bg-primary/15 flex size-9.5 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150">
              <DynamicIcon name={(module.icon as IconName) ?? "layout-grid"} className="size-5" />
            </div>

            <div className="flex min-w-0 flex-col text-start">
              <h3 className="text-foreground group-hover/title:text-primary truncate text-sm font-semibold transition-colors duration-150 sm:text-base">
                {module.label.ar}
              </h3>
            </div>
          </Link>

          {canRead ? (
            <Link
              href={targetHref}
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
            >
              <span>فتح الوحدة</span>
              <ArrowUpLeftIcon className="size-3.5 rtl:rotate-0" />
            </Link>
          ) : (
            <span className="text-muted-foreground/60 text-[11px]">محجوب</span>
          )}
        </div>

        {module.description?.ar && (
          <TruncatedText
            text={module.description.ar}
            className="text-muted-foreground/90 line-clamp-2 min-h-9 text-xs leading-relaxed"
          />
        )}
      </div>

      <div className="border-border/50 mt-4 flex flex-col gap-2 border-t pt-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">الإجراءات المعلنة</span>
          <span className="text-muted-foreground/70 font-mono text-[11px]">
            {module.actions.length} إجراء
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {standardActions.map((act) => (
            <Badge
              key={act.id}
              variant="secondary"
              className="bg-secondary/60 text-muted-foreground h-6.5 rounded-md border-transparent px-2 text-xs font-normal"
            >
              {act.label.ar}
            </Badge>
          ))}

          {customActions.map((act) => (
            <Badge
              key={act.id}
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary h-6.5 rounded-md px-2.5 text-xs font-medium"
            >
              {act.label.ar}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
