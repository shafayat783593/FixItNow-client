"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (secondsLeft <= 0) {
      const target = bookingId
        ? `/dashboard/customer/my-bookings/${bookingId}`
        : `/dashboard/customer/my-bookings`;
      router.replace(target);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, bookingId, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Payment successful
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Your booking is confirmed. Redirecting to your bookings in{" "}
        <span className="font-semibold text-foreground">{secondsLeft}</span>...
      </p>
    </main>
  );
}