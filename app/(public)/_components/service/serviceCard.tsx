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
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} mins`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours} hr ${remainingMins} mins` : `${hours} hrs`;
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent-foreground">
            <Tag size={12} className="text-accent" />
            Service
          </span>

          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock size={13} className="text-muted-foreground" />
            <span>{formatDuration(service.duration)}</span>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
          {service.title}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Estimated Price
            </span>
            <span className="text-2xl font-black text-foreground">
              ${service.price.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Trust Indicator */}
        <div className="mt-3.5 flex items-center gap-1 text-[11px] font-semibold text-success">
          <ShieldCheck size={13} />
          <span>FixItNow Verified Standard</span>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-1 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}