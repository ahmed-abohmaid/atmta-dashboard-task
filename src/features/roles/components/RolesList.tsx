"use client";

import { useMemo, useState } from "react";
import { RoleWithUserCount } from "@/@types/role";
import { RoleCard } from "@/features/roles/components/RoleCard";
import { SearchInput } from "@/components/SearchInput";

interface RolesListProps {
  roles: RoleWithUserCount[];
}

export function RolesList({ roles }: RolesListProps) {
  const [search, setSearch] = useState("");

  const filteredRoles = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return roles;
    return roles.filter((role) => role.name.toLowerCase().includes(trimmed));
  }, [roles, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <SearchInput
          onSearch={setSearch}
          placeholder="البحث في الأدوار..."
          containerClassName="max-w-xs"
        />
        <span className="text-xs text-foreground/80 shrink-0 font-medium">
          {filteredRoles.length} من {roles.length} دور
        </span>
      </div>

      {filteredRoles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 p-8 text-center bg-card/40">
          <p className="text-xs text-muted-foreground">
            لا توجد أدوار مطابقة لبحثك &quot;{search}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </div>
  );
}
