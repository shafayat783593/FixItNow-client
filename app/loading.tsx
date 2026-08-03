import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-accent/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent">
          <Wrench className="h-7 w-7 animate-pulse" />
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Loading...
      </p>
    </div>
  );
}