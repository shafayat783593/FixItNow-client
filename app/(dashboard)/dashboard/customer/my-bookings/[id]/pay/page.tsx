import { notFound } from "next/navigation";
import { AlertTriangle, ShieldCheck } from "lucide-react";
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
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-3 text-sm text-muted-foreground">
          This booking is not ready for payment (status: {booking.status}).
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-md px-6">
        {canceled && (
          <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive">
            Payment was canceled. You can try again below.
          </div>
        )}

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Payment</p>
          <h1 className="mt-1 text-xl font-bold text-foreground">{booking.service?.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">with {booking.technician?.user?.name}</p>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-2xl font-bold text-foreground">৳{booking.service?.price}</span>
          </div>

          <div className="mt-6">
            <CheckoutButton bookingId={booking.id} />
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}