import { ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RolesEmptyStateProps {
  onAddRole?: () => void;
}

export function RolesEmptyState({ onAddRole }: RolesEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center shadow-xs">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary border border-border/40 mb-3">
        <ShieldAlertIcon className="size-6" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1">
        لا توجد أدوار مسجلة
      </h3>

      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-5">
        لم يتم العثور على أي أدوار في النظام. يمكنك إضافة دور جديد وتعيين الصلاحيات له.
      </p>

      {onAddRole && (
        <Button size="sm" onClick={onAddRole} className="text-xs">
          إضافة دور جديد
        </Button>
      )}
    </div>
  );
}
