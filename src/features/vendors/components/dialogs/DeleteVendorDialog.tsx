"use client";

import { useState } from "react";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { useDeleteVendor } from "@/features/vendors/hooks/useDeleteVendor";

interface DeleteVendorDialogProps {
  vendor: VendorWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteVendorDialog({
  vendor,
  open,
  onOpenChange,
  onSuccess,
}: DeleteVendorDialogProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: deleteMutate, isPending } = useDeleteVendor();

  if (!vendor) return null;

  const handleConfirmDelete = () => {
    setErrorMessage(null);
    deleteMutate(vendor.id, {
      onSuccess: () => {
        onOpenChange(false);
        onSuccess?.();
      },
      onError: (err) => {
        setErrorMessage(
          err instanceof Error ? err.message : "حدث خطأ أثناء حذف المورد."
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/70 bg-card shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive shrink-0">
              <AlertTriangleIcon className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-foreground">
                تأكيد حذف المورد
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                إجراء حذف ناعم من قاعدة البيانات
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 p-6 text-xs text-muted-foreground">
          <p>
            هل أنت متأكد من رغبتك في حذف المورد{" "}
            <span className="font-semibold text-foreground">
              &quot;{vendor.name_ar}&quot;
            </span>
            ؟
          </p>

          <div className="rounded-lg border border-border/70 bg-muted/20 p-3 text-[11px] leading-relaxed">
            سيتم استبعاد هذا المورد من قوائم الموردين النشطة وتقارير التصدير مع الاحتفاظ ببياناته في السجل التاريخي (Soft Delete).
          </div>

          {errorMessage && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              {errorMessage}
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/10">
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
            isLoading={isPending}
            disabled={isPending}
            onClick={handleConfirmDelete}
            className="text-xs cursor-pointer font-medium"
          >
            تأكيد الحذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
