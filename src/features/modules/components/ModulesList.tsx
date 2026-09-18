"use client";

import { useMemo } from "react";
import { useQueryState, parseAsString, debounce } from "nuqs";
import { SearchIcon } from "lucide-react";
import { Module } from "@/@types/module";
import { ModuleCard } from "@/features/modules/components/ModuleCard";
import { Input } from "@/components/ui/input";

interface ModulesListProps {
  modules: Module[];
}

export function ModulesList({ modules }: ModulesListProps) {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      shallow: true, // Prevents full page reloads on query change
      limitUrlUpdates: debounce(300),
    }),
  );

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
        <div className="relative w-full max-w-xs">
          <SearchIcon className="absolute inset-y-0 inset-s-0 my-auto ms-2.5 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث في الوحدات..."
            className="h-8 ps-8 text-xs bg-card/60 placeholder:text-xs placeholder:text-muted-foreground/50"
          />
        </div>
        <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
          {filteredModules.length} من {modules.length} وحدة
        </span>
      </div>

      {filteredModules.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 p-8 text-center bg-card/30">
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
