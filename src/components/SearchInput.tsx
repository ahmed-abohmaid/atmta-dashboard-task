"use client";

import { useEffect } from "react";
import { useQueryState, parseAsString, debounce } from "nuqs";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "cn";

export interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  paramKey?: string;
  debounceMs?: number;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function SearchInput({
  onSearch,
  placeholder = "البحث...",
  paramKey = "search",
  debounceMs = 300,
  className,
  containerClassName,
  disabled,
  autoFocus,
}: SearchInputProps) {
  const [urlQuery, setUrlQuery] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({
      shallow: true,
      limitUrlUpdates: debounce(debounceMs),
    }),
  );

  const debouncedValue = useDebounce(urlQuery, debounceMs);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <SearchIcon className="absolute inset-y-0 inset-s-0 my-auto ms-2.5 size-3.5 text-muted-foreground pointer-events-none" />

      <Input
        value={urlQuery}
        onChange={(e) =>
          setUrlQuery(e.target.value.trim() ? e.target.value : null)
        }
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cn(
          "h-8 ps-8 pe-7 text-xs bg-card/70 border-border/80 text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors",
          className,
        )}
      />

      {urlQuery.length > 0 && !disabled && (
        <button
          type="button"
          onClick={() => setUrlQuery(null)}
          aria-label="مسح البحث"
          className="absolute inset-y-0 inset-e-0 my-auto me-1.5 flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
