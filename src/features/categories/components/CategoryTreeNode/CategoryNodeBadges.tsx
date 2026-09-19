"use client";

import { Building2Icon, LayersIcon } from "lucide-react";
import { CategoryNode } from "@/@types/category";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TruncatedText } from "@/components/ui/truncatedText";
import { cn } from "cn";

interface CategoryNodeBadgesProps {
  node: CategoryNode;
}

export function CategoryNodeBadges({ node }: CategoryNodeBadgesProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {node.childCount > 0 && (
        <Badge
          variant="outline"
          className="gap-1 text-xs h-6.5 font-normal border-border/60 bg-secondary/30 text-muted-foreground hidden sm:flex"
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
                className="inline-flex items-center gap-1.5 text-xs h-6.5 px-2.5 rounded-md border border-primary/35 bg-primary/10 text-primary font-medium transition-colors hover:bg-primary/20 cursor-pointer"
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
            className="w-72 p-3 text-xs border border-border/80 bg-popover shadow-xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 pb-2.5 border-b border-border/50 mb-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Building2Icon className="size-3.5 shrink-0" />
              </div>
              <span className="text-xs font-bold text-foreground">
                الموردون المسجلون ({node.vendorCount})
              </span>
            </div>

            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pe-1">
              {node.vendors && node.vendors.length > 0 ? (
                node.vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex flex-col gap-1 rounded-lg border border-border/40 bg-secondary/20 p-2.5 transition-colors hover:bg-secondary/35"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <TruncatedText
                        text={vendor.name_ar}
                        className="text-xs font-semibold text-foreground flex-1 min-w-0"
                      />
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0 h-5 font-normal shrink-0",
                          vendor.status === "active"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-secondary text-muted-foreground border-border/50"
                        )}
                      >
                        {vendor.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      سجل تجاري: {vendor.cr_number}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-muted-foreground text-center py-2">
                  لا توجد تفاصيل موردين
                </span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Badge
          variant="outline"
          className="gap-1 text-xs h-6.5 font-normal border-border/60 bg-secondary/20 text-muted-foreground/70"
        >
          <Building2Icon className="size-3" />
          <span>0 مورد</span>
        </Badge>
      )}
    </div>
  );
}
