"use client";

import { Control, Controller } from "react-hook-form";
import { CategorySelectOption } from "@/@types/category";
import { CategoryFormValues } from "@/features/categories/schemas/categorySchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryParentSelectProps {
  control: Control<CategoryFormValues>;
  parentOptions: CategorySelectOption[];
  disabled?: boolean;
}

export function CategoryParentSelect({
  control,
  parentOptions,
  disabled,
}: CategoryParentSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="parentId"
        className="text-xs font-medium text-foreground"
      >
        التصنيف الأب (اختياري)
      </label>
      <Controller
        control={control}
        name="parentId"
        render={({ field }) => (
          <Select
            value={field.value || "root"}
            onValueChange={(val) =>
              field.onChange(val === "root" ? null : val)
            }
            disabled={disabled}
          >
            <SelectTrigger id="parentId" className="w-full text-xs">
              <SelectValue placeholder="اختر التصنيف الأب...">
                {(val: string | null) => {
                  if (!val || val === "root") {
                    return "بدون تصنيف أب (مستوى رئيسي)";
                  }
                  const found = parentOptions.find((opt) => opt.id === val);
                  return found ? found.label : val;
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-64" align="start">
              <SelectItem value="root" className="text-xs font-medium py-2.5">
                بدون تصنيف أب (مستوى رئيسي)
              </SelectItem>
              <SelectSeparator />
              {parentOptions.map((opt) => (
                <SelectItem
                  key={opt.id}
                  value={opt.id}
                  disabled={opt.disabled}
                  className="text-xs py-2"
                  style={{
                    paddingInlineStart: `${14 + opt.depth * 14}px`,
                  }}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <span className="text-[11px] text-muted-foreground">
        ترك الحقل فارغاً يجعل التصنيف في المستوى الرئيسي.
      </span>
    </div>
  );
}
