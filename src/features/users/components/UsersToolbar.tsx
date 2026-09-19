"use client";

import { ResetFiltersButton } from "@/components/ResetFiltersButton";
import { SearchInput } from "@/components/SearchInput";
import { SelectFilter } from "@/components/SelectFilter";
import { useRoles } from "@/features/roles/hooks/useRoles";

const STATUS_OPTIONS = [
  { value: "active", label: "نشط" },
  { value: "inactive", label: "معطل" },
];

interface UsersToolbarProps {
  search: string;
  role: string;
  status: string;
  hasActiveFilters: boolean;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string | null) => void;
  onStatusChange: (val: string | null) => void;
  onResetFilters: () => void;
}

export function UsersToolbar({
  search,
  role,
  status,
  hasActiveFilters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onResetFilters,
}: UsersToolbarProps) {
  const { roles } = useRoles();

  const roleOptions = roles.map((r) => ({
    value: r.id,
    label: r.name,
  }));

  return (
    <div className="border-border/70 bg-card/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
      <div className="flex min-w-[240px] flex-1 items-center gap-2">
        <SearchInput
          placeholder="البحث بالاسم أو البريد الإلكتروني أو الجوال..."
          paramKey="search"
          containerClassName="max-w-md"
          onSearch={onSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="w-[140px]">
          <SelectFilter
            paramKey="role"
            value={role}
            onChange={onRoleChange}
            options={roleOptions}
            allLabel="جميع الأدوار"
            placeholder="جميع الأدوار"
            triggerClassName="h-8 text-xs bg-card/70 border-border/80"
          />
        </div>

        <div className="w-[125px]">
          <SelectFilter
            paramKey="status"
            value={status}
            onChange={onStatusChange}
            options={STATUS_OPTIONS}
            allLabel="جميع الحالات"
            placeholder="جميع الحالات"
            triggerClassName="h-8 text-xs bg-card/70 border-border/80"
          />
        </div>

        {hasActiveFilters && <ResetFiltersButton onReset={onResetFilters} className="h-8 px-2" />}
      </div>
    </div>
  );
}
