"use client";

import { useQueryState, parseAsString, debounce } from "nuqs";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

export type SearchQueryOptions = Parameters<
  typeof parseAsString.withOptions
>[0];

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  syncUrl?: boolean;
  paramKey?: string;
  debounceMs?: number;
  options?: SearchQueryOptions;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const DEFAULT_OPTIONS: SearchQueryOptions = {
  shallow: true,
  limitUrlUpdates: debounce(300),
};

export function SearchInput({
  value,
  onChange,
  placeholder = "البحث...",
  syncUrl = true,
  paramKey = "search",
  debounceMs,
  options,
  className,
  containerClassName,
  disabled,
  autoFocus,
}: SearchInputProps) {
  const [urlQuery, setUrlQuery] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({
      ...DEFAULT_OPTIONS,
      ...(debounceMs !== undefined && {
        limitUrlUpdates: debounce(debounceMs),
      }),
      ...options,
    }),
  );

  const query = syncUrl ? urlQuery : (value ?? "");

  const handleChange = (val: string) => {
    if (syncUrl) {
      setUrlQuery(val.trim() ? val : null);
    }
    onChange?.(val);
  };

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <SearchIcon className="absolute inset-y-0 inset-s-0 my-auto ms-2.5 size-3.5 text-muted-foreground pointer-events-none" />

      <Input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cn(
          "h-8 ps-8 pe-7 text-xs bg-card/70 border-border/80 text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors",
          className,
        )}
      />

      {query.length > 0 && !disabled && (
        <button
          type="button"
          onClick={() => handleChange("")}
          aria-label="مسح البحث"
          className="absolute inset-y-0 inset-e-0 my-auto me-1.5 flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
