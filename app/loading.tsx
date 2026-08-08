import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-xs flex-col items-center rounded-3xl border border-border bg-card/90 px-8 py-10 text-center shadow-xl shadow-foreground/5 backdrop-blur-sm">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />
          <span className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-inner">
            <Wrench className="h-7 w-7 animate-pulse" />
          </div>
        </div>

        <p className="mt-5 text-base font-semibold text-foreground">Preparing your service</p>
        <p className="mt-1 text-sm text-muted-foreground">Getting everything ready for you.</p>

        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-2/3 animate-pulse rounded-full bg-accent" />
        </div>
        <div className="mt-4 flex gap-1.5" aria-label="Loading">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </main>
  );
}
