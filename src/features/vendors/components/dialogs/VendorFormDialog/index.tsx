"use client";


import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { CategorySelect } from "@/components/fields/CategorySelect";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import {
  vendorSchema,
  VendorFormValues,
} from "@/features/vendors/schemas/vendorSchema";
import { useCreateVendor } from "@/features/vendors/hooks/useCreateVendor";
import { useUpdateVendor } from "@/features/vendors/hooks/useUpdateVendor";

interface VendorFormDialogProps {
  mode: "create" | "edit";
  vendor?: VendorWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VendorFormDialog({
  mode,
  vendor,
  open,
  onOpenChange,
}: VendorFormDialogProps) {
  const isEdit = mode === "edit";
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate: createMutate, isPending: isCreatePending } = useCreateVendor();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateVendor();
  const isPending = isCreatePending || isUpdatePending;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name_ar: vendor?.name_ar || "",
      name_en: vendor?.name_en || "",
      about: vendor?.about || "",
      logo: vendor?.logo || "",
      cr_number: vendor?.cr_number || "",
      mobile: vendor?.mobile || "",
      categoryId: vendor?.categoryId || "",
      status: vendor?.status || "active",
    },
  });

  const watchedLogo = useWatch({ control, name: "logo" });

  const onSubmit = (values: VendorFormValues) => {
    setServerError(null);

    const payload = {
      name_ar: values.name_ar,
      name_en: values.name_en,
      about: values.about,
      logo: values.logo?.trim() || undefined,
      cr_number: values.cr_number,
      mobile: values.mobile,
      categoryId: values.categoryId,
      status: values.status,
    };

    const mutationOptions = {
      onSuccess: () => onOpenChange(false),
      onError: (err: unknown) => {
        setServerError(
          err instanceof Error
            ? err.message
            : isEdit
            ? "حدث خطأ أثناء تعديل بيانات المورد."
            : "حدث خطأ أثناء إضافة المورد."
        );
      },
    };

    if (isEdit && vendor) {
      updateMutate({ id: vendor.id, ...payload }, mutationOptions);
    } else {
      createMutate(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 border-border/70 bg-card shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 shrink-0">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {isEdit ? "تعديل بيانات المورد" : "إضافة مورد جديد"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {isEdit
              ? "قم بتحديث بيانات المورد والسجل التجاري والتصنيف المرتبط."
              : "أدخل بيانات المقاول أو المورد الهندسي والسجل التجاري ورقم التواصل."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4.5">
            {serverError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id="name_ar"
                label="اسم المورد بالعربية *"
                placeholder="مثال: شركة الفنار للمقاولات"
                disabled={isPending}
                error={errors.name_ar?.message}
                {...register("name_ar")}
              />

              <InputField
                id="name_en"
                label="اسم المورد بالإنجليزية *"
                placeholder="e.g. Alfanar Contracting Co."
                disabled={isPending}
                error={errors.name_en?.message}
                {...register("name_en")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id="cr_number"
                label="رقم السجل التجاري (10 أرقام) *"
                placeholder="1010123456"
                maxLength={10}
                disabled={isPending}
                error={errors.cr_number?.message}
                {...register("cr_number")}
              />

              <InputField
                id="mobile"
                label="رقم الجوال السعودي *"
                placeholder="05XXXXXXXX أو +9665XXXXXXXX"
                disabled={isPending}
                error={errors.mobile?.message}
                helperText="يقبل الأرقام بصيغة 05XXXXXXXX أو الصيغة الدولية"
                {...register("mobile")}
              />
            </div>

            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <CategorySelect
                  id="categoryId"
                  label="التصنيف الهندسي *"
                  placeholder="اختر التصنيف التابع له المورد..."
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                  error={errors.categoryId?.message}
                />
              )}
            />

            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <InputField
                  id="logo"
                  label="رابط شعار المورد (اختياري)"
                  placeholder="https://example.com/logo.png"
                  disabled={isPending}
                  error={errors.logo?.message}
                  {...register("logo")}
                />
              </div>
              {watchedLogo && (
                <div className="flex flex-col items-center gap-1 shrink-0 pt-6">
                  <Avatar className="size-10 rounded-xl border border-border/80 bg-muted/40">
                    <AvatarImage
                      src={watchedLogo}
                      alt="معاينة الشعار"
                      className="object-cover rounded-xl"
                    />
                    <AvatarFallback className="text-xs">شعار</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="about" className="text-xs font-medium text-foreground">
                نبذة عن المورد *
              </Label>
              <Textarea
                id="about"
                rows={3}
                placeholder="وصف مختصر لنشاط المورد، الخدمات المقدمة، والخبرات الهندسية..."
                disabled={isPending}
                className="text-xs"
                {...register("about")}
              />
              {errors.about?.message && (
                <span className="text-[11px] font-normal text-destructive">
                  {errors.about.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-foreground">
                  حالة تفعيل المورد
                </span>
                <span className="text-[11px] text-muted-foreground">
                  المورد النشط يظهر في المشاريع وقوائم الإسناد المعتمدة
                </span>
              </div>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Switch
                    checked={field.value === "active"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "active" : "inactive")
                    }
                    disabled={isPending}
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border/50 shrink-0 bg-muted/10 -mx-0 -mb-0">
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
              type="submit"
              size="sm"
              isLoading={isPending}
              disabled={isPending}
              className="text-xs cursor-pointer font-medium"
            >
              {isEdit ? "حفظ التعديلات" : "إضافة المورد"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
