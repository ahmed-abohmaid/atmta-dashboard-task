"use client";

import { DownloadIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface VendorsHeaderProps {
  totalCount?: number;
  onAddVendor: () => void;
  onExportCsv: () => void;
  isExporting?: boolean;
}

export function VendorsHeader({
  totalCount,
  onAddVendor,
  onExportCsv,
  isExporting = false,
}: VendorsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-xl font-bold tracking-tight">الموردون</h1>
        {totalCount !== undefined && (
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 font-mono text-xs font-medium"
          >
            {totalCount}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <PermissionGate
          action="export"
          subject="vendors"
          renderDisabled
          disabledTooltip="تصدير بيانات الموردين يتطلب صلاحية 'تصدير الموردين'"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExportCsv}
            isLoading={isExporting}
            disabled={isExporting}
            className="h-9 cursor-pointer gap-2 text-xs"
          >
            <DownloadIcon className="size-3.5" />
            تصدير CSV
          </Button>
        </PermissionGate>

        <PermissionGate
          action="create"
          subject="vendors"
          renderDisabled
          disabledTooltip="إضافة مورد تتطلب صلاحية 'إضافة مورد'"
        >
          <Button
            type="button"
            size="sm"
            onClick={onAddVendor}
            className="h-9 cursor-pointer gap-2 text-xs font-medium"
          >
            <PlusIcon className="size-3.5" />
            إضافة مورد
          </Button>
        </PermissionGate>
      </div>
    </div>
  );
}
