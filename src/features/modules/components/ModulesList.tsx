"use client";

import { Module } from "@/@types/module";
import { ModuleCard } from "@/features/modules/components/ModuleCard";

interface ModulesListProps {
  modules: Module[];
}

export function ModulesList({ modules }: ModulesListProps) {
  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((mod) => (
        <ModuleCard key={mod.id} module={mod} />
      ))}
    </div>
  );
}
