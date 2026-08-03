import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-2 h-8 w-64" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
          </div>
        ))}
      </div>

      {/* Section heading */}
      <Skeleton className="mt-10 h-5 w-40" />

      {/* Table/list skeleton */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border bg-muted/50 p-4">
          <div className="flex gap-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="ml-auto h-3 w-14" />
          </div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 p-4">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="hidden h-4 w-24 sm:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="ml-auto h-4 w-14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}