"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  placeholder?: string;
  customIcons?: IconName[];
  error?: string;
}

export function IconPicker({
  value,
  onChange,
  label = "الأيقونة",
  placeholder = "ابحث باسم الأيقونة (مثل: users, folder, file)...",
  customIcons,
  error,
}: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentIconName = (value as IconName) || "layout-grid";
  const iconList = customIcons || iconNames;

  const filteredIcons = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    const matches = trimmed
      ? iconList.filter((name) => name.toLowerCase().includes(trimmed))
      : iconList;

    const unique = [currentIconName, ...matches.filter((name) => name !== currentIconName)];

    return unique.slice(0, 96); // we should handled virtualization instead
  }, [currentIconName, iconList, search]);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label className="text-foreground text-xs font-medium">{label}</Label>}

      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                title="تغيير الأيقونة"
                className="bg-secondary/60 text-primary border-border/80 hover:bg-secondary/90 size-9 shrink-0 rounded-lg p-0 transition-colors"
              >
                <DynamicIcon name={currentIconName} className="size-4.5" />
              </Button>
            }
          />

          <PopoverContent align="start" className="w-72 p-3">
            <div className="flex flex-col gap-2.5">
              <div className="relative">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute inset-y-0 inset-s-0 my-auto ms-2 size-3" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={placeholder}
                  className="placeholder:text-muted-foreground/50 h-7 ps-7 text-xs placeholder:text-xs"
                  autoFocus
                />
              </div>

              <ScrollArea className="h-48">
                <div className="grid grid-cols-6 gap-1 p-0.5">
                  {filteredIcons.map((iconName) => {
                    const isSelected = iconName === value;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        title={iconName}
                        onClick={() => {
                          onChange(iconName);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <DynamicIcon name={iconName} className="size-4" />
                      </button>
                    );
                  })}
                </div>

                {filteredIcons.length === 0 && (
                  <p className="text-muted-foreground py-4 text-center text-[11px]">
                    لا توجد أيقونة مطابقة
                  </p>
                )}
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        <span className="text-muted-foreground truncate font-mono text-[11px]">
          {currentIconName}
        </span>
      </div>

      {error && <span className="text-destructive text-[11px] font-normal">{error}</span>}
    </div>
  );
}
