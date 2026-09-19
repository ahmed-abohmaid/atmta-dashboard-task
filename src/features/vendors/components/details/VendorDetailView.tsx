"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendor } from "@/features/vendors/hooks/useVendor";
import { VendorDetailHeader } from "@/features/vendors/components/details/VendorDetailHeader";
import { VendorDetailInfo } from "@/features/vendors/components/details/VendorDetailInfo";
import { VendorDetailAudit } from "@/features/vendors/components/details/VendorDetailAudit";
import { VendorDetailSkeleton } from "@/features/vendors/components/details/VendorDetailSkeleton";
import { VendorDetailError } from "@/features/vendors/components/details/VendorDetailError";
import { VendorFormDialog } from "@/features/vendors/components/dialogs/VendorFormDialog";
import { DeleteVendorDialog } from "@/features/vendors/components/dialogs/DeleteVendorDialog";

interface VendorDetailViewProps {
  vendorId: string;
}

export function VendorDetailView({ vendorId }: VendorDetailViewProps) {
  const router = useRouter();
  const { vendor, isLoading, error, refetch } = useVendor(vendorId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) {
    return <VendorDetailSkeleton />;
  }

  if (error || !vendor) {
    return <VendorDetailError error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <VendorDetailHeader
        vendor={vendor}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VendorDetailInfo vendor={vendor} />
        </div>
        <div className="lg:col-span-1">
          <VendorDetailAudit vendor={vendor} />
        </div>
      </div>

      {isEditOpen && (
        <VendorFormDialog
          mode="edit"
          vendor={vendor}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isDeleteOpen && (
        <DeleteVendorDialog
          vendor={vendor}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onSuccess={() => router.push("/vendors")}
        />
      )}
    </div>
  );
}
