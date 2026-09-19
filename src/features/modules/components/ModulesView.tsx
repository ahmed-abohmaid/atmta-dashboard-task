"use client";

import { ModulesEmptyState } from "@/features/modules/components/feedback/ModulesEmptyState";
import { ModulesError } from "@/features/modules/components/feedback/ModulesError";
import { ModulesSkeleton } from "@/features/modules/components/feedback/ModulesSkeleton";
import { ModulesHeader } from "@/features/modules/components/ModulesHeader";
import { ModulesList } from "@/features/modules/components/ModulesList";
import { useModules } from "@/features/modules/hooks/useModules";

export function ModulesView() {
  const { modules, isLoading, error, refetch } = useModules();

  return (
    <div className="flex flex-col gap-6">
      <ModulesHeader />

      {isLoading ? (
        <ModulesSkeleton />
      ) : error ? (
        <ModulesError error={error} onRetry={() => refetch()} />
      ) : modules.length === 0 ? (
        <ModulesEmptyState />
      ) : (
        <ModulesList modules={modules} />
      )}
    </div>
  );
}
