import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { getInitials } from "@/utils/getInitials";

interface VendorDetailAuditProps {
  vendor: VendorWithRelations;
}

export function VendorDetailAudit({ vendor }: VendorDetailAuditProps) {
  const auditEntries = [
    {
      title: "تمت الإضافة بواسطة",
      user: vendor.creator,
      userId: vendor.createdBy,
      date: vendor.createdAt,
    },
    {
      title: "آخر تحديث بواسطة",
      user: vendor.updater,
      userId: vendor.updatedBy,
      date: vendor.updatedAt,
    },
  ];

  return (
    <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-foreground border-b border-border/50 pb-3">
        <ClockIcon className="size-4 text-primary" />
        <span>سجل التدقيق والمتابعة</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {auditEntries.map((entry) => (
          <div
            key={entry.title}
            className="flex flex-col gap-2 p-3.5 rounded-lg border border-border/60 bg-muted/10"
          >
            <span className="text-[11px] font-medium text-muted-foreground">
              {entry.title}
            </span>
            <div className="flex items-center gap-3">
              <Avatar className="size-9 rounded-full border border-border/70">
                <AvatarImage src={entry.user?.photo} alt="المستخدم" />
                <AvatarFallback className="text-xs">
                  {getInitials(entry.user?.name) || "م"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                {entry.user ? (
                  <Link
                    href="/users"
                    className="text-xs font-semibold text-foreground hover:text-primary transition-colors truncate"
                  >
                    {entry.user.name}
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-foreground">
                    مستخدم النظام ({entry.userId})
                  </span>
                )}
                {entry.user?.email && (
                  <span className="text-[11px] text-muted-foreground font-mono truncate">
                    {entry.user.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1 pt-2 border-t border-border/40">
              <CalendarIcon className="size-3 text-primary" />
              <span>
                {new Date(entry.date).toLocaleString("ar-SA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
