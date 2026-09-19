"use client";

import { AlertTriangleIcon, ShieldAlertIcon, UserXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserWithRelations } from "@/features/users/@types/user";
import { useDeleteUser } from "@/features/users/hooks/useDeleteUser";

interface DeleteUserDialogProps {
  user: UserWithRelations | null;
  isSelf: boolean;
  isLastSuperAdmin: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({
  user,
  isSelf,
  isLastSuperAdmin,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const { mutate: deleteUserMutate, isPending } = useDeleteUser();

  if (!user) return null;

  const isBlocked = isSelf || isLastSuperAdmin;

  const handleDelete = () => {
    if (isBlocked) return;
    deleteUserMutate(user.id, {
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
            تأكيد حذف المستخدم
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1 text-xs leading-relaxed">
            هل أنت متأكد من رغبتك في حذف حساب &quot;{user.name}&quot; نهائياً؟
          </DialogDescription>
        </DialogHeader>

        {isLastSuperAdmin && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-2.5 rounded-lg border p-3 text-xs">
            <ShieldAlertIcon className="mt-0.5 size-4 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">حماية مدير النظام الأخير</span>
              <span className="text-muted-foreground leading-relaxed">
                لا يمكن حذف هذا المستخدم لأنه آخر مدير نظام (Super Admin) نشط ومتبقي في النظام.
              </span>
            </div>
          </div>
        )}

        {isSelf && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-2.5 rounded-lg border p-3 text-xs">
            <UserXIcon className="mt-0.5 size-4 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">لا يمكن حذف الحساب الحالي</span>
              <span className="text-muted-foreground leading-relaxed">
                أنت مسجل الدخول بهذا الحساب حالياً. لا يمكنك حذف حسابك الشخصي النشط.
              </span>
            </div>
          </div>
        )}

        {!isBlocked && user.createdVendorsCount > 0 && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
            <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">تنبيه الموردين المرتبطين</span>
              <span className="text-muted-foreground leading-relaxed">
                قام هذا المستخدم بإنشاء {user.createdVendorsCount} مورد في النظام. ستبقى سجلات الموردين محفوظة مع الإشارة إلى معرف المستخدم في سجل التدقيق.
              </span>
            </div>
          </div>
        )}

        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="text-xs"
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isBlocked || isPending}
            className="text-xs"
          >
            {isPending ? "جاري الحذف..." : "حذف المستخدم"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
