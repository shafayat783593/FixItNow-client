import Link from "next/link";
import { CreditCard } from "lucide-react";
import PaymentStatusBadge from "../../_components/payment/PaymentStatusBadge";
import { getMyPaymentsAction } from "@/lib/api/payment";


export default async function PaymentsPage() {
  const { data: payments } = await getMyPaymentsAction();

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Payment history
        </h1>

        {payments.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <CreditCard className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">You haven&apos;t made any payments yet.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Method</th>
                  <th className="hidden px-4 py-3 font-semibold md:table-cell">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p: any) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/customer/my-bookings/${p.booking.id}`}
                        className="font-medium text-foreground hover:text-accent"
                      >
                        {p.booking?.service?.title}
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{p.method}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {new Date(p.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">৳{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}