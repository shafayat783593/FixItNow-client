// app/_components/service/ServiceFilter.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Grid,
  Star,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

interface ServiceFilterProps {
  categories?: { id: string; name: string }[];
}

export function ServiceFilter({ categories = [] }: ServiceFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Current URL Params
  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentRating = searchParams.get("rating") || "";
  const currentLoc = searchParams.get("location") || "";

  // Local State
  const [locationInput, setLocationInput] = useState(currentLoc);
  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice);

  useEffect(() => {
    setLocationInput(currentLoc);
    setMinPriceInput(currentMinPrice);
    setMaxPriceInput(currentMaxPrice);
  }, [currentLoc, currentMinPrice, currentMaxPrice]);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.trim() !== "") {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setLocationInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    
    // Clear filter params while preserving searchItem if needed, or clear all filters
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("location");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("rating");
    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const activeFilterCount = [
    currentCategory,
    currentLoc,
    currentMinPrice,
    currentMaxPrice,
    currentRating,
  ].filter(Boolean).length;

  return (
    <div className="relative w-full">
      {/* Loading Bar */}
      {isPending && (
        <div className="absolute -top-1 inset-x-0 h-0.5 overflow-hidden rounded-full ">
          <div className="h-full w-full animate-pulse " />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
        {/* 1. Category Dropdown */}
        <div className="relative min-w-[130px] flex-1">
          <Grid size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={currentCategory}
            onChange={(e) => updateParam("category", e.target.value || null)}
            className="w-full appearance-none rounded-xl bg-slate-50/80 py-2.5 pl-8 pr-7 text-xs font-semibold text-[#0F1B2B] transition-all hover:bg-slate-100/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* 2. Location Input */}
        <div className="relative min-w-[130px] flex-1">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Location..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onBlur={(e) => updateParam("location", e.target.value || null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam("location", locationInput || null);
              }
            }}
            className="w-full rounded-xl bg-slate-50/80 py-2.5 pl-8 pr-3 text-xs font-medium text-[#0F1B2B] placeholder:text-slate-400 transition-all hover:bg-slate-100/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
        </div>

        {/* 3. Price Range Inputs */}
        <div className="flex items-center gap-1 min-w-[140px] flex-1 bg-slate-50/80 rounded-xl px-2.5 py-1 transition-all hover:bg-slate-100/80">
          <span className="text-[11px] font-bold text-slate-400">$</span>
          <input
            type="number"
            placeholder="Min"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            onBlur={(e) => updateParam("minPrice", e.target.value || null)}
            className="w-full bg-transparent py-1 text-xs font-medium text-[#0F1B2B] placeholder:text-slate-400 focus:outline-none"
          />
          <span className="text-slate-300">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            onBlur={(e) => updateParam("maxPrice", e.target.value || null)}
            className="w-full bg-transparent py-1 text-xs font-medium text-[#0F1B2B] placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* 4. Rating Dropdown */}
        <div className="relative min-w-[110px] flex-1">
          <Star size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 fill-amber-500" />
          <select
            value={currentRating}
            onChange={(e) => updateParam("rating", e.target.value || null)}
            className="w-full appearance-none rounded-xl bg-slate-50/80 py-2.5 pl-7 pr-6 text-xs font-semibold text-[#0F1B2B] transition-all hover:bg-slate-100/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5★ & up</option>
            <option value="4.0">4.0★ & up</option>
            <option value="3.5">3.5★ & up</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Reset Filter Action Button */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            title="Reset Filters"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}