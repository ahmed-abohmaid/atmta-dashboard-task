"use client";

import Link from "next/link";
import { FolderTreeIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TruncatedText } from "@/components/ui/truncatedText";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { VendorStatusBadge } from "@/features/vendors/components/VendorsTable/VendorStatusBadge";
import { VendorRowActions } from "@/features/vendors/components/VendorsTable/VendorRowActions";
import { formatSaudiPhoneDisplay } from "@/features/vendors/utils/phone";
import { formatCategoryPath } from "@/features/vendors/utils/vendorCategory";
import { getInitials } from "@/utils/getInitials";

interface VendorTableRowProps {
  vendor: VendorWithRelations;
  onEdit: (vendor: VendorWithRelations) => void;
  onDelete: (vendor: VendorWithRelations) => void;
}

export function VendorTableRow({
  vendor,
  onEdit,
  onDelete,
}: VendorTableRowProps) {
  const initial = getInitials(vendor.name_ar) || "م";
  const formattedPhone = formatSaudiPhoneDisplay(vendor.mobile);

  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="py-3.5 ps-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 rounded-lg border border-border/60 bg-muted/40 shrink-0">
            <AvatarImage
              src={vendor.logo}
              alt={vendor.name_ar}
              className="object-cover rounded-lg"
            />
            <AvatarFallback className="rounded-lg text-xs font-semibold text-muted-foreground">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link
              href={`/vendors/${vendor.id}`}
              className="text-xs font-semibold text-foreground hover:text-primary transition-colors block max-w-60"
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
                className="text-[11px] font-normal border-border/70 text-foreground bg-secondary/40 max-w-45 truncate cursor-help"
              >
                {vendor.categoryName_ar || "غير محدد"}
              </Badge>
            }
          />
          <TooltipContent
            side="top"
            align="start"
            className="p-2.5 max-w-xs rounded-lg border border-border/80 bg-popover text-popover-foreground shadow-lg flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
              <FolderTreeIcon className="size-3.5" />
              <span>المسار الكامل للتصنيف</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              {formatCategoryPath(vendor.categoryBreadcrumb) || vendor.categoryName_ar || "غير محدد"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TableCell>

      <TableCell className="py-3.5">
        <span className="font-mono text-xs text-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/50">
          {vendor.cr_number}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <span dir="ltr" className="font-mono text-xs text-muted-foreground inline-block">
          {formattedPhone}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <VendorStatusBadge status={vendor.status} />
      </TableCell>

      <TableCell className="py-3.5 text-xs text-muted-foreground">
        {new Date(vendor.createdAt).toLocaleDateString("ar-SA")}
      </TableCell>

      <TableCell className="py-3.5 pe-4 text-end">
        <VendorRowActions
          vendor={vendor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
