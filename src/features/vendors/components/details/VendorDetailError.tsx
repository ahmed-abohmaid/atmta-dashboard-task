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
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
      >
        <ArrowRightIcon className="size-3.5" />
        <span>العودة إلى قائمة الموردين</span>
      </Link>

      <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center">
        <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
          <AlertCircleIcon className="size-6" />
        </div>
        <h3 className="text-foreground text-base font-semibold">المورد غير موجود</h3>
        <p className="text-muted-foreground max-w-md text-xs">{message}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="cursor-pointer gap-1.5 text-xs"
          >
            <RotateCcwIcon className="size-3.5" />
            إعادة المحاولة
          </Button>
          <Button size="sm" asChild className="cursor-pointer text-xs">
            <Link href="/vendors">العودة للقائمة</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
