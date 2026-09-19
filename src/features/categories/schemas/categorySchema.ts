import { z } from "zod";

export const categorySchema = z.object({
  name_ar: z.string().trim().min(2, "اسم التصنيف بالعربية مطلوب (حرفان على الأقل)"),
  name_en: z.string().trim().min(2, "اسم التصنيف بالإنجليزية مطلوب (حرفان على الأقل)"),
  parentId: z.string().nullable().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
