"use client";

import type { ReactNode } from "react";
import { AppAction } from "@/@types/permission";
import { DashboardLayoutSkeleton } from "@/components/layout/DashboardLayoutSkeleton";
import { ForbiddenState } from "@/features/permissions/components/ForbiddenState";
import { usePermission } from "@/features/permissions/hooks/usePermission";

interface ModuleRouteGuardProps {
  module: string;
  action?: AppAction;
  children: ReactNode;
}

export function ModuleRouteGuard({
  module,
  action = "read",
  children,
}: ModuleRouteGuardProps) {
  const { can, isLoading } = usePermission();

  if (isLoading) {
    return <DashboardLayoutSkeleton />;
  }

  const isAllowed = can(action, module);

  if (!isAllowed) {
    return <ForbiddenState module={module} />;
  }

  return <>{children}</>;
}
