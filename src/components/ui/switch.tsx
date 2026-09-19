"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch border-border/90 focus-visible:ring-ring data-checked:bg-primary data-checked:border-primary data-unchecked:bg-secondary/90 relative inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        size === "default" ? "h-5 w-9 p-0.5" : "h-4 w-7 p-0.5",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full shadow-xs ring-0 transition-transform",
          size === "default"
            ? "size-3.5 data-checked:translate-x-4 data-unchecked:translate-x-0 rtl:data-checked:-translate-x-4"
            : "size-2.5 data-checked:translate-x-3 data-unchecked:translate-x-0 rtl:data-checked:-translate-x-3",
          "data-checked:bg-primary-foreground data-unchecked:bg-muted-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
