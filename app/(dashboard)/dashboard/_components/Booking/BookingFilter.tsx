"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

const STATUS_OPTIONS = ["REQUESTED", "ACCEPTED", "DECLINED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export function BookingFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentStatus = searchParams.get("status") || "";

  const updateStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("status", value);
    else params.delete("status");
    params.set("page", "1");

    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={(e) => updateStatus(e.target.value)}
        disabled={isPending}
        className="rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs font-semibold text-foreground transition-all focus:border-accent focus:bg-card focus:outline-none"
      >
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.replace("_", " ")}</option>
        ))}
      </select>

      {currentStatus && (
        <button onClick={() => updateStatus("")} className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80">
          <RotateCcw size={12} />
          Reset
        </button>
      )}
    </div>
  );
}