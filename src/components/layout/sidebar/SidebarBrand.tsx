import { LayersIcon } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";

export function SidebarBrand() {
  return (
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
  );
}
