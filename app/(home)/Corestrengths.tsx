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
    <section className="relative overflow-hidden bg-[#F1F4F5] py-20 sm:py-28">
      {/* blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C7D0D6 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        {/* left column */}
        <div className="relative">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#5E6B78]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            What makes us different
          </span>

          <h2
            className="mt-4 text-4xl font-bold leading-[1.1] text-[#0F1B2B] sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Our core strengths in repair &amp; maintenance
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#5E6B78]">
            Every job on FixItNow runs through the same standard — vetted
            pros, honest pricing, and work that&apos;s tracked start to
            finish.
          </p>

          {/* signature stamp element */}
          <div
            className="mt-10 inline-flex h-28 w-28 rotate-[-8deg] select-none items-center justify-center rounded-full border-2 border-dashed border-[#FFB020] text-center"
            style={{ mixBlendMode: "multiply" }}
          >
            <span
              className="px-3 text-[11px] font-semibold uppercase leading-tight tracking-wider text-[#B27600]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Service
              <br />
              Verified
            </span>
          </div>
        </div>

        {/* right column: strength cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {strengths.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative border border-[#D8DEE2] bg-white p-6 transition-colors hover:border-[#FFB020]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
              }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center border border-[#0F1B2B] text-[#0F1B2B] transition-colors group-hover:border-[#FFB020] group-hover:text-[#B27600]">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3
                className="text-lg font-semibold text-[#0F1B2B]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5E6B78]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}