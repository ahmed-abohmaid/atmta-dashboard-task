import { Skeleton } from "@/components/ui/skeleton";

export function AuthSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-6 sm:p-8 space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="size-12 rounded-xl" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-52" />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md mt-6" />
      </div>

      <div className="pt-4 border-t border-border/50 space-y-2">
        <Skeleton className="h-3 w-48 mx-auto" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
