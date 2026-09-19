import type { ReactNode } from "react";
import { cn } from "cn";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, badge, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-border/50 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-foreground truncate text-lg font-semibold tracking-tight">{title}</h1>
          {badge}
        </div>
        {description && (
          <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">{description}</p>
        )}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
    </div>
  );
}
