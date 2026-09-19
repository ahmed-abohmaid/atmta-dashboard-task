"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon, HomeIcon, ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModules } from "@/features/modules/hooks/useModules";

interface ForbiddenStateProps {
  module?: string;
  title?: string;
  description?: string;
}

export function ForbiddenState({ module, title, description }: ForbiddenStateProps) {
  const router = useRouter();
  const { modules } = useModules();

  const moduleConfig = modules.find((m) => m.id === module);
  const moduleLabel =
    module === "modules" ? "إدارة الوحدات" : moduleConfig ? moduleConfig.label.ar : module;

  const defaultTitle = title || "عفواً، لا تملك صلاحية الوصول";
  const defaultDescription =
    description ||
    (moduleLabel
      ? `حسابك الحالي لا يمتلك الصلاحيات الكافية للوصول إلى قسم (${moduleLabel}). يرجى مراجعة مسؤول النظام لمنحك الإذن المطلوب.`
      : "ليس لديك إذن للوصول إلى هذه الصفحة أو تنفيذ هذا الإجراء. يرجى التواصل مع مسؤول النظام.");

  return (
    <div className="animate-in fade-in-50 flex min-h-[60vh] items-center justify-center p-4 duration-200 sm:p-6">
      <div className="border-border/60 bg-card/50 relative flex w-full max-w-md flex-col items-center rounded-2xl border p-8 text-center shadow-xs backdrop-blur-xs sm:p-10">
        <div className="border-border/80 bg-secondary/30 relative mb-5 flex size-16 items-center justify-center rounded-2xl border">
          <div className="bg-destructive/10 text-destructive border-destructive/20 flex size-11 items-center justify-center rounded-xl border">
            <ShieldAlertIcon className="size-5.5 stroke-[1.8]" />
          </div>
        </div>

        <div className="border-destructive/20 bg-destructive/10 text-destructive mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium">
          <span>وصول غير مصرح</span>
        </div>

        <h2 className="text-foreground mb-2 text-lg font-semibold tracking-tight sm:text-xl">
          {defaultTitle}
        </h2>

        <p className="text-muted-foreground mb-6 max-w-sm text-xs leading-relaxed text-balance">
          {defaultDescription}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button
            size="sm"
            onClick={() => router.push("/")}
            className="h-8.5 gap-2 rounded-lg px-3.5 text-xs"
          >
            <HomeIcon className="size-3.5" />
            <span>العودة للرئيسية</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="h-8.5 gap-2 rounded-lg px-3.5 text-xs"
          >
            <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
            <span>الصفحة السابقة</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
