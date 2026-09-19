import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoriesErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function CategoriesError({ error, onRetry }: CategoriesErrorProps) {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex min-h-80 flex-col items-center justify-center rounded-xl border p-8 text-center shadow-xs">
      <div className="bg-destructive/10 text-destructive border-destructive/20 mb-3 flex size-12 items-center justify-center rounded-full border">
        <AlertCircleIcon className="size-6" />
      </div>

      <h3 className="text-foreground mb-1 text-base font-semibold">تعذر تحميل شجرة التصنيفات</h3>

      <p className="text-muted-foreground mb-5 max-w-sm text-xs leading-relaxed">
        {error?.message || "حدث خطأ أثناء تحميل بيانات التصنيفات من الخادم الافتراضي."}
      </p>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2 text-xs">
          <RotateCcwIcon className="size-3.5" />
          <span>إعادة المحاولة</span>
        </Button>
      )}
    </div>
  );
}
