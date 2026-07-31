"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteReviewAction } from "@/lib/actions/review.action";

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete() {
    if (!confirm("Delete this review? This can't be undone.")) return;
    setError("");
    startTransition(async () => {
      const res = await deleteReviewAction(reviewId);
      if (res?.success === false) {
        setError(res.message ?? "Could not delete review.");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-destructive transition hover:opacity-80 disabled:opacity-50"
      >
        {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        Delete review
      </button>
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
    </div>
  );
}