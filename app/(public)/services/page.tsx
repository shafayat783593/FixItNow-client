// app/services/page.tsx
import React, { Suspense } from "react";
import { Wrench, Sparkles } from "lucide-react";

import { UniversalSearchBar } from "../../../components/shared/UniversalSearchBar";
import { Pagination } from "../_components/pagenation";
import { ServiceGridSkeleton } from "../_components/service/ServiceSkeleton";
import { ServiceCard } from "../_components/service/serviceCard";
import { ServiceFilter } from "../_components/service/ServiceFilter";
import { getAllService } from "@/lib/api/service";
import { getAllCategoriesAction } from "@/lib/api/admin.api";

export default async function ServicesPage({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
  const query = await searchParams;
  const { data: categories } = await getAllCategoriesAction()
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
    <main className="relative min-h-screen bg-background py-10 sm:py-16">
      {/* Background Decor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 shadow-sm">
            <Wrench size={15} className="text-accent" />
            <span
              className="text-xs font-bold uppercase tracking-wider text-accent-foreground"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Professional Maintenance
            </span>
          </div>

          <h1
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Explore All Available Services
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            From emergency repairs to regular home checkups, book background-verified experts at upfront fixed pricing.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-3 shadow-md">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Universal Search Bar */}
            <div className="lg:w-1/3 shrink-0">
              <UniversalSearchBar placeholder="Search CCTV, AC, Cleaning..." />
            </div>

            {/* Separator for Large Screens */}
            <div className="hidden h-7 w-[1px] bg-border lg:block" />

            {/* Filter Component */}
            <div className="flex-1">
              <ServiceFilter categories={categories} />
            </div>
          </div>
        </div>

        {/* Result Counter & Active Search Display */}
        <div className="mt-3 flex items-center justify-between px-2 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-accent" />
            <span>
              Showing <strong className="text-foreground">{services.length}</strong> of{" "}
              <strong className="text-foreground">{meta.total || services.length}</strong> services
            </span>
          </div>

          {searchItem && (
            <span className="text-muted-foreground">
              Results for: <span className="font-bold text-accent">&quot;{searchItem}&quot;</span>
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
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Wrench size={24} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">No services found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
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
