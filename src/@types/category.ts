export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface CategoryVendorSummary {
  id: string;
  name_ar: string;
  name_en: string;
  cr_number: string;
  status: "active" | "inactive";
  logo?: string;
}

export interface CategoryWithRelations extends Category {
  vendorCount: number;
  vendors: CategoryVendorSummary[];
}

export interface CategoryNode extends CategoryWithRelations {
  depth: number;
  childCount: number;
  children: CategoryNode[];
}

export interface CategorySelectOption {
  id: string;
  label: string;
  depth: number;
  disabled?: boolean;
}

export interface CreateCategoryInput {
  name_ar: string;
  name_en: string;
  parentId: string | null;
}

export interface UpdateCategoryInput extends CreateCategoryInput {
  id: string;
}
