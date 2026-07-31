"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
import { reviewSchema } from "@/lib/validations/reviewSchema";
import { createReviewAction } from "@/lib/api/review";


export default function ReviewForm({ bookingId, onSuccess }: { bookingId: string; onSuccess: () => void }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const parsed = reviewSchema.safeParse({ rating, comment });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input.");
      return;
    }

    setLoading(true);
    try {
      const res = await createReviewAction({
        bookingId,
        rating: parsed.data.rating,
        comment: parsed.data.comment?.trim() || undefined,
      });

      if (res?.success === false) {
        setError(res.message ?? "Could not submit review.");
        return;
      }

      router.refresh();
      onSuccess();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
            >
              <Star
                className={`h-7 w-7 transition ${
                  star <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Comment (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="How was the service?"
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && <p className="text-[13px] text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit review
      </button>
    </form>
  );
}