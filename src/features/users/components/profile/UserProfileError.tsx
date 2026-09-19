import Link from "next/link";
import { AlertTriangleIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfileErrorProps {
  error?: Error | null;
}

export function UserProfileError({ error }: UserProfileErrorProps) {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center rounded-xl border p-12 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 flex size-12 items-center justify-center rounded-full">
        <AlertTriangleIcon className="size-6" />
      </div>

      <h3 className="text-foreground text-sm font-semibold">تعذر العثور على المستخدم المطلوب</h3>

      <p className="text-muted-foreground mt-1.5 max-w-sm text-xs leading-relaxed">
        {error?.message || "قد يكون المستخدم قد تم حذفه أو أن المعرف المدخل غير صحيح."}
      </p>

      <div className="mt-6">
        <Link href="/users">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <ArrowRightIcon className="size-3.5" />
            <span>العودة لقائمة المستخدمين</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
