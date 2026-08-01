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

export function UserFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentRole = searchParams.get("role") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    params.set("page", "1");

    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  };

  const hasActiveFilters = currentRole !== "all" || currentStatus !== "all";

  return (
    <div className="flex items-center gap-2">
      <Select value={currentRole} onValueChange={(v) => updateParam("role", v)} disabled={isPending}>
        <SelectTrigger className="w-[140px] bg-muted/30">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="CUSTOMER">Customer</SelectItem>
          <SelectItem value="TECHNICIAN">Technician</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentStatus} onValueChange={(v) => updateParam("status", v)} disabled={isPending}>
        <SelectTrigger className="w-[140px] bg-muted/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="BANNED">Banned</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("role");
            params.delete("status");
            params.set("page", "1");
            startTransition(() => router.replace(`${pathname}?${params.toString()}`));
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80"
        >
          <RotateCcw size={12} /> Reset
        </button>
      )}
    </div>
  );
}