"use client";

import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PermissionGate } from "@/features/permissions/components/PermissionGate";

interface CategoryNodeActionsProps {
  node: CategoryNode;
  onAddChild: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryNodeActions({
  node,
  onAddChild,
  onEdit,
  onDelete,
}: CategoryNodeActionsProps) {
  const isDeleteBlocked = node.childCount > 0 || node.vendorCount > 0;

  const deleteBlockedReason =
    node.childCount > 0
      ? `لا يمكن حذف هذا التصنيف لأنه يحتوي على ${node.childCount} من التصنيفات الفرعية`
      : node.vendorCount > 0
        ? `لا يمكن حذف هذا التصنيف لأنه مرتبط بـ ${node.vendorCount} من الموردين`
        : "";

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <PermissionGate action="create" subject="categories">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onAddChild}
          title="إضافة تصنيف فرعي"
          className="text-muted-foreground hover:text-primary hover:bg-secondary size-7 cursor-pointer"
        >
          <PlusIcon className="size-3.5" />
        </Button>
      </PermissionGate>

      <PermissionGate action="update" subject="categories">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onEdit}
          title="تعديل التصنيف"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary size-7 cursor-pointer"
        >
          <PencilIcon className="size-3.5" />
        </Button>
      </PermissionGate>

      <PermissionGate action="delete" subject="categories">
        {isDeleteBlocked ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <span className="inline-flex cursor-not-allowed">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled
                    tabIndex={-1}
                    className="text-muted-foreground/40 pointer-events-none size-7 opacity-50"
                  >
                    <Trash2Icon className="size-3.5" />
                  </Button>
                </span>
              }
            />
            <TooltipContent side="top" className="max-w-xs text-xs">
              {deleteBlockedReason}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onDelete}
            title="حذف التصنيف"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 size-7 cursor-pointer"
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        )}
      </PermissionGate>
    </div>
  );
}
