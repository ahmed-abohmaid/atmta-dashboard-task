"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface PermissionMatrixToolbarProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  disabled: boolean;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function PermissionMatrixToolbar({
  selectedCount,
  totalCount,
  isAllSelected,
  disabled,
  onSelectAll,
  onClearAll,
}: PermissionMatrixToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-secondary/20 px-3 py-2 text-xs">
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">الصلاحيات المحددة:</span>
        <Badge variant="secondary" className="px-2 py-0.5 text-xs">
          {selectedCount} من {totalCount}
        </Badge>
      </div>

      {!disabled && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all-permissions"
            checked={isAllSelected}
            onCheckedChange={(checked) => {
              if (checked === true) {
                onSelectAll();
              } else {
                onClearAll();
              }
            }}
            aria-label="تحديد كافة الصلاحيات"
          />
          <label
            htmlFor="select-all-permissions"
            className="text-xs font-medium text-foreground cursor-pointer select-none"
          >
            تحديد الكل
          </label>
        </div>
      )}
    </div>
  );
}
