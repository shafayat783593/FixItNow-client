"use client";

import { useState } from "react";
import { Loader2, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createCheckoutSessionAction } from "@/lib/api/payment";

type PaymentGateway = "stripe" | "sslcommerz";

export default function CheckoutButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>("stripe");

  // 1. Stripe Payment Handler
  async function handleStripeCheckout() {
    setLoading(true);
    const toastId = toast.loading("Connecting to Stripe checkout...");

    try {
      const res = await createCheckoutSessionAction(bookingId);
      const paymentUrl = res?.data?.paymentUrl;

      if (!paymentUrl) {
        const errorMsg =res?.error || res?.message|| "Could not start Stripe session.";
        toast.error(errorMsg, { id: toastId });
        setLoading(false);
        return;
      }

      toast.success("Redirecting to Stripe...", { id: toastId });
      window.location.href = paymentUrl;
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong with Stripe payment.", { id: toastId });
      setLoading(false);
    }
  }

  // 2. SSLCommerz Payment Handler (Placeholder function for future implementation)
  async function handleSSLCommerzCheckout() {
    setLoading(true);
    const toastId = toast.loading("Initializing SSLCommerz gateway...");

    // TODO: SSLCommerz API Integration
    setTimeout(() => {
      toast.info("SSLCommerz payment method will be implemented soon!", {
        id: toastId,
        description: "Please select Stripe to complete your payment for now.",
      });
      setLoading(false);
    }, 1000);

    /* 
    // Future API implementation snippet:
    try {
      const res = await createSSLCommerzSessionAction(bookingId);
      if (res?.data?.GatewayPageURL) {
        window.location.href = res.data.GatewayPageURL;
      }
    } catch (err: any) {
      toast.error(err?.message || "SSLCommerz payment failed.", { id: toastId });
    } finally {
      setLoading(false);
    }
    */
  }

  // Main Submit Handler according to selected gateway
  function handleSubmit() {
    if (selectedGateway === "stripe") {
      handleStripeCheckout();
    } else if (selectedGateway === "sslcommerz") {
      handleSSLCommerzCheckout();
    }
  }

  return (
    <div className="space-y-5">
      {/* Payment Gateway Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Payment Method
        </label>

        <div className="grid gap-3">
          {/* Stripe Option */}
          <label
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
              selectedGateway === "stripe"
                ? "border-accent bg-accent/5 ring-1 ring-accent"
                : "border-border/60 bg-muted/20 hover:border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentGateway"
                value="stripe"
                checked={selectedGateway === "stripe"}
                onChange={() => setSelectedGateway("stripe")}
                className="accent-accent h-4 w-4"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">Stripe (Card / Apple Pay)</span>
                <span className="text-[11px] text-muted-foreground">International & Local Debit/Credit Cards</span>
              </div>
            </div>
            {selectedGateway === "stripe" && <CheckCircle2 className="h-4 w-4 text-accent" />}
          </label>

          {/* SSLCommerz Option */}
          <label
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
              selectedGateway === "sslcommerz"
                ? "border-accent bg-accent/5 ring-1 ring-accent"
                : "border-border/60 bg-muted/20 hover:border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentGateway"
                value="sslcommerz"
                checked={selectedGateway === "sslcommerz"}
                onChange={() => setSelectedGateway("sslcommerz")}
                className="accent-accent h-4 w-4"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">SSLCommerz (bKash / Nagad / Cards)</span>
                <span className="text-[11px] text-muted-foreground">Local Mobile Banking & Cards (BDT)</span>
              </div>
            </div>
            {selectedGateway === "sslcommerz" && <CheckCircle2 className="h-4 w-4 text-accent" />}
          </label>
        </div>
      </div>

      {/* Pay Action Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CreditCard className="h-4 w-4" />
        )}
        {loading
          ? `Connecting to ${selectedGateway === "stripe" ? "Stripe" : "SSLCommerz"}...`
          : `Pay with ${selectedGateway === "stripe" ? "Stripe" : "SSLCommerz"}`}
      </button>

      {/* Security Note */}
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> End-to-end encrypted & secure payment
      </p>
    </div>
  );
}