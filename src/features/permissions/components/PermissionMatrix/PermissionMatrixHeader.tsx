"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { STANDARD_ACTIONS } from "@/features/permissions/consts/standardActions";

export function PermissionMatrixHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-border/70 bg-secondary/40 hover:bg-secondary/40 text-muted-foreground">
        <TableHead className="py-2.5 ps-4 pe-3 text-start font-medium min-w-40 text-xs text-muted-foreground">
          الوحدة
        </TableHead>
        {STANDARD_ACTIONS.map((act) => (
          <TableHead
            key={act.id}
            className="py-2.5 px-2 text-center font-medium w-16 text-xs text-muted-foreground"
          >
            {act.label}
          </TableHead>
        ))}
        <TableHead className="py-2.5 px-3 text-center font-medium min-w-28 text-xs text-muted-foreground">
          إجراءات مخصصة
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
