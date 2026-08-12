import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-12 sm:px-16 sm:py-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Wrench size={22} />
            </div>

            <h2
              className="mt-6 text-3xl font-extrabold tracking-tight text-brand-foreground sm:text-4xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ready to get started?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-brand-foreground/75">
              Book a verified technician in minutes, or join FixItNow as a professional and start
              earning from your skills.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/85"
              >
                Book a service
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-foreground/20 px-6 py-3 text-sm font-bold text-brand-foreground transition-colors hover:bg-brand-foreground/10"
              >
                Become a technician
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
