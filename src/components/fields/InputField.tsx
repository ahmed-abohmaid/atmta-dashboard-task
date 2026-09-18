import { type ComponentProps, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

export interface InputFieldProps extends Omit<ComponentProps<"input">, "prefix"> {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerClassName?: string;
}

export function InputField({
  id,
  label,
  error,
  helperText,
  prefix,
  suffix,
  containerClassName,
  className,
  disabled,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={id} className="text-xs font-medium text-foreground">
          {label}
        </Label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 inset-s-0 flex items-center ps-2.5 pointer-events-none text-muted-foreground">
            {prefix}
          </div>
        )}
        <Input
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            "text-xs sm:text-sm placeholder:text-xs placeholder:text-muted-foreground/50",
            prefix && "ps-9",
            suffix && "pe-9",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 inset-e-0 flex items-center pe-2.5">
            {suffix}
          </div>
        )}
      </div>
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
