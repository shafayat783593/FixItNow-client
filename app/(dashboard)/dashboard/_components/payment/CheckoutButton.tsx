"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { createCheckoutSessionAction } from "@/lib/api/payment";

export default function CheckoutButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
  setError("");
  setLoading(true);
  try {
    const res = await createCheckoutSessionAction(bookingId);
    const paymentUrl = res?.data?.paymentUrl;
console.log("payment usrl",res)
    if (!paymentUrl) {
      setError(res?.message ?? "Could not start checkout.");
      setLoading(false);
      return;
    }
    window.location.href = paymentUrl;
  } catch {
    setError("Something went wrong. Try again.");
    setLoading(false);
  }
}

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        {loading ? "Redirecting to Stripe..." : "Proceed to Payment"}
      </button>
      {error && <p className="mt-2 text-center text-[13px] text-destructive">{error}</p>}
    </div>
  );
}