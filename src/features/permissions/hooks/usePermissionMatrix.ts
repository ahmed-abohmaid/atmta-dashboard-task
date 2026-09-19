"use client";

import { useCallback, useMemo } from "react";
import { Module } from "@/@types/module";
import { Permission } from "@/@types/permission";
import { useModules } from "@/features/modules/hooks/useModules";
import { usePermission } from "@/features/permissions/hooks/usePermission";
import { buildGrantedSet } from "@/features/permissions/utils/matrixUtils";

interface UsePermissionMatrixParams {
  value: Permission[];
  onChange: (permissions: Permission[]) => void;
  disabled?: boolean;
  isSuperAdmin?: boolean;
}

export function usePermissionMatrix({
  value,
  onChange,
  disabled = false,
  isSuperAdmin = false,
}: UsePermissionMatrixParams) {
  const { modules, isLoading } = useModules();
  const { can } = usePermission();

  const isSuperAdminRole =
    isSuperAdmin || value.some((p) => p.action === "manage" && p.subject === "all");

  const isRowDisabled = disabled || isSuperAdminRole;

  const grantedSet = useMemo(
    () => buildGrantedSet(value, modules, isSuperAdminRole),
    [value, modules, isSuperAdminRole]
  );

  const allGrantableActions = useMemo(
    () => modules.flatMap((m) => m.actions.map((a) => ({ subject: m.id, action: a.id }))),
    [modules]
  );

  const selectedCount = useMemo(() => {
    if (isSuperAdminRole) return allGrantableActions.length;
    let count = 0;
    for (const { subject, action } of allGrantableActions) {
      if (grantedSet.has(`${subject}:${action}`)) count++;
    }
    return count;
  }, [isSuperAdminRole, allGrantableActions, grantedSet]);

  const isAllSelected =
    isSuperAdminRole ||
    (allGrantableActions.length > 0 && selectedCount >= allGrantableActions.length);

  const toggleAction = useCallback(
    (subject: string, action: string) => {
      if (isRowDisabled) return;

      const isGranted = grantedSet.has(`${subject}:${action}`);
      onChange(
        isGranted
          ? value.filter((p) => !(p.subject === subject && p.action === action))
          : [...value, { subject, action }]
      );
    },
    [isRowDisabled, grantedSet, value, onChange]
  );

  const getGrantablePermissions = useCallback(
    (mod: Module): Permission[] =>
      mod.actions
        .filter((act) => can(act.id, mod.id))
        .map((act) => ({ subject: mod.id, action: act.id })),
    [can]
  );

  const toggleModule = useCallback(
    (module: Module, selectAll: boolean) => {
      if (isRowDisabled) return;

      const withoutModule = value.filter((p) => p.subject !== module.id);
      onChange(selectAll ? [...withoutModule, ...getGrantablePermissions(module)] : withoutModule);
    },
    [isRowDisabled, value, getGrantablePermissions, onChange]
  );

  const selectAll = useCallback(() => {
    if (isRowDisabled) return;
    onChange(modules.flatMap(getGrantablePermissions));
  }, [isRowDisabled, modules, getGrantablePermissions, onChange]);

  const clearAll = useCallback(() => {
    if (isRowDisabled) return;
    onChange([]);
  }, [isRowDisabled, onChange]);

  return {
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
  };
}
