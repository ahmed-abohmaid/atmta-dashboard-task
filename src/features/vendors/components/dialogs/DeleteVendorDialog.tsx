"use client";

import { useState } from "react";
import { AlertTriangleIcon } from "lucide-react";
import { getErrorMessage } from "@/utils/getErrorMessage";
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
        setErrorMessage(getErrorMessage(err, "حدث خطأ أثناء حذف المورد."));
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/70 bg-card overflow-hidden p-0 shadow-2xl sm:max-w-md">
        <DialogHeader className="border-border/50 border-b px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-xl">
              <AlertTriangleIcon className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-foreground text-base font-bold">
                تأكيد حذف المورد
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-0.5 text-xs">
                إجراء حذف ناعم من قاعدة البيانات
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="text-muted-foreground flex flex-col gap-3 p-6 text-xs">
          <p>
            هل أنت متأكد من رغبتك في حذف المورد{" "}
            <span className="text-foreground font-semibold">&quot;{vendor.name_ar}&quot;</span>؟
          </p>

          <div className="border-border/70 bg-muted/20 rounded-lg border p-3 text-[11px] leading-relaxed">
            سيتم استبعاد هذا المورد من قوائم الموردين النشطة وتقارير التصدير مع الاحتفاظ ببياناته في
            السجل التاريخي (Soft Delete).
          </div>

          {errorMessage && (
            <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border p-3 text-xs">
              {errorMessage}
            </div>
          )}
        </div>

        <DialogFooter className="border-border/50 bg-muted/10 border-t px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="cursor-pointer text-xs"
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
            className="cursor-pointer text-xs font-medium"
          >
            تأكيد الحذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
