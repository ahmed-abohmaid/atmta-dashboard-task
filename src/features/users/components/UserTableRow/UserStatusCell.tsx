"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserWithRelations } from "@/features/users/@types/user";

interface UserStatusCellProps {
  user: UserWithRelations;
  isSelf: boolean;
  isLastSuperAdmin: boolean;
  onToggleStatus: (user: UserWithRelations) => void;
}

export function UserStatusCell({
  user,
  isSelf,
  isLastSuperAdmin,
  onToggleStatus,
}: UserStatusCellProps) {
  const cannotToggle = isSelf || (isLastSuperAdmin && user.status === "active");

  return (
    <div className="flex items-center gap-2">
      {cannotToggle ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <div className="cursor-not-allowed opacity-60">
                <Switch checked={user.status === "active"} disabled />
              </div>
            }
          />
          <TooltipContent className="text-xs">
            {isSelf ? "لا يمكنك تعطيل حسابك الشخصي" : "لا يمكن تعطيل آخر مدير نظام متبقي"}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Switch
          checked={user.status === "active"}
          onCheckedChange={() => onToggleStatus(user)}
          aria-label="تغيير حالة المستخدم"
        />
      )}

      <Badge
        variant={user.status === "active" ? "default" : "destructive"}
        className="px-1.5 py-0 text-[10px]"
      >
        {user.status === "active" ? "نشط" : "معطل"}
      </Badge>
    </div>
  );
}
