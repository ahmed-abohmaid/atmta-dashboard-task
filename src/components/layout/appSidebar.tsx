"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  UsersIcon,
  ShieldCheckIcon,
  FolderTreeIcon,
  Building2Icon,
  LayersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getInitials } from "@/utils/getInitials";

const NAV_ITEMS = [
  {
    title: "الرئيسية",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "المستخدمون",
    href: "/users",
    icon: UsersIcon,
  },
  {
    title: "الأدوار والصلاحيات",
    href: "/roles",
    icon: ShieldCheckIcon,
  },
  {
    title: "التصنيفات",
    href: "/categories",
    icon: FolderTreeIcon,
  },
  {
    title: "الموردون",
    href: "/vendors",
    icon: Building2Icon,
  },
];

const CURRENT_USER = {
  name: "خالد المحمدي",
  role: "مدير النظام",
};

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const initials = getInitials(CURRENT_USER.name);

  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/20">
            <LayersIcon className="size-4" />
          </div>
          <span className="truncate text-sm font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            منصة أتمتة
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-normal text-muted-foreground/60 mb-2 px-3">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-9 gap-3 px-3 rounded-lg text-xs font-normal transition-colors duration-150 hover:bg-sidebar-accent/50 hover:text-foreground data-active:bg-sidebar-accent data-active:text-primary data-active:font-medium data-active:hover:bg-sidebar-accent data-active:hover:text-primary"
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2.5">
        <div className="flex items-center gap-2.5 rounded-lg bg-sidebar-accent/30 p-2 text-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-normal">
            {initials}
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-xs font-normal text-sidebar-foreground">
              {CURRENT_USER.name}
            </span>
            <span className="truncate text-[11px] font-normal text-muted-foreground/80 mt-0.5">
              {CURRENT_USER.role}
            </span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
