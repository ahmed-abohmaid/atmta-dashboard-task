import { z } from "zod";
import { isValidSaudiPhone } from "@/utils/phone";

export const userStep1Schema = (isEditing: boolean) =>
  z.object({
    name: z.string().trim().min(2, "اسم المستخدم مطلوب (حرفان على الأقل)"),
    email: z.string().trim().email("يرجى إدخال بريد إلكتروني صالح"),
    password: isEditing
      ? z
          .string()
          .optional()
          .refine((val) => !val || val.length >= 6, "كلمة المرور يجب ألا تقل عن 6 خانات")
      : z.string().trim().min(6, "كلمة المرور مطلوبة ويجب ألا تقل عن 6 خانات"),
    phone: z
      .string()
      .trim()
      .refine(
        (val) => isValidSaudiPhone(val),
        "رقم الجوال غير صالح، يجب أن يكون رقم سعودي صحيح (مثال: 05XXXXXXXX أو +9665XXXXXXXX)"
      ),
    photo: z.string().optional().or(z.literal("")),
    status: z.enum(["active", "inactive"]),
    roles: z.array(z.string()),
  });

export const userStep2Schema = z.object({
  effectivePermissions: z.array(
    z.object({
      action: z.string(),
      subject: z.string(),
      inverted: z.boolean().optional(),
    })
  ),
});

export const userFormSchema = (isEditing: boolean) =>
  userStep1Schema(isEditing).extend({
    effectivePermissions: z.array(
      z.object({
        action: z.string(),
        subject: z.string(),
        inverted: z.boolean().optional(),
      })
    ),
  });

export type UserStep1Data = z.infer<ReturnType<typeof userStep1Schema>>;
export type UserFormData = z.infer<ReturnType<typeof userFormSchema>>;
