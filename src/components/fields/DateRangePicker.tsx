"use client";

import type { MouseEvent } from "react";
import { cn } from "cn";
import { format, isAfter, isBefore, isValid, parseISO, startOfDay } from "date-fns";
import { AlertCircleIcon, CalendarIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface DateRangeValue {
  from?: string;
  to?: string;
}

export interface DateRangePickerProps {
  from?: string;
  to?: string;
  onChange: (range: DateRangeValue) => void;
  placeholder?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function parseDate(val?: string): Date | undefined {
  if (!val) return undefined;
  const parsed = parseISO(val);
  return isValid(parsed) ? parsed : undefined;
}

function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function DateRangePicker({
  from,
  to,
  onChange,
  placeholder = "الفترة الزمنية",
  title = "تحديد الفترة الزمنية",
  disabled = false,
  className,
  error,
}: DateRangePickerProps) {
  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  const isInvalid = Boolean(
    fromDate && toDate && isBefore(startOfDay(toDate), startOfDay(fromDate))
  );

  const handleFromSelect = (day?: Date) => {
    if (!day) {
      onChange({ from: undefined, to });
      return;
    }

    const nextFrom = formatDate(day);
    if (toDate && isAfter(startOfDay(day), startOfDay(toDate))) {
      onChange({ from: nextFrom, to: undefined });
    } else {
      onChange({ from: nextFrom, to });
    }
  };

  const handleToSelect = (day?: Date) => {
    if (!day) {
      onChange({ from, to: undefined });
      return;
    }

    if (fromDate && isBefore(startOfDay(day), startOfDay(fromDate))) {
      return;
    }

    onChange({
      from,
      to: formatDate(day),
    });
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange({ from: undefined, to: undefined });
  };

  const hasValue = Boolean(from || to);
  const label = hasValue ? `${from || "البداية"} - ${to || "الآن"}` : placeholder;

  return (
    <div className={cn("relative w-full", className)}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className={cn(
                "h-9 w-full justify-start gap-2 pe-8 text-start text-xs font-normal",
                isInvalid && "border-destructive text-destructive",
                error && "border-destructive"
              )}
            >
              <CalendarIcon className="text-muted-foreground size-3.5 shrink-0" />
              <span className="truncate">{label}</span>
            </Button>
          }
        />
        <PopoverContent className="flex w-auto flex-col gap-3 p-4" align="end">
          <div className="border-border/50 flex items-center justify-between border-b pb-2">
            <span className="text-foreground text-xs font-semibold">{title}</span>
            {hasValue && (
              <button
                type="button"
                onClick={() => onChange({ from: undefined, to: undefined })}
                className="text-muted-foreground hover:text-primary cursor-pointer text-[11px] transition-colors"
              >
                مسح الفترة
              </button>
            )}
          </div>

          {isInvalid && (
            <div className="text-destructive bg-destructive/10 border-destructive/20 flex items-center gap-1.5 rounded-lg border p-2 text-[11px]">
              <AlertCircleIcon className="size-3.5 shrink-0" />
              <span>تاريخ النهاية يجب ألا يكون قبل تاريخ البداية.</span>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-[11px] font-medium">من تاريخ</span>
              <div className="border-border/60 bg-background/50 rounded-lg border p-1">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={handleFromSelect}
                  disabled={(date) =>
                    toDate ? isAfter(startOfDay(date), startOfDay(toDate)) : false
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-[11px] font-medium">إلى تاريخ</span>
              <div className="border-border/60 bg-background/50 rounded-lg border p-1">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={handleToSelect}
                  disabled={(date) =>
                    fromDate ? isBefore(startOfDay(date), startOfDay(fromDate)) : false
                  }
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="مسح التاريخ"
          className="text-muted-foreground hover:bg-secondary hover:text-foreground absolute inset-y-0 inset-e-0 z-10 my-auto me-1.5 flex size-5 cursor-pointer items-center justify-center rounded-md transition-colors"
        >
          <XIcon className="size-3" />
        </button>
      )}

      {error && <span className="text-destructive mt-1 block text-[11px]">{error}</span>}
    </div>
  );
}
