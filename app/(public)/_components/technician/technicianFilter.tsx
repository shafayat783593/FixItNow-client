'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'experience', label: 'Most Experienced' },
  { value: 'newest', label: 'Newest' },
];

export function TechnicianFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const sortBy = searchParams.get('sortBy') || '';
  const location = searchParams.get('location') || '';
  const minRating = searchParams.get('minRating') || '';

  const activeCount = [sortBy, location, minRating].filter(Boolean).length;

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sortBy');
    params.delete('location');
    params.delete('minRating');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent"
      >
        <SlidersHorizontal size={16} />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
            {activeCount}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-border bg-card p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Filters</span>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => updateParam('sortBy', e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue={location}
                  onBlur={(e) => updateParam('location', e.target.value)}
                  placeholder="e.g. Chattogram"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => updateParam('minRating', e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="4.5">4.5 & up</option>
                  <option value="4">4.0 & up</option>
                  <option value="3">3.0 & up</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}