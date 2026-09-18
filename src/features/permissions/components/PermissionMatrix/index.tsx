"use client";

import { ShieldCheckIcon, AlertCircleIcon } from "lucide-react";
import { Permission } from "@/@types/permission";
import { Table, TableBody } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePermissionMatrix } from "@/features/permissions/hooks/usePermissionMatrix";
import { PermissionMatrixToolbar } from "@/features/permissions/components/PermissionMatrix/PermissionMatrixToolbar";
import { PermissionMatrixHeader } from "@/features/permissions/components/PermissionMatrix/PermissionMatrixHeader";
import { PermissionMatrixRow } from "@/features/permissions/components/PermissionMatrix/PermissionMatrixRow";

export interface PermissionMatrixProps {
  value: Permission[];
  onChange: (permissions: Permission[]) => void;
  disabled?: boolean;
  isSuperAdmin?: boolean;
  disabledReason?: string;
}

export function PermissionMatrix({
  value,
  onChange,
  disabled = false,
  isSuperAdmin = false,
  disabledReason,
}: PermissionMatrixProps) {
  const {
    modules,
    isLoading,
    isSuperAdminRole,
    isRowDisabled,
    isAllSelected,
    grantedSet,
    allGrantableActions,
    selectedCount,
    can,
    toggleAction,
    toggleModule,
    selectAll,
    clearAll,
  } = usePermissionMatrix({
    value,
    onChange,
    disabled,
    isSuperAdmin,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-border/70 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {isSuperAdminRole && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-xs text-primary">
          <ShieldCheckIcon className="size-4 shrink-0" />
          <span>
            دور مدير النظام (Super Admin) يمتلك صلاحية شاملة للنظام تلقائياً (صلاحية كاملة لجميع الوحدات والإجراءات).
          </span>
        </div>
      )}

      {disabled && !isSuperAdminRole && disabledReason && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-300">
          <AlertCircleIcon className="size-4 shrink-0" />
          <span>{disabledReason}</span>
        </div>
      )}

      <PermissionMatrixToolbar
        selectedCount={selectedCount}
        totalCount={allGrantableActions.length}
        isAllSelected={isAllSelected}
        disabled={isRowDisabled}
        onSelectAll={selectAll}
        onClearAll={clearAll}
      />

      <div className="rounded-xl border border-border/70 bg-card/40 overflow-hidden">
        <Table className="text-xs">
          <PermissionMatrixHeader />
          <TableBody className="divide-y divide-border/50">
            {modules.map((mod) => (
              <PermissionMatrixRow
                key={mod.id}
                module={mod}
                grantedSet={grantedSet}
                isRowDisabled={isRowDisabled}
                isSuperAdminRole={isSuperAdminRole}
                can={can}
                onToggleAction={toggleAction}
                onToggleModule={toggleModule}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
