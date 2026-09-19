"use client";

import { cn } from "cn";
import { Building2Icon, LayersIcon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TruncatedText } from "@/components/ui/truncatedText";

interface CategoryNodeBadgesProps {
  node: CategoryNode;
}

export function CategoryNodeBadges({ node }: CategoryNodeBadgesProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {node.childCount > 0 && (
        <Badge
          variant="outline"
          className="border-border/60 bg-secondary/30 text-muted-foreground hidden h-6.5 gap-1 text-xs font-normal sm:flex"
        >
          <LayersIcon className="size-3" />
          <span>{node.childCount} فرعي</span>
        </Badge>
      )}

      {node.vendorCount > 0 ? (
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="border-primary/35 bg-primary/10 text-primary hover:bg-primary/20 inline-flex h-6.5 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors"
                title="عرض الموردين المسجلين في هذا التصنيف"
              >
                <Building2Icon className="size-3 shrink-0" />
                <span>{node.vendorCount} مورد</span>
              </button>
            }
          />
          <PopoverContent
            align="end"
            side="top"
            className="border-border/80 bg-popover w-72 rounded-xl border p-3 text-xs shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-border/50 mb-2 flex items-center gap-2 border-b pb-2.5">
              <div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-md">
                <Building2Icon className="size-3.5 shrink-0" />
              </div>
              <span className="text-foreground text-xs font-bold">
                الموردون المسجلون ({node.vendorCount})
              </span>
            </div>

            <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pe-1">
              {node.vendors && node.vendors.length > 0 ? (
                node.vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="border-border/40 bg-secondary/20 hover:bg-secondary/35 flex flex-col gap-1 rounded-lg border p-2.5 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <TruncatedText
                        text={vendor.name_ar}
                        className="text-foreground min-w-0 flex-1 text-xs font-semibold"
                      />
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-5 shrink-0 px-1.5 py-0 text-[10px] font-normal",
                          vendor.status === "active"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-secondary text-muted-foreground border-border/50"
                        )}
                      >
                        {vendor.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      سجل تجاري: {vendor.cr_number}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground py-2 text-center text-xs">
                  لا توجد تفاصيل موردين
                </span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Badge
          variant="outline"
          className="border-border/60 bg-secondary/20 text-muted-foreground/70 h-6.5 gap-1 text-xs font-normal"
        >
          <Building2Icon className="size-3" />
          <span>0 مورد</span>
        </Badge>
      )}
    </div>
  );
}
