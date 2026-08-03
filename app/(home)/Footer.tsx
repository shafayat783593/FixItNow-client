"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Wrench,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const serviceLinks = [
  { label: "Plumbing", href: "/services?category=Plumbing" },
  { label: "Electrical", href: "/services?category=Electrical" },
  { label: "Air Conditioner", href: "/services?category=Air Conditioner" },
  { label: "Cleaning", href: "/services?category=Cleaning" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Become a technician", href: "/technicians" },
  { label: "Services", href: "/services" },
];

const supportLinks = [
  { label: "Help center", href: "/help" },
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Contact us", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1QbdbzYd18/", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/md-shafayat-hosan", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to your newsletter endpoint
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral-500">
                <Wrench className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="font-mono text-lg font-bold text-white">
                FixItNow
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Book vetted local technicians for plumbing, electrical, cooling, and
              cleaning — tracked from your dashboard, start to finish.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-coral-500/50 hover:text-coral-400"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Get service updates
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Booking tips, seasonal maintenance reminders, no spam.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus-visible:ring-coral-500"
              />
              <Button
                type="submit"
                className="shrink-0 bg-coral-500 text-white hover:bg-coral-400"
              >
                Subscribe
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
            {submitted && (
              <p className="mt-2 text-xs text-coral-400">
                Subscribed — check your inbox.
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-slate-800" />

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
                Chattogram, Bangladesh
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-coral-500" />
                <a href="tel:+8801610665069" className="hover:text-white">
                  +880 1610665069
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-coral-500" />
                <Link href="mailto:Shafayat783@gmail.com" className="hover:text-white">
                  Shafayat783@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}