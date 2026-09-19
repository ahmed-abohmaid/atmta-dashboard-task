"use client";

import Link from "next/link";
import { ArrowRightIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { VendorStatusBadge } from "@/features/vendors/components/VendorsTable/VendorStatusBadge";

interface VendorDetailHeaderProps {
  vendor: VendorWithRelations;
  onEdit: () => void;
  onDelete: () => void;
}

export function VendorDetailHeader({ vendor, onEdit, onDelete }: VendorDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link
          href="/vendors"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
        >
          <ArrowRightIcon className="size-3.5" />
          <span>العودة إلى قائمة الموردين</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-foreground text-xl font-bold tracking-tight">{vendor.name_ar}</h1>
          <VendorStatusBadge status={vendor.status} />
        </div>

        <div className="flex items-center gap-2">
          <PermissionGate action="update" subject="vendors">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="h-9 cursor-pointer gap-1.5 text-xs"
            >
              <PencilIcon className="size-3.5" />
              تعديل البيانات
            </Button>
          </PermissionGate>

          <PermissionGate action="delete" subject="vendors">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="h-9 cursor-pointer gap-1.5 text-xs font-medium"
            >
              <Trash2Icon className="size-3.5" />
              حذف المورد
            </Button>
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
