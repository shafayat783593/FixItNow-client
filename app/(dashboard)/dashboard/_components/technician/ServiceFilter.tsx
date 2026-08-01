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
import { ICategory } from "@/lib/api/service";

export function ServiceFilter({ categories }: { categories: ICategory[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "";

  const updateCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set("category", value);
    else params.delete("category");
    params.set("page", "1");

    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentCategory || "all"} onValueChange={updateCategory} disabled={isPending}>
        <SelectTrigger className="w-[180px] bg-muted/30">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentCategory && (
        <button
          onClick={() => updateCategory("")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80"
        >
          <RotateCcw size={12} /> Reset
        </button>
      )}
    </div>
  );
}