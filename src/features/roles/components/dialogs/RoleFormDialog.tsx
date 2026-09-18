"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoleInput, RoleWithUserCount } from "@/@types/role";
import { Permission } from "@/@types/permission";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputField } from "@/components/fields/InputField";
import {
  roleSchema,
  type RoleFormValues,
} from "@/features/roles/schemas/roleSchema";
import { useCreateRole } from "@/features/roles/hooks/useCreateRole";
import { useUpdateRole } from "@/features/roles/hooks/useUpdateRole";
import { PermissionMatrix } from "@/features/permissions/components/PermissionMatrix";

interface RoleFormDialogProps {
  mode: "create" | "edit";
  role?: RoleWithUserCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleFormDialog({
  mode,
  role,
  open,
  onOpenChange,
}: RoleFormDialogProps) {
  const isEdit = mode === "edit";
  const isSuperAdminRole = role?.id === "role_super_admin";

  const { mutate: createMutate, isPending: isCreatePending } = useCreateRole();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateRole();
  const isPending = isCreatePending || isUpdatePending;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
      permissions: role?.permissions || [],
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: role?.name || "",
        description: role?.description || "",
        permissions: role?.permissions || [],
      });
    }
  }, [open, role, reset]);

  const onSubmit = (values: RoleFormValues) => {
    const permissions: Permission[] = isSuperAdminRole
      ? [{ action: "manage", subject: "all" }]
      : values.permissions;

    const input: CreateRoleInput = {
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      permissions,
    };

    if (isEdit && role) {
      updateMutate(
        { ...input, id: role.id },
        {
          onSuccess: () => onOpenChange(false),
        },
      );
    } else {
      createMutate(input, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden border-border/70 bg-card shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {isEdit ? `تعديل الدور: ${role?.name}` : "إضافة دور جديد"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {isEdit
              ? "تحديث بيانات ومسمى الدور وتعيين صلاحيات وحدات النظام."
              : "تحديد اسم الدور ومصفوفة الصلاحيات الممنوحة له."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="role-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="role-name"
              label="اسم الدور"
              placeholder="مثال: مدير الموردين، موظف عمليات..."
              error={errors.name?.message}
              disabled={isSuperAdminRole}
              {...register("name")}
            />

            <InputField
              id="role-description"
              label="الوصف (اختياري)"
              placeholder="وصف مختصر للمسؤوليات الموكلة لهذا الدور..."
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-foreground">
                صلاحيات الوحدات
              </h4>

              {errors.permissions && (
                <span className="text-[11px] font-medium text-destructive">
                  {errors.permissions.message}
                </span>
              )}
            </div>

            <Controller
              control={control}
              name="permissions"
              render={({ field }) => (
                <PermissionMatrix
                  value={field.value}
                  onChange={field.onChange}
                  isSuperAdmin={isSuperAdminRole}
                />
              )}
            />
          </div>
        </form>

        <DialogFooter className="m-0 px-6 py-3.5 border-t border-border/50 bg-secondary/20 flex flex-row items-center justify-end gap-3 rounded-b-xl">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="text-xs h-9 px-4 cursor-pointer"
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            form="role-form"
            size="sm"
            isLoading={isPending}
            className="text-xs h-9 px-5 cursor-pointer font-medium"
          >
            {isEdit ? "حفظ التغييرات" : "إنشاء الدور"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
