"use client";

import type { MouseEvent } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

export interface SelectFilterOption {
  value: string;
  label: string;
  depth?: number;
}

export interface SelectFilterProps {
  paramKey?: string;
  value?: string | null;
  defaultValue?: string;
  onChange?: (val: string | null) => void;
  options: SelectFilterOption[];
  placeholder?: string;
  allLabel?: string;
  allValue?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  pageParamKey?: string;
}

export function SelectFilter({
  paramKey = "filter",
  value: controlledValue,
  defaultValue = "all",
  onChange,
  options,
  placeholder = "اختر...",
  allLabel = "الكل",
  allValue = "all",
  disabled = false,
  className,
  triggerClassName,
  pageParamKey = "page",
}: SelectFilterProps) {
  const [urlQuery, setUrlQuery] = useQueryState(
    paramKey,
    parseAsString.withDefault(defaultValue).withOptions({ shallow: true })
  );

  const [, setPage] = useQueryState(
    pageParamKey,
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );

  const isControlled = typeof controlledValue !== "undefined";
  const activeValue = isControlled
    ? controlledValue || allValue
    : urlQuery || allValue;

  const handleChange = (newVal: string | null) => {
    const nextVal = newVal === allValue || !newVal ? null : newVal;

    if (!isControlled && paramKey) {
      setUrlQuery(nextVal ? newVal : null);
      if (pageParamKey) {
        setPage(1);
      }
    }

    onChange?.(nextVal);
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleChange(allValue);
  };

  const hasActiveValue = Boolean(
    activeValue && activeValue !== allValue && activeValue !== ""
  );

  const activeLabel = options.find((o) => o.value === activeValue)?.label;

  return (
    <div className={cn("relative w-full", className)}>
      <Select
        value={activeValue}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "w-full h-9 text-xs transition-colors",
            hasActiveValue && "pe-8",
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder}>
            {() => activeLabel || (activeValue === allValue ? allLabel : placeholder)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {allLabel && (
            <>
              <SelectItem value={allValue} className="text-xs py-2">
                {allLabel}
              </SelectItem>
              <SelectSeparator />
            </>
          )}
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-xs py-2"
              style={
                typeof opt.depth === "number"
                  ? { paddingInlineStart: `${14 + opt.depth * 14}px` }
                  : undefined
              }
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="مسح التصفية"
          className="absolute inset-y-0 inset-e-0 my-auto me-7 flex size-4 items-center justify-center rounded-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer z-10"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
