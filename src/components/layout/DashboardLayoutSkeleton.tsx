import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLayoutSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="hidden md:flex w-64 flex-col border-s border-border/70 p-4 gap-4 bg-sidebar">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2 pt-6">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="h-14 border-b border-border/70 flex items-center px-6 justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-36 rounded-md" />
        </div>
        <div className="p-6 space-y-6 flex-1">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
