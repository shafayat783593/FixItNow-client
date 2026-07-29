// components/ServiceCard.tsx
import React from "react";
import Link from "next/link";
import { Clock, Tag, ArrowRight, ShieldCheck } from "lucide-react";

export interface ServiceData {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  // Format duration into readable hours/mins
  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} mins`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours} hr ${remainingMins} mins` : `${hours} hrs`;
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl">
      <div>
        {/* Category Badge & Duration Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-800">
            <Tag size={12} className="text-amber-600" />
            Service
          </span>

          <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <Clock size={13} className="text-slate-400" />
            <span>{formatDuration(service.duration)}</span>
          </div>
        </div>

        {/* Service Title */}
        <h3 className="mt-4 text-xl font-bold text-[#0F1B2B] transition-colors group-hover:text-amber-600">
          {service.title}
        </h3>

        {/* Service Description */}
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
      </div>

      {/* Bottom Section: Price & Booking Action */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Estimated Price
            </span>
            <span className="text-2xl font-black text-[#0F1B2B]">
              ৳{service.price.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F1B2B] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-amber-400 hover:text-[#0F1B2B]"
          >
            <span>Book Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Trust Indicator */}
        <div className="mt-3.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <ShieldCheck size={13} />
          <span>FixItNow Verified Standard</span>
        </div>
      </div>

      {/* Top Hover Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}