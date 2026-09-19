"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

export function SidebarBrand() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="border-sidebar-border border-b px-3 py-3 group-data-[collapsible=icon]:p-2">
      <Link
        href="/"
        className="hover:bg-sidebar-accent/40 flex items-center justify-center rounded-lg p-1 transition-colors duration-150 group-data-[collapsible=icon]:p-0"
        title="منصة أتمتة"
      >
        {isCollapsed ? (
          <div className="bg-card border-border/80 flex size-8 shrink-0 items-center justify-center rounded-lg border p-1 shadow-2xs">
            <Image
              src="/logo/atmta-logo.png"
              alt="شعار منصة أتمتة"
              width={24}
              height={24}
              className="size-6 object-contain"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        ) : (
          <div className="flex w-full items-center justify-center px-2 py-1">
            <Image
              src="/logo/atmta-logo.png"
              alt="شعار منصة أتمتة"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        )}
      </Link>
    </SidebarHeader>
  );
}
