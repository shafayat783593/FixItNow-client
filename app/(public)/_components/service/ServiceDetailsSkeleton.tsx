export default function ServiceDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-muted/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="mb-6 h-4 w-32 rounded bg-muted" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex gap-3">
                <div className="h-6 w-24 rounded-full bg-muted" />
                <div className="h-6 w-32 rounded-lg bg-muted" />
              </div>
              <div className="mt-4 h-8 w-2/3 rounded bg-muted" />
              <div className="mt-6 space-y-2 border-t border-border pt-6">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
              <div className="mt-8 h-24 rounded-2xl bg-muted" />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="h-3 w-28 rounded bg-muted" />
              <div className="mt-4 flex items-center gap-4 border-b border-border pb-6">
                <div className="h-16 w-16 rounded-2xl bg-muted" />
                <div className="space-y-2">
                  <div className="h-5 w-40 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="h-14 rounded-xl bg-muted" />
                <div className="h-14 rounded-xl bg-muted" />
                <div className="h-14 rounded-xl bg-muted" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="mt-3 h-9 w-32 rounded bg-muted" />
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
              </div>
              <div className="mt-8 h-12 w-full rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
