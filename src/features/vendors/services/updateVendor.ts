import { Vendor } from "@/@types/vendor";
import { delay } from "@/utils/delay";
import { getSessionCookie } from "@/features/auth/utils/sessionCookie";
import { UpdateVendorInput } from "@/features/vendors/@types/vendor";
import { isValidSaudiPhone, normalizeSaudiPhone } from "@/utils/phone";
import { useMockStore } from "@/mock/store";

export async function updateVendor(input: UpdateVendorInput): Promise<Vendor> {
  await delay(250);

  const { vendors, categories } = useMockStore.getState();

  const existing = vendors.find((v) => v.id === input.id && !v.deletedAt);
  if (!existing) {
    throw new Error("المورد المطلوب تعديله غير موجود.");
  }

  const nameAr = input.name_ar.trim();
  const nameEn = input.name_en.trim();
  const cr = input.cr_number.trim();
  const mobile = input.mobile.trim();

  if (!nameAr) {
    throw new Error("اسم المورد بالعربية مطلوب.");
  }
  if (!nameEn) {
    throw new Error("اسم المورد بالإنجليزية مطلوب.");
  }

  // CR Validation (ensure unique among other non-deleted vendors)
  if (!/^\d{10}$/.test(cr)) {
    throw new Error("رقم السجل التجاري يجب أن يتكون من 10 أرقام بالضبط.");
  }
  const isCrDuplicate = vendors.some(
    (v) => v.id !== input.id && !v.deletedAt && v.cr_number === cr
  );
  if (isCrDuplicate) {
    throw new Error("رقم السجل التجاري مُسجّل بالفعل لمورد آخر.");
  }

  // Mobile Validation
  if (!isValidSaudiPhone(mobile)) {
    throw new Error("رقم الجوال غير صالح. يرجى إدخال رقم هاتف سعودي صحيح.");
  }
  const normalizedMobile = normalizeSaudiPhone(mobile);

  // Category Validation
  const categoryExists = categories.some((c) => c.id === input.categoryId);
  if (!categoryExists) {
    throw new Error("التصنيف المحدد غير موجود.");
  }

  const session = getSessionCookie();
  const currentUserId = session?.userId || "user_super_admin";
  const now = new Date().toISOString();

  const updated: Vendor = {
    ...existing,
    name_ar: nameAr,
    name_en: nameEn,
    about: input.about.trim(),
    logo: input.logo ? input.logo.trim() : undefined,
    cr_number: cr,
    mobile: normalizedMobile,
    categoryId: input.categoryId,
    status: input.status,
    updatedBy: currentUserId,
    updatedAt: now,
  };

  useMockStore.setState((state) => ({
    vendors: state.vendors.map((v) => (v.id === input.id ? updated : v)),
  }));

  return updated;
}
