import { Building2Icon, FilterXIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface VendorsEmptyStateProps {
  isFiltered?: boolean;
  onResetFilters?: () => void;
  onAddVendor?: () => void;
}

export function VendorsEmptyState({
  isFiltered = false,
  onResetFilters,
  onAddVendor,
}: VendorsEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-border/80 bg-card/40 text-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-secondary/40 text-muted-foreground">
          <FilterXIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="text-sm font-semibold text-foreground">
            لا توجد نتائج مطابقة لخيارات البحث
          </h3>
          <p className="text-xs text-muted-foreground">
            لم نتمكن من العثور على أي مورد يطابق معايير الفلترة المحددة. جرب تغيير كلمات البحث أو إعادة ضبط الفلاتر.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="mt-2 text-xs cursor-pointer"
          >
            إعادة ضبط الفلاتر
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-border/80 bg-card/40 text-center gap-3">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Building2Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-sm font-semibold text-foreground">
          لا يوجد موردون مسجلون حتى الآن
        </h3>
        <p className="text-xs text-muted-foreground">
          ابدأ بإضافة أول مقاول أو مورد معتمد في النظام وربطه بالتصنيف المناسب.
        </p>
      </div>
      {onAddVendor && (
        <PermissionGate action="create" subject="vendors">
          <Button
            size="sm"
            onClick={onAddVendor}
            className="mt-2 text-xs cursor-pointer gap-2"
          >
            <PlusIcon className="size-3.5" />
            إضافة مورد جديد
          </Button>
        </PermissionGate>
      )}
    </div>
  );
}
