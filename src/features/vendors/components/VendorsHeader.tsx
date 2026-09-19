"use client";

import { DownloadIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          الموردون
        </h1>
        {totalCount !== undefined && (
          <Badge
            variant="secondary"
            className="text-xs font-mono font-medium rounded-md px-2 py-0.5 bg-secondary text-secondary-foreground"
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
            className="text-xs cursor-pointer gap-2 h-9"
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
            className="text-xs cursor-pointer gap-2 h-9 font-medium"
          >
            <PlusIcon className="size-3.5" />
            إضافة مورد
          </Button>
        </PermissionGate>
      </div>
    </div>
  );
}
