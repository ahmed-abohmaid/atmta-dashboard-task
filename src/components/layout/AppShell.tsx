"use client";

import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";

interface AppShellProps {
  children: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  isLoading?: boolean;
}

export function AppShell({
  children,
  headerTitle,
  headerSubtitle,
  isLoading = false,
}: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <AppHeader title={headerTitle} subtitle={headerSubtitle} isLoading={isLoading} />
        <main className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
