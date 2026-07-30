// app/_components/ServiceSkeleton.tsx
import React from "react";

export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm animate-pulse">
      <div>
        {/* Tag & Duration */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded-full bg-slate-200" />
          <div className="h-4 w-16 rounded bg-slate-200" />
        </div>

        {/* Title */}
        <div className="mt-4 h-6 w-3/4 rounded-lg bg-slate-200" />

        {/* Description */}
        <div className="mt-3 space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-200" />
          <div className="h-3.5 w-2/3 rounded bg-slate-200" />
        </div>
      </div>

      {/* Footer / Price & Button */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2.5 w-16 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded-md bg-slate-200" />
          </div>
          <div className="h-9 w-24 rounded-xl bg-slate-200" />
        </div>

        {/* Badge */}
        <div className="mt-3.5 h-3 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function ServiceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  );
}