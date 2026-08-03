"use client";

import { useRouter } from "next/navigation";
import { Calendar, ChevronRight, CreditCard, Ban, Loader2 } from "lucide-react";
import StatusBadge from "./BookingStatusBadge";
import { IBooking, BookingStatus } from "./BookingType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { cancelBookingAction } from "@/lib/api/booking"; 

export default function BookingsTable({bookings: initialBookings,}: {bookings: IBooking[];}) {
  const router = useRouter();
  const [bookings, setBookings] = useState<IBooking[]>(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const goToDetails = (id: string) => {
    router.push(`/dashboard/customer/my-bookings/${id}`);
  };

  const handleCancel = async (e: React.MouseEvent, bookingId: string) => {
    e.stopPropagation(); 

    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setLoadingId(bookingId);
    try {
      await cancelBookingAction(bookingId);
      toast.success("Booking cancelled successfully");
      

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" as BookingStatus } : b))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel booking");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePayment = (e: React.MouseEvent, bookingId: string) => {
    e.stopPropagation(); 
    router.push(`/dashboard/customer/my-bookings/${bookingId}/pay`);
                     

  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-[11px] uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Service</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Technician</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Scheduled</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Price</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
            <th className="w-10 px-2 py-3" aria-hidden />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {bookings.map((b) => (
            <tr
              key={b.id}
              onClick={() => goToDetails(b.id)}
              onKeyDown={(e) => e.key === "Enter" && goToDetails(b.id)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${b.service?.title}`}
              className="group cursor-pointer transition hover:bg-muted/40 focus:bg-muted/50 focus:outline-none"
            >
              {/* Service Title */}
              <td className="px-4 py-3.5">
                <p className="font-medium text-foreground">{b.service?.title}</p>
                {b.service?.category?.name && (
                  <p className="text-[12px] text-muted-foreground">{b.service?.category?.name}</p>
                )}
              </td>

              {/* Technician Name */}
              <td className="hidden px-4 py-3.5 text-muted-foreground sm:table-cell">
                {b.technician?.user?.name ?? "—"}
              </td>

              {/* Scheduled Date */}
              <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(b.scheduledAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                </span>
              </td>

              {/* Status Badge */}
              <td className="px-4 py-3.5">
                <StatusBadge status={b.status} />
              </td>

              {/* Price */}
              <td className="px-4 py-3.5 text-right font-semibold text-foreground">
                ${b.service?.price}
              </td>

              {/* Action Buttons */}
              <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-2">
                  {b.status === "REQUESTED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 h-8 px-2.5 text-xs"
                      disabled={loadingId === b.id}
                      onClick={(e) => handleCancel(e, b.id)}
                    >
                      {loadingId === b.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <>
                          <Ban className="mr-1 h-3 w-3" /> Cancel
                        </>
                      )}
                    </Button>
                  )}

                  {b.status === "ACCEPTED" && (
                    <Button 
                      
                      size="sm"
                      className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90 h-8 px-2.5 text-xs font-semibold"
                      onClick={(e) => handlePayment(e, b.id)}
                    >
                      <CreditCard className="mr-1 h-3 w-3" /> Pay Now
                    </Button>
                  )}
                </div>
              </td>

              {/* Arrow Indicator */}
              <td className="px-2 py-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors">
                <ChevronRight className="h-4 w-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}