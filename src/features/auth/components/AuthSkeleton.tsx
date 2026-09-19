import { Skeleton } from "@/components/ui/skeleton";

export function AuthSkeleton() {
  return (
    <div className="border-border/70 bg-card w-full max-w-lg space-y-6 rounded-2xl border p-6 sm:p-8 md:max-w-xl md:p-9">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="h-10 w-40 rounded-lg" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <Skeleton className="mt-6 h-10 w-full rounded-lg" />
      </div>

      <div className="border-border/50 space-y-2.5 border-t pt-5">
        <Skeleton className="mx-auto h-3.5 w-48" />
        <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2">
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
          <Skeleton className="h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
