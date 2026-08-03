"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserCheck, HardHat, ArrowRight } from "lucide-react";

const tags = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "AC Repair",
  "Carpentry",
  "Painting",
  "Installation",
  "Maintenance",
  "Pest Control",
];

const miniFeatures = [
  {
    icon: UserCheck,
    title: "Vetted Technicians",
    description: "Background-checked before their first job.",
  },
  {
    icon: HardHat,
    title: "Quality Workmanship",
    description: "Every job backed by a satisfaction guarantee.",
  },
];

export default function About() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* lg:items-stretch ব্যবহার করা হয়েছে যেন দুটি Column-এর Height সমান হয় */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-stretch">
          {/* Text side */}
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-teal-600">
              Driven by Reliability
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Your trusted partner for{" "}
              <span className="text-teal-600">efficient home solutions</span>
            </h2>

            <p className="mt-5 max-w-lg text-slate-600">
              We connect homeowners with verified, skilled technicians across every trade —
              plumbing, electrical, cleaning, and more — so you never have to gamble on who
              shows up at your door.
            </p>

            {/* Mini feature blocks */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {miniFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{f.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat + list row */}
            <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:flex-row sm:items-center">
              <div className="shrink-0">
                <p className="text-4xl font-bold text-coral-600">98%</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Jobs completed on time
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 sm:border-l sm:border-slate-200 sm:pl-6">
                <li>• Booking to completion, tracked live in your dashboard</li>
                <li>• Secure payment, released only after job acceptance</li>
              </ul>
            </div>

            <div>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-coral-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-coral-700"
              >
                Discover services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-full min-h-[400px] lg:min-h-full"
          >
            {/* aspect ratio সরিয়ে h-full ব্যবহার করা হয়েছে */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/repaire.jpg"
                alt="FixItNow technician at work"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/60">
              <p className="text-3xl font-bold text-slate-900">
                4.9<span className="text-base font-medium text-slate-400">/5</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">12,000+ completed jobs</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling tag marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-slate-100 py-5">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[...tags, ...tags].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="font-mono text-sm uppercase tracking-wider text-slate-300"
            >
              {tag} <span className="mx-4 text-coral-300">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}