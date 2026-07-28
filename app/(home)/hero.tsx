"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Wrench, Zap, Wind, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";

interface HeroSlide {
  id: string;
  category: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  icon: LucideIcon;
  ctaLabel: string;
}

// Swap these seeded placeholder images for real service photography per category.
const slides: HeroSlide[] = [
  {
    id: "plumbing",
    category: "Plumbing",
    eyebrow: "FixItNow · Plumbing",
    headline: "Stop leaks. Start living.",
    description:
      "From pipe installs to bathroom fittings, book a vetted local plumber for same-week service with upfront pricing.",
    image: "https://picsum.photos/seed/fixitnow-plumbing/1400/1700",
    icon: Wrench,
    ctaLabel: "Book a plumber",
  },
  {
    id: "electrical",
    category: "Electrical",
    eyebrow: "FixItNow · Electrical",
    headline: "Power problems, solved fast.",
    description:
      "Licensed electricians for wiring, fixtures, and safety inspections — dispatched and tracked from your dashboard.",
    image: "https://picsum.photos/seed/fixitnow-electrical/1400/1700",
    icon: Zap,
    ctaLabel: "Book an electrician",
  },
  {
    id: "ac",
    category: "Air Conditioner",
    eyebrow: "FixItNow · Cooling",
    headline: "Cool homes, calm minds.",
    description:
      "Gas refills, full servicing, and installs from technicians rated by your neighbors — every job tracked start to finish.",
    image: "https://picsum.photos/seed/fixitnow-ac/1400/1700",
    icon: Wind,
    ctaLabel: "Book AC service",
  },
  {
    id: "cleaning",
    category: "Cleaning",
    eyebrow: "FixItNow · Cleaning",
    headline: "Spotless homes, zero hassle.",
    description:
      "Deep cleans, move-outs, and recurring visits from insured crews. Pick a slot, we handle the rest.",
    image: "https://picsum.photos/seed/fixitnow-cleaning/1400/1700",
    icon: Sparkles,
    ctaLabel: "Book a cleaning",
  },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const active = slides[activeIndex];

  return (
    <section
      className="relative min-h-[92vh] w-full overflow-hidden bg-slate-900 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={active.image}
            alt={`${active.category} service`}
            fill
            priority
            sizes="100vw"
            onError={(e) => console.error("Hero image failed to load:", active.image, e)}
            className="object-cover"
          />
          {/* Balanced overlay: only enough tint to keep text readable, image stays clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-10 pt-28 sm:px-6 lg:px-8">
        {/* Text block */}
        <div className="flex min-h-[360px] max-w-xl flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-coral-400 backdrop-blur-sm">
                <active.icon className="h-3.5 w-3.5" />
                {active.eyebrow}
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:_0_2px_12px_rgb(0_0_0_/_45%)] sm:text-5xl lg:text-6xl">
                {active.headline}
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-100 [text-shadow:_0_1px_8px_rgb(0_0_0_/_40%)]">
                {active.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/services?category=${encodeURIComponent(active.category)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral-500/20 transition-transform hover:scale-[1.03] hover:bg-coral-400"
                >
                  {active.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/technicians"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Browse technicians
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category tabs / indicator */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-2">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => goTo(index)}
                className={`group relative flex flex-1 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left backdrop-blur-sm transition-colors ${
                  isActive
                    ? "border-coral-400/60 bg-white/15"
                    : "border-white/15 bg-white/[0.06] hover:bg-white/[0.1]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? "bg-coral-500 text-white" : "bg-white/15 text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    0{index + 1}
                  </p>
                  <p className="truncate text-sm font-medium text-white">{slide.category}</p>
                </div>

                {/* progress bar for active tab */}
                {isActive && !isPaused && (
                  <motion.span
                    key={`${active.id}-progress`}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-coral-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}