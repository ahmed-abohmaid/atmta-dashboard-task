"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

export function SidebarBrand() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="border-b border-sidebar-border px-3 py-3 group-data-[collapsible=icon]:p-2">
      <Link
        href="/"
        className="flex items-center justify-center rounded-lg p-1 transition-colors duration-150 hover:bg-sidebar-accent/40 group-data-[collapsible=icon]:p-0"
        title="منصة أتمتة"
      >
        {isCollapsed ? (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card border border-border/80 p-1 shadow-2xs">
            <Image
              src="/logo/atmta-logo.png"
              alt="شعار منصة أتمتة"
              width={24}
              height={24}
              className="size-6 object-contain"
              priority
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full px-2 py-1">
            <Image
              src="/logo/atmta-logo.png"
              alt="شعار منصة أتمتة"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}
