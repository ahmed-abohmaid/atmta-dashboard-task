import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLayoutSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-6 w-32 rounded-md" />
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

