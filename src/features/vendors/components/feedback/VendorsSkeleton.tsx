import { Skeleton } from "@/components/ui/skeleton";

export function VendorsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-border/70 bg-card/50 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      <div className="border-border/80 bg-card overflow-hidden rounded-xl border shadow-xs">
        <div className="border-border/60 bg-muted/20 flex gap-4 border-b p-4">
          <Skeleton className="h-4 w-28 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="divide-border/40 divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-lg" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
              </div>
              <Skeleton className="hidden h-4 w-24 rounded-md sm:block" />
              <Skeleton className="hidden h-4 w-20 rounded-md md:block" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
