"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { DateRangePicker, DateRangeValue } from "@/components/fields/DateRangePicker";

export interface DateRangeFilterProps {
  fromParamKey?: string;
  toParamKey?: string;
  pageParamKey?: string;
  from?: string;
  to?: string;
  onChange?: (range: DateRangeValue) => void;
  placeholder?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangeFilter({
  fromParamKey = "from",
  toParamKey = "to",
  pageParamKey = "page",
  from: controlledFrom,
  to: controlledTo,
  onChange,
  placeholder = "تاريخ الإضافة",
  title = "تحديد الفترة الزمنية",
  disabled = false,
  className,
}: DateRangeFilterProps) {
  const [urlFrom, setUrlFrom] = useQueryState(
    fromParamKey,
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [urlTo, setUrlTo] = useQueryState(
    toParamKey,
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  const [, setPage] = useQueryState(
    pageParamKey,
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );

  const isControlled = typeof controlledFrom !== "undefined" || typeof controlledTo !== "undefined";

  const currentFrom = isControlled ? controlledFrom : urlFrom || undefined;
  const currentTo = isControlled ? controlledTo : urlTo || undefined;

  const handleChange = (range: DateRangeValue) => {
    if (!isControlled) {
      setUrlFrom(range.from || null);
      setUrlTo(range.to || null);
      if (pageParamKey) {
        setPage(1);
      }
    }
    onChange?.(range);
  };

  return (
    <DateRangePicker
      from={currentFrom}
      to={currentTo}
      onChange={handleChange}
      placeholder={placeholder}
      title={title}
      disabled={disabled}
      className={className}
    />
  );
}
