"use client";

import { Module } from "@/@types/module";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteModule } from "@/features/modules/hooks/useDeleteModule";

interface DeleteModuleDialogProps {
  module: Module;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteModuleDialog({
  module,
  open,
  onOpenChange,
}: DeleteModuleDialogProps) {
  const { mutate: deleteMutate, isPending } = useDeleteModule();

  const handleDelete = () => {
    deleteMutate(module.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-base font-bold text-foreground">
            تأكيد حذف الوحدة
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            هل أنت متأكد من رغبتك في حذف وحدة &quot;{module.label.ar}&quot;؟
            سيتم إزالتها نهائياً من القائمة الجانبية ومصفوفة الصلاحيات.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="text-xs"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            isLoading={isPending}
            className="text-xs"
          >
            نعم، حذف الوحدة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
