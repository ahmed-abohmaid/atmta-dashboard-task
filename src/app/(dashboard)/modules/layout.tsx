import type { ReactNode } from "react";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

interface ModulesLayoutProps {
  children: ReactNode;
}

export default function ModulesLayout({ children }: ModulesLayoutProps) {
  return <ModuleRouteGuard module="modules">{children}</ModuleRouteGuard>;
}
