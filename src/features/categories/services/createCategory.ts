import { Category, CreateCategoryInput } from "@/@types/category";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export function generateCategorySlug(nameEn: string): string {
  const normalized = nameEn
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (normalized.length >= 2) {
    return `cat_${normalized}`;
  }

  return `cat_${Date.now().toString(36)}`;
}

export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  await delay(250);

  const nameAr = input.name_ar.trim();
  const nameEn = input.name_en.trim();

  if (!nameAr) {
    throw new Error("اسم التصنيف بالعربية مطلوب.");
  }
  if (!nameEn) {
    throw new Error("اسم التصنيف بالإنجليزية مطلوب.");
  }

  const { categories } = useMockStore.getState();

  if (input.parentId) {
    const parentExists = categories.some((c) => c.id === input.parentId);
    if (!parentExists) {
      throw new Error("التصنيف الأب المحدد غير موجود.");
    }
  }

  const isDuplicate = categories.some(
    (c) =>
      c.parentId === input.parentId &&
      (c.name_ar.toLowerCase() === nameAr.toLowerCase() ||
        c.name_en.toLowerCase() === nameEn.toLowerCase())
  );
  if (isDuplicate) {
    throw new Error("يوجد تصنيف بنفس الاسم تحت نفس المستوى.");
  }

  let slug = generateCategorySlug(nameEn);
  let counter = 1;
  while (categories.some((c) => c.id === slug)) {
    slug = `${generateCategorySlug(nameEn)}_${counter}`;
    counter++;
  }

  const now = new Date().toISOString();
  const newCategory: Category = {
    id: slug,
    name_ar: nameAr,
    name_en: nameEn,
    parentId: input.parentId || null,
    createdAt: now,
    updatedAt: now,
  };

  useMockStore.setState((state) => ({
    categories: [...state.categories, newCategory],
  }));

  return newCategory;
}
