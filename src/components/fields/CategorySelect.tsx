"use client";

import { useId } from "react";
import { CategorySelectOption } from "@/@types/category";
import { useCategoryLookup } from "@/features/categories/hooks/useCategoryLookup";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

export interface CategorySelectProps {
  id?: string;
  label?: string;
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  excludeId?: string;
  options?: CategorySelectOption[];
  rootOption?: {
    label: string;
  };
  containerClassName?: string;
  className?: string;
}

const ROOT_VALUE = "__ROOT__";

export function CategorySelect({
  id: explicitId,
  label,
  value,
  onChange,
  placeholder = "اختر التصنيف...",
  disabled = false,
  error,
  helperText,
  excludeId,
  options: externalOptions,
  rootOption,
  containerClassName,
  className,
}: CategorySelectProps) {
  const generatedId = useId();
  const id = explicitId || generatedId;

  const { data: fetchedOptions = [], isLoading } = useCategoryLookup(
    externalOptions ? undefined : excludeId
  );

  const options = externalOptions ?? fetchedOptions;
  const isDisabled = disabled || (!externalOptions && isLoading);

  const selectValue =
    rootOption && (value === null || value === "")
      ? ROOT_VALUE
      : value || "";

  const handleValueChange = (val: string | null) => {
    if (!val || (rootOption && val === ROOT_VALUE)) {
      onChange(null);
    } else {
      onChange(val);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={id} className="text-xs font-medium text-foreground">
          {label}
        </Label>
      )}

      <Select
        value={selectValue}
        onValueChange={handleValueChange}
        disabled={isDisabled}
      >
        <SelectTrigger id={id} className={cn("w-full text-xs", className)}>
          <SelectValue placeholder={placeholder}>
            {(val: string | null) => {
              if (!val) return placeholder;
              if (rootOption && val === ROOT_VALUE) {
                return rootOption.label;
              }
              const found = options.find((opt) => opt.id === val);
              return found ? found.label : val;
            }}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="max-h-64" align="start">
          {rootOption && (
            <>
              <SelectItem
                value={ROOT_VALUE}
                className="text-xs font-medium py-2.5"
              >
                {rootOption.label}
              </SelectItem>
              <SelectSeparator />
            </>
          )}

          {options.map((opt) => (
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

      {error && (
        <span className="text-[11px] font-normal text-destructive">
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className="text-[11px] font-normal text-muted-foreground">
          {helperText}
        </span>
      )}
    </div>
  );
}
