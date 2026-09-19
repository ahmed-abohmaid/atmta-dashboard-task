"use client";

import { cn } from "cn";
import { ChevronDownIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { TruncatedText } from "@/components/ui/truncatedText";
import { CategoryNodeActions } from "@/features/categories/components/CategoryTreeNode/CategoryNodeActions";
import { CategoryNodeBadges } from "@/features/categories/components/CategoryTreeNode/CategoryNodeBadges";

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
        "group flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 transition-colors",
        hasChildren && "cursor-pointer select-none",
        isMatched
          ? "border-primary/50 bg-primary/5"
          : "border-border/40 bg-card hover:bg-secondary/35"
      )}
      onClick={() => hasChildren && onToggle()}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            node.depth === 0
              ? "bg-primary/10 text-primary border-primary/20 border"
              : "bg-secondary/60 text-muted-foreground border-border/40 border"
          )}
        >
          {isExpanded ? <FolderOpenIcon className="size-4" /> : <FolderIcon className="size-4" />}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <TruncatedText
            text={node.name_ar}
            className="text-foreground text-sm font-semibold tracking-tight"
          />
          {node.depth === 0 && (
            <span className="bg-secondary text-muted-foreground border-border/40 hidden shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] sm:inline-flex">
              رئيسي
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
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
              "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        )}
      </div>
    </div>
  );
}
