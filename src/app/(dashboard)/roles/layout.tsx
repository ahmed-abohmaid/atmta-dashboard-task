import type { ReactNode } from "react";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

interface RolesLayoutProps {
  children: ReactNode;
}

export default function RolesLayout({ children }: RolesLayoutProps) {
  return <ModuleRouteGuard module="roles">{children}</ModuleRouteGuard>;
}
