"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VendorsPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  disabled?: boolean;
}

export function VendorsPagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: VendorsPaginationProps) {
  if (total === 0) return null;

  const start = Math.min((page - 1) * pageSize + 1, total);
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 py-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>عرض</span>
        <span className="font-semibold text-foreground">{start}</span>
        <span>إلى</span>
        <span className="font-semibold text-foreground">{end}</span>
        <span>من</span>
        <span className="font-semibold text-foreground">{total}</span>
        <span>مورد</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            لكل صفحة:
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => onPageSizeChange(Number(val))}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-18 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="5" className="text-xs">
                5
              </SelectItem>
              <SelectItem value="10" className="text-xs">
                10
              </SelectItem>
              <SelectItem value="20" className="text-xs">
                20
              </SelectItem>
              <SelectItem value="50" className="text-xs">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                disabled={disabled || page <= 1}
                className={page <= 1 || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive size="sm" className="font-mono text-xs cursor-default">
                {page} / {totalPages}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                disabled={disabled || page >= totalPages}
                className={page >= totalPages || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
