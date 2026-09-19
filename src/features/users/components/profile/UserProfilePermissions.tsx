import { CheckIcon, LayersIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResolvedModulePermission } from "@/features/users/@types/user";

interface UserProfilePermissionsProps {
  resolvedPermissions: ResolvedModulePermission[];
}

export function UserProfilePermissions({
  resolvedPermissions,
}: UserProfilePermissionsProps) {
  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
            <LayersIcon className="size-4" />
          </div>
          <div>
            <h2 className="text-foreground text-sm font-bold tracking-tight">
              الوحدات والصلاحيات المتاحة
            </h2>
            <p className="text-muted-foreground text-[11px]">
              الصلاحيات الممنوحة لهذا الحساب عبر الأدوار والاستثناءات المباشرة
            </p>
          </div>
        </div>

        <Badge variant="secondary" className="border-border/60 border text-xs font-medium">
          {resolvedPermissions.length} وحدات مسموحة
        </Badge>
      </div>

      {resolvedPermissions.length === 0 ? (
        <div className="bg-muted/20 text-muted-foreground rounded-xl p-8 text-center text-xs">
          لا يمتلك هذا المستخدم أي صلاحيات وصول لأي موديول في النظام حالياً.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 pt-4 sm:grid-cols-2">
          {resolvedPermissions.map((mod) => {
            const hasExtraGrants = mod.actions.some((a) => a.source === "extra_grant" || a.source === "both");

            return (
              <div
                key={mod.moduleKey}
                className="border-border/70 bg-card/60 flex flex-col justify-between gap-3 rounded-xl border p-4 transition-colors hover:bg-card"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-xs font-bold">{mod.moduleLabel}</span>
                    <span className="text-muted-foreground font-mono text-[11px]" dir="ltr">
                      /{mod.moduleKey}
                    </span>
                  </div>

                  {hasExtraGrants && (
                    <Badge
                      variant="outline"
                      className="border-primary/40 bg-primary/10 text-primary gap-1 text-[10px] font-normal"
                    >
                      <SparklesIcon className="size-2.5" />
                      <span>تخصيص مباشر</span>
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mod.actions.map((act) => {
                    const isExtra = act.source === "extra_grant";

                    return (
                      <span
                        key={act.action}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${
                          isExtra
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border/80 bg-secondary/70 text-secondary-foreground"
                        }`}
                      >
                        <CheckIcon className={`size-3 ${isExtra ? "text-primary" : "text-emerald-400"}`} />
                        <span>{act.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
