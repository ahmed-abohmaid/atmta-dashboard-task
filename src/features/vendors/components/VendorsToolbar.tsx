"use client";

import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { SearchInput } from "@/components/SearchInput";
import { SelectFilter } from "@/components/SelectFilter";
import { useCategoryLookup } from "@/features/categories/hooks/useCategoryLookup";

const STATUS_OPTIONS = [
  { value: "active", label: "نشط فقط" },
  { value: "inactive", label: "غير نشط فقط" },
];

interface VendorsToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  categoryId: string;
  onCategoryChange: (val: string | null) => void;
  status: string;
  onStatusChange: (val: string) => void;
  from?: string;
  to?: string;
  onDateRangeChange: (range: { from?: string; to?: string }) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  disabled?: boolean;
}

export function VendorsToolbar({
  onSearchChange,
  categoryId,
  onCategoryChange,
  status,
  onStatusChange,
  from,
  to,
  onDateRangeChange,
  hasActiveFilters,
  onResetFilters,
  disabled = false,
}: VendorsToolbarProps) {
  const { data: categoryOptions = [] } = useCategoryLookup();

  const formattedCategoryOptions = categoryOptions.map((opt) => ({
    value: opt.id,
    label: opt.label,
    depth: opt.depth,
  }));

  return (
    <div className="border-border/80 bg-card/60 flex flex-col gap-3 rounded-xl border p-3.5 shadow-xs">
      <div className="flex flex-col items-stretch gap-2.5 lg:flex-row lg:items-center">
        <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SearchInput
              placeholder="بحث باسم المورد (عربي/إنجليزي) أو السجل التجاري..."
              paramKey="search"
              onSearch={onSearchChange}
              disabled={disabled}
              className="h-9 text-xs"
            />
          </div>

          <div>
            <SelectFilter
              paramKey="category"
              value={categoryId}
              onChange={onCategoryChange}
              options={formattedCategoryOptions}
              allLabel="كافة التصنيفات"
              placeholder="تصفية حسب التصنيف..."
              disabled={disabled}
            />
          </div>

          <div>
            <SelectFilter
              paramKey="status"
              value={status}
              onChange={(val) => onStatusChange(val || "all")}
              options={STATUS_OPTIONS}
              allLabel="كافة الحالات"
              placeholder="الحالة..."
              disabled={disabled}
            />
          </div>

          <div>
            <DateRangeFilter
              from={from}
              to={to}
              onChange={onDateRangeChange}
              placeholder="تاريخ الإضافة"
              title="تحديد الفترة الزمنية للإضافة"
              disabled={disabled}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground h-9 shrink-0 cursor-pointer gap-1.5 self-end px-3 text-xs lg:self-auto"
          >
            <RotateCcwIcon className="size-3.5" />
            <span>إعادة ضبط</span>
          </Button>
        )}
      </div>
    </div>
  );
}
