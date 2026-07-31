import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, StickyNote, Clock, Tag } from "lucide-react";
import StatusBadge from "../../../_components/Booking/BookingStatusBadge";
import CancelBookingButton from "../../../_components/Booking/CancelBookingButton";

import { getBookingByIdAction } from "@/lib/api/booking";
import PaymentInfo from "../../../_components/payment/PaymentInfo";
import ReviewSection from "../../../_components/Booking/ReviewSection";
import ReviewModal from "../../../_components/review/ReviewModal";

export default async function BookingDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const { id } = await params;
  const { payment: paymentQuery } = await searchParams;

  const res = await getBookingByIdAction(id);
  const booking = res?.data;

  if (!booking) notFound();

  const canCancel = ["REQUESTED", "ACCEPTED"].includes(booking.status);
  const canPay = booking.status === "ACCEPTED";
  const canReview = booking.status === "COMPLETED" && !booking.review;

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/dashboard/customer/my-bookings"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to my bookings
        </Link>

        {paymentQuery === "success" && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-700">
            Payment processing — this may take a moment to reflect.
          </div>
        )}

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              {booking.service?.category?.name && (
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <Tag className="h-3 w-3" /> {booking.service.category.name}
                </p>
              )}
              <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {booking.service?.title}
              </h1>
              {booking.service?.description && (
                <p className="mt-1 text-[13px] text-muted-foreground">{booking.service.description}</p>
              )}
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="mt-6 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(booking.scheduledAt).toLocaleString("en-BD", { dateStyle: "full", timeStyle: "short" })}
            </span>

            {booking.service?.duration && (
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {booking.service.duration} mins
              </span>
            )}

            {booking.address && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {booking.address}
              </span>
            )}

            {booking.notes && (
              <span className="flex items-start gap-2">
                <StickyNote className="mt-0.5 h-4 w-4 shrink-0" /> {booking.notes}
              </span>
            )}

            <span className="text-[12px] text-muted-foreground/70">
              Requested on {new Date(booking.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
              {booking.technician?.user?.profilePhoto && (
                <Image
                  src={booking.technician.user.profilePhoto}
                  alt={booking.technician.user.name}
                  fill
                  className="object-cover"
                />
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

          <PaymentInfo payment={booking.payment} />
          <ReviewSection review={booking.review} />

          {(canCancel || canPay || canReview) && (
            <div className="mt-6 flex items-center justify-end gap-2">
              {canPay && (
                <Link
                  href={`/dashboard/customer/my-bookings/${booking.id}/pay`}
                  className="rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Pay now
                </Link>
              )}
              {canReview && <ReviewModal bookingId={booking.id} />}
              {canCancel && <CancelBookingButton bookingId={booking.id} />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}