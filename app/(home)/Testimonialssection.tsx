import { Star, Quote } from "lucide-react";
import { getFeaturedReviews } from "@/lib/api/review";

export default async function TestimonialsSection() {
  const reviews = await getFeaturedReviews(8);

  if (!reviews.length) return null;

  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-18">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              What customers say
            </span>
          </div>
          <h2
            className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Real reviews from real bookings
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote size={22} className="text-amber-300" />

              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}
                  />
                ))}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
                  {review.customer.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{review.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Serviced by {review.technician.user.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
