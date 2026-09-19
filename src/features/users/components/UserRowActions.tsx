"use client";

import { useRouter } from "next/navigation";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, PowerIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";
import { UserWithRelations } from "@/features/users/@types/user";

interface UserRowActionsProps {
  user: UserWithRelations;
  isSelf: boolean;
  isLastSuperAdmin: boolean;
  onEdit: (user: UserWithRelations) => void;
  onToggleStatus: (user: UserWithRelations) => void;
  onDelete: (user: UserWithRelations) => void;
}

export function UserRowActions({
  user,
  isSelf,
  isLastSuperAdmin,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserRowActionsProps) {
  const router = useRouter();

  const cannotDeactivate = isSelf || (isLastSuperAdmin && user.status === "active");
  const cannotDelete = isSelf || isLastSuperAdmin;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground size-8 cursor-pointer"
            aria-label="قائمة الإجراءات"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48 text-xs">
        <DropdownMenuItem
          onClick={() => router.push(`/users/${user.id}`)}
          className="cursor-pointer gap-2"
        >
          <EyeIcon className="text-muted-foreground size-3.5" />
          <span>عرض الملف الشخصي</span>
        </DropdownMenuItem>

        <PermissionGate action="update" subject="users">
          <DropdownMenuItem onClick={() => onEdit(user)} className="cursor-pointer gap-2">
            <PencilIcon className="text-muted-foreground size-3.5" />
            <span>تعديل الصلاحيات والبيانات</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onToggleStatus(user)}
            disabled={cannotDeactivate}
            className="cursor-pointer gap-2"
          >
            <PowerIcon className="text-muted-foreground size-3.5" />
            <span>{user.status === "active" ? "تعطيل الحساب" : "تفعيل الحساب"}</span>
          </DropdownMenuItem>
        </PermissionGate>

        <PermissionGate action="delete" subject="users">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(user)}
            disabled={cannotDelete}
            className="cursor-pointer gap-2"
          >
            <Trash2Icon className="size-3.5" />
            <span>حذف المستخدم</span>
          </DropdownMenuItem>
        </PermissionGate>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
