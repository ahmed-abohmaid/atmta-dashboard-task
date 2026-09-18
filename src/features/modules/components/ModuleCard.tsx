"use client";

import { useState } from "react";
import Link from "next/link";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
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
import { ModuleFormDialog } from "@/features/modules/components/dialogs/ModuleFormDialog";
import { DeleteModuleDialog } from "@/features/modules/components/dialogs/DeleteModuleDialog";
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
      <div className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-5 transition-colors duration-150 hover:bg-secondary/15">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <Link
              href={`/modules/${module.id}`}
              className="group/title flex items-center gap-3 min-w-0 cursor-pointer"
            >
              <div className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary border border-border/40 group-hover/title:bg-primary/15 transition-colors duration-150">
                <DynamicIcon
                  name={(module.icon as IconName) ?? "layout-grid"}
                  className="size-5"
                />
              </div>

              <div className="flex flex-col min-w-0 text-start">
                <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover/title:text-primary transition-colors duration-150 truncate">
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
                      className="size-7 text-muted-foreground hover:text-foreground shrink-0"
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
                      className="gap-2 cursor-pointer text-xs"
                    >
                      <PencilIcon className="size-3.5 text-muted-foreground" />
                      <span>تعديل</span>
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <>
                      {canUpdate && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={() => setIsDeleteOpen(true)}
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive text-xs"
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
            <p className="text-xs text-muted-foreground/90 leading-relaxed line-clamp-2 min-h-[2.25rem]">
              {module.description.ar}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3.5 border-t border-border/50 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              الإجراءات المعلنة
            </span>
            <span className="text-[11px] font-mono text-muted-foreground/70">
              {module.actions.length} إجراء
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {standardActions.map((act) => (
              <Badge
                key={act.id}
                variant="secondary"
                className="text-xs font-normal h-6.5 px-2 rounded-md bg-secondary/60 text-muted-foreground border-transparent"
              >
                {act.label.ar}
              </Badge>
            ))}

            {customActions.map((act) => (
              <Badge
                key={act.id}
                variant="outline"
                className="text-xs font-medium h-6.5 px-2.5 rounded-md border-primary/30 bg-primary/10 text-primary"
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
        <DeleteModuleDialog
          module={module}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
        />
      )}
    </>
  );
}
