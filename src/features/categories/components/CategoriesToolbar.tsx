"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/SearchInput";

interface CategoriesToolbarProps {
  onSearch?: (value: string) => void;
  isAllExpanded: boolean;
  onToggleExpandAll: () => void;
  totalCount: number;
  rootCount: number;
  subCount: number;
}

export function CategoriesToolbar({
  onSearch,
  isAllExpanded,
  onToggleExpandAll,
  totalCount,
  rootCount,
  subCount,
}: CategoriesToolbarProps) {
  return (
    <div className="border-border/70 bg-card flex flex-col items-stretch justify-between gap-3 rounded-xl border p-3 shadow-xs sm:flex-row sm:items-center">
      <div className="w-full flex-1 sm:max-w-md">
        <SearchInput onSearch={onSearch} placeholder="البحث في شجرة التصنيفات..." />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="text-muted-foreground border-border/50 flex items-center gap-1.5 border-e pe-3 text-xs">
          <span>{totalCount} إجمالي</span>
          <span>•</span>
          <span className="text-foreground font-medium">{rootCount} رئيسي</span>
          <span>•</span>
          <span>{subCount} فرعي</span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleExpandAll}
          className="h-8 min-w-24 shrink-0 justify-center gap-1.5 text-xs font-normal transition-colors"
        >
          {isAllExpanded ? (
            <>
              <ChevronUpIcon className="text-muted-foreground size-3.5" />
              <span>طي الكل</span>
            </>
          ) : (
            <>
              <ChevronDownIcon className="text-muted-foreground size-3.5" />
              <span>توسيع الكل</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
