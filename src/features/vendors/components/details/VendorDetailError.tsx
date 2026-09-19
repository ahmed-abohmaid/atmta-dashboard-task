import Link from "next/link";
import { AlertCircleIcon, ArrowRightIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorDetailErrorProps {
  error?: Error | unknown;
  onRetry: () => void;
}

export function VendorDetailError({ error, onRetry }: VendorDetailErrorProps) {
  const message =
    error instanceof Error
      ? error.message
      : "تعذر العثور على بيانات المورد المطلوب، قد يكون تم حذفه أو أن الرابط غير صحيح.";

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/vendors"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowRightIcon className="size-3.5" />
        <span>العودة إلى قائمة الموردين</span>
      </Link>

      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center flex flex-col items-center justify-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircleIcon className="size-6" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          المورد غير موجود
        </h3>
        <p className="text-xs text-muted-foreground max-w-md">{message}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="text-xs cursor-pointer gap-1.5"
          >
            <RotateCcwIcon className="size-3.5" />
            إعادة المحاولة
          </Button>
          <Button size="sm" asChild className="text-xs cursor-pointer">
            <Link href="/vendors">العودة للقائمة</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
