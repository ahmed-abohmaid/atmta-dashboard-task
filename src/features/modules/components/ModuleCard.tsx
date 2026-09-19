"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Module } from "@/@types/module";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModuleDialog } from "@/features/modules/components/dialogs/DeleteModuleDialog";
import { ModuleFormDialog } from "@/features/modules/components/dialogs/ModuleFormDialog";
import { usePermission } from "@/features/permissions/hooks/usePermission";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { can } = usePermission();

  const canUpdate = can("update", "modules");
  const canDelete = can("delete", "modules");

  const customActions = module.actions.filter((a) => a.isCustom);
  const standardActions = module.actions.filter((a) => !a.isCustom);

  return (
    <>
      <div className="group border-border/70 bg-card hover:bg-secondary/15 relative flex flex-col justify-between rounded-xl border p-5 transition-colors duration-150">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <Link
              href={`/modules/${module.id}`}
              className="group/title flex min-w-0 cursor-pointer items-center gap-3"
            >
              <div className="bg-secondary/80 text-primary border-border/40 group-hover/title:bg-primary/15 flex size-9.5 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150">
                <DynamicIcon name={(module.icon as IconName) ?? "layout-grid"} className="size-5" />
              </div>

              <div className="flex min-w-0 flex-col text-start">
                <h3 className="text-foreground group-hover/title:text-primary truncate text-sm font-semibold transition-colors duration-150 sm:text-base">
                  {module.label.ar}
                </h3>
              </div>
            </Link>

            {(canUpdate || canDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-muted-foreground hover:text-foreground size-7 shrink-0"
                      aria-label="خيارات الوحدة"
                    />
                  }
                >
                  <MoreHorizontalIcon className="size-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 text-xs">
                  {canUpdate && (
                    <DropdownMenuItem
                      onClick={() => setIsEditOpen(true)}
                      className="cursor-pointer gap-2 text-xs"
                    >
                      <PencilIcon className="text-muted-foreground size-3.5" />
                      <span>تعديل</span>
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <>
                      {canUpdate && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={() => setIsDeleteOpen(true)}
                        className="text-destructive focus:text-destructive cursor-pointer gap-2 text-xs"
                      >
                        <Trash2Icon className="size-3.5" />
                        <span>حذف</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {module.description?.ar && (
            <p className="text-muted-foreground/90 line-clamp-2 min-h-[2.25rem] text-xs leading-relaxed">
              {module.description.ar}
            </p>
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

      {isEditOpen && (
        <ModuleFormDialog
          mode="edit"
          module={module}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isDeleteOpen && (
        <DeleteModuleDialog module={module} open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      )}
    </>
  );
}
