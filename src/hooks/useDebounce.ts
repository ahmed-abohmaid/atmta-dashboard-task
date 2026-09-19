"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  if (typeof value === "string" && !value && debouncedValue) {
    setDebouncedValue(value);
  }

  useEffect(() => {
    if (typeof value === "string" && !value) return;

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
