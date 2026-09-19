"use client";

import { useMemo, useState } from "react";
import { Module } from "@/@types/module";
import { SearchInput } from "@/components/SearchInput";
import { ModuleCard } from "@/features/modules/components/ModuleCard";

interface ModulesListProps {
  modules: Module[];
}

export function ModulesList({ modules }: ModulesListProps) {
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return modules;
    return modules.filter(
      (mod) =>
        mod.label.ar.toLowerCase().includes(trimmed) ||
        mod.label.en.toLowerCase().includes(trimmed) ||
        mod.id.toLowerCase().includes(trimmed)
    );
  }, [modules, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          onSearch={setSearch}
          placeholder="البحث في الوحدات..."
          containerClassName="max-w-xs"
        />
        <span className="text-foreground/80 shrink-0 text-xs font-medium">
          {filteredModules.length} من {modules.length} وحدة
        </span>
      </div>

      {filteredModules.length === 0 ? (
        <div className="border-border/80 bg-card/40 rounded-xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-xs">
            لا توجد وحدة مطابقة لبحثك &quot;{search}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      )}
    </div>
  );
}
