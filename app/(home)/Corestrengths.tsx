import { ShieldCheck, ReceiptText, Zap, Activity, LucideIcon } from "lucide-react";

interface Strength {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const strengths: Strength[] = [
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    desc: "Every technician is background-checked and skill-verified before they ever take a booking.",
  },
  {
    icon: ReceiptText,
    title: "Transparent pricing",
    desc: "You see the quote before you confirm. No surprise line items on the final invoice.",
  },
  {
    icon: Zap,
    title: "Fast response",
    desc: "Same-day slots for urgent repairs, with dispatch times you can actually count on.",
  },
  {
    icon: Activity,
    title: "Real-time tracking",
    desc: "Live job status from accepted to completed, right inside your dashboard.",
  },
];

export default function CoreStrengths() {
  return (
    <section className="relative overflow-hidden bg-background py-10 sm:py-18">
      {/* Decorative Glow Blob */}
      <div 
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:gap-12">
        {/* Left Column */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-3 py-1 backdrop-blur-sm">
             
            </div>

            <h2
              className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our core strengths in repair &amp; maintenance
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Every job on FixItNow runs through the same standard — vetted
              pros, honest pricing, and work that&apos;s tracked start to
              finish.
            </p>
          </div>

          {/* Signature Stamp Element */}
          <div className="mt-10">
            <div
              className="inline-flex h-24 w-24 rotate-[-8deg] select-none items-center justify-center rounded-full border-2 border-dashed border-accent bg-accent/10 text-center shadow-sm transition-transform duration-300 hover:rotate-0"
            >
              <span
                className="px-2 text-[10px] font-bold uppercase leading-tight tracking-wider text-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Service
                <br />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Strength Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {strengths.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-border bg-card/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              {/* Icon Container */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-foreground shadow-inner transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon size={22} strokeWidth={2} />
              </div>

              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>

              {/* Top Accent Line on Hover */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
