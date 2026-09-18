"use client";

import Link from "next/link";
import { ShieldAlertIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModules } from "@/features/modules/hooks/useModules";

interface ForbiddenStateProps {
  module?: string;
  action?: string;
  title?: string;
  description?: string;
}

export function ForbiddenState({
  module,
  action,
  title,
  description,
}: ForbiddenStateProps) {
  const { modules } = useModules();
  const moduleConfig = modules.find((m) => m.id === module);
  const moduleLabel = moduleConfig ? moduleConfig.label.ar : module;

  const defaultTitle = title || "عفواً، لا تملك صلاحية الوصول";
  const defaultDescription =
    description ||
    (moduleLabel
      ? `حسابك الحالي لا يمتلك الصلاحيات الكافية للوصول إلى قسم (${moduleLabel}). يرجى مراجعة مسؤول النظام.`
      : "ليس لديك إذن للوصول إلى هذه الصفحة أو تنفيذ هذا الإجراء.");

  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-border/80 bg-card p-8 text-center shadow-xs">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 mb-4">
        <ShieldAlertIcon className="size-7" />
      </div>

      <span className="text-xs font-medium text-destructive tracking-widest uppercase mb-1">
        403 Forbidden
      </span>

      <h2 className="text-lg font-semibold text-foreground tracking-tight mb-2">
        {defaultTitle}
      </h2>

      <p className="text-xs text-muted-foreground max-w-md leading-relaxed mb-6">
        {defaultDescription}
      </p>

      {action && (
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
          <span>الإجراء المطلوب:</span>
          <code className="font-mono text-foreground font-semibold">{action}</code>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        asChild
        className="gap-2 text-xs"
      >
        <Link href="/">
          <span>العودة إلى لوحة التحكم</span>
          <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
        </Link>
      </Button>
    </div>
  );
}
