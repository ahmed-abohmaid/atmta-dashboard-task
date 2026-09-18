"use client";

import { useRouter } from "next/navigation";
import { ShieldAlertIcon, HomeIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModules } from "@/features/modules/hooks/useModules";

interface ForbiddenStateProps {
  module?: string;
  title?: string;
  description?: string;
}

export function ForbiddenState({
  module,
  title,
  description,
}: ForbiddenStateProps) {
  const router = useRouter();
  const { modules } = useModules();

  const moduleConfig = modules.find((m) => m.id === module);
  const moduleLabel =
    module === "modules"
      ? "إدارة الوحدات"
      : moduleConfig
        ? moduleConfig.label.ar
        : module;

  const defaultTitle = title || "عفواً، لا تملك صلاحية الوصول";
  const defaultDescription =
    description ||
    (moduleLabel
      ? `حسابك الحالي لا يمتلك الصلاحيات الكافية للوصول إلى قسم (${moduleLabel}). يرجى مراجعة مسؤول النظام لمنحك الإذن المطلوب.`
      : "ليس لديك إذن للوصول إلى هذه الصفحة أو تنفيذ هذا الإجراء. يرجى التواصل مع مسؤول النظام.");

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 sm:p-6 animate-in fade-in-50 duration-200">
      <div className="relative flex w-full max-w-md flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-8 text-center backdrop-blur-xs sm:p-10 shadow-xs">
        <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border border-border/80 bg-secondary/30">
          <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
            <ShieldAlertIcon className="size-5.5 stroke-[1.8]" />
          </div>
        </div>

        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-[11px] font-medium text-destructive">
          <span>وصول غير مصرح</span>
        </div>

        <h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {defaultTitle}
        </h2>

        <p className="mb-6 text-xs leading-relaxed text-muted-foreground max-w-sm text-balance">
          {defaultDescription}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button
            size="sm"
            onClick={() => router.push("/")}
            className="h-8.5 px-3.5 gap-2 text-xs rounded-lg"
          >
            <HomeIcon className="size-3.5" />
            <span>العودة للرئيسية</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="h-8.5 px-3.5 gap-2 text-xs rounded-lg"
          >
            <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
            <span>الصفحة السابقة</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
