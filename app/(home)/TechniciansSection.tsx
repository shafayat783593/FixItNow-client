// app/technicians/page.tsx or app/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { TechnicianCard } from '../(public)/_components/technician/technicianCard';
import { getAllTechnicians } from '@/lib/api/technician';


export default async function TechniciansSection() {
  const res = await getAllTechnicians();
  
    
  const techniciansList = res?.data || res || [];
  const technicians = Array.isArray(techniciansList) 
    ? techniciansList.slice(0, 4) 
    : [];

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
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
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

          {/* Desktop CTA Button */}
          <Link
            href="/technicians"
            className="hidden items-center gap-2 rounded-xl border-2 border-[#0F1B2B] bg-[#0F1B2B] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-amber-400 hover:text-[#0F1B2B] hover:border-amber-400 md:inline-flex"
          >
            <span>Show All Technicians</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cards Grid */}
        {technicians.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicians.map((tech: any) => (
              <TechnicianCard key={tech.id || tech._id} technician={tech} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-500 font-medium">No technicians found at the moment.</p>
          </div>
        )}

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