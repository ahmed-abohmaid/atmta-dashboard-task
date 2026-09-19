"use client";

import Link from "next/link";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserWithRelations } from "@/features/users/@types/user";

interface UserInfoCellProps {
  user: UserWithRelations;
  isSelf: boolean;
}

export function UserInfoCell({ user, isSelf }: UserInfoCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="border-border/70 size-9 shrink-0 rounded-full border">
        <AvatarImage src={user.photo} alt={user.name} />
        <AvatarFallback className="text-xs font-semibold">
          {getInitials(user.name) || "م"}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/users/${user.id}`}
            className="text-foreground hover:text-primary truncate text-xs font-semibold transition-colors"
          >
            {user.name}
          </Link>
          {isSelf && (
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary h-4 px-1.5 py-0 text-[10px]"
            >
              حسابك
            </Badge>
          )}
        </div>
        <span className="text-muted-foreground truncate font-mono text-[11px]">{user.email}</span>
      </div>
    </div>
  );
}
