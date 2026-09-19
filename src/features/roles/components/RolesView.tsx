"use client";

import { useState } from "react";
import { RoleFormDialog } from "@/features/roles/components/dialogs/RoleFormDialog";
import { RolesEmptyState } from "@/features/roles/components/feedback/RolesEmptyState";
import { RolesError } from "@/features/roles/components/feedback/RolesError";
import { RolesSkeleton } from "@/features/roles/components/feedback/RolesSkeleton";
import { RolesHeader } from "@/features/roles/components/RolesHeader";
import { RolesList } from "@/features/roles/components/RolesList";
import { useRoles } from "@/features/roles/hooks/useRoles";

export function RolesView() {
  const { roles, isLoading, error, refetch } = useRoles();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <RolesHeader />

      {isLoading ? (
        <RolesSkeleton />
      ) : error ? (
        <RolesError error={error} onRetry={() => refetch()} />
      ) : roles.length === 0 ? (
        <RolesEmptyState onAddRole={() => setIsAddOpen(true)} />
      ) : (
        <RolesList roles={roles} />
      )}

      {isAddOpen && <RoleFormDialog mode="create" open={isAddOpen} onOpenChange={setIsAddOpen} />}
    </div>
  );
}
