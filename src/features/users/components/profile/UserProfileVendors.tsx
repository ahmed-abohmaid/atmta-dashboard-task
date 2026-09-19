import Link from "next/link";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Building2Icon, ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";

interface UserProfileVendorsProps {
  vendors: VendorWithRelations[];
}

export function UserProfileVendors({ vendors }: UserProfileVendorsProps) {
  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-sm">
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
            <Building2Icon className="size-4" />
          </div>
          <div>
            <h2 className="text-foreground text-sm font-bold tracking-tight">
              الموردون المضافون بواسطة المستخدم
            </h2>
            <p className="text-muted-foreground text-[11px]">
              المنشآت والموردين الذين تم تسجيلهم في النظام عبر هذا الحساب
            </p>
          </div>
        </div>

        <Badge variant="secondary" className="border-border/60 border text-xs font-medium">
          {vendors.length} موردين
        </Badge>
      </div>

      {vendors.length === 0 ? (
        <div className="bg-muted/20 text-muted-foreground rounded-xl p-8 text-center text-xs">
          لم يقم هذا المستخدم بإضافة أي موردين في النظام حتى الآن.
        </div>
      ) : (
        <div className="divide-border/40 divide-y pt-2">
          {vendors.map((vendor) => {
            const formattedDate = vendor.createdAt
              ? format(new Date(vendor.createdAt), "dd MMM yyyy", { locale: ar })
              : "—";

            const categoryCrumbs = vendor.categoryBreadcrumb || [];

            return (
              <div
                key={vendor.id}
                className="group flex flex-col justify-between gap-3 py-3.5 transition-colors sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Avatar className="border-border/70 size-10 shrink-0 rounded-xl border">
                    <AvatarImage src={vendor.logo} alt={vendor.name_ar} />
                    <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">
                      {getInitials(vendor.name_ar) || "م"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/vendors/${vendor.id}`}
                        className="text-foreground group-hover:text-primary flex items-center gap-1.5 truncate text-xs font-bold transition-colors"
                      >
                        <span>{vendor.name_ar}</span>
                        <ExternalLinkIcon className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>

                      <span className="text-muted-foreground text-[11px]">({vendor.name_en})</span>

                      <Badge
                        variant="outline"
                        className={
                          vendor.status === "active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] px-1.5 py-0"
                            : "border-destructive/30 bg-destructive/10 text-destructive text-[10px] px-1.5 py-0"
                        }
                      >
                        {vendor.status === "active" ? "نشط" : "معطل"}
                      </Badge>
                    </div>

                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="bg-secondary/60 text-secondary-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">
                        سجل: {vendor.cr_number}
                      </span>

                      {categoryCrumbs.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-muted-foreground/70">التصنيف:</span>
                          {categoryCrumbs.map((c, i) => (
                            <span key={c.id} className="flex items-center gap-1 text-foreground/80">
                              {i > 0 && <ChevronLeftIcon className="size-3 text-muted-foreground/40" />}
                              <span>{c.name_ar}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-muted-foreground self-end sm:self-auto text-xs font-mono">
                  {formattedDate}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
