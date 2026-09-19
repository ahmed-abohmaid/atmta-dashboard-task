"use client";

import { KeyRoundIcon, ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserWithRelations } from "@/features/users/@types/user";

interface UserRolesCellProps {
  user: UserWithRelations;
}

export function UserRolesCell({ user }: UserRolesCellProps) {
  const visibleRoles = user.roleObjects.slice(0, 2);
  const overflowRoles = user.roleObjects.slice(2);

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {user.roleObjects.length > 0 ? (
        <>
          {visibleRoles.map((role) => {
            if (role.id === "role_super_admin") {
              return (
                <Badge
                  key={role.id}
                  variant="outline"
                  className="gap-1 border-amber-400/60 bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-200 shadow-xs"
                >
                  <ShieldCheckIcon className="size-3 text-amber-400" />
                  <span>{role.name}</span>
                </Badge>
              );
            }
            return (
              <Badge
                key={role.id}
                variant={role.isSystem ? "default" : "secondary"}
                className="gap-1 text-[11px] font-normal"
              >
                <span>{role.name}</span>
              </Badge>
            );
          })}

          {overflowRoles.length > 0 && (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="border-border/70 bg-secondary/80 text-foreground hover:bg-secondary inline-flex h-5.5 cursor-pointer items-center rounded-md border px-2 text-[10px] font-medium transition-colors"
                  >
                    +{overflowRoles.length} أدوار أخرى
                  </button>
                }
              />
              <PopoverContent align="start" side="top" className="w-56 p-3 text-xs">
                <div className="border-border/60 mb-2 flex items-center justify-between border-b pb-1.5">
                  <span className="text-foreground font-semibold">الأدوار الإضافية</span>
                  <span className="text-muted-foreground text-[10px]">
                    {overflowRoles.length} أدوار
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {overflowRoles.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-1">
                      <span className="text-foreground font-medium">{r.name}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {r.isSystem ? "نظامي" : "مخصص"}
                      </span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      ) : (
        <Badge variant="outline" className="text-muted-foreground text-[10px]">
          بدون أدوار (صلاحيات مخصصة)
        </Badge>
      )}

      {user.extraGrants && user.extraGrants.length > 0 && (
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 inline-flex h-5.5 cursor-pointer items-center gap-1 rounded-md border px-2 text-[10px] font-medium transition-colors"
              >
                <KeyRoundIcon className="size-2.5" />
                <span>+{user.extraGrants.length} إضافية</span>
              </button>
            }
          />
          <PopoverContent align="start" side="top" className="w-64 p-3 text-xs">
            <div className="border-border/60 mb-2 flex items-center justify-between border-b pb-1.5">
              <span className="text-foreground font-semibold">الصلاحيات الممنوحة المباشرة</span>
              <span className="text-primary text-[10px] font-medium">
                +{user.extraGrants.length}
              </span>
            </div>
            <div className="divide-border/40 flex max-h-48 flex-col divide-y overflow-y-auto">
              {user.extraGrants.map((grant, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 text-[11px]">
                  <span className="text-muted-foreground font-mono" dir="ltr">
                    /{grant.subject}
                  </span>
                  <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold">
                    {grant.action}
                  </span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
