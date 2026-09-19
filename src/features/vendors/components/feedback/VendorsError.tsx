import { AlertCircleIcon, RotateCcwIcon } from "lucide-react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";

interface VendorsErrorProps {
  error: Error | unknown;
  onRetry: () => void;
}

export function VendorsError({ error, onRetry }: VendorsErrorProps) {
  const errorMessage = getErrorMessage(error, "حدث خطأ غير متوقع أثناء تحميل بيانات الموردين.");

  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center">
      <div className="bg-destructive/10 text-destructive flex size-10 items-center justify-center rounded-full">
        <AlertCircleIcon className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-foreground text-sm font-semibold">فشل في تحميل قائمة الموردين</h3>
        <p className="text-muted-foreground max-w-md text-xs">{errorMessage}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-2 cursor-pointer gap-2 text-xs"
      >
        <RotateCcwIcon className="size-3.5" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
