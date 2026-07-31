"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import ReviewForm from "./ReviewForm";

export default function ReviewModal({ bookingId }: { bookingId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-5 py-2 text-[13px] font-semibold text-foreground transition hover:bg-muted"
      >
        Leave review
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[90vh] overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl sm:max-w-md sm:rounded-3xl sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <Star className="h-4 w-4 text-amber-400" /> Rate your experience
              </h3>
              <button onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-muted">
                <X size={18} />
              </button>
            </div>
            <ReviewForm bookingId={bookingId} onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}