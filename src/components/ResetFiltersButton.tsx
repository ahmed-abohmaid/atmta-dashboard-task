"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";
import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ResetFiltersButtonProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  onReset: () => void;
  label?: string;
  showIcon?: boolean;
}

export function ResetFiltersButton({
  onReset,
  label = "إعادة ضبط",
  showIcon = true,
  className,
  disabled,
  ...props
}: ResetFiltersButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onReset}
      disabled={disabled}
      className={cn(
        "text-muted-foreground hover:text-foreground h-9 shrink-0 cursor-pointer gap-1.5 px-3 text-xs transition-colors",
        className
      )}
      {...props}
    >
      {showIcon && <RotateCcwIcon className="size-3.5" />}
      <span>{label}</span>
    </Button>
  );
}
