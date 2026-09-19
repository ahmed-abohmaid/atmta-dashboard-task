import {
  Building2Icon,
  ChevronLeftIcon,
  FileTextIcon,
  FolderTreeIcon,
  PhoneIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { formatSaudiPhoneDisplay } from "@/features/vendors/utils/phone";
import { getInitials } from "@/utils/getInitials";

interface VendorDetailInfoProps {
  vendor: VendorWithRelations;
}

export function VendorDetailInfo({ vendor }: VendorDetailInfoProps) {
  const initial = getInitials(vendor.name_ar) || "م";
  const formattedPhone = formatSaudiPhoneDisplay(vendor.mobile);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <Avatar className="size-20 rounded-2xl border border-border/70 bg-muted/30 shadow-xs shrink-0">
          <AvatarImage
            src={vendor.logo}
            alt={vendor.name_ar}
            className="object-cover rounded-2xl"
          />
          <AvatarFallback className="rounded-2xl text-xl font-bold text-muted-foreground">
            {initial}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <h2 className="text-lg font-bold text-foreground">
            {vendor.name_ar}
          </h2>
          <span className="text-sm font-medium text-muted-foreground">
            {vendor.name_en}
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-mono">
              <FileTextIcon className="size-3.5 text-primary" />
              <span>س.ت:</span>
              <span className="text-foreground font-semibold">
                {vendor.cr_number}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <PhoneIcon className="size-3.5 text-primary" />
              <a
                dir="ltr"
                href={`tel:${vendor.mobile}`}
                className="hover:text-primary transition-colors font-mono inline-block"
              >
                {formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <FolderTreeIcon className="size-4 text-primary" />
          <span>المسار الكامل للتصنيف في الشجرة الهندسية</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-border/50 bg-muted/20">
          {vendor.categoryBreadcrumb.length > 0 ? (
            vendor.categoryBreadcrumb.map((item, idx) => {
              const isLeaf = idx === vendor.categoryBreadcrumb.length - 1;
              return (
                <div key={item.id} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronLeftIcon className="size-3.5 text-muted-foreground/70 shrink-0 rtl:rotate-0" />
                  )}
                  <Badge
                    variant={isLeaf ? "default" : "secondary"}
                    className="text-xs font-medium px-3 py-1 rounded-full select-none"
                  >
                    {item.name_ar}
                  </Badge>
                </div>
              );
            })
          ) : (
            <span className="text-xs text-muted-foreground">
              {vendor.categoryName_ar || "لا يوجد مسار مسجل"}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <Building2Icon className="size-4 text-primary" />
          <span>نبذة عن المورد ونشاطه</span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {vendor.about || "لا توجد تفاصيل إضافية مسجلة عن المورد."}
        </p>
      </div>
    </div>
  );
}
