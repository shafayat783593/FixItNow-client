import Link from "next/link";
import { CreditCard, Eye } from "lucide-react";
import PaymentStatusBadge from "../../_components/payment/PaymentStatusBadge";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { getMyPaymentsAction } from "@/lib/api/payment";
import { PaymentFilter } from "../../_components/Booking/PaymentFilter";

interface PaymentsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const { status, page } = await searchParams;
  const { data: payments, meta } = await getMyPaymentsAction({ status, page: page ?? 1, limit: 10 });

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Payment history
        </h1>

        <div className="mt-5 flex justify-end">
          <PaymentFilter />
        </div>

        {payments.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <CreditCard className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No payments match your filter.</p>
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
                  <th className="px-4 py-3 text-right font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p: any) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{p.booking?.service?.title}</span>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{p.method}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {new Date(p.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">${p.amount}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/customer/payments/${p.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold text-foreground transition hover:bg-muted"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination meta={meta} />
      </div>
    </main>
  );
}