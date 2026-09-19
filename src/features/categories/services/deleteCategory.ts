import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function deleteCategory(id: string): Promise<void> {
  await delay(250);

  const { categories, vendors } = useMockStore.getState();
  const target = categories.find((c) => c.id === id);

  if (!target) {
    throw new Error("التصنيف المطلوب حذفه غير موجود.");
  }

  const childrenCount = categories.filter((c) => c.parentId === id).length;
  if (childrenCount > 0) {
    throw new Error(
      `لا يمكن حذف هذا التصنيف لأنه يحتوي على ${childrenCount} من التصنيفات الفرعية. يرجى نقلها أو حذفها أولاً.`
    );
  }

  const assignedVendorsCount = vendors.filter((v) => v.categoryId === id && !v.deletedAt).length;
  if (assignedVendorsCount > 0) {
    throw new Error(
      `لا يمكن حذف هذا التصنيف لأنه مرتبط بـ ${assignedVendorsCount} من الموردين النشطين. يرجى إعادة تعيين تصنيف الموردين أولاً.`
    );
  }

  useMockStore.setState((state) => ({
    categories: state.categories.filter((c) => c.id !== id),
  }));
}
