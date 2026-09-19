"use client";

import { ShieldAlertIcon, UsersIcon } from "lucide-react";
import { RoleWithUserCount } from "@/@types/role";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteRole } from "@/features/roles/hooks/useDeleteRole";

interface DeleteRoleDialogProps {
  role: RoleWithUserCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRoleDialog({ role, open, onOpenChange }: DeleteRoleDialogProps) {
  const { mutate: deleteMutate, isPending } = useDeleteRole();

  const isBlocked = role.isSystem || role.userCount > 0;

  const handleDelete = () => {
    if (isBlocked) return;

    deleteMutate(role.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-foreground text-base font-bold">
            تأكيد حذف الدور الوظيفي
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1 text-xs leading-relaxed">
            هل أنت متأكد من رغبتك في حذف الدور &quot;{role.name}&quot;؟
          </DialogDescription>
        </DialogHeader>

        {role.isSystem && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-2.5 rounded-lg border p-3 text-xs">
            <ShieldAlertIcon className="mt-0.5 size-4.5 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">دور نظام محمي</span>
              <span className="text-muted-foreground leading-relaxed">
                هذا الدور هو دور أساسي في النظام ولا يمكن حذفه لضمان استقرار الصلاحيات.
              </span>
            </div>
          </div>
        )}

        {!role.isSystem && role.userCount > 0 && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <UsersIcon className="mt-0.5 size-4.5 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">مرتبط بمستخدمين مسجلين</span>
              <span className="text-muted-foreground leading-relaxed">
                لا يمكن حذف هذا الدور لأنه مخصص حالياً لـ {role.userCount} من المستخدمين. يرجى نقل
                المستخدمين إلى أدوار أخرى أولاً.
              </span>
            </div>
          </div>
        )}

        {!isBlocked && (
          <p className="text-muted-foreground text-xs">
            سيتم حذف الدور نهائياً من قائمة الأدوار المتاحة ولن يمكن استعادته.
          </p>
        )}

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
            disabled={isBlocked || isPending}
            className="text-xs"
          >
            نعم، حذف الدور
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
