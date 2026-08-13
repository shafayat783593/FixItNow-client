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
    id: "ac",
    category: "Air Conditioner",
    eyebrow: "FixItNow · Cooling",
    headline: "Cool homes, calm minds.",
    description:
      "Gas refills, full servicing, and installs from technicians rated by your neighbors — every job tracked start to finish.",
    image: "/images/AirConditioner.avif",
    icon: Wind,
    ctaLabel: "Book AC service",
  },
  {
    id: "plumbing",
    category: "Plumbing",
    eyebrow: "FixItNow · Plumbing",
    headline: "Stop leaks. Start living.",
    description:
      "From pipe installs to bathroom fittings, book a vetted local plumber for same-week service with upfront pricing.",
    image: "/images/plumber.webp",
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
    image: "/images/electrical.jpg",
    icon: Zap,
    ctaLabel: "Book an electrician",
  },
 
  {
    id: "cleaning",
    category: "Cleaning",
    eyebrow: "FixItNow · Cleaning",
    headline: "Spotless homes, zero hassle.",
    description:
      "Deep cleans, move-outs, and recurring visits from insured crews. Pick a slot, we handle the rest.",
    image: "/images/cleaning.jpg",
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
      className="relative min-h-[100svh] sm:min-h-[92vh] w-full overflow-hidden bg-brand text-brand-foreground"
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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
        {/* Text block */}
        <div className="flex min-h-[300px] max-w-xl flex-col justify-center sm:min-h-[330px] lg:min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent backdrop-blur-sm sm:text-xs">
                <active.icon className="h-3.5 w-3.5" />
                {active.eyebrow}
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-brand-foreground [text-shadow:_0_2px_12px_rgb(0_0_0_/_45%)] sm:mt-5 sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
                {active.headline}
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-foreground/85 [text-shadow:_0_1px_8px_rgb(0_0_0_/_40%)] sm:mt-5 sm:text-base">
                {active.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href={`/services?category=${encodeURIComponent(active.category)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03] hover:bg-accent/90 sm:px-6 sm:py-3"
                >
                  {active.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/technicians"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-foreground/25 px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-foreground/10 sm:px-6 sm:py-3"
                >
                  Browse technicians
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category tabs / indicator */}

        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2 lg:gap-3">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => goTo(index)}
                className={`group relative flex flex-1 items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2.5 text-left backdrop-blur-sm transition-colors sm:gap-3 sm:px-4 sm:py-3 ${
                  isActive
                    ? "border-accent/60 bg-brand-foreground/15"
                    : "border-brand-foreground/15 bg-brand-foreground/[0.06] hover:bg-brand-foreground/[0.1]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8 ${
                    isActive ? "bg-accent text-accent-foreground" : "bg-brand-foreground/15 text-brand-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-brand-foreground/70 sm:text-[10px]">
                    0{index + 1}
                  </p>
                  <p className="truncate text-[13px] font-medium text-white sm:text-sm">{slide.category}</p>
                </div>

                {/* progress bar for active tab */}
                {isActive && !isPaused && (
                  <motion.span
                    key={`${active.id}-progress`}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
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