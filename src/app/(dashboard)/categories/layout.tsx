import type { ReactNode } from "react";
import { ModuleRouteGuard } from "@/features/permissions/components/ModuleRouteGuard";

interface CategoriesLayoutProps {
  children: ReactNode;
}

export default function CategoriesLayout({ children }: CategoriesLayoutProps) {
  return <ModuleRouteGuard module="categories">{children}</ModuleRouteGuard>;
}
