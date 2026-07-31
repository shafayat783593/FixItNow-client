import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Tag,
  Star,
  ShieldCheck,
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  UserCheck
} from "lucide-react";
import BookingModal from "../../_components/service/BookingModal";
import { getSingleService } from "@/lib/api/service";

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const { id } = await params;

  const service = await getSingleService(id);
  console.log("service................................",service)

  if (!service || !service.id) {
    notFound();
  }

  const { title, description, price, duration, category, technician } = service;
  const user = technician?.user;

  const formatDuration = (mins?: number) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${mins} mins`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours} hr ${remainingMins} mins` : `${hours} hrs`;
  };

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">

            {/* Header Info Box */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {category?.name && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent-foreground">
                    <Tag size={13} className="text-accent" />
                    {category.name}
                  </span>
                )}

                <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <Clock size={14} />
                  <span>Est. Time: {formatDuration(duration)}</span>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">
                {title}
              </h1>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-lg font-bold text-foreground">Service Overview</h3>
                <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                  {description || "No specific description provided for this service."}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-muted/50 p-5">
                <h4 className="text-sm font-bold text-foreground">Service Guarantees:</h4>
                <ul className="mt-3 grid grid-cols-1 gap-3 text-xs font-medium text-foreground/80 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    Background verified expert
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    100% Satisfaction guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    Transparent upfront pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    Post-service support available
                  </li>
                </ul>
              </div>
            </div>

            {/* Technician Profile Card */}
            {technician && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
                  Assigned Provider
                </h3>

                <div className="mt-4 flex flex-col items-start justify-between gap-6 border-b border-border pb-6 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border bg-muted">
                      {user?.profilePhoto ? (
                        <Image
                          src={user.profilePhoto}
                          alt={user.name || "Technician"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-muted-foreground">
                          {user?.name?.charAt(0) || "T"}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-foreground">
                          {user?.name || "Professional Technician"}
                        </h4>
                        <ShieldCheck size={18} className="text-success" title="Verified Provider" />
                      </div>

                      <div className="mt-1 flex items-center gap-3 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1 font-bold text-accent">
                          <Star size={14} className="fill-accent text-accent" />
                          {technician.rating ? technician.rating.toFixed(1) : "5.0"}
                        </span>
                        <span>•</span>
                        <span>{technician.totalReviews || 0} Reviews</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/technicians/${technician.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted"
                  >
                    <UserCheck size={14} />
                    <span>View Profile</span>
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
                  <div className="rounded-xl bg-muted p-3">
                    <span className="block font-medium text-muted-foreground">Experience</span>
                    <span className="mt-0.5 block text-sm font-bold text-foreground">
                      {technician.experience ? `${technician.experience} Years` : "Experienced"}
                    </span>
                  </div>

                  <div className="rounded-xl bg-muted p-3">
                    <span className="block font-medium text-muted-foreground">Location</span>
                    <span className="mt-0.5 block truncate text-sm font-bold text-foreground">
                      {technician.location || "On-site"}
                    </span>
                  </div>

                  <div className="col-span-2 rounded-xl bg-muted p-3 sm:col-span-1">
                    <span className="block font-medium text-muted-foreground">Status</span>
                    <span className="mt-0.5 block text-sm font-bold text-success">
                      Available Today
                    </span>
                  </div>
                </div>

                {technician.bio && (
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    &quot;{technician.bio}&quot;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-border bg-card p-6 shadow-md sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Fixed Pricing
              </span>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">
                  ${price.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-muted-foreground">/ service</span>
              </div>

              <div className="mt-6 space-y-3.5 border-t border-border pt-6 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2 text-xs">
                    <Clock size={15} />
                    Service Duration
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {formatDuration(duration)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2 text-xs">
                    <Briefcase size={15} />
                    Service Category
                  </span>
                  <span className="max-w-[120px] truncate text-xs font-semibold text-foreground">
                    {category?.name || "General"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2 text-xs">
                    <Calendar size={15} />
                    Cancellation Policy
                  </span>
                  <span className="text-xs font-semibold text-success">
                    Free (24h prior)
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <BookingModal serviceId={service.id} technicianId={ service.technicianId} />

                <p className="text-center text-[11px] font-medium text-muted-foreground">
                  No hidden charges. Pay after service completion.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}