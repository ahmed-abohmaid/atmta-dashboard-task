import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { getCategoryBreadcrumb } from "@/features/vendors/services/getVendors";

export async function getVendorById(
  id: string
): Promise<VendorWithRelations | null> {
  await delay(150);

  const { vendors, categories, users } = useMockStore.getState();

  const vendor = vendors.find((v) => v.id === id && !v.deletedAt);
  if (!vendor) {
    return null;
  }

  const category = categories.find((c) => c.id === vendor.categoryId);
  const breadcrumb = getCategoryBreadcrumb(categories, vendor.categoryId);

  const creatorUser = users.find((u) => u.id === vendor.createdBy);
  const updaterUser = users.find((u) => u.id === vendor.updatedBy);

  return {
    ...structuredClone(vendor),
    categoryName_ar: category?.name_ar || "",
    categoryName_en: category?.name_en || "",
    categoryBreadcrumb: breadcrumb,
    creator: creatorUser
      ? {
          id: creatorUser.id,
          name: creatorUser.name,
          email: creatorUser.email,
          photo: creatorUser.photo,
        }
      : null,
    updater: updaterUser
      ? {
          id: updaterUser.id,
          name: updaterUser.name,
          email: updaterUser.email,
          photo: updaterUser.photo,
        }
      : null,
  };
}
