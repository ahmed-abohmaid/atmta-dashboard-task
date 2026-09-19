"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, UsersIcon } from "lucide-react";
import { UserWithRelations } from "@/features/users/@types/user";
import { UserFormDialog } from "@/features/users/components/dialogs/UserFormDialog";
import { UserProfileError } from "@/features/users/components/profile/UserProfileError";
import { UserProfileHeader } from "@/features/users/components/profile/UserProfileHeader";
import { UserProfileInfo } from "@/features/users/components/profile/UserProfileInfo";
import { UserProfilePermissions } from "@/features/users/components/profile/UserProfilePermissions";
import { UserProfileSkeleton } from "@/features/users/components/profile/UserProfileSkeleton";
import { UserProfileVendors } from "@/features/users/components/profile/UserProfileVendors";
import { useUserDetail } from "@/features/users/hooks/useUserDetail";

interface UserProfileViewProps {
  userId: string;
}

export function UserProfileView({ userId }: UserProfileViewProps) {
  const { userDetail, isLoading, isError, error } = useUserDetail(userId);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (isError || !userDetail) {
    return <UserProfileError error={error} />;
  }

  const { user, roles, resolvedPermissions, createdVendors, isLastSuperAdmin } = userDetail;

  const userForEdit: UserWithRelations = {
    ...user,
    roleObjects: roles,
    createdVendorsCount: createdVendors.length,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Link
          href="/users"
          className="hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <UsersIcon className="size-3.5" />
          <span>المستخدمون</span>
        </Link>
        <ChevronLeftIcon className="size-3.5 opacity-60" />
        <span className="text-foreground font-medium">الملف الشخصي: {user.name}</span>
      </div>

      <UserProfileHeader
        user={user}
        roles={roles}
        isLastSuperAdmin={isLastSuperAdmin}
        onEditClick={() => setEditDialogOpen(true)}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserProfileInfo user={user} roles={roles} />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <UserProfilePermissions resolvedPermissions={resolvedPermissions} />

          <UserProfileVendors vendors={createdVendors} />
        </div>
      </div>

      <UserFormDialog user={userForEdit} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </div>
  );
}
