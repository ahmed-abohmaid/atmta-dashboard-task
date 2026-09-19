"use client";

import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { formatSaudiPhoneDisplay } from "@/utils/phone";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserWithRelations } from "@/features/users/@types/user";
import { UserRowActions } from "@/features/users/components/UserRowActions";
import { UserInfoCell } from "@/features/users/components/UserTableRow/UserInfoCell";
import { UserRolesCell } from "@/features/users/components/UserTableRow/UserRolesCell";
import { UserStatusCell } from "@/features/users/components/UserTableRow/UserStatusCell";

interface UserTableRowProps {
  user: UserWithRelations;
  isSelf: boolean;
  isLastSuperAdmin: boolean;
  onEdit: (user: UserWithRelations) => void;
  onToggleStatus: (user: UserWithRelations) => void;
  onDelete: (user: UserWithRelations) => void;
}

export function UserTableRow({
  user,
  isSelf,
  isLastSuperAdmin,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserTableRowProps) {
  const formattedDate = user.createdAt
    ? format(new Date(user.createdAt), "dd MMM yyyy", { locale: ar })
    : "—";

  return (
    <TableRow className="hover:bg-muted/20 transition-colors">
      <TableCell className="py-3 ps-4">
        <UserInfoCell user={user} isSelf={isSelf} />
      </TableCell>

      <TableCell className="py-3 text-xs">
        <div className="flex items-center">
          <span className="text-muted-foreground font-mono text-xs" dir="ltr">
            {formatSaudiPhoneDisplay(user.phone)}
          </span>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <UserRolesCell user={user} />
      </TableCell>

      <TableCell className="py-3">
        <UserStatusCell
          user={user}
          isSelf={isSelf}
          isLastSuperAdmin={isLastSuperAdmin}
          onToggleStatus={onToggleStatus}
        />
      </TableCell>

      <TableCell className="py-3 text-center text-xs">
        <span className="text-muted-foreground text-xs font-medium">
          {user.createdVendorsCount}
        </span>
      </TableCell>

      <TableCell className="text-muted-foreground py-3 text-xs">{formattedDate}</TableCell>

      <TableCell className="py-3 pe-4 text-end">
        <UserRowActions
          user={user}
          isSelf={isSelf}
          isLastSuperAdmin={isLastSuperAdmin}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
