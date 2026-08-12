"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How are technicians verified?",
    a: "Every technician goes through identity verification and a skills review before they can accept bookings. You can see their rating and completed job count on their profile before you book.",
  },
  {
    q: "What happens if I'm not satisfied with the work?",
    a: "You can leave a review after every completed job, and our support team steps in for any dispute raised through the booking. Payment is only released once the job is marked complete.",
  },
  {
    q: "How does pricing work?",
    a: "Each service listing shows a clear price up front. There are no hidden fees added after the job — what you see at booking is what you pay, unless you agree to additional work on-site.",
  },
  {
    q: "Can I reschedule or cancel a booking?",
    a: "Yes, you can manage your bookings from your dashboard. Cancellation terms depend on how close to the scheduled time you cancel — this is shown before you confirm.",
  },
  {
    q: "How do I become a technician on FixItNow?",
    a: "Register with a technician account, complete your profile with your skills and experience, and once verified you can start listing services and accepting bookings.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-background py-10 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1">
            
          </div>
          <h2
            className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Common questions
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-foreground sm:text-base">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
