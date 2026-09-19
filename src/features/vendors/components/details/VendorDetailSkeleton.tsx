import { Skeleton } from "@/components/ui/skeleton";

export function VendorDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-36 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border/80 bg-card flex gap-4 items-center">
        <Skeleton className="size-20 rounded-2xl shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-6 w-56 rounded-md" />
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border/80 bg-card flex flex-col gap-3">
        <Skeleton className="h-5 w-48 rounded-md" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      <div className="p-6 rounded-xl border border-border/80 bg-card flex flex-col gap-3">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}
