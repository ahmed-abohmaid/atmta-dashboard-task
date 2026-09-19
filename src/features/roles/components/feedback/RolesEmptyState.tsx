import { ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RolesEmptyStateProps {
  onAddRole?: () => void;
}

export function RolesEmptyState({ onAddRole }: RolesEmptyStateProps) {
  return (
    <div className="border-border/80 bg-card/50 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center shadow-xs">
      <div className="bg-secondary text-primary border-border/40 mb-3 flex size-12 items-center justify-center rounded-full border">
        <ShieldAlertIcon className="size-6" />
      </div>

      <h3 className="text-foreground mb-1 text-base font-semibold">لا توجد أدوار مسجلة</h3>

      <p className="text-muted-foreground mb-5 max-w-sm text-xs leading-relaxed">
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
