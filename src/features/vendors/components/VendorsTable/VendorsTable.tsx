"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { VendorTableRow } from "@/features/vendors/components/VendorsTable/VendorTableRow";

interface VendorsTableProps {
  vendors: VendorWithRelations[];
  onEdit: (vendor: VendorWithRelations) => void;
  onDelete: (vendor: VendorWithRelations) => void;
}

export function VendorsTable({
  vendors,
  onEdit,
  onDelete,
}: VendorsTableProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30 border-b border-border/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-3 ps-4 text-xs font-semibold text-foreground min-w-55">
                المورد
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold text-foreground min-w-40">
                التصنيف
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold text-foreground min-w-30">
                السجل التجاري
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold text-foreground min-w-32.5">
                رقم الجوال
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold text-foreground min-w-22.5">
                الحالة
              </TableHead>
              <TableHead className="py-3 text-xs font-semibold text-foreground min-w-25">
                تاريخ الإضافة
              </TableHead>
              <TableHead className="py-3 pe-4 text-end text-xs font-semibold text-foreground w-12">
                <span className="sr-only">الإجراءات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/40">
            {vendors.map((vendor) => (
              <VendorTableRow
                key={vendor.id}
                vendor={vendor}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
