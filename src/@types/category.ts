export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}
