"use client";

import { SparklesIcon } from "lucide-react";
import { Permission } from "@/@types/permission";
import { Badge } from "@/components/ui/badge";
import { PermissionMatrix } from "@/features/permissions/components/PermissionMatrix";

interface UserPermissionsStepProps {
  permissions: Permission[];
  onChange: (permissions: Permission[]) => void;
  isSuperAdminRole: boolean;
  selectedRoleNames: string[];
}

export function UserPermissionsStep({
  permissions,
  onChange,
  isSuperAdminRole,
  selectedRoleNames,
}: UserPermissionsStepProps) {
  return (
    <div className="flex flex-col gap-4 py-1">
      <div className="border-border/70 bg-card/40 flex flex-col gap-2.5 rounded-lg border p-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <SparklesIcon className="text-primary size-4" />
          <span>تخصيص صلاحيات الوحدات للمستخدم</span>
        </div>

        <p className="text-muted-foreground text-[11px] leading-relaxed">
          تم ملء المصفوفة تلقائياً وفق الأدوار المعينة أدناه. يمكنك تفعيل أو إلغاء صلاحيات محددة لكل وحدة (إضافة استثناءات منح أو استبعاد مباشرة لهذا المستخدم).
        </p>

        {selectedRoleNames.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-muted-foreground text-[10px]">الأدوار المعينة:</span>
            {selectedRoleNames.map((name) => (
              <Badge key={name} variant="secondary" className="text-[10px] font-normal">
                {name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <PermissionMatrix
        value={permissions}
        onChange={onChange}
        isSuperAdmin={isSuperAdminRole}
      />
    </div>
  );
}
