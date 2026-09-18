import { z } from "zod";

export const moduleSchema = z.object({
  labelAr: z.string().min(2, "اسم الوحدة بالعربية مطلوب"),
  labelEn: z.string().min(2, "اسم الوحدة بالإنجليزية مطلوب"),
  icon: z.string().min(1, "يرجى اختيار أيقونة"),
  descriptionAr: z.string().min(3, "الوصف بالعربية مطلوب"),
  descriptionEn: z.string().min(3, "الوصف بالإنجليزية مطلوب"),
  customActionId: z
    .string()
    .min(2, "معرف الإجراء المخصص مطلوب (حرفان على الأقل)")
    .regex(
      /^[a-z0-9_-]+$/,
      "المعرف يجب أن يتكون من أحرف إنجليزية صغيرة وأرقام وعلامات _ أو - فقط"
    ),
  customActionLabelAr: z.string().min(2, "اسم الإجراء المخصص بالعربية مطلوب"),
});

export type ModuleFormValues = z.infer<typeof moduleSchema>;
