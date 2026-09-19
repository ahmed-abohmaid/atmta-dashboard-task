import { BoxesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModulesEmptyStateProps {
  onAddModule?: () => void;
}

export function ModulesEmptyState({ onAddModule }: ModulesEmptyStateProps) {
  return (
    <div className="border-border/80 bg-card/50 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center shadow-xs">
      <div className="bg-secondary text-primary border-border/40 mb-3 flex size-12 items-center justify-center rounded-full border">
        <BoxesIcon className="size-6" />
      </div>

      <h3 className="text-foreground mb-1 text-base font-semibold">لا توجد وحدات برمجية مسجلة</h3>

      <p className="text-muted-foreground mb-5 max-w-sm text-xs leading-relaxed">
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
