"use client";

import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

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
      <SidebarInset>
        <AppHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          isLoading={isLoading}
        />
        <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
