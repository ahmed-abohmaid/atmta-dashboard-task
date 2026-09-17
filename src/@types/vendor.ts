export type VendorStatus = "active" | "inactive";

export interface Vendor {
  id: string;
  name_ar: string;
  name_en: string;
  about: string;
  logo?: string;
  cr_number: string;
  mobile: string;
  categoryId: string;
  status: VendorStatus;
  createdBy: string; // User ID
  updatedBy: string; // User ID
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // Soft delete timestamp
}
