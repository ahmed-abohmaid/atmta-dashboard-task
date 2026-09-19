import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesTreeSkeleton() {
  return (
    <div className="border-border/70 bg-card flex flex-col gap-2.5 rounded-xl border p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border-border/40 bg-secondary/20 flex items-center justify-between gap-4 rounded-lg border p-3"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 rounded-sm" />
            <Skeleton className="size-7 rounded-md" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-44 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CategoriesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar Skeleton */}
      <div className="border-border/70 bg-card flex flex-col items-center justify-between gap-3 rounded-xl border p-4 sm:flex-row">
        <Skeleton className="h-9 w-full rounded-lg sm:w-80" />
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      <CategoriesTreeSkeleton />
    </div>
  );
}
