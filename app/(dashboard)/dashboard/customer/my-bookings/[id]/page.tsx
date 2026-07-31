import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  StickyNote,
  Clock,
  Tag,
  UserCheck,
  CreditCard,
  Receipt,
  CheckCircle2,
} from "lucide-react";
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

  const techUser = booking.technician?.user;

  return (
    <main className="min-h-screen bg-background py-8 sm:py-10">
      {/* Container Max Width Changed to 7xl */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Top Back Link & Status Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/customer/my-bookings"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to My Bookings
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Booking ID: <strong className="font-mono text-foreground">{booking.id}</strong></span>
          </div>
        </div>

        {/* Success Banner */}
        {paymentQuery === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Payment processed successfully! It may take a few moments to update status.</span>
          </div>
        )}

        {/* 2-Column Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* ================= LEFT SIDE (Main Details - 2 Columns Wide) ================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Service & Booking Header Card */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-start border-b border-border pb-6">
                <div className="space-y-2">
                  {booking.service?.category?.name && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Tag className="h-3.5 w-3.5" /> {booking.service.category.name}
                    </span>
                  )}
                  <h1
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {booking.service?.title}
                  </h1>
                  {booking.service?.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {booking.service.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <StatusBadge status={booking.status} />
                </div>
              </div>

              {/* Schedule & Location Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Schedule & Service Details
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Scheduled Date */}
                  <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="rounded-xl bg-background p-2.5 text-accent shadow-sm">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Date & Time</p>
                      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                        {new Date(booking.scheduledAt).toLocaleString("en-BD", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Service Duration */}
                  {booking.service?.duration && (
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                      <div className="rounded-xl bg-background p-2.5 text-accent shadow-sm">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Estimated Duration</p>
                        <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                          {booking.service.duration} Mins
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {booking.address && (
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:col-span-2">
                      <div className="rounded-xl bg-background p-2.5 text-accent shadow-sm">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Service Address</p>
                        <p className="mt-0.5 text-xs sm:text-sm font-medium text-foreground">
                          {booking.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {booking.notes && (
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:col-span-2">
                      <div className="rounded-xl bg-background p-2.5 text-accent shadow-sm">
                        <StickyNote className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Customer Notes</p>
                        <p className="mt-0.5 text-xs sm:text-sm text-foreground">
                          {booking.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Section */}
              {(canCancel || canPay || canReview) && (
                <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                  <span className="text-xs text-muted-foreground">Available Actions</span>
                  <div className="flex items-center gap-3">
                    {canPay && (
                      <Link
                        href={`/dashboard/customer/my-bookings/${booking.id}/pay`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 shadow-sm"
                      >
                        <CreditCard className="h-3.5 w-3.5" /> Pay Now
                      </Link>
                    )}
                    {canReview && <ReviewModal bookingId={booking.id} />}
                    {canCancel && <CancelBookingButton bookingId={booking.id} />}
                  </div>
                </div>
              )}
            </div>

            {/* Review Section */}
            <ReviewSection review={booking.review} />
          </div>

          {/* ================= RIGHT SIDEBAR (Technician & Payment - 1 Column) ================= */}
          <div className="space-y-6">
            
            {/* Technician Profile Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assigned Expert
              </h3>
              <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted border border-border flex items-center justify-center font-bold text-foreground text-base">
                  {techUser?.profilePhoto ? (
                    <Image
                      src={techUser.profilePhoto}
                      alt={techUser.name || "Technician"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span>{techUser?.name?.[0] || "T"}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {techUser?.name || "Assigning Soon"}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 mt-1">
                    <UserCheck className="h-3 w-3" /> Professional
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Summary & Payment Info */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment Breakdown
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Base Service Fee</span>
                  <span className="font-semibold text-foreground">${booking.service?.price}</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <Receipt className="h-4 w-4 text-accent" /> Total Price
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    ${booking.service?.price}
                  </span>
                </div>
              </div>

              {/* Payment Info Sub-component */}
              <div className="border-t border-border pt-4">
                <PaymentInfo payment={booking.payment} />
              </div>
            </div>

            {/* Creation Date Card */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-center">
              <p className="text-[11px] text-muted-foreground">
                Booking Created on{" "}
                <span className="font-semibold text-foreground">
                  {new Date(booking.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}