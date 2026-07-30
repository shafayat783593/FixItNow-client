import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { getAllTechnicians } from '@/lib/api/technician';
import { UniversalSearchBar } from '@/components/shared/UniversalSearchBar';
import { TechnicianFilter } from '../_components/technician/technicianFilter';
import { TechnicianCard } from '../_components/technician/technicianCard';
import { Pagination } from '../_components/pagenation';


export default async function TechniciansPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const page = query?.page ? Number(query.page) : 1;
  const searchItem = typeof query?.searchItem === 'string' ? query.searchItem : '';
  const sortBy = typeof query?.sortBy === 'string' ? (query.sortBy as any) : undefined;
  const location = typeof query?.location === 'string' ? query.location : undefined;
  const minRating = typeof query?.minRating === 'string' ? query.minRating : undefined;

  const res = await getAllTechnicians({
    searchItem,
    page,
    limit: 8,
    sortBy,
    location,
    minRating,
  });

  const technicians = res?.data || [];
  const meta = res?.meta || { page: 1, limit: 8, total: technicians.length, totalPages: 1 };

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1">
              <Users size={14} className="text-amber-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Top Rated Experts
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              All Technicians
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Verified professionals ready to handle your repair and maintenance needs with transparent pricing.
            </p>
          </div>
        </div>

        {/* Search + Filter Row */}
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
                    <TechnicianFilter />
                  </div>
                </div>
              </div>

        {searchItem && (
          <p className="mt-3 text-sm text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">&quot;{searchItem}&quot;</span>
          </p>
        )}

        {technicians.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicians.map((tech: any) => (
              <TechnicianCard key={tech.id} technician={tech} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-medium text-muted-foreground">No technicians found matching your criteria.</p>
          </div>
        )}

        <Pagination meta={meta} />
      </div>
    </section>
  );
}