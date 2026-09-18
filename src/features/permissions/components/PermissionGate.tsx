"use client";

import { cloneElement, isValidElement, type ReactNode } from "react";
import { AppAction, AppSubject } from "@/@types/permission";
import { usePermission } from "@/features/permissions/hooks/usePermission";

interface PermissionGateProps {
  action: AppAction;
  subject: AppSubject;
  children: ReactNode;
  fallback?: ReactNode;
  renderDisabled?: boolean;
  disabledTooltip?: string;
}

export function PermissionGate({
  action,
  subject,
  children,
  fallback = null,
  renderDisabled = false,
  disabledTooltip = "ليس لديك صلاحية لتنفيذ هذا الإجراء",
}: PermissionGateProps) {
  const { can, isLoading } = usePermission();

  if (isLoading) {
    return null;
  }

  const isAllowed = can(action, subject);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (
    renderDisabled &&
    isValidElement<{
      disabled?: boolean;
      title?: string;
      "aria-disabled"?: boolean | "true" | "false";
    }>(children)
  ) {
    return cloneElement(children, {
      disabled: true,
      title: disabledTooltip,
      "aria-disabled": true,
    });
  }

  return <>{fallback}</>;
}
