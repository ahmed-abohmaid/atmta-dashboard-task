"use client";

import type { MouseEvent } from "react";
import {
  format,
  parseISO,
  isValid,
  startOfDay,
  isAfter,
  isBefore,
} from "date-fns";
import { CalendarIcon, XIcon, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "cn";

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
  const label = hasValue
    ? `${from || "البداية"} - ${to || "الآن"}`
    : placeholder;

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
                "w-full h-9 text-xs justify-start text-start font-normal gap-2 pe-8",
                isInvalid && "border-destructive text-destructive",
                error && "border-destructive"
              )}
            >
              <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{label}</span>
            </Button>
          }
        />
        <PopoverContent className="w-auto p-4 flex flex-col gap-3" align="end">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-xs font-semibold text-foreground">
              {title}
            </span>
            {hasValue && (
              <button
                type="button"
                onClick={() => onChange({ from: undefined, to: undefined })}
                className="text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                مسح الفترة
              </button>
            )}
          </div>

          {isInvalid && (
            <div className="flex items-center gap-1.5 text-[11px] text-destructive bg-destructive/10 border border-destructive/20 p-2 rounded-lg">
              <AlertCircleIcon className="size-3.5 shrink-0" />
              <span>تاريخ النهاية يجب ألا يكون قبل تاريخ البداية.</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">
                من تاريخ
              </span>
              <div className="border border-border/60 rounded-lg p-1 bg-background/50">
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
              <span className="text-[11px] font-medium text-muted-foreground">
                إلى تاريخ
              </span>
              <div className="border border-border/60 rounded-lg p-1 bg-background/50">
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
          className="absolute inset-y-0 inset-e-0 my-auto me-1.5 flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer z-10"
        >
          <XIcon className="size-3" />
        </button>
      )}

      {error && (
        <span className="text-[11px] text-destructive mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
}
