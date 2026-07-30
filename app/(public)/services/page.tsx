// app/services/page.tsx
import React, { Suspense } from "react";
import { Wrench, Sparkles } from "lucide-react";

import { UniversalSearchBar } from "../../../components/shared/UniversalSearchBar";
import { Pagination } from "../_components/pagenation";
import { ServiceGridSkeleton } from "../_components/service/ServiceSkeleton";
import { ServiceCard } from "../_components/service/serviceCard";
import { ServiceFilter } from "../_components/service/ServiceFilter";
import { getAllService } from "@/lib/api/service";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const page = query?.page ? Number(query.page) : 1;
  const searchItem = typeof query?.searchItem === "string" ? query.searchItem : undefined;
  const category = typeof query?.category === "string" ? query.category : undefined;
  const minPrice = typeof query?.minPrice === "string" ? Number(query.minPrice) : undefined;
  const maxPrice = typeof query?.maxPrice === "string" ? Number(query.maxPrice) : undefined;
  const rating = typeof query?.rating === "string" ? Number(query.rating) : undefined;
  const location = typeof query?.location === "string" ? query.location : undefined;

  // Fetch Services Data
  const res = await getAllService({
    searchItem,
    category,
    minPrice,
    maxPrice,
    rating,
    location,
    page,
    limit: 8,
  });

  const services = res?.data || res || [];
  const meta = res?.meta || {
    page: page,
    limit: 8,
    total: services.length,
    totalPages: Math.ceil((services.length || 1) / 8),
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-10 sm:py-16">
      {/* Background Decor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            className="mt-4 text-3xl font-extrabold tracking-tight text-[#0F1B2B] sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Explore All Available Services
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            From emergency repairs to regular home checkups, book background-verified experts at upfront fixed pricing.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-md shadow-slate-100">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Universal Search Bar */}
            <div className="lg:w-1/3 shrink-0">
              <UniversalSearchBar placeholder="Search CCTV, AC, Cleaning..." />
            </div>

            {/* Separator for Large Screens */}
            <div className="hidden h-7 w-[1px] bg-slate-200 lg:block" />

            {/* Filter Component */}
            <div className="flex-1">
              <ServiceFilter />
            </div>
          </div>
        </div>

        {/* Result Counter & Active Search Display */}
        <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            <span>
              Showing <strong className="text-[#0F1B2B]">{services.length}</strong> of{" "}
              <strong className="text-[#0F1B2B]">{meta.total || services.length}</strong> services
            </span>
          </div>

          {searchItem && (
            <span className="text-slate-600">
              Results for: <span className="font-bold text-amber-600">&quot;{searchItem}&quot;</span>
            </span>
          )}
        </div>

        {/* Main Grid Content */}
        <div className="mt-6">
          <Suspense fallback={<ServiceGridSkeleton count={8} />}>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.map((service: any) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Wrench size={24} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0F1B2B]">No services found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  We couldn&apos;t find any service matching your criteria. Try resetting or adjusting your search & filters.
                </p>
              </div>
            )}
          </Suspense>

          {/* Pagination Component */}
          <Pagination meta={meta} />
        </div>
      </div>
    </main>
  );
}