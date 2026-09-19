"use client";

import { HomeIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarLink } from "@/components/layout/sidebar/nav/SidebarLink";

export function SidebarMainNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground/60 mb-2 px-3 text-[11px] font-normal">
        القائمة الرئيسية
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          <SidebarLink href="/" label="الرئيسية" icon={<HomeIcon className="size-4 shrink-0" />} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
