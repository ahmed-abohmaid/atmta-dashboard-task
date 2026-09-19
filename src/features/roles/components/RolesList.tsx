"use client";

import { useMemo, useState } from "react";
import { RoleWithUserCount } from "@/@types/role";
import { SearchInput } from "@/components/SearchInput";
import { RoleCard } from "@/features/roles/components/RoleCard";

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
        <span className="text-foreground/80 shrink-0 text-xs font-medium">
          {filteredRoles.length} من {roles.length} دور
        </span>
      </div>

      {filteredRoles.length === 0 ? (
        <div className="border-border/80 bg-card/40 rounded-xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-xs">
            لا توجد أدوار مطابقة لبحثك &quot;{search}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRoles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </div>
  );
}
