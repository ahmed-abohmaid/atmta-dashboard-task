"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Permission } from "@/@types/permission";
import { CreateRoleInput, RoleWithUserCount } from "@/@types/role";
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
import { PermissionMatrix } from "@/features/permissions/components/PermissionMatrix";
import { useCreateRole } from "@/features/roles/hooks/useCreateRole";
import { useUpdateRole } from "@/features/roles/hooks/useUpdateRole";
import { roleSchema, type RoleFormValues } from "@/features/roles/schemas/roleSchema";

interface RoleFormDialogProps {
  mode: "create" | "edit";
  role?: RoleWithUserCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleFormDialog({ mode, role, open, onOpenChange }: RoleFormDialogProps) {
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
        }
      );
    } else {
      createMutate(input, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/70 bg-card flex max-h-[90vh] flex-col overflow-hidden p-0 shadow-2xl sm:max-w-3xl">
        <DialogHeader className="border-border/50 border-b px-6 pt-6 pb-4">
          <DialogTitle className="text-foreground text-lg font-bold tracking-tight">
            {isEdit ? `تعديل الدور: ${role?.name}` : "إضافة دور جديد"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {isEdit
              ? "تحديث بيانات ومسمى الدور وتعيين صلاحيات وحدات النظام."
              : "تحديد اسم الدور ومصفوفة الصلاحيات الممنوحة له."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="role-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="border-border/50 flex flex-col gap-2.5 border-t pt-3">
            <div className="flex items-center justify-between">
              <h4 className="text-foreground text-xs font-semibold">صلاحيات الوحدات</h4>

              {errors.permissions && (
                <span className="text-destructive text-[11px] font-medium">
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

        <DialogFooter className="border-border/50 bg-secondary/20 m-0 flex flex-row items-center justify-end gap-3 rounded-b-xl border-t px-6 py-3.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="h-9 cursor-pointer px-4 text-xs"
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            form="role-form"
            size="sm"
            isLoading={isPending}
            className="h-9 cursor-pointer px-5 text-xs font-medium"
          >
            {isEdit ? "حفظ التغييرات" : "إنشاء الدور"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
