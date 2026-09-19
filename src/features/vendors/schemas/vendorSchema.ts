import { z } from "zod";
import { isValidSaudiPhone } from "@/features/vendors/utils/phone";

export const vendorSchema = z.object({
  name_ar: z
    .string()
    .trim()
    .min(2, "اسم المورد بالعربية مطلوب (حرفان على الأقل)"),
  name_en: z
    .string()
    .trim()
    .min(2, "اسم المورد بالإنجليزية مطلوب (حرفان على الأقل)"),
  about: z
    .string()
    .trim()
    .min(5, "نبذة عن المورد مطلوبة (5 أحرف على الأقل)"),
  logo: z.string().optional().or(z.literal("")),
  cr_number: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "رقم السجل التجاري يجب أن يتكون من 10 أرقام بالضبط"),
  mobile: z
    .string()
    .trim()
    .refine(
      (val) => isValidSaudiPhone(val),
      "رقم الجوال غير صالح، يجب أن يكون رقم سعودي صحيح (مثال: 05XXXXXXXX أو +9665XXXXXXXX)"
    ),
  categoryId: z
    .string()
    .trim()
    .min(1, "يرجى اختيار تصنيف للمورد"),
  status: z.enum(["active", "inactive"]),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;
