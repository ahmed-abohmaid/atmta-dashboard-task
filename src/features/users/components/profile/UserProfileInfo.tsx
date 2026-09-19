import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  CalendarIcon,
  FingerprintIcon,
  KeyRoundIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { Role } from "@/@types/role";
import { User } from "@/@types/user";
import { formatSaudiPhoneDisplay } from "@/utils/phone";

interface UserProfileInfoProps {
  user: User;
  roles: Role[];
}

export function UserProfileInfo({ user, roles }: UserProfileInfoProps) {
  const createdFormatted = user.createdAt
    ? format(new Date(user.createdAt), "dd MMM yyyy - hh:mm a", { locale: ar })
    : "—";

  const updatedFormatted = user.updatedAt
    ? format(new Date(user.updatedAt), "dd MMM yyyy - hh:mm a", { locale: ar })
    : "—";

  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
      <div className="border-border/60 flex items-center gap-2 border-b pb-4">
        <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
          <FingerprintIcon className="size-4" />
        </div>
        <div>
          <h2 className="text-foreground text-sm font-bold tracking-tight">البيانات الأساسية</h2>
          <p className="text-muted-foreground text-[11px]">بيانات الحساب وتفاصيل الاتصال</p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border/40 text-xs">
        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <UserIcon className="size-3.5 text-muted-foreground" />
            <span>معرف المستخدم</span>
          </span>
          <span className="text-foreground font-mono text-[11px]" dir="ltr">
            {user.id}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <MailIcon className="size-3.5 text-muted-foreground" />
            <span>البريد الإلكتروني</span>
          </span>
          <span className="text-foreground font-mono text-xs" dir="ltr">
            {user.email}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <PhoneIcon className="size-3.5 text-muted-foreground" />
            <span>رقم الجوال</span>
          </span>
          <span className="text-foreground font-mono text-xs" dir="ltr">
            {formatSaudiPhoneDisplay(user.phone)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <ShieldIcon className="size-3.5 text-muted-foreground" />
            <span>الأدوار الوظيفية</span>
          </span>
          <span className="text-foreground font-medium">
            {roles.length > 0 ? roles.map((r) => r.name).join("، ") : "لا توجد أدوار"}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <KeyRoundIcon className="size-3.5 text-muted-foreground" />
            <span>الصلاحيات المباشرة</span>
          </span>
          <span className="text-foreground font-medium">
            {(user.extraGrants?.length || 0) > 0
              ? `${user.extraGrants?.length} صلاحيات مخصصة`
              : "لا توجد استثناءات"}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="size-3.5 text-muted-foreground" />
            <span>تاريخ الإنشاء</span>
          </span>
          <span className="text-foreground/90 font-medium">{createdFormatted}</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="size-3.5 text-muted-foreground" />
            <span>آخر تحديث</span>
          </span>
          <span className="text-foreground/90 font-medium">{updatedFormatted}</span>
        </div>
      </div>
    </div>
  );
}
