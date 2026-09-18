"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateModuleInput, Module } from "@/@types/module";
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
import { IconPicker } from "@/components/fields/IconPicker";
import { moduleSchema, type ModuleFormValues } from "@/features/modules/schemas/moduleSchema";
import { useCreateModule } from "@/features/modules/hooks/useCreateModule";
import { useUpdateModule } from "@/features/modules/hooks/useUpdateModule";

interface ModuleFormDialogProps {
  mode: "create" | "edit";
  module?: Module;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ACTION_PRESETS = [
  { id: "export", labelAr: "تصدير" },
  { id: "archive", labelAr: "أرشفة" },
  { id: "duplicate", labelAr: "نسخ" },
  { id: "invite", labelAr: "دعوة" },
  { id: "approve", labelAr: "اعتماد" },
  { id: "print", labelAr: "طباعة" },
];

export function ModuleFormDialog({
  mode,
  module,
  open,
  onOpenChange,
}: ModuleFormDialogProps) {
  const isEdit = mode === "edit";

  const { mutate: createMutate, isPending: isCreatePending } = useCreateModule();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateModule();
  const isPending = isCreatePending || isUpdatePending;

  const customAction = module?.actions.find((a) => a.isCustom);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      labelAr: module?.label.ar || "",
      labelEn: module?.label.en || "",
      icon: module?.icon || "layout-grid",
      descriptionAr: module?.description?.ar || "",
      descriptionEn: module?.description?.en || "",
      customActionId: customAction?.id || "export",
      customActionLabelAr: customAction?.label.ar || "تصدير",
    },
  });

  const selectedIcon = useWatch({ control, name: "icon" }) || "layout-grid";

  const handleApplyPreset = (preset: { id: string; labelAr: string }) => {
    setValue("customActionId", preset.id, { shouldValidate: true });
    setValue("customActionLabelAr", preset.labelAr, { shouldValidate: true });
  };

  const onSubmit = (values: ModuleFormValues) => {
    const input: CreateModuleInput = {
      label: {
        ar: values.labelAr.trim(),
        en: values.labelEn.trim(),
      },
      icon: values.icon,
      description: {
        ar: values.descriptionAr?.trim() || "",
        en: values.descriptionEn?.trim() || "",
      },
      customAction: {
        id: values.customActionId.trim().toLowerCase(),
        label: {
          ar: values.customActionLabelAr.trim(),
          en: values.customActionId.trim(),
        },
      },
    };

    if (isEdit && module) {
      updateMutate(
        { ...input, id: module.id },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createMutate(input, {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="gap-1.5 mb-1">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {isEdit ? "تعديل الوحدة" : "إضافة وحدة جديدة"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            {isEdit
              ? "تحديث بيانات ومسميات وإجراءات الوحدة في النظام."
              : "تسجيل وحدة جديدة وإجراءاتها المخصصة وحفظها في قاعدة البيانات الحية."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="labelAr"
              label="الاسم (بالعربية)"
              placeholder="مثال: التقارير"
              error={errors.labelAr?.message}
              {...register("labelAr")}
            />

            <InputField
              id="labelEn"
              label="الاسم (بالإنجليزية)"
              placeholder="e.g. Reports"
              dir="ltr"
              error={errors.labelEn?.message}
              {...register("labelEn")}
            />
          </div>

          <IconPicker
            value={selectedIcon}
            onChange={(newIcon) =>
              setValue("icon", newIcon, { shouldValidate: true })
            }
            label="أيقونة الوحدة"
            error={errors.icon?.message}
          />

          <InputField
            id="descriptionAr"
            label="الوصف (بالعربية)"
            placeholder="نبذة مختصرة عن الوحدة"
            error={errors.descriptionAr?.message}
            {...register("descriptionAr")}
          />

          <InputField
            id="descriptionEn"
            label="الوصف (بالإنجليزية)"
            placeholder="Brief description"
            dir="ltr"
            error={errors.descriptionEn?.message}
            {...register("descriptionEn")}
          />

          <div className="rounded-xl border border-border/70 bg-secondary/15 p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-foreground">
                إجراء مخصص
              </span>
              <p className="text-[11px] text-muted-foreground">
                اختر إجراءً سريعاً أو اكتب إجراءً خاصاً بالوحدة:
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ACTION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card px-2 py-1 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  <span>{preset.labelAr}</span>
                  <span className="font-mono text-[9px] text-muted-foreground/70" dir="ltr">
                    ({preset.id})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <InputField
                id="customActionId"
                label="معرف الإجراء (slug)"
                placeholder="e.g. export"
                dir="ltr"
                error={errors.customActionId?.message}
                {...register("customActionId")}
              />

              <InputField
                id="customActionLabelAr"
                label="اسم الإجراء (بالعربية)"
                placeholder="مثال: تصدير"
                error={errors.customActionLabelAr?.message}
                {...register("customActionLabelAr")}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 pt-3 border-t border-border/50 flex flex-row items-center justify-end gap-3">
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
              size="sm"
              isLoading={isPending}
              className="text-xs h-9 px-5 cursor-pointer font-medium"
            >
              {isEdit ? "حفظ التعديلات" : "إضافة الوحدة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
