"use client";

import { useState } from "react";
import { LayoutGridIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleFormDialog } from "@/features/modules/components/dialogs/ModuleFormDialog";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

export function ModulesHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          <LayoutGridIcon className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            الوحدات
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            استعراض وإدارة وحدات النظام والإجراءات المعلنة لكل وحدة.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <PermissionGate
          action="create"
          subject="modules"
          renderDisabled
          disabledTooltip="لا تملك صلاحية إضافة وحدات جديدة"
        >
          <Button
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            className="gap-2 text-xs cursor-pointer"
          >
            <PlusIcon className="size-4" />
            <span>إضافة وحدة جديدة</span>
          </Button>
        </PermissionGate>

        {isCreateOpen && (
          <ModuleFormDialog
            mode="create"
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
          />
        )}
      </div>
    </div>
  );
}
