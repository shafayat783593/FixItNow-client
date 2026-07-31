import { CreditCard, ShieldCheck } from "lucide-react";

interface Payment {
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  provider?: string | null;
  paidAt?: string | null;
}

export default function PaymentInfo({ payment }: { payment: Payment | null }) {
  if (!payment) return null;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <CreditCard className="h-3.5 w-3.5" /> Payment
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-[13px]">
        <div>
          <p className="text-muted-foreground">Amount</p>
          <p className="font-semibold text-foreground">৳{payment.amount}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className="flex items-center gap-1 font-semibold text-foreground">
            {payment.status === "COMPLETED" && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />}
            {payment.status}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Method</p>
          <p className="font-semibold text-foreground">{payment.method}</p>
        </div>
        {payment.paidAt && (
          <div>
            <p className="text-muted-foreground">Paid at</p>
            <p className="font-semibold text-foreground">
              {new Date(payment.paidAt).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        )}
        <div className="col-span-2">
          <p className="text-muted-foreground">Transaction ID</p>
          <p className="truncate font-mono text-[11px] text-foreground">{payment.transactionId}</p>
        </div>
      </div>
    </div>
  );
}