"use client";

import { useMemo, useState } from "react";
import { CategoryNode } from "@/@types/category";
import { CategoryTreeNode } from "@/features/categories/components/CategoryTreeNode/CategoryTreeNode";
import { CategoriesToolbar } from "@/features/categories/components/CategoriesToolbar";
import { CategoriesEmptyState } from "@/features/categories/components/feedback/CategoriesEmptyState";
import {
  filterCategoryTree,
  collectExpandableIds,
} from "@/features/categories/utils/tree";

interface CategoriesTreeTableProps {
  tree: CategoryNode[];
  rawCount: number;
  rootCount: number;
  subCount: number;
  onAddCategory?: () => void;
  onAddChild: (category: CategoryNode) => void;
  onEdit: (category: CategoryNode) => void;
  onDelete: (category: CategoryNode) => void;
}

export function CategoriesTreeTable({
  tree,
  rawCount,
  rootCount,
  subCount,
  onAddCategory,
  onAddChild,
  onEdit,
  onDelete,
}: CategoriesTreeTableProps) {
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const { filtered: filteredTree, matchIds } = useMemo(() => {
    return filterCategoryTree(tree, search);
  }, [tree, search]);

  const expandableIds = useMemo(() => {
    return collectExpandableIds(tree);
  }, [tree]);

  const isSearchActive = Boolean(search.trim());

  const activeExpandedIds = useMemo(() => {
    if (!isSearchActive) return expandedIds;
    return collectExpandableIds(filteredTree);
  }, [isSearchActive, expandedIds, filteredTree]);

  const isAllExpanded =
    expandableIds.size > 0 &&
    (isSearchActive
      ? activeExpandedIds.size >= expandableIds.size
      : expandedIds.size >= expandableIds.size);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleExpandAll = () => {
    setExpandedIds(isAllExpanded ? new Set() : new Set(expandableIds));
  };

  return (
    <div className="flex flex-col gap-4">
      <CategoriesToolbar
        onSearch={setSearch}
        isAllExpanded={isAllExpanded}
        onToggleExpandAll={handleToggleExpandAll}
        totalCount={rawCount}
        rootCount={rootCount}
        subCount={subCount}
      />

      {filteredTree.length === 0 ? (
        <CategoriesEmptyState
          isFiltered={isSearchActive}
          onAddCategory={onAddCategory}
        />
      ) : (
        <div className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card/60 p-2 sm:p-3.5 shadow-xs">
          {filteredTree.map((node) => (
            <CategoryTreeNode
              key={node.id}
              node={node}
              expandedIds={activeExpandedIds}
              onToggleExpand={handleToggleExpand}
              matchIds={matchIds}
              onAddChild={onAddChild}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
