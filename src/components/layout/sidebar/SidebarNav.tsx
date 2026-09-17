"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  UsersIcon,
  ShieldCheckIcon,
  FolderTreeIcon,
  Building2Icon,
} from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

export function SidebarNav() {
  const pathname = usePathname();

  return (
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
  );
}
