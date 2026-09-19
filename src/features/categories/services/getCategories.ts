import { CategoryVendorSummary, CategoryWithRelations } from "@/@types/category";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export type GetCategoriesResult = CategoryWithRelations[];

export async function getCategories(): Promise<CategoryWithRelations[]> {
  await delay(200);

  const { categories, vendors } = useMockStore.getState();

  const vendorsByCategoryId: Record<string, CategoryVendorSummary[]> = {};

  for (const v of vendors) {
    if (!v.deletedAt && v.categoryId) {
      (vendorsByCategoryId[v.categoryId] ??= []).push({
        id: v.id,
        name_ar: v.name_ar,
        name_en: v.name_en,
        cr_number: v.cr_number,
        status: v.status,
        logo: v.logo,
      });
    }
  }

  return categories.map((cat) => {
    const catVendors = vendorsByCategoryId[cat.id] ?? [];
    return {
      ...structuredClone(cat),
      vendorCount: catVendors.length,
      vendors: catVendors,
    };
  });
}
