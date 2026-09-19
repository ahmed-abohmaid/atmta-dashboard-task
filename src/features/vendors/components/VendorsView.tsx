"use client";

import { useState } from "react";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { DeleteVendorDialog } from "@/features/vendors/components/dialogs/DeleteVendorDialog";
import { VendorFormDialog } from "@/features/vendors/components/dialogs/VendorFormDialog";
import { VendorsEmptyState } from "@/features/vendors/components/feedback/VendorsEmptyState";
import { VendorsError } from "@/features/vendors/components/feedback/VendorsError";
import { VendorsSkeleton } from "@/features/vendors/components/feedback/VendorsSkeleton";
import { VendorsHeader } from "@/features/vendors/components/VendorsHeader";
import { VendorsPagination } from "@/features/vendors/components/VendorsPagination";
import { VendorsTable } from "@/features/vendors/components/VendorsTable/VendorsTable";
import { VendorsToolbar } from "@/features/vendors/components/VendorsToolbar";
import { useVendorFilters } from "@/features/vendors/hooks/useVendorFilters";
import { useVendors } from "@/features/vendors/hooks/useVendors";
import { exportVendorsCsv } from "@/features/vendors/services/exportVendorsCsv";
import { downloadBlob } from "@/features/vendors/utils/exportCsv";

interface FormDialogState {
  open: boolean;
  mode: "create" | "edit";
  vendor?: VendorWithRelations | null;
}

export function VendorsView() {
  const {
    filters,
    search,
    categoryId,
    status,
    from,
    to,
    page,
    pageSize,
    hasActiveFilters,
    setSearch,
    setCategory,
    setStatus,
    setDateRange,
    setPage,
    setPageSize,
    resetFilters,
  } = useVendorFilters();

  const { vendors, total, totalPages, isLoading, error, refetch } = useVendors(filters);

  const [formDialog, setFormDialog] = useState<FormDialogState>({
    open: false,
    mode: "create",
  });

  const [vendorToDelete, setVendorToDelete] = useState<VendorWithRelations | null>(null);

  const [isExporting, setIsExporting] = useState(false);

  const handleAddVendor = () => {
    setFormDialog({
      open: true,
      mode: "create",
    });
  };

  const handleEditVendor = (vendor: VendorWithRelations) => {
    setFormDialog({
      open: true,
      mode: "edit",
      vendor,
    });
  };

  const handleDeleteVendor = (vendor: VendorWithRelations) => {
    setVendorToDelete(vendor);
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const blob = await exportVendorsCsv(filters);
      downloadBlob(blob, `vendors-export-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch {
      // Backend error fallback
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <VendorsHeader
        totalCount={total}
        onAddVendor={handleAddVendor}
        onExportCsv={handleExportCsv}
        isExporting={isExporting}
      />

      <VendorsToolbar
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        from={from}
        to={to}
        onDateRangeChange={setDateRange}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
        disabled={isLoading}
      />

      {isLoading ? (
        <VendorsSkeleton />
      ) : error ? (
        <VendorsError error={error} onRetry={() => refetch()} />
      ) : vendors.length === 0 ? (
        <VendorsEmptyState
          isFiltered={hasActiveFilters}
          onResetFilters={resetFilters}
          onAddVendor={handleAddVendor}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <VendorsTable vendors={vendors} onEdit={handleEditVendor} onDelete={handleDeleteVendor} />

          <VendorsPagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {formDialog.open && (
        <VendorFormDialog
          mode={formDialog.mode}
          vendor={formDialog.vendor}
          open={formDialog.open}
          onOpenChange={(open) => setFormDialog((prev) => ({ ...prev, open }))}
        />
      )}

      {vendorToDelete && (
        <DeleteVendorDialog
          vendor={vendorToDelete}
          open={Boolean(vendorToDelete)}
          onOpenChange={(open) => {
            if (!open) setVendorToDelete(null);
          }}
        />
      )}
    </div>
  );
}
