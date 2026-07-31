import { Star } from "lucide-react";

interface Review {
  rating: number;
  comment?: string | null;
}

export default function ReviewSection({ review }: { review: Review | null }) {
  if (!review) return null;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your review</p>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      {review.comment && <p className="mt-2 text-[13px] text-muted-foreground">{review.comment}</p>}
    </div>
  );
}