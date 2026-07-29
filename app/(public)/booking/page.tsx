"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Loader2, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { createBookingAction } from "../_action/booking";
import { getSingleService } from "../_action/service";


function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("serviceId");

  // States
  const [service, setService] = useState<any>(null);
  const [loadingService, setLoadingService] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Inputs
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch Selected Service Details
  useEffect(() => {
    async function fetchService() {
      if (!serviceId) {
        setLoadingService(false);
        return;
      }
      try {
          const res = await getSingleService(serviceId);
          console.log(res)
        if (res) {
          setService(res?.data || res);
        }
      } catch (err) {
        console.error("Failed to fetch service info:", err);
      } finally {
        setLoadingService(false);
      }
    }
    fetchService();
  }, [serviceId]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!serviceId) {
      setErrorMsg("No service selected for booking.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setErrorMsg("Please select a date and preferred time slot.");
      return;
    }

    if (!address.trim()) {
      setErrorMsg("Please enter your complete service location address.");
      return;
    }

    // Combine Date and Time into ISO string
    const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();

    setIsSubmitting(true);

    try {
      const res = await createBookingAction({
        serviceId,
        scheduledAt,
        address,
        notes,
      });

      if (res?.success || res?.id) {
        // Redirect to My Bookings or Success Page
        router.push(`/my-bookings?success=true`);
      } else {
        setErrorMsg(res?.message || "Failed to place booking request. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Left Column: Booking Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F1B2B]">Schedule Your Booking</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select date, time, and service location details below.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">
              <AlertCircle size={18} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Schedule Date & Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2B] mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#0F1B2B] shadow-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2B] mb-2">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#0F1B2B] shadow-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Service Location Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2B] mb-2">
              Full Service Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Apartment no, Street address, Area, City..."
              required
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-[#0F1B2B] shadow-sm transition-all placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2B] mb-2">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe specific problems or instructions for the technician..."
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-[#0F1B2B] shadow-sm transition-all placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0F1B2B] font-bold text-white shadow-lg transition-all hover:bg-amber-400 hover:text-[#0F1B2B] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin text-amber-500" />
                <span>Confirming Booking...</span>
              </>
            ) : (
              <span>Confirm & Place Order</span>
            )}
          </button>
        </form>
      </div>

      {/* Right Column: Order Summary Card */}
      <div className="lg:col-span-1">
        <div className="sticky top-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Booking Summary
          </h3>

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
        {/* Top Header Navigation */}
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
          <BookingFormContent />
        </Suspense>
      </div>
    </main>
  );
}