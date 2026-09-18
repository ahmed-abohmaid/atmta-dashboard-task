"use client";

import { useMemo } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { Module } from "@/@types/module";
import { ModuleCard } from "@/features/modules/components/ModuleCard";
import { SearchInput } from "@/components/SearchInput";

interface ModulesListProps {
  modules: Module[];
}

export function ModulesList({ modules }: ModulesListProps) {
  const [search] = useQueryState("search", parseAsString.withDefault(""));

  const filteredModules = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return modules;
    return modules.filter(
      (mod) =>
        mod.label.ar.toLowerCase().includes(trimmed) ||
        mod.label.en.toLowerCase().includes(trimmed) ||
        mod.id.toLowerCase().includes(trimmed),
    );
  }, [modules, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          placeholder="البحث في الوحدات..."
          syncUrl={true}
          paramKey="search"
          debounceMs={300}
          containerClassName="max-w-xs"
        />
        <span className="text-xs text-foreground/80 shrink-0 font-medium">
          {filteredModules.length} من {modules.length} وحدة
        </span>
      </div>

      {filteredModules.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 p-8 text-center bg-card/40">
          <p className="text-xs text-muted-foreground">
            لا توجد وحدة مطابقة لبحثك &quot;{search}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
