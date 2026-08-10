export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm animate-pulse">
      <div className="h-44 w-full bg-muted" />
      <div className="flex-1 p-6">
        <div className="flex gap-3">
          <div className="h-3.5 w-20 rounded bg-muted" />
          <div className="h-3.5 w-16 rounded bg-muted" />
        </div>
        <div className="mt-3 h-5 w-4/5 rounded-lg bg-muted" />
        <div className="mt-3 space-y-2">
          <div className="h-3.5 w-full rounded bg-muted" />
          <div className="h-3.5 w-2/3 rounded bg-muted" />
        </div>
        <div className="mt-5 h-9 w-32 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
