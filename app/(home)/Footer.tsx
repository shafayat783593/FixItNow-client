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
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="border-t border-border bg-brand text-brand-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Wrench className="h-4.5 w-4.5 text-accent-foreground" />
              </span>
              <span className="font-mono text-lg font-bold text-brand-foreground">
                FixItNow
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-foreground/75">
              Book vetted local technicians for plumbing, electrical, cooling, and
              cleaning - tracked from your dashboard, start to finish.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-foreground/15 text-brand-foreground/75 transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-foreground">
              Get service updates
            </h3>
            <p className="mt-2 text-sm text-brand-foreground/75">
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
                className="border-brand-foreground/15 bg-brand/40 text-brand-foreground placeholder:text-brand-foreground/45 focus-visible:ring-accent"
              />
              <Button
                type="submit"
                className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Subscribe
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
            {submitted && (
              <p className="mt-2 text-xs text-accent">
                Subscribed - check your inbox.
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-brand-foreground/10" />

        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-foreground/55">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-brand-foreground/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Chattogram, Bangladesh
              </li>
              <li className="flex items-center gap-2 text-brand-foreground/75">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+8801610665069" className="hover:text-brand-foreground">
                  +880 1610665069
                </a>
              </li>
              <li className="flex items-center gap-2 text-brand-foreground/75">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <Link href="mailto:Shafayat783@gmail.com" className="hover:text-brand-foreground">
                  Shafayat783@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-brand-foreground/10" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-brand-foreground/55 sm:flex-row">
          <p>(c) {new Date().getFullYear()} FixItNow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-brand-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-brand-foreground">
              Privacy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-brand-foreground">
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
      <h3 className="font-mono text-xs uppercase tracking-wider text-brand-foreground/55">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-brand-foreground/75 transition-colors hover:text-brand-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
