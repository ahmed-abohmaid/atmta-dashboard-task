"use client";

import { MailIcon, PencilIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";
import { Role } from "@/@types/role";
import { User } from "@/@types/user";
import { getInitials } from "@/utils/getInitials";
import { formatSaudiPhoneDisplay } from "@/utils/phone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface UserProfileHeaderProps {
  user: User;
  roles: Role[];
  isLastSuperAdmin: boolean;
  onEditClick: () => void;
}

export function UserProfileHeader({
  user,
  roles,
  isLastSuperAdmin,
  onEditClick,
}: UserProfileHeaderProps) {
  const isSuperAdminUser = (user.roles || []).includes("role_super_admin");

  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="border-border/80 size-16 shrink-0 rounded-xl border shadow-xs">
            <AvatarImage src={user.photo} alt={user.name} />
            <AvatarFallback className="bg-secondary text-foreground text-lg font-bold">
              {getInitials(user.name) || "م"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-foreground text-xl font-bold tracking-tight">{user.name}</h1>

              <Badge
                variant="outline"
                className={
                  user.status === "active"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-medium px-2 py-0.5"
                    : "border-destructive/30 bg-destructive/10 text-destructive text-[11px] font-medium px-2 py-0.5"
                }
              >
                {user.status === "active" ? "حساب نشط" : "حساب معطل"}
              </Badge>

              {isSuperAdminUser && (
                <Badge
                  variant="outline"
                  className="border-amber-400/50 bg-amber-500/15 text-amber-200 gap-1.5 text-[11px] font-semibold px-2.5 py-0.5"
                >
                  <ShieldCheckIcon className="size-3.5 text-amber-400" />
                  <span>مدير النظام</span>
                </Badge>
              )}

              {isLastSuperAdmin && (
                <Badge
                  variant="outline"
                  className="border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5"
                >
                  مدير النظام الأخير
                </Badge>
              )}
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-mono text-foreground/90" dir="ltr">
                <MailIcon className="size-3.5 text-muted-foreground" />
                <span>{user.email}</span>
              </span>

              <span className="flex items-center gap-1.5 font-mono text-foreground/90" dir="ltr">
                <PhoneIcon className="size-3.5 text-muted-foreground" />
                <span>{formatSaudiPhoneDisplay(user.phone)}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {roles.length > 0 ? (
                roles.map((role) => (
                  <Badge
                    key={role.id}
                    variant="secondary"
                    className="border-border/70 text-secondary-foreground border text-[11px] font-normal"
                  >
                    {role.name}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-muted-foreground text-[10px]">
                  بدون أدوار معينة
                </Badge>
              )}
            </div>
          </div>
        </div>

        <PermissionGate action="update" subject="users">
          <Button
            onClick={onEditClick}
            size="sm"
            className="gap-2 self-start md:self-auto text-xs font-medium"
          >
            <PencilIcon className="size-3.5" />
            <span>تعديل الصلاحيات والبيانات</span>
          </Button>
        </PermissionGate>
      </div>
    </div>
  );
}
