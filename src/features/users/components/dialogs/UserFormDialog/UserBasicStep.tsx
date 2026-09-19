"use client";

import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ShieldAlertIcon } from "lucide-react";
import { RoleWithUserCount } from "@/@types/role";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InputField } from "@/components/fields/InputField";
import { UserFormData } from "@/features/users/schemas/userSchema";

interface UserBasicStepProps {
  register: UseFormRegister<UserFormData>;
  control: Control<UserFormData>;
  errors: FieldErrors<UserFormData>;
  watch: UseFormWatch<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
  availableRoles: RoleWithUserCount[];
  isEditing: boolean;
  isLastSuperAdmin: boolean;
  onRolesChange: (newRoles: string[]) => void;
}

export function UserBasicStep({
  register,
  control,
  errors,
  watch,
  setValue,
  availableRoles,
  isEditing,
  isLastSuperAdmin,
  onRolesChange,
}: UserBasicStepProps) {
  const selectedRoles = watch("roles") || [];
  const currentStatus = watch("status");

  const toggleRole = (roleId: string) => {
    if (isLastSuperAdmin && roleId === "role_super_admin") {
      return;
    }
    const nextRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter((r) => r !== roleId)
      : [...selectedRoles, roleId];

    setValue("roles", nextRoles, { shouldValidate: true });
    onRolesChange(nextRoles);
  };

  return (
    <div className="flex flex-col gap-4 py-1">
      {isLastSuperAdmin && (
        <div className="border-amber-500/30 bg-amber-500/10 text-amber-300 flex items-start gap-2.5 rounded-lg border p-3 text-xs">
          <ShieldAlertIcon className="mt-0.5 size-4.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">مدير النظام الأخير</span>
            <span className="text-muted-foreground leading-relaxed">
              هذا الحساب هو آخر مدير نظام متبقي، لذلك لا يمكن تعطيله أو إزالة دور مدير النظام منه.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InputField
          id="user-name"
          label="الاسم الكامل *"
          placeholder="مثال: محمد السعيد"
          error={errors.name?.message}
          {...register("name")}
        />

        <InputField
          id="user-email"
          type="email"
          dir="ltr"
          label="البريد الإلكتروني *"
          placeholder="name@example.com"
          className="text-left"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InputField
          id="user-password"
          type="password"
          dir="ltr"
          label={isEditing ? "كلمة المرور (اختيارية)" : "كلمة المرور *"}
          placeholder={isEditing ? "اتركه فارغاً للإبقاء على الحالية" : "6 خانات على الأقل"}
          className="text-left"
          error={errors.password?.message}
          {...register("password")}
        />

        <InputField
          id="user-phone"
          type="tel"
          dir="ltr"
          label="رقم الجوال *"
          placeholder="05XXXXXXXX أو +9665XXXXXXXX"
          className="text-left"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <InputField
        id="user-photo"
        type="url"
        dir="ltr"
        label="رابط الصورة الشخصية (اختياري)"
        placeholder="https://images.unsplash.com/..."
        className="text-left"
        error={errors.photo?.message}
        {...register("photo")}
      />

      <div className="border-border/70 bg-card/40 flex items-center justify-between rounded-lg border p-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-foreground text-xs font-semibold">حالة الحساب</span>
          <span className="text-muted-foreground text-[11px]">
            {currentStatus === "active"
              ? "الحساب نشط ويمكنه تسجيل الدخول"
              : "الحساب معطل وممنوع من تسجيل الدخول"}
          </span>
        </div>

        {isLastSuperAdmin ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <div className="cursor-not-allowed opacity-60">
                  <Switch checked={true} disabled />
                </div>
              }
            />
            <TooltipContent className="text-xs">
              لا يمكن تعطيل آخر مدير نظام متبقي
            </TooltipContent>
          </Tooltip>
        ) : (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value === "active"}
                onCheckedChange={(checked) => field.onChange(checked ? "active" : "inactive")}
              />
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-foreground text-xs font-medium">تعيين الأدوار الوظيفية</Label>
        <p className="text-muted-foreground text-[11px]">
          اختر دوراً أو أكثر ليرث المستخدم الصلاحيات المحددة لكل دور تلقائياً. يمكنك تخصيص الصلاحيات في الخطوة التالية.
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {availableRoles.map((role) => {
            const isChecked = selectedRoles.includes(role.id);
            const isRoleLocked = isLastSuperAdmin && role.id === "role_super_admin";

            return (
              <div
                key={role.id}
                onClick={() => !isRoleLocked && toggleRole(role.id)}
                className={`border-border/70 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                  isChecked ? "border-primary/50 bg-primary/5" : "bg-card/30 hover:bg-card/60"
                } ${isRoleLocked ? "cursor-not-allowed opacity-80" : ""}`}
              >
                <Checkbox
                  checked={isChecked}
                  disabled={isRoleLocked}
                  onCheckedChange={() => !isRoleLocked && toggleRole(role.id)}
                  className="mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground text-xs font-semibold">{role.name}</span>
                  <span className="text-muted-foreground text-[11px] line-clamp-1">
                    {role.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
