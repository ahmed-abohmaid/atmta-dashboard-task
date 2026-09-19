import { z } from "zod";

export const permissionItemSchema = z.object({
  action: z.string().min(1, "الإجراء مطلوب"),
  subject: z.string().min(1, "الموضوع مطلوب"),
  inverted: z.boolean().optional(),
});

export const roleSchema = z.object({
  name: z.string().min(2, "اسم الدور مطلوب (حرفان على الأقل)"),
  description: z.string().optional(),
  permissions: z.array(permissionItemSchema).min(1, "يجب تحديد صلاحية واحدة على الأقل لهذا الدور"),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
