"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = ["REQUESTED", "ACCEPTED", "DECLINED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export function BookingFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentStatus = searchParams.get("status") || "all";

  const updateStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set("status", value);
    else params.delete("status");
    params.set("page", "1");

    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentStatus} onValueChange={updateStatus} disabled={isPending}>
        <SelectTrigger className="w-[160px] bg-muted/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s} value={s}>
              {s.replace("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentStatus !== "all" && (
        <button
          onClick={() => updateStatus("")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80"
        >
          <RotateCcw size={12} /> Reset
        </button>
      )}
    </div>
  );
}