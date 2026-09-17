"use client";

import { LogOutIcon } from "lucide-react";
import { SidebarFooter } from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TruncatedText } from "@/components/ui/truncatedText";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getInitials } from "@/utils/getInitials";

export function SidebarUser() {
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const initials = getInitials(user?.name ?? "مستخدم");

  return (
    <SidebarFooter className="border-t border-sidebar-border p-2">
      <div className="flex items-center gap-2.5 rounded-xl border border-sidebar-border/40 bg-sidebar-accent/35 p-2 transition-colors hover:bg-sidebar-accent/50 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1.5">
        <Avatar className="size-8.5 shrink-0 border border-primary/20">
          <AvatarImage
            src={user?.photo}
            alt={user?.name ?? "المستخدم"}
            width={34}
            height={34}
          />
          <AvatarFallback className="text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-col overflow-hidden min-w-0 group-data-[collapsible=icon]:hidden">
          <TruncatedText
            text={user?.name ?? "جاري التحميل..."}
            className="text-xs font-medium text-sidebar-foreground text-start leading-tight"
            side="top"
          />
          <TruncatedText
            text={user?.email ?? ""}
            className="text-[11px] font-normal text-muted-foreground/70 text-start leading-tight mt-0.5"
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
                className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive/70 hover:bg-destructive/20 hover:text-destructive transition-colors group-data-[collapsible=icon]:hidden cursor-pointer disabled:opacity-50"
              >
                <LogOutIcon className="size-3.5" />
                <span className="sr-only">تسجيل الخروج</span>
              </button>
            }
          />
          <TooltipContent side="inline-start">تسجيل الخروج</TooltipContent>
        </Tooltip>
      </div>
    </SidebarFooter>
  );
}
