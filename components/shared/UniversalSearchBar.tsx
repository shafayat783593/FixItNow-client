

"use client";
import { CustomInput } from "@/components/shared/input";
import { Search, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
interface UniversalSearchBarProps {
  placeholder?: string;
}
export function UniversalSearchBar({
  placeholder = "Search by name, skill, or bio...",
}: UniversalSearchBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("searchItem", value);
      } else {
        params.delete("searchItem");
      }

      params.set("page", "1");

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 500);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>

      <CustomInput
        defaultValue={searchParams.get("searchItem")?.toString() || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:border-amber-400 focus-visible:ring-amber-400/20"
      />
    </div>
  );
}