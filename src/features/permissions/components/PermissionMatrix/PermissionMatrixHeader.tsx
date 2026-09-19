"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { STANDARD_ACTIONS } from "@/features/permissions/consts/standardActions";

export function PermissionMatrixHeader() {
  return (
    <TableHeader>
      <TableRow className="border-border/70 bg-secondary/40 hover:bg-secondary/40 text-muted-foreground border-b">
        <TableHead className="text-muted-foreground min-w-40 py-2.5 ps-4 pe-3 text-start text-xs font-medium">
          الوحدة
        </TableHead>
        {STANDARD_ACTIONS.map((act) => (
          <TableHead
            key={act.id}
            className="text-muted-foreground w-16 px-2 py-2.5 text-center text-xs font-medium"
          >
            {act.label}
          </TableHead>
        ))}
        <TableHead className="text-muted-foreground min-w-28 px-3 py-2.5 text-center text-xs font-medium">
          إجراءات مخصصة
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
