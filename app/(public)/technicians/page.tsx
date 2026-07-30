import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { getAllTechnicians } from '../_action/technician';
import { TechnicianCard } from '../_components/technicianCard';
import { Pagination } from '../_components/pagenation';
import { UniversalSearchBar } from '../../../components/shared/UniversalSearchBar';


export default async function TechniciansSection({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>;}) {
  const query = await searchParams;

    console.log(query," serch quary ....data.........")
  const page = query?.page ? Number(query.page) : 1;
  const searchItem = typeof query?.searchItem === 'string' ? query.searchItem : '';

  // API Call with Query Params
  const res = await getAllTechnicians({searchItem,page,limit: 8, });
console.log(res,"technicilan.............................")
  const technicians = res?.data || [];
  const meta = res?.meta || { page: 1, limit: 8, total: technicians.length, totalPages: 1 };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1">
              <Users size={14} className="text-amber-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Top Rated Experts
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0F1B2B] sm:text-4xl">
              Meet Our Featured Technicians
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Verified professionals ready to handle your repair and maintenance needs with transparent pricing.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/technicians"
            className="hidden items-center gap-2 rounded-xl border-2 border-[#0F1B2B] bg-[#0F1B2B] px-6 py-3 text-sm font-bold text-white transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-[#0F1B2B] md:inline-flex"
          >
            <span>Show All Technicians</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          {searchItem && (
            <p className="text-sm text-slate-500">
              Showing results for: <span className="font-semibold text-[#0F1B2B]">&quot;{searchItem}&quot;</span>
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {technicians.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicians.map((tech: any) => (
              <TechnicianCard key={tech.id} technician={tech} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500 font-medium">No technicians found matching your criteria.</p>
          </div>
        )}

        {/* Pagination Component */}
        <Pagination meta={meta} />

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/technicians"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F1B2B] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95"
          >
            <span>Show All Technicians</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}