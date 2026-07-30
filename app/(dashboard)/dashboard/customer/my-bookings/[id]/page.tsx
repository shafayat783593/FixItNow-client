import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, StickyNote } from "lucide-react";
import { getBookingByIdAction } from "@/app/(public)/_action/booking";
import StatusBadge from "../../../_components/Booking/BookingStatusBadge";
import CancelBookingButton from "../../../_components/Booking/CancelBookingButton";


export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getBookingByIdAction(id);
  const booking = res?.data;

  if (!booking) notFound();

  const canCancel = ["REQUESTED", "ACCEPTED"].includes(booking.status);

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-6">
        <Link href="/dashboard/customer/my-bookings" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent">
          <ArrowLeft size={16} /> Back to my bookings
        </Link>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {booking.service?.category?.name ?? "Service"}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {booking.service?.title}
              </h1>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="mt-6 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(booking.scheduledAt).toLocaleString("en-BD", { dateStyle: "full", timeStyle: "short" })}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {booking.address}
            </span>
            {booking.notes && (
              <span className="flex items-start gap-2">
                <StickyNote className="mt-0.5 h-4 w-4 shrink-0" /> {booking.notes}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
              {booking.technician?.user?.profilePhoto && (
                <Image src={booking.technician.user.profilePhoto} alt={booking.technician.user.name} fill className="object-cover" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">{booking.technician?.user?.name}</p>
              <p className="text-[13px] text-muted-foreground">Assigned technician</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">৳{booking.service?.price}</span>
          </div>

          {canCancel && (
            <div className="mt-6 flex justify-end">
              <CancelBookingButton bookingId={booking.id} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}