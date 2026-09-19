"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface CategoriesHeaderProps {
  onAddCategory?: () => void;
}

export function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <PageHeader
      title="التصنيفات الهندسية والمعمارية"
      description="إدارة شجرة التصنيفات بمرونة وعمق لا نهائي مع ربط الموردين والتحكم بالهرمية."
      actions={
        <PermissionGate
          action="create"
          subject="categories"
          renderDisabled
          disabledTooltip="لا تملك صلاحية إنشاء تصنيفات جديدة"
        >
          <Button
            size="sm"
            onClick={onAddCategory}
            className="gap-2 text-xs cursor-pointer"
          >
            <PlusIcon className="size-4" />
            <span>إضافة تصنيف رئيسي</span>
          </Button>
        </PermissionGate>
      }
    />
  );
}
