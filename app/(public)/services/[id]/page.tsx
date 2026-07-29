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
import { getSingleService } from "../../_action/service";

interface ServiceDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
    const { id } = await params;
   
  const service = await getSingleService(id);

  if (!service || !service.id) {
    notFound();
  }

  const { title, description, price, duration, category, technician } = service;
  const user = technician?.user;

  // Duration Formatter
  const formatDuration = (mins?: number) => {
    if (!mins) return "N/A";
    if (mins < 60) return `${mins} mins`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours} hr ${remainingMins} mins` : `${hours} hrs`;
  };

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600 mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column (Details) - 2 Span */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Header Info Box */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Category Badge */}
                {category?.name && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800">
                    <Tag size={13} className="text-amber-600" />
                    {category.name}
                  </span>
                )}

                {/* Duration Badge */}
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  <Clock size={14} className="text-slate-500" />
                  <span>Est. Time: {formatDuration(duration)}</span>
                </div>
              </div>

              {/* Service Title */}
              <h1 className="mt-4 text-3xl font-extrabold text-[#0F1B2B] sm:text-4xl">
                {title}
              </h1>

              {/* Service Description */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-[#0F1B2B]">Service Overview</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 whitespace-pre-line">
                  {description || "No specific description provided for this service."}
                </p>
              </div>

              {/* Key Features / Included Items */}
              <div className="mt-8 rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h4 className="text-sm font-bold text-[#0F1B2B]">Service Guarantees:</h4>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Background verified expert
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    100% Satisfaction guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Transparent upfront pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Post-service support available
                  </li>
                </ul>
              </div>
            </div>

            {/* Technician Profile Card */}
            {technician && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Assigned Provider
                </h3>
                
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    {/* Profile Photo */}
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                      {user?.profilePhoto ? (
                        <Image
                          src={user.profilePhoto}
                          alt={user.name || "Technician"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-slate-400">
                          {user?.name?.charAt(0) || "T"}
                        </div>
                      )}
                    </div>

                    {/* Name & Rating */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-[#0F1B2B]">
                          {user?.name || "Professional Technician"}
                        </h4>
                        <ShieldCheck size={18} className="text-emerald-500" title="Verified Provider" />
                      </div>

                      <div className="mt-1 flex items-center gap-3 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          {technician.rating ? technician.rating.toFixed(1) : "5.0"}
                        </span>
                        <span>•</span>
                        <span>{technician.totalReviews || 0} Reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* View Full Profile Link */}
                  <Link
                    href={`/technicians/${technician.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <UserCheck size={14} />
                    <span>View Profile</span>
                  </Link>
                </div>

                {/* Additional Technician Specs */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="block text-slate-400 font-medium">Experience</span>
                    <span className="mt-0.5 block font-bold text-[#0F1B2B] text-sm">
                      {technician.experience ? `${technician.experience} Years` : "Experienced"}
                    </span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="block text-slate-400 font-medium">Location</span>
                    <span className="mt-0.5 block font-bold text-[#0F1B2B] text-sm truncate">
                      {technician.location || "On-site"}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-50 p-3">
                    <span className="block text-slate-400 font-medium">Status</span>
                    <span className="mt-0.5 block font-bold text-emerald-600 text-sm">
                      Available Today
                    </span>
                  </div>
                </div>

                {technician.bio && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    &quot;{technician.bio}&quot;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column (Sticky Booking Sidebar) - 1 Span */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Fixed Pricing
              </span>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0F1B2B]">
                  ৳{price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ service</span>
              </div>

              {/* Summary List */}
              <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-6 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-2 text-xs">
                    <Clock size={15} className="text-slate-400" />
                    Service Duration
                  </span>
                  <span className="font-semibold text-[#0F1B2B] text-xs">
                    {formatDuration(duration)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-2 text-xs">
                    <Briefcase size={15} className="text-slate-400" />
                    Service Category
                  </span>
                  <span className="font-semibold text-[#0F1B2B] text-xs truncate max-w-[120px]">
                    {category?.name || "General"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-2 text-xs">
                    <Calendar size={15} className="text-slate-400" />
                    Cancellation Policy
                  </span>
                  <span className="font-semibold text-emerald-600 text-xs">
                    Free (24h prior)
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <div className="mt-8 space-y-3">
            <Link
  href={`/booking?serviceId=${service.id}`} 
  className="flex w-full items-center justify-center rounded-2xl bg-[#0F1B2B] py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-amber-400 hover:text-[#0F1B2B]"
>
  Book Service Now
</Link>

                <p className="text-center text-[11px] font-medium text-slate-400">
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