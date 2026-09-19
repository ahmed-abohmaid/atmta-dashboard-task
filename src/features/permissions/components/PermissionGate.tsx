"use client";

import { type ReactNode } from "react";
import { AppAction, AppSubject } from "@/@types/permission";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
    if (renderDisabled) {
      return (
        <span className="pointer-events-none inline-flex opacity-40 select-none">{children}</span>
      );
    }
    return null;
  }

  const isAllowed = can(action, subject);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (renderDisabled) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <span className="inline-flex cursor-not-allowed">
              <span className="pointer-events-none opacity-50 select-none">{children}</span>
            </span>
          }
        />
        <TooltipContent side="top" className="text-xs">
          {disabledTooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return <>{fallback}</>;
}
