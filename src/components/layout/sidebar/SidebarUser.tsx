"use client";

import { LogOutIcon } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TruncatedText } from "@/components/ui/truncatedText";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useMe } from "@/features/auth/hooks/useMe";

export function SidebarUser() {
  const { user } = useMe();
  const logoutMutation = useLogout();
  const initials = getInitials(user?.name ?? "مستخدم");

  return (
    <SidebarFooter className="border-sidebar-border border-t p-2">
      <div className="border-sidebar-border/40 bg-sidebar-accent/35 hover:bg-sidebar-accent/50 flex items-center gap-2.5 rounded-xl border p-2 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1.5">
        <Avatar className="border-primary/20 size-8.5 shrink-0 border">
          <AvatarImage src={user?.photo} alt={user?.name ?? "المستخدم"} width={34} height={34} />
          <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
          <TruncatedText
            text={user?.name ?? "جاري التحميل..."}
            className="text-sidebar-foreground text-start text-xs leading-tight font-medium"
            side="top"
          />
          <TruncatedText
            text={user?.email ?? ""}
            className="text-muted-foreground/70 mt-0.5 text-start text-[11px] leading-tight font-normal"
            side="bottom"
          />
        </div>

        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="bg-destructive/10 text-destructive/70 hover:bg-destructive/20 hover:text-destructive flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors group-data-[collapsible=icon]:hidden disabled:opacity-50"
              >
                <LogOutIcon className="size-3.5" />
                <span className="sr-only">تسجيل الخروج</span>
              </button>
            }
          />
          <TooltipContent side="left">تسجيل الخروج</TooltipContent>
        </Tooltip>
      </div>
    </SidebarFooter>
  );
}
