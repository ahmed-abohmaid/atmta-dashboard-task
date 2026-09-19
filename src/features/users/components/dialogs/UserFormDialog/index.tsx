"use client";

import { type FormEvent } from "react";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { Controller } from "react-hook-form";
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
import { UserBasicStep } from "@/features/users/components/dialogs/UserFormDialog/UserBasicStep";
import { UserPermissionsStep } from "@/features/users/components/dialogs/UserFormDialog/UserPermissionsStep";
import { useUserForm } from "@/features/users/hooks/useUserForm";

interface UserFormDialogProps {
  user?: UserWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserFormDialog({ user, open, onOpenChange }: UserFormDialogProps) {
  const {
    form,
    step,
    setStep,
    isEditing,
    isPending,
    serverError,
    availableRoles,
    isSuperAdminRole,
    selectedRoleNames,
    handleRolesChange,
    handleNextStep,
    handleOpenChange,
    onSubmit,
  } = useUserForm({ user, onOpenChange });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      void handleNextStep();
      return;
    }
    handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader className="border-border/60 shrink-0 gap-1.5 border-b pb-3">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <UsersIcon className="text-primary size-4.5" />
            ) : (
              <UserPlusIcon className="text-primary size-4.5" />
            )}
            <DialogTitle className="text-foreground text-base font-bold">
              {isEditing ? "تعديل المستخدم وتخصيص الصلاحيات" : "إضافة مستخدم جديد للنظام"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground text-xs leading-relaxed">
            {isEditing
              ? "تعديل البيانات الأساسية، الأدوار، ومصفوفة الصلاحيات المخصصة لهذا الحساب."
              : "مسار موجه لإضافة المستخدم وتعيين الأدوار وتخصيص صلاحيات الوحدات."}
          </DialogDescription>

          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                step === 1
                  ? "bg-primary/10 text-primary border-primary/30 border"
                  : "text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full text-[10px]">
                1
              </span>
              <span>البيانات الأساسية والأدوار</span>
            </button>

            <ArrowLeftIcon className="text-muted-foreground/60 size-3.5" />

            <button
              type="button"
              onClick={() => handleNextStep()}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                step === 2
                  ? "bg-primary/10 text-primary border-primary/30 border"
                  : "text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full text-[10px]">
                2
              </span>
              <span>تخصيص صلاحيات الوحدات</span>
            </button>
          </div>
        </DialogHeader>

        {serverError && (
          <div className="border-destructive/30 bg-destructive/10 text-destructive mx-6 mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs">
            <AlertCircleIcon className="size-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-1 py-3">
            {step === 1 ? (
              <UserBasicStep
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
                availableRoles={availableRoles}
                isEditing={isEditing}
                isLastSuperAdmin={Boolean(
                  user?.roles?.includes("role_super_admin") && availableRoles.length > 0
                )}
                onRolesChange={handleRolesChange}
              />
            ) : (
              <Controller
                name="effectivePermissions"
                control={control}
                render={({ field }) => (
                  <UserPermissionsStep
                    permissions={field.value}
                    onChange={field.onChange}
                    isSuperAdminRole={isSuperAdminRole}
                    selectedRoleNames={selectedRoleNames}
                  />
                )}
              />
            )}
          </div>

          <DialogFooter className="border-border/60 mt-3 shrink-0 flex-row items-center justify-between gap-2 border-t pt-3 sm:gap-0">
            {step === 1 ? (
              <>
                <Button
                  key="step1-cancel"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  className="text-xs"
                >
                  إلغاء
                </Button>
                <Button
                  key="step1-next"
                  type="button"
                  size="sm"
                  onClick={handleNextStep}
                  className="gap-1.5 text-xs"
                >
                  <span>متابعة لتخصيص الصلاحيات</span>
                  <ArrowLeftIcon className="size-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  key="step2-back"
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(1)}
                  className="gap-1.5 text-xs"
                >
                  <ArrowRightIcon className="size-3.5" />
                  <span>البيانات الأساسية</span>
                </Button>
                <Button
                  key="step2-submit"
                  type="submit"
                  size="sm"
                  disabled={isPending}
                  className="gap-1.5 text-xs"
                  isLoading={isPending}
                >
                  <CheckIcon className="size-3.5" />
                  <span>{isEditing ? "تحديث المستخدم" : "إنشاء المستخدم"}</span>
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
