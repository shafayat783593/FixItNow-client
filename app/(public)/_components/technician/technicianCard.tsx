import React from 'react';
import Link from 'next/link';
import { Star, MapPin, BadgeCheck, Briefcase } from 'lucide-react';

interface TechnicianCardProps {
  technician: any;
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
  const name = technician?.user?.name || 'Technician';
  const avatar = technician?.user?.avatar || technician?.user?.image;

  return (
    <Link
      href={`/technicians/${technician.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-28 items-end bg-primary p-4">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative flex h-20 w-20 translate-y-10 items-center justify-center overflow-hidden rounded-2xl border-4 border-card bg-muted text-2xl font-bold text-muted-foreground shadow-md">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-12">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-foreground">{name}</h3>
            <BadgeCheck size={16} className="text-accent" />
          </div>
          {technician?.location && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} />
              {technician.location}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Star size={14} className="fill-accent text-accent" />
            {technician?.rating?.toFixed?.(1) ?? '0.0'}
            <span className="font-normal text-muted-foreground">
              ({technician?.totalReviews ?? 0})
            </span>
          </span>
          {technician?.experience != null && (
            <span className="flex items-center gap-1">
              <Briefcase size={12} />
              {technician.experience}y exp
            </span>
          )}
        </div>

        {technician?.bio && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{technician.bio}</p>
        )}

        <span className="mt-auto inline-flex items-center justify-center rounded-xl border border-border py-2 text-sm font-semibold text-foreground transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          View Profile
        </span>
      </div>
    </Link>
  );
}