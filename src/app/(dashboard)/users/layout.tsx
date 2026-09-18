import type { ReactNode } from "react";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

interface UsersLayoutProps {
  children: ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return <ModuleRouteGuard module="users">{children}</ModuleRouteGuard>;
}
