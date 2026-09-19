import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersEmptyStateProps {
  hasFilters: boolean;
  onResetFilters: () => void;
  onCreateClick?: () => void;
}

export function UsersEmptyState({
  hasFilters,
  onResetFilters,
  onCreateClick,
}: UsersEmptyStateProps) {
  return (
    <div className="border-border/80 bg-card flex flex-col items-center justify-center rounded-xl border p-12 text-center shadow-xs">
      <div className="bg-muted/40 mb-4 flex size-12 items-center justify-center rounded-full">
        <UsersIcon className="text-muted-foreground size-6" />
      </div>

      <h3 className="text-foreground text-sm font-semibold">
        {hasFilters ? "لا توجد نتائج مطابقة" : "لم يتم إضافة أي مستخدمين بعد"}
      </h3>

      <p className="text-muted-foreground mt-1.5 max-w-sm text-xs leading-relaxed">
        {hasFilters
          ? "لم نتمكن من العثور على أي مستخدمين يطابقون معايير البحث أو التصفية الحالية. جرب تعديل المدخلات أو إعادة الضبط."
          : "ابدأ بإضافة أول مستخدم للنظام وحدد أدواره وصلاحياته للوصول إلى الوحدات."}
      </p>

      <div className="mt-6 flex items-center gap-3">
        {hasFilters ? (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="text-xs">
            إعادة ضبط الفلاتر
          </Button>
        ) : onCreateClick ? (
          <Button size="sm" onClick={onCreateClick} className="text-xs">
            إضافة مستخدم جديد
          </Button>
        ) : null}
      </div>
    </div>
  );
}
