"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Module } from "@/@types/module";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STANDARD_ACTIONS } from "@/features/permissions/consts/standardActions";
import { cn } from "cn";

interface PermissionMatrixRowProps {
  module: Module;
  grantedSet: Set<string>;
  isRowDisabled: boolean;
  isSuperAdminRole: boolean;
  can: (action: string, subject: string) => boolean;
  onToggleAction: (subject: string, action: string) => void;
  onToggleModule: (module: Module, selectAll: boolean) => void;
}

export function PermissionMatrixRow({
  module,
  grantedSet,
  isRowDisabled,
  isSuperAdminRole,
  can,
  onToggleAction,
  onToggleModule,
}: PermissionMatrixRowProps) {
  const customActions = module.actions.filter((a) => a.isCustom);
  const moduleAllActions = module.actions.map((a) => a.id);

  const isModuleFullySelected =
    moduleAllActions.length > 0 &&
    moduleAllActions.every((actId) => grantedSet.has(`${module.id}:${actId}`));

  const isModulePartiallySelected =
    !isModuleFullySelected &&
    moduleAllActions.some((actId) => grantedSet.has(`${module.id}:${actId}`));

  return (
    <TableRow className="hover:bg-secondary/15 transition-colors border-border/50">
      <TableCell className="py-2.5 ps-4 pe-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex items-center", isRowDisabled ? "cursor-not-allowed" : "cursor-pointer")}>
            <Checkbox
              id={`module-toggle-${module.id}`}
              checked={isModuleFullySelected || isModulePartiallySelected}
              disabled={isRowDisabled}
              onCheckedChange={(checked) =>
                onToggleModule(module, checked === true)
              }
              aria-label={`تحديد كافة صلاحيات وحدة ${module.label.ar}`}
              className={cn(isRowDisabled ? "cursor-not-allowed" : "cursor-pointer")}
            />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-secondary/70 text-primary border border-border/40">
              <DynamicIcon
                name={(module.icon as IconName) ?? "layout-grid"}
                className="size-3.5"
              />
            </div>
            <label
              htmlFor={`module-toggle-${module.id}`}
              className={cn(
                "font-medium truncate select-none",
                isRowDisabled
                  ? "cursor-not-allowed text-foreground/70"
                  : "cursor-pointer text-foreground"
              )}
            >
              {module.label.ar}
            </label>
          </div>
        </div>
      </TableCell>

      {STANDARD_ACTIONS.map((stdAct) => {
        const isChecked = grantedSet.has(`${module.id}:${stdAct.id}`);
        const isGrantable = can(stdAct.id, module.id);
        const isInputDisabled = isRowDisabled || !isGrantable;

        const checkboxElement = (
          <div
            className={cn(
              "flex justify-center",
              isInputDisabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <Checkbox
              checked={isChecked}
              disabled={isInputDisabled}
              onCheckedChange={() => onToggleAction(module.id, stdAct.id)}
              aria-label={`${stdAct.label} - ${module.label.ar}`}
              className={cn(isInputDisabled ? "cursor-not-allowed" : "cursor-pointer")}
            />
          </div>
        );

        if (!isGrantable && !isSuperAdminRole) {
          return (
            <TableCell key={stdAct.id} className="py-2.5 px-2 text-center">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div className="cursor-not-allowed inline-flex">
                      {checkboxElement}
                    </div>
                  }
                />
                <TooltipContent side="top" className="text-xs">
                  لا يمكنك منح صلاحية لا تمتلكها
                </TooltipContent>
              </Tooltip>
            </TableCell>
          );
        }

        return (
          <TableCell key={stdAct.id} className="py-2.5 px-2 text-center">
            {checkboxElement}
          </TableCell>
        );
      })}

      <TableCell className="py-2.5 px-3 text-center">
        {customActions.length === 0 ? (
          <span className="text-muted-foreground/40">—</span>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {customActions.map((custAct) => {
              const isChecked = grantedSet.has(`${module.id}:${custAct.id}`);
              const isGrantable = can(custAct.id, module.id);
              const isInputDisabled = isRowDisabled || !isGrantable;

              const chip = (
                <label
                  key={custAct.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors select-none",
                    isChecked
                      ? "border-primary/50 bg-primary/10 text-primary font-medium"
                      : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground",
                    isInputDisabled
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  )}
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={isInputDisabled}
                    onCheckedChange={() =>
                      onToggleAction(module.id, custAct.id)
                    }
                    className={cn(
                      "size-3.5",
                      isInputDisabled && "cursor-not-allowed"
                    )}
                  />
                  <span>{custAct.label.ar}</span>
                </label>
              );

              if (!isGrantable && !isSuperAdminRole) {
                return (
                  <Tooltip key={custAct.id}>
                    <TooltipTrigger
                      render={
                        <div className="inline-flex cursor-not-allowed">
                          {chip}
                        </div>
                      }
                    />
                    <TooltipContent side="top" className="text-xs">
                      لا يمكنك منح صلاحية لا تمتلكها
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return chip;
            })}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
