import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Wrench, MapPin, Calendar, CreditCard, Hash } from "lucide-react";
import PaymentStatusBadge from "../../../_components/payment/PaymentStatusBadge";
import { getPaymentByIdAction } from "@/lib/api/payment";

interface PaymentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaymentDetailPage({ params }: PaymentDetailPageProps) {
  const { id } = await params;
  const payment = await getPaymentByIdAction(id);

  if (!payment) {
    notFound();
  }

  const booking = payment.booking;

  const rows = [
    { icon: Hash, label: "Transaction ID", value: payment.transactionId ?? payment.id },
    { icon: CreditCard, label: "Payment method", value: payment.method },
    { icon: Wrench, label: "Technician", value: booking?.technician?.user?.name ?? "—" },
    {
      icon: Calendar,
      label: "Scheduled for",
      value: booking?.scheduledAt
        ? new Date(booking.scheduledAt).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })
        : "—",
    },
    { icon: MapPin, label: "Service address", value: booking?.address ?? "—" },
  ];

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/dashboard/customer/payments"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to payment history
        </Link>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Payment</p>
              <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {booking?.service?.title ?? "Service payment"}
              </h1>
            </div>
            <PaymentStatusBadge status={payment.status} />
          </div>

          <p className="mt-4 text-3xl font-extrabold text-foreground">${payment.amount}</p>
          <p className="text-xs text-muted-foreground">
            Paid on {new Date(payment.createdAt).toLocaleDateString("en-BD", { dateStyle: "long" })}
          </p>

          <div className="mt-6 divide-y divide-border border-t border-border">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <row.icon className="h-3.5 w-3.5" />
                  {row.label}
                </span>
                <span className="max-w-[60%] text-right text-sm font-medium text-foreground">{row.value}</span>
              </div>
            ))}
          </div>

          {booking?.id && (
            <Link
              href={`/dashboard/customer/my-bookings/${booking.id}`}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:opacity-90"
            >
              View full booking
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}