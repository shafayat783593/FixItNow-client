import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <main className="relative min-h-screen bg-muted/50 py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header block */}
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto h-6 w-48 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-9 w-3/4" />
          <Skeleton className="mx-auto mt-3 h-4 w-2/3" />
        </div>

        {/* Search + filter bar */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-3 shadow-md shadow-foreground/5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Skeleton className="h-10 w-full lg:w-1/3" />
            <div className="hidden h-7 w-[1px] bg-border lg:block" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>

        {/* Result counter */}
        <div className="mt-3 px-2">
          <Skeleton className="h-3 w-40" />
        </div>

        {/* Card grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="mt-4 h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
