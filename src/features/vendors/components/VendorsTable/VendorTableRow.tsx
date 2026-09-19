"use client";

import Link from "next/link";
import { FolderTreeIcon } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TruncatedText } from "@/components/ui/truncatedText";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { VendorRowActions } from "@/features/vendors/components/VendorsTable/VendorRowActions";
import { VendorStatusBadge } from "@/features/vendors/components/VendorsTable/VendorStatusBadge";
import { formatSaudiPhoneDisplay } from "@/utils/phone";
import { formatCategoryPath } from "@/features/vendors/utils/vendorCategory";

interface VendorTableRowProps {
  vendor: VendorWithRelations;
  onEdit: (vendor: VendorWithRelations) => void;
  onDelete: (vendor: VendorWithRelations) => void;
}

export function VendorTableRow({ vendor, onEdit, onDelete }: VendorTableRowProps) {
  const initial = getInitials(vendor.name_ar) || "م";
  const formattedPhone = formatSaudiPhoneDisplay(vendor.mobile);

  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="py-3.5 ps-4">
        <div className="flex items-center gap-3">
          <Avatar className="border-border/60 bg-muted/40 size-9 shrink-0 rounded-lg border">
            <AvatarImage
              src={vendor.logo}
              alt={vendor.name_ar}
              className="rounded-lg object-cover"
            />
            <AvatarFallback className="text-muted-foreground rounded-lg text-xs font-semibold">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link
              href={`/vendors/${vendor.id}`}
              className="text-foreground hover:text-primary block max-w-60 text-xs font-semibold transition-colors"
            >
              <TruncatedText text={vendor.name_ar} />
            </Link>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-3.5">
        <Tooltip>
          <TooltipTrigger
            render={
              <Badge
                variant="outline"
                className="border-border/70 text-foreground bg-secondary/40 max-w-45 cursor-help truncate text-[11px] font-normal"
              >
                {vendor.categoryName_ar || "غير محدد"}
              </Badge>
            }
          />
          <TooltipContent
            side="top"
            align="start"
            className="border-border/80 bg-popover text-popover-foreground flex max-w-xs flex-col gap-1.5 rounded-lg border p-2.5 shadow-lg"
          >
            <div className="text-primary flex items-center gap-1.5 text-[11px] font-semibold">
              <FolderTreeIcon className="size-3.5" />
              <span>المسار الكامل للتصنيف</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed font-medium">
              {formatCategoryPath(vendor.categoryBreadcrumb) ||
                vendor.categoryName_ar ||
                "غير محدد"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TableCell>

      <TableCell className="py-3.5">
        <span className="text-foreground bg-muted/50 border-border/50 rounded border px-2 py-0.5 font-mono text-xs">
          {vendor.cr_number}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <span dir="ltr" className="text-muted-foreground inline-block font-mono text-xs">
          {formattedPhone}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <VendorStatusBadge status={vendor.status} />
      </TableCell>

      <TableCell className="text-muted-foreground py-3.5 text-xs">
        {new Date(vendor.createdAt).toLocaleDateString("ar-SA")}
      </TableCell>

      <TableCell className="py-3.5 pe-4 text-end">
        <VendorRowActions vendor={vendor} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
}
