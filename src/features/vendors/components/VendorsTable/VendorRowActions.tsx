"use client";

import { useRouter } from "next/navigation";
import { EyeIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";

interface VendorRowActionsProps {
  vendor: VendorWithRelations;
  onEdit: (vendor: VendorWithRelations) => void;
  onDelete: (vendor: VendorWithRelations) => void;
}

export function VendorRowActions({ vendor, onEdit, onDelete }: VendorRowActionsProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground size-8 cursor-pointer"
            aria-label="قائمة الإجراءات"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={() => router.push(`/vendors/${vendor.id}`)}
          className="cursor-pointer"
        >
          <EyeIcon className="text-muted-foreground size-3.5" />
          <span>عرض التفاصيل</span>
        </DropdownMenuItem>

        <PermissionGate action="update" subject="vendors">
          <DropdownMenuItem onClick={() => onEdit(vendor)} className="cursor-pointer">
            <PencilIcon className="text-muted-foreground size-3.5" />
            <span>تعديل المورد</span>
          </DropdownMenuItem>
        </PermissionGate>

        <PermissionGate action="delete" subject="vendors">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(vendor)}
            className="cursor-pointer"
          >
            <Trash2Icon className="size-3.5" />
            <span>حذف المورد</span>
          </DropdownMenuItem>
        </PermissionGate>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
