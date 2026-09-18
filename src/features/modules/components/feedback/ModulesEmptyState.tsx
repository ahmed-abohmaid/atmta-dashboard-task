import { BoxesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModulesEmptyStateProps {
  onAddModule?: () => void;
}

export function ModulesEmptyState({ onAddModule }: ModulesEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center shadow-xs">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary border border-border/40 mb-3">
        <BoxesIcon className="size-6" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        لا توجد وحدات برمجية مسجلة
      </h3>

      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-5">
        لم يتم تسجيل أي وحدات برمجية في النظام حتى الآن. يمكنك إضافة وحدة جديدة لبدء تشغيلها.
      </p>

      {onAddModule && (
        <Button size="sm" onClick={onAddModule} className="text-xs">
          إضافة وحدة برمجية
        </Button>
      )}
    </div>
  );
}
