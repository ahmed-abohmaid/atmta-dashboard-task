"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={href} />}
        isActive={isActive}
        tooltip={label}
        className="hover:bg-sidebar-accent/50 hover:text-foreground data-active:bg-sidebar-accent data-active:text-primary data-active:hover:bg-sidebar-accent data-active:hover:text-primary h-9 gap-3 rounded-lg px-3 text-xs font-normal transition-colors duration-150 data-active:font-medium"
      >
        {icon}
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
