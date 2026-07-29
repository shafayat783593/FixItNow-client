// app/services/page.tsx
import React from "react";
import { Wrench, Sparkles } from "lucide-react";

import { serverFetch } from "@/lib/api/serverFetch";
import { getAllService } from "../_action/service";
import { UniversalSearchBar } from "../_components/UniversalSearchBar";
import { Pagination } from "../_components/pagenation";
import { ServiceCard } from "../_components/serviceCard";

// Server Action / Fetcher for Services

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const page = query?.page ? Number(query.page) : 1;
  const searchItem = typeof query?.searchItem === "string" ? query.searchItem : undefined;

  // Fetch data from API
  const res = await getAllService({
    searchItem,
    page,
    limit: 8,
  });

  // Extract services array and meta
  const services = res?.data || res || [];
  const meta = res?.meta || {
    page: page,
    limit: 8,
    total: services.length,
    totalPages: Math.ceil((services.length || 1) / 8),
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-12 sm:py-20">
      {/* Background Decor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 shadow-sm">
            <Wrench size={15} className="text-amber-700" />
            <span
              className="text-xs font-bold uppercase tracking-wider text-amber-800"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Professional Maintenance
            </span>
          </div>

          <h1
            className="mt-5 text-4xl font-extrabold tracking-tight text-[#0F1B2B] sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Explore All Available Services
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            From emergency repairs to regular home checkups, book background-verified experts at upfront fixed pricing.
          </p>
        </div>

        {/* Filter & Search Bar Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row">
          <UniversalSearchBar
            placeholder="Search CCTV, AC, Garden Cleaning..."
            paramKey="searchItem"
          />

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Sparkles size={14} className="text-amber-500" />
            <span>Showing {services.length} active service options</span>
          </div>
        </div>

        {/* Active Search Term Filter Display */}
        {searchItem && (
          <div className="mt-4 text-sm text-slate-600">
            Search results for: <span className="font-bold text-[#0F1B2B]">&quot;{searchItem}&quot;</span>
          </div>
        )}

        {/* Service Cards Grid */}
        {services.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Wrench size={24} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0F1B2B]">No services found</h3>
            <p className="mt-1 text-sm text-slate-500">
              We couldn&apos;t find any service matching your search. Try searching for something else.
            </p>
          </div>
        )}

        {/* Reusable Pagination */}
        <Pagination meta={meta} />
      </div>
    </main>
  );
}