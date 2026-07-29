// components/TechnicianCard.tsx
import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Briefcase, CheckCircle2, Calendar } from 'lucide-react';

export interface Service {
  id: string;
  name?: string;
  price: number;
}

export interface TechnicianData {
  id: string;
  bio?: string | null;
  location?: string | null;
  rating?: number | null;
  experience?: number | null;
  isVerified?: boolean;
  user?: {
    name: string;
    image?: string | null;
  };
  services: Service[];
  availability?: Array<{ day: string; isAvailable: boolean }>;
}

interface TechnicianCardProps {
  technician: TechnicianData;
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
  const primaryService = technician.services?.[0];
  const startingPrice = primaryService ? primaryService.price : null;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl">
      {/* Top Section: Avatar & Header Meta */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="relative flex items-center gap-3.5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              {technician.user?.image ? (
                <img
                  src={technician.user.image}
                  alt={technician.user.name || 'Technician'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-[#0F1B2B]">
                  {technician.user?.name ? technician.user.name.charAt(0) : 'T'}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-[#0F1B2B] transition-colors group-hover:text-amber-600">
                  {technician.user?.name || 'Professional Technician'}
                </h3>
                {technician.isVerified && (
                  <CheckCircle2 size={16} className="text-amber-500 fill-amber-100" />
                )}
              </div>
              {technician.location && (
                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-slate-500">
                  <MapPin size={13} className="shrink-0 text-slate-400" />
                  {technician.location}
                </p>
              )}
            </div>
          </div>

          {/* Rating Badge */}
          {technician.rating != null && (
            <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span>{technician.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Bio / Description */}
        {technician.bio && (
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {technician.bio}
          </p>
        )}

        {/* Tags / Meta Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {technician.experience != null && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <Briefcase size={12} className="text-slate-500" />
              {technician.experience} Yrs Exp.
            </span>
          )}
          {technician.availability && technician.availability.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <Calendar size={12} className="text-emerald-500" />
              Available
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing & Action */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Starting at
          </span>
          <span className="text-lg font-extrabold text-[#0F1B2B]">
            {startingPrice != null ? `$${startingPrice}` : 'Quote on Request'}
          </span>
        </div>

        <Link
          href={`/technicians/${technician.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-[#0F1B2B] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-amber-400 hover:text-[#0F1B2B]"
        >
          View Profile
        </Link>
      </div>

      {/* Top Border Highlight */}
      <div className="absolute inset-x-0 top-0 h-1 bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}