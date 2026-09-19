"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryNode } from "@/@types/category";
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
import { CategoryParentSelect } from "@/features/categories/components/dialogs/CategoryFormDialog/CategoryParentSelect";
import {
  categorySchema,
  CategoryFormValues,
} from "@/features/categories/schemas/categorySchema";
import { useCreateCategory } from "@/features/categories/hooks/useCreateCategory";
import { useUpdateCategory } from "@/features/categories/hooks/useUpdateCategory";
import { useCategoryLookup } from "@/features/categories/hooks/useCategoryLookup";

interface CategoryFormDialogProps {
  mode: "create" | "edit";
  category?: CategoryNode;
  defaultParentId?: string | null;
  defaultParentName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryFormDialog({
  mode,
  category,
  defaultParentId = null,
  defaultParentName,
  open,
  onOpenChange,
}: CategoryFormDialogProps) {
  const isEdit = mode === "edit";

  const { data: parentOptions = [], isLoading: isLookupLoading } =
    useCategoryLookup(isEdit ? category?.id : undefined);

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateCategory();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateCategory();
  const isPending = isCreatePending || isUpdatePending || isLookupLoading;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name_ar: category?.name_ar || "",
      name_en: category?.name_en || "",
      parentId: (category?.parentId ?? defaultParentId) || null,
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    const parentIdValue =
      values.parentId && values.parentId !== "root" ? values.parentId : null;

    if (isEdit && category) {
      updateMutate(
        {
          id: category.id,
          name_ar: values.name_ar.trim(),
          name_en: values.name_en.trim(),
          parentId: parentIdValue,
        },
        {
          onSuccess: () => onOpenChange(false),
        },
      );
    } else {
      createMutate(
        {
          name_ar: values.name_ar.trim(),
          name_en: values.name_en.trim(),
          parentId: parentIdValue,
        },
        {
          onSuccess: () => onOpenChange(false),
        },
      );
    }
  };

  const isAddSubcategory = !isEdit && Boolean(defaultParentId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-border/70 bg-card shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {isEdit
              ? "تعديل بيانات التصنيف"
              : isAddSubcategory
                ? "إضافة تصنيف فرعي"
                : "إضافة تصنيف رئيسي"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {isEdit
              ? "قم بتحديث المسميات أو نقل التصنيف تحت فرع أب آخر في الشجرة."
              : isAddSubcategory && defaultParentName
                ? `إضافة تصنيف فرعي جديد يتبع مباشرة لـ "${defaultParentName}".`
                : "أدخل مسمى التصنيف وحدد المستوى الأب في الشجرة الهندسية."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          <InputField
            id="name_ar"
            label="اسم التصنيف بالعربية *"
            placeholder="مثال: الأعمال الكهربائية وأنظمة الطاقة"
            disabled={isPending}
            error={errors.name_ar?.message}
            {...register("name_ar")}
          />

          <InputField
            id="name_en"
            label="اسم التصنيف بالإنجليزية *"
            placeholder="e.g. Electrical Works & Power Systems"
            disabled={isPending}
            error={errors.name_en?.message}
            {...register("name_en")}
          />

          {isAddSubcategory && defaultParentName ? (
            <div className="flex items-center justify-between rounded-xl border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-xs">
              <span className="text-muted-foreground">
                التصنيف الأب التابع له:
              </span>
              <span className="font-semibold text-primary">
                {defaultParentName}
              </span>
            </div>
          ) : (
            <CategoryParentSelect
              control={control}
              parentOptions={parentOptions}
              disabled={isPending}
            />
          )}

          <DialogFooter className="mt-4 pt-4 border-t border-border/50">
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
              {isEdit ? "حفظ التعديلات" : "إضافة التصنيف"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
