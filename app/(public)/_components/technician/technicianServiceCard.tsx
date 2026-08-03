import React from 'react';
import Link from 'next/link';
import { Wrench, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function ServiceCard({ service }: { service: any }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
        {service?.images?.[0] ? (
          <Image
            src={service.images[0]}
            alt={service.title}
            fill
            className="h-full w-full rounded-xl object-cover"
            sizes="48px"
          />
        ) : (
          <Wrench size={20} />
        )}
      </div>

      <h4 className="mt-4 text-base font-bold text-foreground">{service.title}</h4>
      {service?.description && (
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        {service?.price != null && (
          <span className="text-lg font-extrabold text-foreground">${service.price}</span>
        )}
        <span className="flex items-center gap-1 text-sm font-semibold text-accent-foreground">
          Details
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}