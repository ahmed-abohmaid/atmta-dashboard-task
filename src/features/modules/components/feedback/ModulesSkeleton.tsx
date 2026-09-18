import { Skeleton } from "@/components/ui/skeleton";

export function ModulesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-5 shadow-xs"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-4/5 rounded-md" />
          </div>

          <div className="pt-2 border-t border-border/50 flex flex-col gap-2">
            <Skeleton className="h-3 w-24 rounded-md" />
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
