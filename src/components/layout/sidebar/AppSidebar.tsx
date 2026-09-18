"use client";

import type { ComponentProps } from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { SidebarBrand } from "@/components/layout/sidebar/SidebarBrand";
import { SidebarNav } from "@/components/layout/sidebar/nav/SidebarNav";
import { SidebarUser } from "@/components/layout/sidebar/SidebarUser";

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarBrand />
      <SidebarNav />
      <SidebarUser />
      <SidebarRail />
    </Sidebar>
  );
}
