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
      <div className="border-border/80 bg-card/40 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center">
        <div className="bg-secondary/40 text-muted-foreground flex size-12 items-center justify-center rounded-xl">
          <FilterXIcon className="size-6" />
        </div>
        <div className="flex max-w-sm flex-col gap-1">
          <h3 className="text-foreground text-sm font-semibold">
            لا توجد نتائج مطابقة لخيارات البحث
          </h3>
          <p className="text-muted-foreground text-xs">
            لم نتمكن من العثور على أي مورد يطابق معايير الفلترة المحددة. جرب تغيير كلمات البحث أو
            إعادة ضبط الفلاتر.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="mt-2 cursor-pointer text-xs"
          >
            إعادة ضبط الفلاتر
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="border-border/80 bg-card/40 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center">
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
        <Building2Icon className="size-6" />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="text-foreground text-sm font-semibold">لا يوجد موردون مسجلون حتى الآن</h3>
        <p className="text-muted-foreground text-xs">
          ابدأ بإضافة أول مقاول أو مورد معتمد في النظام وربطه بالتصنيف المناسب.
        </p>
      </div>
      {onAddVendor && (
        <PermissionGate action="create" subject="vendors">
          <Button size="sm" onClick={onAddVendor} className="mt-2 cursor-pointer gap-2 text-xs">
            <PlusIcon className="size-3.5" />
            إضافة مورد جديد
          </Button>
        </PermissionGate>
      )}
    </div>
  );
}
