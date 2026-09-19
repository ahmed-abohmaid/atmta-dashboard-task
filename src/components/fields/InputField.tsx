import { type ComponentProps, type ReactNode } from "react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor={id} className="text-foreground text-xs font-medium">
          {label}
        </Label>
      )}
      <div className="relative">
        {prefix && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-2.5">
            {prefix}
          </div>
        )}
        <Input
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            "placeholder:text-muted-foreground/50 text-xs placeholder:text-xs sm:text-sm",
            prefix && "ps-9",
            suffix && "pe-9",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 inset-e-0 flex items-center pe-2.5">{suffix}</div>
        )}
      </div>
      {error && <span className="text-destructive text-[11px] font-normal">{error}</span>}
      {!error && helperText && (
        <span className="text-muted-foreground text-[11px] font-normal">{helperText}</span>
      )}
    </div>
  );
}
