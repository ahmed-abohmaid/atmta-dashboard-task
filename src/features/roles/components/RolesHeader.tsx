"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoleFormDialog } from "@/features/roles/components/dialogs/RoleFormDialog";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

export function RolesHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="الأدوار والصلاحيات"
        description="إدارة أدوار المستخدمين وصلاحيات الوصول في النظام."
        actions={
          <PermissionGate
            action="create"
            subject="roles"
            renderDisabled
            disabledTooltip="لا تملك صلاحية إنشاء أدوار جديدة"
          >
            <Button
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="gap-2 text-xs cursor-pointer"
            >
              <PlusIcon className="size-4" />
              <span>إضافة دور</span>
            </Button>
          </PermissionGate>
        }
      />

      {isCreateOpen && (
        <RoleFormDialog
          mode="create"
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
        />
      )}
    </>
  );
}
