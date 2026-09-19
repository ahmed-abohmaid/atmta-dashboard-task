"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "cn";

export interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  paramKey?: string;
  pageParamKey?: string;
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
  pageParamKey = "page",
  debounceMs = 300,
  className,
  containerClassName,
  disabled,
  autoFocus,
}: SearchInputProps) {
  const [urlQuery, setUrlQuery] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({ shallow: true }),
  );

  const [, setPage] = useQueryState(
    pageParamKey,
    parseAsInteger.withDefault(1).withOptions({ shallow: true }),
  );

  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [inputValue, setInputValue] = useState(urlQuery);
  const debouncedValue = useDebounce(inputValue, debounceMs);

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setInputValue(urlQuery);
  }

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  });

  useEffect(() => {
    const nextParam = debouncedValue.trim() || null;
    if (nextParam !== (urlQuery || null)) {
      setUrlQuery(nextParam);
      setPage(1);
    }
    onSearchRef.current?.(debouncedValue);
  }, [debouncedValue, urlQuery, setUrlQuery, setPage]);

  const handleClear = () => {
    setInputValue("");
    setUrlQuery(null);
    setPage(1);
    onSearchRef.current?.("");
  };

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <SearchIcon className="absolute inset-y-0 inset-s-0 my-auto ms-2.5 size-3.5 text-muted-foreground pointer-events-none" />

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={cn(
          "h-8 ps-8 pe-7 text-xs bg-card/70 border-border/80 text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors",
          className,
        )}
      />

      {inputValue.length > 0 && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="مسح البحث"
          className="absolute inset-y-0 inset-e-0 my-auto me-1.5 flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
}
