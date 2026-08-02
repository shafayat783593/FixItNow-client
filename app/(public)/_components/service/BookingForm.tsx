"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarDays, Loader2, Clock } from "lucide-react";
import { BookingFormValues, bookingSchema } from "@/lib/validations/bookingSchema";
import { createBooking, getAvailableSlots, IAvailableSlot } from "@/lib/api/booking";
import { redirect, useRouter } from "next/navigation";

interface BookingFormProps {
  serviceId: string;
  technicianId: string;
  onSuccess?: () => void;
}

export default function BookingForm({ serviceId, technicianId, onSuccess }: BookingFormProps) {
  const [slots, setSlots] = useState<IAvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: "",
      slotStartTime: "",
      slotEndTime: "",
      address: "",
      note: "",
    },
  });

  const selectedDate = watch("date");
  const selectedStart = watch("slotStartTime");

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSlotError("");
      setValue("slotStartTime", "");
      setValue("slotEndTime", "");
      try {
        const result = await getAvailableSlots(technicianId, selectedDate, serviceId);
        console.log("Available slots for", selectedDate, ":", result);
        setSlots(result|| []);
        if (result.length === 0) {
          setSlotError("No available slots on this date.");
        }
      } catch (err) {
        setSlotError("Failed to load slots. Please try again.");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate, technicianId, serviceId, setValue]);

  const handleSlotClick = (slot: IAvailableSlot) => {
    setValue("slotStartTime", slot.startTime, { shouldValidate: true });
    setValue("slotEndTime", slot.endTime, { shouldValidate: true });
  };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      // combine date + selected slot start time into one ISO datetime
      const [hours, minutes] = values.slotStartTime.split(":").map(Number);
      const scheduledAt = new Date(values.date);
      scheduledAt.setHours(hours, minutes, 0, 0);

      await createBooking({
        serviceId,
        scheduledAt: scheduledAt.toISOString(),
        address: values.address,
        notes: values.note,
      });

      toast.success("Booking request sent successfully!");
      router.push("/dashboard/customer/my-bookings");
      // reset();
      // setSlots([]);
      // onSuccess?.();
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
            min={new Date().toISOString().split("T")[0]}
            {...register("date")}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
        </div>
        {errors.date && (
          <p className="mt-1 text-xs font-semibold text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Slot picker */}
      {selectedDate && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Available Time Slots
          </label>

          {loadingSlots ? (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" />
              Loading slots...
            </div>
          ) : slots.length > 0 ? (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {slots.map((slot) => {
                const isSelected = selectedStart === slot.startTime;
                return (
                  <button
                    key={slot.startTime}
                    type="button"
                    onClick={() => handleSlotClick(slot)}
                    className={`flex items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background text-foreground hover:border-accent"
                    }`}
                  >
                    <Clock size={12} />
                    {slot.startTime}
                  </button>
                );
              })}
            </div>
          ) : (
            slotError && (
              <p className="mt-2 text-xs font-semibold text-destructive">{slotError}</p>
            )
          )}

          {errors.slotStartTime && (
            <p className="mt-1 text-xs font-semibold text-destructive">
              {errors.slotStartTime.message}
            </p>
          )}
        </div>
      )}

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