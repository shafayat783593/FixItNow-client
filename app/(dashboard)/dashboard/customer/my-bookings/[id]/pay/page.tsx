import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Calendar, User, Receipt, Lock } from "lucide-react";
import CheckoutButton from "@/app/(dashboard)/dashboard/_components/payment/CheckoutButton";
import { getBookingByIdAction } from "@/lib/api/booking";

export default async function PayBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { id } = await params;
  const { canceled } = await searchParams;

  const res = await getBookingByIdAction(id);
  const booking = res?.data;

  if (!booking) notFound();

  if (booking.status !== "ACCEPTED") {
    return (
      <main className="mx-auto max-w-md px-6 py-20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Payment Not Available</h2>
        <p className="mt-2 text-xs text-muted-foreground">
          This booking is currently not ready for payment. (Current status: <strong className="uppercase">{booking.status}</strong>)
        </p>
        <Link
          href="/dashboard/customer/my-bookings"
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to My Bookings
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        
        {/* Navigation Link */}
        <div className="mb-6">
          <Link
            href={`/dashboard/customer/my-bookings/${booking.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Cancel & Return to Details
          </Link>
        </div>

        {/* Cancel Warning Notice */}
        {canceled && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-xs font-medium text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Previous payment was canceled or failed. You can select a method and try again below.</span>
          </div>
        )}

        {/* Checkout Card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          
          {/* Card Header */}
          <div className="border-b border-border bg-muted/20 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Checkout Summary
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Lock className="h-3 w-3" /> Ready
              </span>
            </div>

            <h1
              className="mt-3 text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {booking.service?.title}
            </h1>

            {/* Quick Overview Badges */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1">
                <User className="h-3.5 w-3.5 text-accent" />
                {booking.technician?.user?.name || "Assigned Expert"}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {new Date(booking.scheduledAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Price Breakdown */}
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Service Charge</span>
                <span>৳{booking.service?.price}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Tax & Platform Fee</span>
                <span>৳0</span>
              </div>
              <div className="border-t border-border pt-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Receipt className="h-4 w-4 text-accent" /> Total Payable
                </span>
                <span className="text-2xl font-bold text-foreground">
                  ৳{booking.service?.price}
                </span>
              </div>
            </div>

            {/* Checkout Options & Button Component */}
            <CheckoutButton bookingId={booking.id} />

          </div>
        </div>

      </div>
    </main>
  );
}