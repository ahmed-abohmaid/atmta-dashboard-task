"use client";

import { SidebarContent } from "@/components/ui/sidebar";
import { SidebarMainNav } from "@/components/layout/sidebar/nav/SidebarMainNav";
import { SidebarModulesNav } from "@/components/layout/sidebar/nav/SidebarModulesNav";
import { usePermission } from "@/features/permissions/hooks/usePermission";

export function SidebarNav() {
  const { can, isLoading: isPermLoading } = usePermission();

  return (
    <SidebarContent>
      <SidebarMainNav can={can} isLoading={isPermLoading} />
      <SidebarModulesNav can={can} isPermLoading={isPermLoading} />
    </SidebarContent>
  );
}
