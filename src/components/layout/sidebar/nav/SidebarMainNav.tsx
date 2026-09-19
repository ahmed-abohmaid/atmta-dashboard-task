"use client";

import {
  HomeIcon,
  LayoutGridIcon,
  UsersIcon,
  ShieldCheckIcon,
  FolderTreeIcon,
  Building2Icon,
  type LucideIcon,
} from "lucide-react";
import type { AppAction, AppSubject } from "@/@types/permission";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarLink } from "@/components/layout/sidebar/nav/SidebarLink";

interface StaticNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  module?: string;
}

const STATIC_NAV_ITEMS: StaticNavItem[] = [
  { href: "/", label: "الرئيسية", icon: HomeIcon },
  { href: "/modules", label: "دليل الوحدات", icon: LayoutGridIcon, module: "modules" },
];

interface SidebarMainNavProps {
  can: (action: AppAction, subject: AppSubject) => boolean;
  isLoading: boolean;
}

export function SidebarMainNav({ can, isLoading }: SidebarMainNavProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] font-normal text-muted-foreground/60 mb-2 px-3">
        القائمة الرئيسية
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {STATIC_NAV_ITEMS.map((item) => {
            if (item.module) {
              if (isLoading) {
                return (
                  <SidebarMenuItem key={item.href}>
                    <Skeleton className="h-9 w-full rounded-lg" />
                  </SidebarMenuItem>
                );
              }
              if (!can("read", item.module)) {
                return null;
              }
            }

            const Icon = item.icon;
            return (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={<Icon className="size-4 shrink-0" />}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
