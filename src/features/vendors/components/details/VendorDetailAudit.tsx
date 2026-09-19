import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";

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
    <div className="border-border/80 bg-card flex flex-col gap-5 rounded-xl border p-6 shadow-xs">
      <div className="text-foreground border-border/50 flex items-center gap-2 border-b pb-3 text-xs font-semibold">
        <ClockIcon className="text-primary size-4" />
        <span>سجل التدقيق والمتابعة</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {auditEntries.map((entry) => (
          <div
            key={entry.title}
            className="border-border/60 bg-muted/10 flex flex-col gap-2 rounded-lg border p-3.5"
          >
            <span className="text-muted-foreground text-[11px] font-medium">{entry.title}</span>
            <div className="flex items-center gap-3">
              <Avatar className="border-border/70 size-9 rounded-full border">
                <AvatarImage src={entry.user?.photo} alt="المستخدم" />
                <AvatarFallback className="text-xs">
                  {getInitials(entry.user?.name) || "م"}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                {entry.user ? (
                  <Link
                    href={`/users/${entry.user.id}`}
                    className="text-foreground hover:text-primary truncate text-xs font-semibold transition-colors"
                  >
                    {entry.user.name}
                  </Link>
                ) : (
                  <span className="text-foreground text-xs font-semibold">
                    مستخدم النظام ({entry.userId})
                  </span>
                )}
                {entry.user?.email && (
                  <span className="text-muted-foreground truncate font-mono text-[11px]">
                    {entry.user.email}
                  </span>
                )}
              </div>
            </div>
            <div className="text-muted-foreground border-border/40 mt-1 flex items-center gap-1.5 border-t pt-2 text-[11px]">
              <CalendarIcon className="text-primary size-3" />
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
