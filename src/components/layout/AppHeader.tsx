"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PanelRightCloseIcon, PanelRightOpenIcon, RotateCcwIcon } from "lucide-react";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { removeSessionCookie } from "@/features/auth/utils/sessionCookie";
import { resetToSeed } from "@/mock/services/resetToSeed";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
}

export function AppHeader({ title = "نظرة عامة", subtitle, isLoading = false }: AppHeaderProps) {
  const { toggleSidebar, open } = useSidebar();
  const router = useRouter();
  const queryClient = useQueryClient();

  const resetMutation = useCustomMutation<void, void>({
    mutationFn: resetToSeed,
    onSuccess: () => {
      removeSessionCookie();
      queryClient.clear();
      router.replace("/login");
    },
  });

  return (
    <header className="border-border/70 bg-background/90 sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4 backdrop-blur-xs sm:px-6">
      <div className="flex items-center gap-2.5">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/60 size-8 rounded-md transition-colors"
          title={open ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
        >
          {open ? (
            <PanelRightCloseIcon className="text-primary size-4" />
          ) : (
            <PanelRightOpenIcon className="size-4" />
          )}
          <span className="sr-only">تبديل القائمة الجانبية</span>
        </Button>
        <div className="bg-border/60 h-4 w-px" />
        {isLoading ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-foreground text-sm leading-tight font-medium">{title}</h1>
            {subtitle && (
              <span className="text-muted-foreground mt-0.5 text-[11px] leading-tight font-normal">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          isLoading={resetMutation.isPending}
          onClick={() => resetMutation.mutate()}
          className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/60 h-8 gap-1.5 px-2.5 text-xs font-normal"
        >
          <RotateCcwIcon className="size-3.5" />
          <span>استعادة البيانات الافتراضية</span>
        </Button>
      </div>
    </header>
  );
}
