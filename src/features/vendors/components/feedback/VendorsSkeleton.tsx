import { Skeleton } from "@/components/ui/skeleton";

export function VendorsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border/70 bg-card/50">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border/60 bg-muted/20 flex gap-4">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="divide-y divide-border/40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 rounded-md hidden sm:block" />
              <Skeleton className="h-4 w-20 rounded-md hidden md:block" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
