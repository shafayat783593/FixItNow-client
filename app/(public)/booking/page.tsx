"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, ShieldCheck, Loader2, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getSingleService } from "../_action/service";
import BookingForm from "../_components/Booking/BookingForm";




function BookingPageContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const [service, setService] = useState<any>(null);
  const [loadingService, setLoadingService] = useState(true);

  useEffect(() => {
    if (!serviceId) {
      setLoadingService(false);
      return;
    }
    let mounted = true;
    getSingleService(serviceId)
      .then((res) => {
        if (mounted) setService(res?.data || res);
      })
      .catch((err) => console.error("Failed to fetch service info:", err))
      .finally(() => {
        if (mounted) setLoadingService(false);
      });
    return () => {
      mounted = false;
    };
  }, [serviceId]);

  if (loadingService) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!serviceId || !service) {
    return (
      <div className="mx-auto max-w-lg my-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <AlertCircle size={40} className="mx-auto text-amber-500" />
        <h2 className="mt-4 text-xl font-bold text-[#0F1B2B]">No Service Selected</h2>
        <p className="mt-2 text-sm text-slate-500">
          Please select a service first to proceed with booking.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F1B2B] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-amber-400 hover:text-[#0F1B2B]"
        >
          <ArrowLeft size={16} />
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <BookingForm serviceId={serviceId} />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">Booking Summary</h3>

          <div className="mt-4 border-b border-slate-100 pb-4">
            <h4 className="text-xl font-bold text-[#0F1B2B]">{service.title}</h4>
            {service.category?.name && (
              <span className="mt-1 inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {service.category.name}
              </span>
            )}
          </div>

          <div className="mt-4 space-y-3 text-xs font-medium text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock size={14} /> Est. Duration
              </span>
              <span className="font-bold text-[#0F1B2B]">{service.duration || 60} mins</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck size={14} className="text-emerald-500" /> Service Fee
              </span>
              <span className="text-lg font-black text-[#0F1B2B]">
                ৳{service.price?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-50/60 p-4 border border-amber-100 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 size={15} className="text-amber-600" /> Pay After Service
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800/80">
              You will only pay after the technician completes the requested service successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-amber-600 mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Services</span>
        </Link>

        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          }
        >
          <BookingPageContent />
        </Suspense>
      </div>
    </main>
  );
}