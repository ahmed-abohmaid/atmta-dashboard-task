"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { VendorTableRow } from "@/features/vendors/components/VendorsTable/VendorTableRow";

interface VendorsTableProps {
  vendors: VendorWithRelations[];
  onEdit: (vendor: VendorWithRelations) => void;
  onDelete: (vendor: VendorWithRelations) => void;
}

export function VendorsTable({ vendors, onEdit, onDelete }: VendorsTableProps) {
  return (
    <div className="border-border/80 bg-card overflow-hidden rounded-xl border shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30 border-border/60 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-foreground min-w-55 py-3 ps-4 text-xs font-semibold">
                المورد
              </TableHead>
              <TableHead className="text-foreground min-w-40 py-3 text-xs font-semibold">
                التصنيف
              </TableHead>
              <TableHead className="text-foreground min-w-30 py-3 text-xs font-semibold">
                السجل التجاري
              </TableHead>
              <TableHead className="text-foreground min-w-32.5 py-3 text-xs font-semibold">
                رقم الجوال
              </TableHead>
              <TableHead className="text-foreground min-w-22.5 py-3 text-xs font-semibold">
                الحالة
              </TableHead>
              <TableHead className="text-foreground min-w-25 py-3 text-xs font-semibold">
                تاريخ الإضافة
              </TableHead>
              <TableHead className="text-foreground w-12 py-3 pe-4 text-end text-xs font-semibold">
                <span className="sr-only">الإجراءات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-border/40 divide-y">
            {vendors.map((vendor) => (
              <VendorTableRow key={vendor.id} vendor={vendor} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
