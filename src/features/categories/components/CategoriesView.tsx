"use client";

import { useState } from "react";
import { CategoryNode } from "@/@types/category";
import { CategoriesHeader } from "@/features/categories/components/CategoriesHeader";
import { CategoriesTreeTable } from "@/features/categories/components/CategoriesTreeTable";
import { CategoryFormDialog } from "@/features/categories/components/dialogs/CategoryFormDialog";
import { DeleteCategoryDialog } from "@/features/categories/components/dialogs/DeleteCategoryDialog";
import { CategoriesEmptyState } from "@/features/categories/components/feedback/CategoriesEmptyState";
import { CategoriesError } from "@/features/categories/components/feedback/CategoriesError";
import { CategoriesSkeleton } from "@/features/categories/components/feedback/CategoriesSkeleton";
import { useCategories } from "@/features/categories/hooks/useCategories";

interface FormDialogState {
  open: boolean;
  mode: "create" | "edit";
  category?: CategoryNode;
  defaultParentId?: string | null;
  defaultParentName?: string;
}

export function CategoriesView() {
  const { tree, stats, isLoading, error, refetch } = useCategories();

  const [formDialog, setFormDialog] = useState<FormDialogState>({
    open: false,
    mode: "create",
  });

  const [categoryToDelete, setCategoryToDelete] = useState<CategoryNode | null>(null);

  const handleAddRoot = () => {
    setFormDialog({
      open: true,
      mode: "create",
      defaultParentId: null,
    });
  };

  const handleAddChild = (parent: CategoryNode) => {
    setFormDialog({
      open: true,
      mode: "create",
      defaultParentId: parent.id,
      defaultParentName: parent.name_ar,
    });
  };

  const handleEdit = (category: CategoryNode) => {
    setFormDialog({
      open: true,
      mode: "edit",
      category,
    });
  };

  const handleDelete = (category: CategoryNode) => {
    setCategoryToDelete(category);
  };

  return (
    <div className="flex flex-col gap-6">
      <CategoriesHeader onAddCategory={handleAddRoot} />

      {isLoading ? (
        <CategoriesSkeleton />
      ) : error ? (
        <CategoriesError error={error} onRetry={() => refetch()} />
      ) : stats.total === 0 ? (
        <CategoriesEmptyState onAddCategory={handleAddRoot} />
      ) : (
        <CategoriesTreeTable
          tree={tree}
          rawCount={stats.total}
          rootCount={stats.rootCount}
          subCount={stats.subCount}
          onAddCategory={handleAddRoot}
          onAddChild={handleAddChild}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {formDialog.open && (
        <CategoryFormDialog
          mode={formDialog.mode}
          category={formDialog.category}
          defaultParentId={formDialog.defaultParentId}
          defaultParentName={formDialog.defaultParentName}
          open={formDialog.open}
          onOpenChange={(open) => setFormDialog((prev) => ({ ...prev, open }))}
        />
      )}

      {categoryToDelete && (
        <DeleteCategoryDialog
          category={categoryToDelete}
          open={Boolean(categoryToDelete)}
          onOpenChange={(open) => {
            if (!open) setCategoryToDelete(null);
          }}
        />
      )}
    </div>
  );
}
