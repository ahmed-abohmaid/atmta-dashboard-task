"use client";

import { useMemo, useState } from "react";
import { cn } from "cn";
import {
  MoreHorizontalIcon,
  PencilIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
import { RoleWithUserCount } from "@/@types/role";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModules } from "@/features/modules/hooks/useModules";
import { usePermission } from "@/features/permissions/hooks/usePermission";
import { DeleteRoleDialog } from "@/features/roles/components/dialogs/DeleteRoleDialog";
import { RoleFormDialog } from "@/features/roles/components/dialogs/RoleFormDialog";

const STANDARD_ACTIONS = new Set(["read", "create", "update", "delete"]);

const ACTION_LABELS: Record<string, string> = {
  read: "عرض",
  create: "إضافة",
  update: "تعديل",
  delete: "حذف",
  export: "تصدير",
};

interface RoleCardProps {
  role: RoleWithUserCount;
}

export function RoleCard({ role }: RoleCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { can } = usePermission();
  const { modules } = useModules();

  const canUpdate = can("update", "roles");
  const canDelete = can("delete", "roles");

  const isSuperAdmin =
    role.id === "role_super_admin" ||
    role.permissions.some((p) => p.action === "manage" && p.subject === "all");

  // Map permissions to modules
  const moduleBreakdown = useMemo(() => {
    if (isSuperAdmin) return [];

    const grouped: {
      moduleId: string;
      moduleLabel: string;
      actions: string[];
      isFull: boolean;
    }[] = [];

    modules.forEach((mod) => {
      const moduleActions = mod.actions.map((a) => a.id);
      const actions = role.permissions
        .filter((p) => p.subject === mod.id && moduleActions.includes(p.action))
        .map((p) => p.action);

      if (actions.length > 0) {
        grouped.push({
          moduleId: mod.id,
          moduleLabel: mod.label.ar,
          actions,
          isFull: actions.length >= moduleActions.length,
        });
      }
    });

    return grouped;
  }, [isSuperAdmin, modules, role.permissions]);

  const visibleModules = moduleBreakdown.slice(0, 2);
  const overflowModules = moduleBreakdown.slice(2);

  const formatUserCount = (count: number) => {
    if (count === 0) return "بدون مستخدمين";
    if (count === 1) return "مستخدم واحد";
    if (count === 2) return "مستخدمان";
    if (count >= 3 && count <= 10) return `${count} مستخدمين`;
    return `${count} مستخدم`;
  };

  return (
    <>
      <div className="group border-border/70 bg-card hover:bg-secondary/15 relative flex flex-col justify-between rounded-xl border p-5 transition-colors duration-150">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-foreground truncate text-sm font-semibold sm:text-base">
              {role.name}
            </h3>

            <div className="flex shrink-0 items-center gap-1.5">
              <Badge
                variant={role.isSystem ? "default" : "secondary"}
                className="px-2 py-0.5 text-xs font-medium"
              >
                {role.isSystem ? "نظامي" : "مخصص"}
              </Badge>

              {(canUpdate || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground hover:text-foreground size-7"
                        aria-label="قائمة الإجراءات"
                      />
                    }
                  >
                    <MoreHorizontalIcon className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 text-xs">
                    {canUpdate && (
                      <DropdownMenuItem
                        onClick={() => setIsEditOpen(true)}
                        className="cursor-pointer gap-2"
                      >
                        <PencilIcon className="text-muted-foreground size-3.5" />
                        <span>تعديل الدور</span>
                      </DropdownMenuItem>
                    )}
                    {canDelete && !role.isSystem && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setIsDeleteOpen(true)}
                          className="text-destructive focus:text-destructive cursor-pointer gap-2"
                        >
                          <Trash2Icon className="size-3.5" />
                          <span>حذف الدور</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <p className="text-muted-foreground/90 line-clamp-2 min-h-[2.25rem] text-xs leading-relaxed">
            {role.description || "بدون وصف."}
          </p>

          <div className="text-muted-foreground flex items-center gap-1.5 pt-0.5 text-xs">
            <UsersIcon className="text-primary size-3.5 shrink-0" />
            <span>{formatUserCount(role.userCount)}</span>
          </div>
        </div>

        <div className="border-border/50 mt-4 flex flex-col gap-2 border-t pt-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">الوحدات المصرحة</span>
            {!isSuperAdmin && (
              <span className="text-muted-foreground/70 font-mono text-[11px]">
                {moduleBreakdown.length} وحدات
              </span>
            )}
          </div>

          {isSuperAdmin ? (
            <div className="border-primary/25 bg-primary/10 text-primary flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium">
              <ShieldCheckIcon className="size-4 shrink-0" />
              <span>صلاحية كاملة على كافة وحدات وإجراءات النظام</span>
            </div>
          ) : moduleBreakdown.length === 0 ? (
            <span className="text-muted-foreground/60 text-xs italic">لا توجد صلاحيات</span>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {visibleModules.map((item) => (
                <Popover key={item.moduleId}>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="border-border/70 bg-secondary/40 text-foreground hover:bg-secondary inline-flex h-6.5 cursor-pointer items-center rounded-md border px-2.5 text-xs transition-colors"
                      >
                        <span>{item.moduleLabel}</span>
                        <span className="text-muted-foreground ms-1.5 text-[11px]">
                          {item.isFull ? "(شامل)" : `(${item.actions.length})`}
                        </span>
                      </button>
                    }
                  />
                  <PopoverContent side="top" align="start" className="w-56 p-3 text-xs">
                    <div className="border-border/60 mb-2 flex items-center justify-between border-b pb-2 font-medium">
                      <span className="text-foreground">{item.moduleLabel}</span>
                      {item.isFull ? (
                        <Badge variant="secondary" className="h-4 px-1 py-0 text-[9px]">
                          شامل
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-[10px]">
                          {item.actions.length} إجراءات
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.actions.map((act) => {
                        const isCustom = !STANDARD_ACTIONS.has(act);
                        return (
                          <span
                            key={act}
                            className={cn(
                              "rounded px-2 py-0.5 text-xs",
                              isCustom
                                ? "border-primary/30 bg-primary/10 text-primary border font-medium"
                                : "bg-secondary/80 text-muted-foreground"
                            )}
                          >
                            {ACTION_LABELS[act] || act}
                          </span>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              ))}

              {overflowModules.length > 0 && (
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="border-border/70 bg-secondary/60 text-foreground hover:bg-secondary inline-flex h-6.5 cursor-pointer items-center rounded-md border px-2.5 text-xs font-medium transition-colors"
                      >
                        <span>+{overflowModules.length} أخرى</span>
                      </button>
                    }
                  />
                  <PopoverContent align="start" side="top" className="w-72 p-3 text-xs">
                    <div className="border-border/60 mb-2 flex items-center justify-between border-b pb-2">
                      <span className="text-foreground font-semibold">
                        الوحدات الإضافية ({overflowModules.length})
                      </span>
                    </div>
                    <ScrollArea className="max-h-52">
                      <div className="flex flex-col gap-2.5 pe-2">
                        {overflowModules.map((m) => (
                          <div
                            key={m.moduleId}
                            className="border-border/50 bg-card/40 flex flex-col gap-1 rounded-md border p-2"
                          >
                            <div className="text-foreground flex items-center font-medium">
                              <span>{m.moduleLabel}</span>
                              {m.isFull && (
                                <Badge
                                  variant="secondary"
                                  className="ms-1.5 h-4 px-1 py-0 text-[9px]"
                                >
                                  شامل
                                </Badge>
                              )}
                            </div>
                            <div className="mt-0.5 flex flex-wrap gap-1">
                              {m.actions.map((act) => {
                                const isCustom = !STANDARD_ACTIONS.has(act);
                                return (
                                  <span
                                    key={act}
                                    className={cn(
                                      "rounded px-2 py-0.5 text-xs",
                                      isCustom
                                        ? "border-primary/30 bg-primary/10 text-primary border font-medium"
                                        : "bg-secondary/80 text-muted-foreground"
                                    )}
                                  >
                                    {ACTION_LABELS[act] || act}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditOpen && (
        <RoleFormDialog mode="edit" role={role} open={isEditOpen} onOpenChange={setIsEditOpen} />
      )}

      {isDeleteOpen && (
        <DeleteRoleDialog role={role} open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      )}
    </>
  );
}
