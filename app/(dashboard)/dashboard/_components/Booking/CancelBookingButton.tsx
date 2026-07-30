"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cancelBookingAction } from "@/app/(public)/_action/booking";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleCancel() {
    if (!confirm("Cancel this booking? This can't be undone.")) return;
    setError("");
    startTransition(async () => {
      const res = await cancelBookingAction(bookingId);
      if (res?.success === false) {
        setError(res.message ?? "Could not cancel booking.");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="text-right">
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1.5 text-[12px] font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
        Cancel booking
      </button>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}