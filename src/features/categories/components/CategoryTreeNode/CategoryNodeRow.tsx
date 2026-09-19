"use client";

import { FolderIcon, FolderOpenIcon, ChevronDownIcon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { TruncatedText } from "@/components/ui/truncatedText";
import { CategoryNodeBadges } from "@/features/categories/components/CategoryTreeNode/CategoryNodeBadges";
import { CategoryNodeActions } from "@/features/categories/components/CategoryTreeNode/CategoryNodeActions";
import { cn } from "cn";

interface CategoryNodeRowProps {
  node: CategoryNode;
  isExpanded: boolean;
  hasChildren: boolean;
  isMatched?: boolean;
  onToggle: () => void;
  onAddChild: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryNodeRow({
  node,
  isExpanded,
  hasChildren,
  isMatched,
  onToggle,
  onAddChild,
  onEdit,
  onDelete,
}: CategoryNodeRowProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-colors",
        hasChildren && "cursor-pointer select-none",
        isMatched
          ? "border-primary/50 bg-primary/5"
          : "border-border/40 bg-card hover:bg-secondary/35"
      )}
      onClick={() => hasChildren && onToggle()}
    >
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-lg shrink-0 transition-colors",
            node.depth === 0
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-secondary/60 text-muted-foreground border border-border/40"
          )}
        >
          {isExpanded ? (
            <FolderOpenIcon className="size-4" />
          ) : (
            <FolderIcon className="size-4" />
          )}
        </div>

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <TruncatedText
            text={node.name_ar}
            className="text-sm font-semibold text-foreground tracking-tight"
          />
          {node.depth === 0 && (
            <span className="hidden sm:inline-flex shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40 font-mono">
              رئيسي
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <CategoryNodeBadges node={node} />

        <CategoryNodeActions
          node={node}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        {hasChildren && (
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200 shrink-0",
              isExpanded && "rotate-180"
            )}
          />
        )}
      </div>
    </div>
  );
}
