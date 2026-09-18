import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RolesErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function RolesError({ error, onRetry }: RolesErrorProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center shadow-xs">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 mb-3">
        <AlertCircleIcon className="size-6" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        تعذر تحميل الأدوار والصلاحيات
      </h3>

      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-5">
        {error?.message ||
          "حدث خطأ أثناء الاتصال بالخادم الافتراضي. يرجى المحاولة مرة أخرى."}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 text-xs"
        >
          <RotateCcwIcon className="size-3.5" />
          <span>إعادة المحاولة</span>
        </Button>
      )}
    </div>
  );
}
