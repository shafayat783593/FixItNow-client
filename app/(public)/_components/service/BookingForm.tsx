"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { BookingFormValues, bookingSchema } from "@/lib/validations/bookingSchema";
import { createBooking } from "@/lib/api/booking";



interface BookingFormProps {
  serviceId: string;
  onSuccess?: () => void;
}

export default function BookingForm({ serviceId, onSuccess }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "",
      time: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    try {
      await createBooking({ serviceId, ...values });
      toast.success("Booking request sent successfully!");
      reset();
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create booking. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Date */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Preferred Date
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:border-accent">
          <CalendarDays size={16} className="text-muted-foreground" />
          <input
            type="date"
            {...register("date")}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        </div>
        {errors.date && (
          <p className="mt-1 text-xs font-semibold text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Preferred Time
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:border-accent">
          <Clock size={16} className="text-muted-foreground" />
          <input
            type="time"
            {...register("time")}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        </div>
        {errors.time && (
          <p className="mt-1 text-xs font-semibold text-destructive">{errors.time.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Service Address
        </label>
        <input
          type="text"
          {...register("address")}
          placeholder="House, road, area..."
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
        />
        {errors.address && (
          <p className="mt-1 text-xs font-semibold text-destructive">{errors.address.message}</p>
        )}
      </div>

      {/* Note */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Note (optional)
        </label>
        <textarea
          {...register("note")}
          rows={3}
          placeholder="Anything the technician should know..."
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
        />
        {errors.note && (
          <p className="mt-1 text-xs font-semibold text-destructive">{errors.note.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Booking...
          </>
        ) : (
          "Confirm Booking"
        )}
      </button>
    </form>
  );
}