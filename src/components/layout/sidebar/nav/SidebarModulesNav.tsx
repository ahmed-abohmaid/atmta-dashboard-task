"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { AppAction, AppSubject } from "@/@types/permission";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarLink } from "@/components/layout/sidebar/nav/SidebarLink";
import { useModules } from "@/features/modules/hooks/useModules";

interface SidebarModulesNavProps {
  can: (action: AppAction, subject: AppSubject) => boolean;
  isPermLoading: boolean;
}

const CORE_ROUTES: Record<string, string> = {
  users: "/users",
  roles: "/roles",
  categories: "/categories",
  vendors: "/vendors",
};

function getModuleHref(moduleId: string): string {
  return CORE_ROUTES[moduleId] ?? `/modules/${moduleId}`;
}

const CORE_MODULE_IDS = new Set(["users", "roles", "categories", "vendors"]);

export function SidebarModulesNav({ can, isPermLoading }: SidebarModulesNavProps) {
  const { modules, isLoading: isModulesLoading } = useModules();

  const nonCoreModules = modules.filter((mod) => !CORE_MODULE_IDS.has(mod.id));

  if (!isModulesLoading && nonCoreModules.length === 0) {
    return null;
  }

  const isLoading = isModulesLoading || isPermLoading;
  const accessibleModules = nonCoreModules.filter((mod) => can("read", mod.id));

  if (!isLoading && accessibleModules.length === 0) {
    return null;
  }

  return (
    <SidebarGroup className="mt-1">
      <SidebarGroupLabel className="text-[11px] font-normal text-muted-foreground/60 mb-2 px-3">
        وحدات النظام
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {isLoading ? (
            <div className="flex flex-col gap-2 p-2">
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          ) : (
            accessibleModules.map((mod) => (
              <SidebarLink
                key={mod.id}
                href={getModuleHref(mod.id)}
                label={mod.label.ar}
                icon={
                  <DynamicIcon
                    name={(mod.icon as IconName) ?? "layout-grid"}
                    className="size-4 shrink-0"
                  />
                }
              />
            ))
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
