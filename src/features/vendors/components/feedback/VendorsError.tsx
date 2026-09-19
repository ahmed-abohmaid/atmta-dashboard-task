import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorsErrorProps {
  error: Error | unknown;
  onRetry: () => void;
}

export function VendorsError({ error, onRetry }: VendorsErrorProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "حدث خطأ غير متوقع أثناء تحميل بيانات الموردين.";

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center flex flex-col items-center justify-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircleIcon className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">
          فشل في تحميل قائمة الموردين
        </h3>
        <p className="text-xs text-muted-foreground max-w-md">{errorMessage}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-2 text-xs cursor-pointer gap-2"
      >
        <RotateCcwIcon className="size-3.5" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
