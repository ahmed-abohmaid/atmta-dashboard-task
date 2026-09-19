import { Vendor, VendorStatus } from "@/@types/vendor";

export interface CategoryBreadcrumbItem {
  id: string;
  name_ar: string;
  name_en: string;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface VendorWithRelations extends Vendor {
  categoryName_ar: string;
  categoryName_en: string;
  categoryBreadcrumb: CategoryBreadcrumbItem[];
  creator?: UserSummary | null;
  updater?: UserSummary | null;
}

export interface VendorFilterParams {
  search?: string;
  categoryId?: string;
  status?: VendorStatus | "all";
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedVendorsResult {
  items: VendorWithRelations[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface CreateVendorInput {
  name_ar: string;
  name_en: string;
  about: string;
  logo?: string;
  cr_number: string;
  mobile: string;
  categoryId: string;
  status: VendorStatus;
}

export interface UpdateVendorInput extends CreateVendorInput {
  id: string;
}
