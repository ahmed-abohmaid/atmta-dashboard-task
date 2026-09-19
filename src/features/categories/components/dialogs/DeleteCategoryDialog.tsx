"use client";

import { LayersIcon, Building2Icon, AlertTriangleIcon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteCategory } from "@/features/categories/hooks/useDeleteCategory";

interface DeleteCategoryDialogProps {
  category: CategoryNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCategoryDialog({
  category,
  open,
  onOpenChange,
}: DeleteCategoryDialogProps) {
  const { mutate: deleteMutate, isPending } = useDeleteCategory();

  const hasChildren = category.childCount > 0;
  const hasVendors = category.vendorCount > 0;
  const isBlocked = hasChildren || hasVendors;

  const handleDelete = () => {
    if (isBlocked) return;

    deleteMutate(category.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-base font-bold text-foreground">
            تأكيد حذف التصنيف
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            هل أنت متأكد من رغبتك في حذف التصنيف &quot;{category.name_ar}&quot;؟
          </DialogDescription>
        </DialogHeader>

        {/* Warning: Category has subcategories */}
        {hasChildren && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <LayersIcon className="size-4.5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">يحتوي على تصنيفات فرعية</span>
              <span className="text-muted-foreground leading-relaxed">
                لا يمكن حذف هذا التصنيف لأنه يحتوي على {category.childCount} من
                التصنيفات التابعة له. يرجى نقل التصنيفات الفرعية أو حذفها أولاً.
              </span>
            </div>
          </div>
        )}

        {/* Warning: Category has assigned vendors */}
        {hasVendors && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <Building2Icon className="size-4.5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">مرتبط بموردين مسجلين</span>
              <span className="text-muted-foreground leading-relaxed">
                لا يمكن حذف هذا التصنيف لأنه مرتبط حالياً بـ {category.vendorCount}{" "}
                من الموردين. يرجى إعادة تعيين تصنيف الموردين إلى قطاع آخر أولاً.
              </span>
            </div>
          </div>
        )}

        {!isBlocked && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertTriangleIcon className="size-4 text-destructive shrink-0 mt-0.5" />
            <span>
              سيتم حذف التصنيف نهائياً من شجرة النظام. هذا الإجراء لا يمكن
              التراجع عنه.
            </span>
          </div>
        )}

        <DialogFooter className="mt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="text-xs cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            isLoading={isPending}
            disabled={isBlocked || isPending}
            className="text-xs cursor-pointer"
          >
            نعم، حذف التصنيف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
