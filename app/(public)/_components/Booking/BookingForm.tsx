"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, AlertCircle, Loader2 } from "lucide-react";
import { getMe } from "@/hooks/getMe";
import { createBookingAction } from "../../_action/booking";

interface BookingFormProps {
  serviceId: string;
}

 type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

const myBookingsPathByRole: Record<Role, string> = {
  CUSTOMER: "/dashboard/customer/my-bookings",
  TECHNICIAN: "/dashboard/technician/bookings",
  ADMIN: "/dashboard/admin/bookings",
};

export default function BookingForm({ serviceId }: BookingFormProps) {
  const router = useRouter();

  const [userRole, setUserRole] = useState<Role>("CUSTOMER");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // ইউজারের রোল আলাদাভাবে fetch হবে, ফর্ম রেন্ডার ব্লক করবে না
  useEffect(() => {
    let mounted = true;
    getMe()
      .then((user) => {
        if (mounted && user?.role) setUserRole(user.role as Role);
      })
      .catch(() => {
        // role fetch fail করলে CUSTOMER ফলব্যাক থাকবে
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedDate || !selectedTime) {
      setErrorMsg("Please select a date and preferred time slot.");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Please enter your complete service location address.");
      return;
    }

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
        router.push(myBookingsPathByRole[userRole] ?? myBookingsPathByRole.CUSTOMER);
      } else {
        setErrorMsg(res?.message || "Failed to place booking request. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <div>
        <h2 className="text-2xl font-extrabold text-[#0F1B2B]">Schedule Your Booking</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select date, time, and service location details below.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2B] mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#0F1B2B] shadow-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          />
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
  );
}