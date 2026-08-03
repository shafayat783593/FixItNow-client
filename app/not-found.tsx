import Link from "next/link";
import { Wrench, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <Wrench className="h-7 w-7" />
      </div>

      <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-2 text-lg font-semibold text-foreground">
        This page couldn't be found
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        The page you're looking for doesn't exist, or the link may be broken.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse services
        </Link>
      </div>
    </div>
  );
}