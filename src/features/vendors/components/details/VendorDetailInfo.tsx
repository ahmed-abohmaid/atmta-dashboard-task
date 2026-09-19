import {
  Building2Icon,
  ChevronLeftIcon,
  FileTextIcon,
  FolderTreeIcon,
  PhoneIcon,
} from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { formatSaudiPhoneDisplay } from "@/features/vendors/utils/phone";

interface VendorDetailInfoProps {
  vendor: VendorWithRelations;
}

export function VendorDetailInfo({ vendor }: VendorDetailInfoProps) {
  const initial = getInitials(vendor.name_ar) || "م";
  const formattedPhone = formatSaudiPhoneDisplay(vendor.mobile);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-border/80 bg-card flex flex-col items-start gap-5 rounded-xl border p-6 shadow-xs sm:flex-row sm:items-center">
        <Avatar className="border-border/70 bg-muted/30 size-20 shrink-0 rounded-2xl border shadow-xs">
          <AvatarImage
            src={vendor.logo}
            alt={vendor.name_ar}
            className="rounded-2xl object-cover"
          />
          <AvatarFallback className="text-muted-foreground rounded-2xl text-xl font-bold">
            {initial}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h2 className="text-foreground text-lg font-bold">{vendor.name_ar}</h2>
          <span className="text-muted-foreground text-sm font-medium">{vendor.name_en}</span>
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-mono">
              <FileTextIcon className="text-primary size-3.5" />
              <span>س.ت:</span>
              <span className="text-foreground font-semibold">{vendor.cr_number}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <PhoneIcon className="text-primary size-3.5" />
              <a
                dir="ltr"
                href={`tel:${vendor.mobile}`}
                className="hover:text-primary inline-block font-mono transition-colors"
              >
                {formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-border/80 bg-card flex flex-col gap-3 rounded-xl border p-6 shadow-xs">
        <div className="text-foreground flex items-center gap-2 text-xs font-semibold">
          <FolderTreeIcon className="text-primary size-4" />
          <span>المسار الكامل للتصنيف في الشجرة الهندسية</span>
        </div>

        <div className="border-border/50 bg-muted/20 flex flex-wrap items-center gap-2 rounded-lg border p-3">
          {vendor.categoryBreadcrumb.length > 0 ? (
            vendor.categoryBreadcrumb.map((item, idx) => {
              const isLeaf = idx === vendor.categoryBreadcrumb.length - 1;
              return (
                <div key={item.id} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronLeftIcon className="text-muted-foreground/70 size-3.5 shrink-0 rtl:rotate-0" />
                  )}
                  <Badge
                    variant={isLeaf ? "default" : "secondary"}
                    className="rounded-full px-3 py-1 text-xs font-medium select-none"
                  >
                    {item.name_ar}
                  </Badge>
                </div>
              );
            })
          ) : (
            <span className="text-muted-foreground text-xs">
              {vendor.categoryName_ar || "لا يوجد مسار مسجل"}
            </span>
          )}
        </div>
      </div>

      <div className="border-border/80 bg-card flex flex-col gap-3 rounded-xl border p-6 shadow-xs">
        <div className="text-foreground flex items-center gap-2 text-xs font-semibold">
          <Building2Icon className="text-primary size-4" />
          <span>نبذة عن المورد ونشاطه</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line sm:text-sm">
          {vendor.about || "لا توجد تفاصيل إضافية مسجلة عن المورد."}
        </p>
      </div>
    </div>
  );
}
