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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-xs">
      <div className="flex-1 w-full sm:max-w-md">
        <SearchInput
          onSearch={onSearch}
          placeholder="البحث في شجرة التصنيفات..."
        />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pe-3 border-e border-border/50">
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
          className="h-8 min-w-24 justify-center gap-1.5 text-xs font-normal transition-colors shrink-0"
        >
          {isAllExpanded ? (
            <>
              <ChevronUpIcon className="size-3.5 text-muted-foreground" />
              <span>طي الكل</span>
            </>
          ) : (
            <>
              <ChevronDownIcon className="size-3.5 text-muted-foreground" />
              <span>توسيع الكل</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
