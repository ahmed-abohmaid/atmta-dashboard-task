import { FolderTreeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface CategoriesEmptyStateProps {
  onAddCategory?: () => void;
  isFiltered?: boolean;
}

export function CategoriesEmptyState({
  onAddCategory,
  isFiltered = false,
}: CategoriesEmptyStateProps) {
  return (
    <div className="border-border/80 bg-card/50 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center shadow-xs">
      <div className="bg-secondary text-primary border-border/40 mb-3 flex size-12 items-center justify-center rounded-full border">
        <FolderTreeIcon className="size-6" />
      </div>

      <h3 className="text-foreground mb-1 text-base font-semibold">
        {isFiltered ? "لا توجد نتائج مطابقة للبحث" : "لا توجد تصنيفات مسجلة"}
      </h3>

      <p className="text-muted-foreground mb-5 max-w-sm text-xs leading-relaxed">
        {isFiltered
          ? "لم يتم العثور على أي تصنيف يطابق كلمة البحث. جرب البحث بكلمات أخرى."
          : "ابدأ بإنشاء تصنيف رئيسي جديد لتنظيم قطاعات الأعمال والموردين."}
      </p>

      {!isFiltered && onAddCategory && (
        <PermissionGate action="create" subject="categories">
          <Button size="sm" onClick={onAddCategory} className="text-xs">
            إضافة أول تصنيف رئيسي
          </Button>
        </PermissionGate>
      )}
    </div>
  );
}
