import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

export function UsersErrorState({ error, onRetry }: UsersErrorStateProps) {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center rounded-xl border p-12 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 flex size-12 items-center justify-center rounded-full">
        <AlertTriangleIcon className="size-6" />
      </div>

      <h3 className="text-foreground text-sm font-semibold">حدث خطأ أثناء تحميل بيانات المستخدمين</h3>

      <p className="text-muted-foreground mt-1.5 max-w-sm text-xs leading-relaxed">
        {error?.message || "تعذر الاتصال بقاعدة البيانات التجريبية. يرجى المحاولة مرة أخرى."}
      </p>

      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-6 gap-2 text-xs"
      >
        <RefreshCwIcon className="size-3.5" />
        <span>إعادة المحاولة</span>
      </Button>
    </div>
  );
}
