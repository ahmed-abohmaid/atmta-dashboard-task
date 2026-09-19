"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface UsersHeaderProps {
  onAddClick: () => void;
}

export function UsersHeader({ onAddClick }: UsersHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-foreground text-xl font-bold tracking-tight">المستخدمون</h1>
        <p className="text-muted-foreground mt-0.5 text-xs">
          إدارة الحسابات، تعيين الأدوار، وتخصيص صلاحيات الوحدات للنظام
        </p>
      </div>

      <PermissionGate action="create" subject="users">
        <Button onClick={onAddClick} size="sm" className="gap-1.5 self-start text-xs sm:self-auto">
          <PlusIcon className="size-3.5" />
          <span>إضافة مستخدم</span>
        </Button>
      </PermissionGate>
    </div>
  );
}
