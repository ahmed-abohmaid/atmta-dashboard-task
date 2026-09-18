"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { ModuleFormDialog } from "@/features/modules/components/dialogs/ModuleFormDialog";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

export function ModulesHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="الوحدات"
        description="استعراض وإدارة وحدات النظام والإجراءات المعلنة لكل وحدة."
        actions={
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
        }
      />

      {isCreateOpen && (
        <ModuleFormDialog
          mode="create"
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        />
      )}
    </>
  );
}
