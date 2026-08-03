"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.replace("/dashboard/customer/my-bookings");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
        <XCircle className="h-8 w-8" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Payment canceled
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        No charge was made. Redirecting to your bookings in{" "}
        <span className="font-semibold text-foreground">{secondsLeft}</span>...
      </p>

      {bookingId && (
        <Link
          href={`/dashboard/customer/my-bookings/${bookingId}/pay`}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Try again
        </Link>
      )}

      <Link
        href="/dashboard/customer/my-bookings"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Or go back now
      </Link>
    </main>
  );
}