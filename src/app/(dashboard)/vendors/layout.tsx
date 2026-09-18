import type { ReactNode } from "react";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

interface VendorsLayoutProps {
  children: ReactNode;
}

export default function VendorsLayout({ children }: VendorsLayoutProps) {
  return <ModuleRouteGuard module="vendors">{children}</ModuleRouteGuard>;
}
