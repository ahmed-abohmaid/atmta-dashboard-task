"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserWithRelations } from "@/features/users/@types/user";
import { UserTableRow } from "@/features/users/components/UserTableRow";

interface UsersTableProps {
  users: UserWithRelations[];
  currentUserId?: string;
  onEdit: (user: UserWithRelations) => void;
  onToggleStatus: (user: UserWithRelations) => void;
  onDelete: (user: UserWithRelations) => void;
}

export function UsersTable({
  users,
  currentUserId,
  onEdit,
  onToggleStatus,
  onDelete,
}: UsersTableProps) {
  const activeSuperAdmins = users.filter(
    (u) => u.status === "active" && u.roles?.includes("role_super_admin")
  );

  return (
    <div className="border-border/80 bg-card overflow-hidden rounded-xl border shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30 border-border/60 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-foreground min-w-55 py-3 ps-4 text-xs font-semibold">
                المستخدم
              </TableHead>
              <TableHead className="text-foreground min-w-35 py-3 text-xs font-semibold">
                رقم الجوال
              </TableHead>
              <TableHead className="text-foreground min-w-45 py-3 text-xs font-semibold">
                الأدوار والصلاحيات
              </TableHead>
              <TableHead className="text-foreground min-w-28 py-3 text-xs font-semibold">
                الحالة
              </TableHead>
              <TableHead className="text-foreground min-w-24 py-3 text-center text-xs font-semibold">
                الموردين
              </TableHead>
              <TableHead className="text-foreground min-w-28 py-3 text-xs font-semibold">
                تاريخ الانضمام
              </TableHead>
              <TableHead className="text-foreground w-12 py-3 pe-4 text-end text-xs font-semibold">
                <span className="sr-only">الإجراءات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-border/40 divide-y">
            {users.map((user) => {
              const isLastSuperAdmin =
                user.status === "active" &&
                (user.roles || []).includes("role_super_admin") &&
                activeSuperAdmins.length <= 1;
              const isSelf = Boolean(currentUserId && user.id === currentUserId);

              return (
                <UserTableRow
                  key={user.id}
                  user={user}
                  isSelf={isSelf}
                  isLastSuperAdmin={isLastSuperAdmin}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
