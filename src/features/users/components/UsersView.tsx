"use client";

import { useState } from "react";
import { UserStatus } from "@/@types/user";
import { useMe } from "@/features/auth/hooks/useMe";
import { UserWithRelations } from "@/features/users/@types/user";
import { DeleteUserDialog } from "@/features/users/components/dialogs/DeleteUserDialog";
import { UserFormDialog } from "@/features/users/components/dialogs/UserFormDialog";
import { UsersEmptyState } from "@/features/users/components/feedback/UsersEmptyState";
import { UsersErrorState } from "@/features/users/components/feedback/UsersErrorState";
import { UsersSkeleton } from "@/features/users/components/feedback/UsersSkeleton";
import { UsersHeader } from "@/features/users/components/UsersHeader";
import { UsersTable } from "@/features/users/components/UsersTable";
import { UsersToolbar } from "@/features/users/components/UsersToolbar";
import { useToggleUserStatus } from "@/features/users/hooks/useToggleUserStatus";
import { useUserFilters } from "@/features/users/hooks/useUserFilters";
import { useUsers } from "@/features/users/hooks/useUsers";

export function UsersView() {
  const {
    filters,
    search,
    role,
    status,
    hasActiveFilters,
    setSearch,
    setRole,
    setStatus,
    resetFilters,
  } = useUserFilters();

  const { user: currentUser } = useMe();
  const { users, isLoading, isError, error, refetch } = useUsers(filters);
  const { mutate: toggleStatusMutate } = useToggleUserStatus();

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRelations | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserWithRelations | null>(null);

  const handleCreateClick = () => {
    setSelectedUser(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (user: UserWithRelations) => {
    setSelectedUser(user);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (user: UserWithRelations) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleToggleStatus = (user: UserWithRelations) => {
    const nextStatus: UserStatus = user.status === "active" ? "inactive" : "active";
    toggleStatusMutate({ id: user.id, status: nextStatus });
  };

  const isDeleteTargetLastSuperAdmin = Boolean(
    userToDelete?.status === "active" &&
    userToDelete.roles?.includes("role_super_admin") &&
    users.filter((u) => u.status === "active" && u.roles?.includes("role_super_admin")).length <= 1
  );

  return (
    <div className="flex flex-col gap-4">
      <UsersHeader onAddClick={handleCreateClick} />

      <UsersToolbar
        search={search}
        role={role}
        status={status}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onResetFilters={resetFilters}
      />

      {isLoading ? (
        <UsersSkeleton />
      ) : isError ? (
        <UsersErrorState error={error} onRetry={refetch} />
      ) : users.length === 0 ? (
        <UsersEmptyState
          hasFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          onCreateClick={handleCreateClick}
        />
      ) : (
        <UsersTable
          users={users}
          currentUserId={currentUser?.id}
          onEdit={handleEditClick}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteClick}
        />
      )}

      {formDialogOpen && (
        <UserFormDialog
          user={selectedUser}
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
        />
      )}

      <DeleteUserDialog
        user={userToDelete}
        isSelf={Boolean(currentUser && userToDelete && currentUser.id === userToDelete.id)}
        isLastSuperAdmin={isDeleteTargetLastSuperAdmin}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
