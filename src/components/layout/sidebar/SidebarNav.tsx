"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useModules } from "@/features/modules/hooks/useModules";
import { usePermission } from "@/features/permissions/hooks/usePermission";

export function SidebarNav() {
  const pathname = usePathname();
  const { modules, isLoading: isModulesLoading } = useModules();
  const { can, isLoading: isPermLoading } = usePermission();

  const isHomeActive = pathname === "/";
  const isLoading = isModulesLoading || isPermLoading;
  const accessibleModules = modules.filter((mod) => can("read", mod.id));

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-[11px] font-normal text-muted-foreground/60 mb-2 px-3">
          القائمة الرئيسية
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1.5">
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/" />}
                isActive={isHomeActive}
                tooltip="الرئيسية"
                className="h-9 gap-3 px-3 rounded-lg text-xs font-normal transition-colors duration-150 hover:bg-sidebar-accent/50 hover:text-foreground data-active:bg-sidebar-accent data-active:text-primary data-active:font-medium data-active:hover:bg-sidebar-accent data-active:hover:text-primary"
              >
                <LayoutDashboardIcon className="size-4 shrink-0" />
                <span>الرئيسية</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {isLoading ? (
              <div className="flex flex-col gap-2 p-2">
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            ) : (
              accessibleModules.map((mod) => {
                const href = `/${mod.id}`;
                const isActive = pathname.startsWith(href);

                return (
                  <SidebarMenuItem key={mod.id}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={isActive}
                      tooltip={mod.label.ar}
                      className="h-9 gap-3 px-3 rounded-lg text-xs font-normal transition-colors duration-150 hover:bg-sidebar-accent/50 hover:text-foreground data-active:bg-sidebar-accent data-active:text-primary data-active:font-medium data-active:hover:bg-sidebar-accent data-active:hover:text-primary"
                    >
                      <DynamicIcon
                        name={(mod.icon as IconName) ?? "layers"}
                        className="size-4 shrink-0"
                      />
                      <span>{mod.label.ar}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
