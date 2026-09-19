import { Category, UpdateCategoryInput } from "@/@types/category";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";
export async function updateCategory(input: UpdateCategoryInput): Promise<Category> {
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
  const target = categories.find((c) => c.id === input.id);

  if (!target) {
    throw new Error("التصنيف المطلوب تعديله غير موجود.");
  }

  if (input.parentId) {
    if (input.parentId === input.id) {
      throw new Error("لا يمكن اختيار التصنيف نفسه ليكون تصنيفاً أباً له.");
    }

    let currentParentId: string | null = input.parentId;
    while (currentParentId) {
      if (currentParentId === input.id) {
        throw new Error("لا يمكن اختيار أحد التصنيفات الفرعية ليكون تصنيفاً أباً لتصنيف أعلى منه.");
      }
      const parentCat = categories.find((c) => c.id === currentParentId);
      currentParentId = parentCat?.parentId ?? null;
    }

    const parentExists = categories.some((c) => c.id === input.parentId);
    if (!parentExists) {
      throw new Error("التصنيف الأب المحدد غير موجود.");
    }
  }

  const isDuplicate = categories.some(
    (c) =>
      c.id !== input.id &&
      c.parentId === input.parentId &&
      (c.name_ar.toLowerCase() === nameAr.toLowerCase() ||
        c.name_en.toLowerCase() === nameEn.toLowerCase())
  );
  if (isDuplicate) {
    throw new Error("يوجد تصنيف آخر بنفس الاسم تحت نفس المستوى.");
  }

  const updated: Category = {
    ...target,
    name_ar: nameAr,
    name_en: nameEn,
    parentId: input.parentId || null,
    updatedAt: new Date().toISOString(),
  };

  useMockStore.setState((state) => ({
    categories: state.categories.map((c) => (c.id === input.id ? updated : c)),
  }));

  return updated;
}
