import { Star, MessageSquareOff } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Star size={16} className="fill-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Verified Customer
            </p>
            <p className="text-[11px] text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString("en-BD", {
                dateStyle: "medium",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < review.rating
                  ? "fill-accent text-accent"
                  : "text-muted-foreground/30"
              }
            />
          ))}
        </div>
      </div>

      {review.comment && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {review.comment}
        </p>
      )}
    </div>
  );
}

export function TechnicianReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border p-10 text-center">
        <MessageSquareOff className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}